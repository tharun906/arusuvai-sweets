package com.arusuvai.admin;


import com.arusuvai.customer.CustomerRepository;
import com.arusuvai.enums.Role;
import com.arusuvai.order.OrderRepository;
import com.arusuvai.product.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminSummaryServiceImpl implements AdminSummaryService {

    private final OrderRepository orderRepository;
    private final CustomerRepository customerRepository;
    private final ProductRepository productRepository;

    public AdminSummaryServiceImpl(OrderRepository orderRepository, CustomerRepository customerRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.customerRepository = customerRepository;
        this.productRepository = productRepository;
    }

    @Override
    public AdminSummaryResponseDTO getSummary() {

        return new AdminSummaryResponseDTO(
                orderRepository.count(),
                orderRepository.getTotalSales(),
                customerRepository.countByRole(Role.CUSTOMER),
                productRepository.count()
        );
    }
}