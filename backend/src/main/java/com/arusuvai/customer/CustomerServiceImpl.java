package com.arusuvai.customer;

import com.arusuvai.auth.dto.response.AuthResponse;
import com.arusuvai.auth.dto.response.LoginResponse;
import com.arusuvai.enums.Role;
import com.arusuvai.exception.BusinessException;
import com.arusuvai.exception.ResourceNotFoundException;
import com.arusuvai.product.ProductEntity;
import com.arusuvai.security.JwtService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final CustomerIdentityRepository customerIdentityRepository;
    private final JwtService jwtService;

    public CustomerServiceImpl(
            CustomerRepository customerRepository,
            CustomerIdentityRepository customerIdentityRepository,
            JwtService jwtService
    ) {
        this.customerRepository = customerRepository;
        this.customerIdentityRepository = customerIdentityRepository;
        this.jwtService = jwtService;
    }

    @Override
    public CustomerResponseDTO createCustomer(CustomerRequestDTO request) {

        CustomerEntity customer = new CustomerEntity();

        customer.setName(request.getName());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setEmail(request.getEmail());
        customer.setDoorNo(request.getDoorNo());
        customer.setAddressLine1(request.getAddressLine1());
        customer.setAddressLine2(request.getAddressLine2());
        customer.setLandmark(request.getLandmark());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPincode(request.getPincode());

        CustomerEntity saved = customerRepository.save(customer);
        return mapToResponse(saved);
    }

    @Override
    public List<CustomerResponseDTO> getAllCustomers() {

        return customerRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    public CustomerResponseDTO getCustomerById(Long id) {

        CustomerEntity customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        return mapToResponse(customer);
    }

    @Override
    public CustomerResponseDTO updateCustomer(Long id, CustomerRequestDTO request) {

        CustomerEntity customer = customerRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Customer not found"));

        customer.setName(request.getName());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setEmail(request.getEmail());
        customer.setDoorNo(request.getDoorNo());
        customer.setAddressLine1(request.getAddressLine1());
        customer.setAddressLine2(request.getAddressLine2());
        customer.setLandmark(request.getLandmark());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPincode(request.getPincode());

        CustomerEntity updated = customerRepository.save(customer);
        return mapToResponse(updated);
    }

    private CustomerResponseDTO mapToResponse(CustomerEntity customer) {

        return new CustomerResponseDTO(
                customer.getId(),
                customer.getName(),
                customer.getPhoneNumber(),
                customer.getEmail(),
                customer.getDoorNo(),
                customer.getAddressLine1(),
                customer.getAddressLine2(),
                customer.getLandmark(),
                customer.getCity(),
                customer.getState(),
                customer.getPincode()
        );
    }

    @Override
    public AuthResponse completeProfile(
            String googleSubject,
            CustomerRequestDTO request
    ) {

        CustomerIdentityEntity identity =
                customerIdentityRepository
                        .findByProviderAndProviderSubject(
                                "GOOGLE",
                                googleSubject
                        )
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Google identity not found"
                                )
                        );

        if (identity.getCustomer() != null) {
            throw new BusinessException(
                    "Customer profile already completed"
            );
        }

        CustomerEntity customer = new CustomerEntity();

        customer.setName(request.getName());
        customer.setPhoneNumber(request.getPhoneNumber());
        customer.setEmail(request.getEmail());
        customer.setDoorNo(request.getDoorNo());
        customer.setAddressLine1(request.getAddressLine1());
        customer.setAddressLine2(request.getAddressLine2());
        customer.setLandmark(request.getLandmark());
        customer.setCity(request.getCity());
        customer.setState(request.getState());
        customer.setPincode(request.getPincode());
        customer.setRole(Role.CUSTOMER);
        customer.setActive(true);

        CustomerEntity savedCustomer =
                customerRepository.save(customer);

        identity.setCustomer(savedCustomer);

        customerIdentityRepository.save(identity);

        LoginResponse loginResponse =
                new LoginResponse(
                        savedCustomer.getId(),
                        savedCustomer.getName(),
                        savedCustomer.getPhoneNumber(),
                        savedCustomer.getEmail(),
                        savedCustomer.getDoorNo(),
                        savedCustomer.getAddressLine1(),
                        savedCustomer.getAddressLine2(),
                        savedCustomer.getLandmark(),
                        savedCustomer.getCity(),
                        savedCustomer.getState(),
                        savedCustomer.getPincode(),
                        savedCustomer.getLatitude(),
                        savedCustomer.getLongitude(),
                        savedCustomer.getRole()
                );

        String token =
                jwtService.generateToken(
                        savedCustomer.getId(),
                        savedCustomer.getRole().name()
                );

        return new AuthResponse(
                true,
                "Profile completed successfully",
                true,
                loginResponse,
                token
        );
    }
}
