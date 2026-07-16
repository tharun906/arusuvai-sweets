package com.arusuvai.order;

import com.arusuvai.customer.CustomerEntity;
import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.product.ProductEntity;
import com.arusuvai.product.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;


@Service
public class OrderServiceImpl implements OrderService{

    private final OrderRepository orderRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public OrderServiceImpl(
            OrderRepository orderRepository,
            OrderItemRepository orderItemRepository,
            CustomerRepository customerRepository,
            ProductRepository productRepository) {

        this.orderRepository = orderRepository;
        this.orderItemRepository = orderItemRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    @Override
    public OrderResponseDTO createOrder(OrderRequestDTO request){
        CustomerEntity customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        // Create a new Order (Parent Record)
        OrderEntity order =new OrderEntity();
        order.setCustomer(customer);
        order.setOrderStatus(OrderStatus.PENDING_PAYMENT);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setDeliveryAddress(customer.getAddress());
        //  Initially total amount is 0 (will calculate after processing all items)
        order.setTotalAmount(BigDecimal.ZERO);
        order = orderRepository.save(order);

        //grandTotal -  Variable to accumulate the grand total of the complete order
        BigDecimal grandTotalForClientOrder = BigDecimal.ZERO;

        for(OrderItemRequestDTO itemRequest : request.getItems()){
            ProductEntity product = productRepository.findById(itemRequest.getProductId())
                    .orElseThrow(() -> new RuntimeException("Product not found"));

            BigDecimal requestedWeight;
            switch (itemRequest.getWeight()) {
                case "250g":
                    requestedWeight = new BigDecimal("0.25");
                    break;
                case "500g":
                    requestedWeight = new BigDecimal("0.50");
                    break;
                case "1kg":
                    requestedWeight = BigDecimal.ONE;
                    break;
                default:
                    throw new RuntimeException("Invalid weight");
            }
            //requiredStock
            BigDecimal totalStockClientNeed = requestedWeight.multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            //validate Stock
            if (product.getCurrentStockKg().compareTo(totalStockClientNeed) < 0) {
                throw new RuntimeException(
                        product.getName() + " does not have enough stock.");
            }

            //  Determine the correct price based on selected weight
            BigDecimal pricePerUnit;
            switch (itemRequest.getWeight()) {
                case "250g":
                    pricePerUnit = product.getPrice250g();
                    break;
                case "500g":
                    pricePerUnit = product.getPrice500g();
                    break;
                case "1kg":
                    pricePerUnit = product.getPrice1kg();
                    break;
                default:
                    throw new RuntimeException("Invalid weight");
            }
            //Calculate total amount for this particular product
            BigDecimal itemTotal = pricePerUnit.multiply(BigDecimal.valueOf(itemRequest.getQuantity()));

            OrderItemEntity orderItem = new OrderItemEntity();

            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setWeight(itemRequest.getWeight());
            orderItem.setQuantity(itemRequest.getQuantity());
            orderItem.setPricePerUnit(pricePerUnit);
            orderItem.setTotalPrice(itemTotal);

            orderItemRepository.save(orderItem);

            order.getOrderItems().add(orderItem);
            // Add this item's amount to the grand total
            grandTotalForClientOrder = grandTotalForClientOrder.add(itemTotal);
        }
        order.setTotalAmount(grandTotalForClientOrder);
        order = orderRepository.save(order);
        order = orderRepository.findById(order.getId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return mapToResponse(order);
    }

    private OrderResponseDTO mapToResponse(OrderEntity order){

        List<OrderItemResponseDTO> items = order.getOrderItems()
                .stream()
                .map(item -> new OrderItemResponseDTO(
                        item.getProduct().getId(),
                        item.getProduct().getName(),
                        item.getWeight(),
                        item.getQuantity(),
                        item.getPricePerUnit(),
                        item.getTotalPrice()
                ))
                .toList();


        return new OrderResponseDTO(
                order.getId(),
                order.getCustomer().getId(),
                order.getCustomer().getName(),
                order.getTotalAmount(),
                order.getOrderStatus(),
                order.getPaymentStatus(),
                order.getDeliveryAddress(),
                items
        );
    }
}
