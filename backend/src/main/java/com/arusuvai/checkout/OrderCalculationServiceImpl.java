package com.arusuvai.checkout;

import com.arusuvai.customer.CustomerEntity;
import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.exception.BusinessException;
import com.arusuvai.exception.ResourceNotFoundException;
import com.arusuvai.order.OrderItemRequestDTO;
import com.arusuvai.product.ProductEntity;
import com.arusuvai.product.ProductRepository;
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

    public OrderCalculationServiceImpl(
            CustomerRepository customerRepository,
            ProductRepository productRepository) {

        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
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

            ProductEntity product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

            //old
//            BigDecimal requestedWeight = switch (itemRequest.getWeight()) {
//                case "250g" -> new BigDecimal("0.25");
//                case "500g" -> new BigDecimal("0.50");
//                case "1kg" -> BigDecimal.ONE;
//                default -> throw new RuntimeException("Invalid weight");
//            };
            //optimize
            BigDecimal  requestedWeight = WeightConverter.toKg(itemRequest.getWeight());

            //one sweet how much they rdered quantity
            BigDecimal requiredStock =
                    requestedWeight.multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            //validate Stock
            if (product.getCurrentStockKg().compareTo(requiredStock) < 0) {
                throw new BusinessException(product.getName() + " does not have enough stock.");
            }

            BigDecimal pricePerUnit = switch (itemRequest.getWeight()) {
                case "250g" -> product.getPrice250g();
                case "500g" -> product.getPrice500g();
                case "1kg" -> product.getPrice1kg();
                default -> throw new BusinessException("Invalid weight");
            };

            BigDecimal itemTotal =
                    pricePerUnit.multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            CalculatedOrderItem item = new CalculatedOrderItem();

            item.setProduct(product);
            item.setWeight(itemRequest.getWeight());
            item.setQuantity(itemRequest.getQuantity());
            item.setPricePerUnit(pricePerUnit);
            item.setItemTotal(itemTotal);

            calculatedItems.add(item);

            grandTotal = grandTotal.add(itemTotal);
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
