package com.arusuvai.order;

import com.arusuvai.customer.CustomerEntity;
import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.product.ProductEntity;
import com.arusuvai.product.ProductRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;


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
    public OrderResponseDTO placeOrder(OrderRequestDTO request){
        CustomerEntity customer = customerRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        OrderEntity order =new OrderEntity();
        order.setCustomer(customer);
        order.setOrderStatus(OrderStatus.PENDING);
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setDeliveryAddress(customer.getAddress());
        order.setTotalAmount(BigDecimal.ZERO);
        order = orderRepository.save(order);

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











        }




    }
























}
