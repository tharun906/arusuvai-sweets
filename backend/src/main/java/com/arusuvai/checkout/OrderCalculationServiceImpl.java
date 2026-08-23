package com.arusuvai.checkout;

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

//CheckoutRequestDTO
//        │
//                ▼
//OrderCalculationService
//        │
//                ▼
//OrderCalculationResult
//        │
//                ├────────────► CheckoutService
//        │                 │
//                │                 ▼
//                │        CheckoutSummaryDTO
//        │
//                └────────────► OrderService
//                          │
//                                  ▼
//                          Save Order + Save OrderItems




@Service
public class OrderCalculationServiceImpl  implements OrderCalculationService{
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;
    private final SweetBoxRepository sweetBoxRepository;

    public OrderCalculationServiceImpl(
            CustomerRepository customerRepository,
            ProductRepository productRepository,
            SweetBoxRepository sweetBoxRepository) {

        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
        this.sweetBoxRepository = sweetBoxRepository;
    }

//    OrderCalculationService
//    -> Fetch products.
//    -> Validate products.
//    -> Validate quantities.
//    -> Calculate each item's total.
//    -> Calculate subtotal.
//    -> Calculate delivery.
//    -> Calculate grand total.

    @Override
    public OrderCalculationResult calculateCheckout(CheckoutRequestDTO request){

        customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        List<CalculatedOrderItem> calculatedItems = new ArrayList<>();

        BigDecimal grandTotal = BigDecimal.ZERO;

        for (OrderItemRequestDTO itemRequest : request.getItems()) {

            CalculatedOrderItem item = new CalculatedOrderItem();

            // ========================================
            // INDIVIDUAL PRODUCT
            // ========================================
            if (itemRequest.getItemType() == OrderItemType.PRODUCT) {

                if (itemRequest.getProductId() == null) {
                    throw new BusinessException(
                            "Product ID is required"
                    );
                }

                if (itemRequest.getSweetBoxId() != null) {
                    throw new BusinessException(
                            "Product order cannot contain a sweet box ID"
                    );
                }

                if (itemRequest.getWeight() == null
                        || itemRequest.getWeight().isBlank()) {
                    throw new BusinessException(
                            "Weight is required"
                    );
                }

                ProductEntity product =
                        productRepository.findById(
                                itemRequest.getProductId()
                        ).orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Product not found"
                                ));

                BigDecimal requestedWeight =
                        WeightConverter.toKg(
                                itemRequest.getWeight()
                        );

                BigDecimal requiredStock =
                        requestedWeight.multiply(
                                BigDecimal.valueOf(
                                        itemRequest.getQuantity()
                                )
                        );

                if (product.getCurrentStockKg()
                        .compareTo(requiredStock) < 0) {

                    throw new BusinessException(
                            product.getName()
                                    + " does not have enough stock."
                    );
                }

                BigDecimal pricePerUnit =
                        switch (itemRequest.getWeight()) {

                            case "250g" -> product.getPrice250g();

                            case "500g" -> product.getPrice500g();

                            case "1kg" -> product.getPrice1kg();

                            default ->
                                    throw new BusinessException(
                                            "Invalid weight"
                                    );
                        };

                BigDecimal itemTotal =
                        pricePerUnit.multiply(
                                BigDecimal.valueOf(
                                        itemRequest.getQuantity()
                                )
                        );

                item.setItemType(OrderItemType.PRODUCT);
                item.setProduct(product);
                item.setSweetBox(null);
                item.setWeight(itemRequest.getWeight());
                item.setQuantity(itemRequest.getQuantity());
                item.setPricePerUnit(pricePerUnit);
                item.setItemTotal(itemTotal);
            }

            // ========================================
            // SWEET BOX
            // ========================================
            else if (itemRequest.getItemType()
                    == OrderItemType.SWEET_BOX) {

                if (itemRequest.getSweetBoxId() == null) {
                    throw new BusinessException(
                            "Sweet box ID is required"
                    );
                }

                if (itemRequest.getProductId() != null) {
                    throw new BusinessException(
                            "Sweet box order cannot contain a product ID"
                    );
                }

                if (itemRequest.getWeight() != null) {
                    throw new BusinessException(
                            "Weight should not be provided for a sweet box"
                    );
                }

                if (itemRequest.getQuantity() > 10) {
                    throw new BusinessException(
                            "Maximum 10 boxes can be purchased per order"
                    );
                }

                SweetBoxEntity sweetBox =
                        sweetBoxRepository.findById(
                                itemRequest.getSweetBoxId()
                        ).orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Sweet box not found"
                                ));

                if (!sweetBox.isActive()) {
                    throw new BusinessException(
                            "This sweet box is currently unavailable"
                    );
                }

                BigDecimal pricePerUnit =
                        sweetBox.getPrice();

                BigDecimal itemTotal =
                        pricePerUnit.multiply(
                                BigDecimal.valueOf(
                                        itemRequest.getQuantity()
                                )
                        );

                item.setItemType(OrderItemType.SWEET_BOX);
                item.setProduct(null);
                item.setSweetBox(sweetBox);
                item.setWeight(sweetBox.getTotalWeight());
                item.setQuantity(itemRequest.getQuantity());
                item.setPricePerUnit(pricePerUnit);
                item.setItemTotal(itemTotal);
            }

            // ========================================
            // INVALID TYPE
            // ========================================
            else {

                throw new BusinessException(
                        "Invalid order item type"
                );
            }

            calculatedItems.add(item);

            grandTotal = grandTotal.add(
                    item.getItemTotal()
            );
        }

        OrderCalculationResult result = new OrderCalculationResult();

        result.setItems(calculatedItems);
        result.setSubtotal(grandTotal);
        result.setDeliveryCharge(BigDecimal.ZERO);
        //LATER - BigDecimal grandTotal = subtotal.add(deliveryCharge);
        result.setGrandTotal(grandTotal);

        return result;
    }


}
