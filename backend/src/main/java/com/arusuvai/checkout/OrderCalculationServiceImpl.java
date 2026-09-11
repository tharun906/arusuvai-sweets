package com.arusuvai.checkout;

import com.arusuvai.combopack.ComboPackEntity;
import com.arusuvai.combopack.ComboPackRepository;
import com.arusuvai.customer.CustomerEntity;
import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.exception.BusinessException;
import com.arusuvai.exception.ResourceNotFoundException;
import com.arusuvai.order.OrderItemRequestDTO;
import com.arusuvai.order.OrderItemType;
import com.arusuvai.product.ProductEntity;
import com.arusuvai.product.ProductRepository;
import com.arusuvai.sweetbox.SweetBoxEntity;
import com.arusuvai.sweetbox.SweetBoxRepository;
import com.arusuvai.util.WeightConverter;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderCalculationServiceImpl implements OrderCalculationService {

    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final SweetBoxRepository sweetBoxRepository;
    private final ComboPackRepository comboPackRepository;
    private final DeliveryService deliveryService;

    public OrderCalculationServiceImpl(
            CustomerRepository customerRepository,
            ProductRepository productRepository,
            SweetBoxRepository sweetBoxRepository,
            ComboPackRepository comboPackRepository,
            DeliveryService deliveryService
    ) {
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.sweetBoxRepository = sweetBoxRepository;
        this.comboPackRepository = comboPackRepository;
        this.deliveryService = deliveryService;
    }

    @Override
    public OrderCalculationResult calculateCheckout(
            CheckoutRequestDTO request
    ) {

        CustomerEntity customer =
                customerRepository.findById(request.getCustomerId())
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Customer not found"
                                ));

        List<CalculatedOrderItem> items = new ArrayList<>();

        BigDecimal total = BigDecimal.ZERO;
        BigDecimal totalWeightKg = BigDecimal.ZERO;

        for (OrderItemRequestDTO req : request.getItems()) {

            CalculatedOrderItem item =
                    new CalculatedOrderItem();

            if (req.getItemType() == OrderItemType.PRODUCT) {

                if (req.getProductId() == null) {
                    throw new BusinessException(
                            "Product ID is required"
                    );
                }

                if (req.getSweetBoxId() != null) {
                    throw new BusinessException(
                            "Product order cannot contain a sweet box ID"
                    );
                }

                if (req.getComboPackId() != null) {
                    throw new BusinessException(
                            "Product order cannot contain a combo pack ID"
                    );
                }

                if (req.getWeight() == null ||
                        req.getWeight().isBlank()) {

                    throw new BusinessException(
                            "Weight is required"
                    );
                }

                ProductEntity product =
                        productRepository.findById(req.getProductId())
                                .orElseThrow(() ->
                                        new ResourceNotFoundException(
                                                "Product not found"
                                        ));

                BigDecimal price = switch (req.getWeight()) {

                    case "250g" -> product.getPrice250g();

                    case "500g" -> product.getPrice500g();

                    case "1kg" -> product.getPrice1kg();

                    default -> throw new BusinessException(
                            "Invalid weight"
                    );
                };

                item.setItemType(OrderItemType.PRODUCT);
                item.setProduct(product);
                item.setSweetBox(null);
                item.setComboPack(null);
                item.setWeight(req.getWeight());
                item.setQuantity(req.getQuantity());
                item.setPricePerUnit(price);
                item.setItemTotal(
                        price.multiply(
                                BigDecimal.valueOf(req.getQuantity())
                        )
                );

            } else if (req.getItemType() == OrderItemType.SWEET_BOX) {

                if (req.getSweetBoxId() == null) {
                    throw new BusinessException(
                            "Sweet box ID is required"
                    );
                }

                if (req.getProductId() != null) {
                    throw new BusinessException(
                            "Sweet box order cannot contain a product ID"
                    );
                }

                if (req.getComboPackId() != null) {
                    throw new BusinessException(
                            "Sweet box order cannot contain a combo pack ID"
                    );
                }

                if (req.getWeight() != null) {
                    throw new BusinessException(
                            "Weight should not be provided for a sweet box"
                    );
                }

                if (req.getQuantity() > 10) {
                    throw new BusinessException(
                            "Maximum 10 boxes can be purchased per order"
                    );
                }

                SweetBoxEntity box =
                        sweetBoxRepository.findById(req.getSweetBoxId())
                                .orElseThrow(() ->
                                        new ResourceNotFoundException(
                                                "Sweet box not found"
                                        ));

                if (!box.isActive()) {
                    throw new BusinessException(
                            "This sweet box is currently unavailable"
                    );
                }

                BigDecimal price = box.getPrice();

                item.setItemType(OrderItemType.SWEET_BOX);
                item.setProduct(null);
                item.setSweetBox(box);
                item.setComboPack(null);
                item.setWeight(box.getTotalWeight());
                item.setQuantity(req.getQuantity());
                item.setPricePerUnit(price);
                item.setItemTotal(
                        price.multiply(
                                BigDecimal.valueOf(req.getQuantity())
                        )
                );

            } else if (req.getItemType() == OrderItemType.COMBO_PACK) {

                if (req.getComboPackId() == null) {
                    throw new BusinessException(
                            "Combo Pack ID is required"
                    );
                }

                if (req.getProductId() != null) {
                    throw new BusinessException(
                            "Combo Pack order cannot contain a product ID"
                    );
                }

                if (req.getSweetBoxId() != null) {
                    throw new BusinessException(
                            "Combo Pack order cannot contain a sweet box ID"
                    );
                }

                if (req.getWeight() != null) {
                    throw new BusinessException(
                            "Weight should not be provided for a Combo Pack"
                    );
                }

                ComboPackEntity comboPack =
                        comboPackRepository.findById(
                                req.getComboPackId()
                        ).orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Combo Pack not found"
                                ));

                if (!comboPack.isActive()) {
                    throw new BusinessException(
                            "This Combo Pack is currently unavailable"
                    );
                }

                BigDecimal price = comboPack.getPrice();

                item.setItemType(OrderItemType.COMBO_PACK);
                item.setProduct(null);
                item.setSweetBox(null);
                item.setComboPack(comboPack);
                item.setWeight(comboPack.getWeight());
                item.setQuantity(req.getQuantity());
                item.setPricePerUnit(price);
                item.setItemTotal(
                        price.multiply(
                                BigDecimal.valueOf(req.getQuantity())
                        )
                );

            } else {

                throw new BusinessException(
                        "Invalid order item type"
                );
            }

            items.add(item);

            total = total.add(item.getItemTotal());

            BigDecimal itemWeightKg =
                    WeightConverter.toKg(item.getWeight());

            totalWeightKg =
                    totalWeightKg.add(
                            itemWeightKg.multiply(
                                    BigDecimal.valueOf(
                                            item.getQuantity()
                                    )
                            )
                    );
        }

        if (customer.getLatitude() == null ||
                customer.getLongitude() == null) {

            throw new BusinessException(
                    "Customer delivery location is not available"
            );
        }

        double distance =
                deliveryService.calculateDistance(
                        customer.getLatitude(),
                        customer.getLongitude()
                );

        DeliveryCheckResponse deliveryDetails =
                deliveryService.getDeliveryDetails(
                        distance,
                        totalWeightKg
                );

        BigDecimal deliveryCharge =
                deliveryDetails.getDeliveryCharge();

        BigDecimal grandTotal =
                total.add(deliveryCharge);

        OrderCalculationResult result =
                new OrderCalculationResult();

        result.setItems(items);
        result.setSubtotal(total);
        result.setDeliveryCharge(deliveryCharge);
        result.setGrandTotal(grandTotal);

        return result;
    }
}