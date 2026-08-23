package com.arusuvai.sweetbox;

import com.arusuvai.exception.ResourceNotFoundException;
import com.arusuvai.product.ProductEntity;
import com.arusuvai.product.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Service
public class SweetBoxAdminServiceImpl implements SweetBoxAdminService {

    private final SweetBoxRepository sweetBoxRepository;
    private final ProductRepository productRepository;

    public SweetBoxAdminServiceImpl(
            SweetBoxRepository sweetBoxRepository,
            ProductRepository productRepository
    ) {
        this.sweetBoxRepository = sweetBoxRepository;
        this.productRepository = productRepository;
    }

    @Override
    @Transactional
    public SweetBoxResponseDTO create(
            SweetBoxRequestDTO request
    ) {

        SweetBoxEntity sweetBox = new SweetBoxEntity();

        updateSweetBoxDetails(sweetBox, request);

        sweetBox = sweetBoxRepository.save(sweetBox);

        return mapToResponse(sweetBox);
    }

    @Override
    @Transactional
    public SweetBoxResponseDTO update(
            Long sweetBoxId,
            SweetBoxRequestDTO request
    ) {

        SweetBoxEntity sweetBox =
                sweetBoxRepository.findById(sweetBoxId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Sweet box not found"
                                ));

        sweetBox.getItems().clear();

        updateSweetBoxDetails(sweetBox, request);

        sweetBox = sweetBoxRepository.save(sweetBox);

        return mapToResponse(sweetBox);
    }

    @Override
    @Transactional
    public void delete(Long sweetBoxId) {

        SweetBoxEntity sweetBox =
                sweetBoxRepository.findById(sweetBoxId)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Sweet box not found"
                                ));

        sweetBoxRepository.delete(sweetBox);
    }

    @Override
    public List<SweetBoxResponseDTO> getAll() {

        return sweetBoxRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private void updateSweetBoxDetails(
            SweetBoxEntity sweetBox,
            SweetBoxRequestDTO request
    ) {

        sweetBox.setName(request.getName());
        sweetBox.setTotalWeight(request.getTotalWeight());
        sweetBox.setPrice(request.getPrice());
        sweetBox.setImageUrl(request.getImageUrl());
        sweetBox.setActive(request.getActive());

        for (SweetBoxItemRequestDTO itemRequest :
                request.getItems()) {

            ProductEntity product =
                    productRepository.findById(
                            itemRequest.getProductId()
                    ).orElseThrow(() ->
                            new ResourceNotFoundException(
                                    "Product not found: "
                                            + itemRequest.getProductId()
                            ));

            SweetBoxItemEntity item =
                    new SweetBoxItemEntity();

            item.setSweetBox(sweetBox);
            item.setProduct(product);
            item.setQuantity(itemRequest.getQuantity());

            sweetBox.getItems().add(item);
        }
    }

    private SweetBoxResponseDTO mapToResponse(
            SweetBoxEntity sweetBox
    ) {

        List<SweetBoxItemResponseDTO> items =
                sweetBox.getItems()
                        .stream()
                        .map(item ->
                                new SweetBoxItemResponseDTO(
                                        item.getProduct().getId(),
                                        item.getProduct().getName(),
                                        item.getQuantity()
                                )
                        )
                        .toList();

        return new SweetBoxResponseDTO(
                sweetBox.getId(),
                sweetBox.getName(),
                sweetBox.getTotalWeight(),
                sweetBox.getPrice(),
                sweetBox.getImageUrl(),
                sweetBox.isActive(),
                items
        );
    }
}