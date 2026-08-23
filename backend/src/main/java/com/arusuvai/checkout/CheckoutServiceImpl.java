package com.arusuvai.checkout;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CheckoutServiceImpl implements CheckoutService {

    private final OrderCalculationService orderCalculationService;

    public CheckoutServiceImpl(OrderCalculationService orderCalculationService) {
        this.orderCalculationService = orderCalculationService;
    }

    @Override
    public CheckoutSummaryDTO getCheckoutSummary(CheckoutRequestDTO request) {
        OrderCalculationResult calculationResult = orderCalculationService.calculateCheckout(request);

        List<CheckoutItemDTO> checkoutItems = new ArrayList<>();

        //for each product we are giving the dto field
        for (CalculatedOrderItem calculatedItem :
                calculationResult.getItems()) {

            CheckoutItemDTO item =
                    new CheckoutItemDTO();

            item.setItemType(
                    calculatedItem.getItemType()
            );

            item.setProductId(
                    calculatedItem.getProduct() != null
                            ? calculatedItem.getProduct().getId()
                            : null
            );

            item.setProductName(
                    calculatedItem.getProduct() != null
                            ? calculatedItem.getProduct().getName()
                            : null
            );

            item.setSweetBoxId(
                    calculatedItem.getSweetBox() != null
                            ? calculatedItem.getSweetBox().getId()
                            : null
            );

            item.setSweetBoxName(
                    calculatedItem.getSweetBox() != null
                            ? calculatedItem.getSweetBox().getName()
                            : null
            );

            item.setWeight(
                    calculatedItem.getWeight()
            );

            item.setQuantity(
                    calculatedItem.getQuantity()
            );

            item.setUnitPrice(
                    calculatedItem.getPricePerUnit()
            );

            item.setTotalPrice(
                    calculatedItem.getItemTotal()
            );

            checkoutItems.add(item);
        }

        CheckoutSummaryDTO summary = new CheckoutSummaryDTO();

        summary.setItems(checkoutItems);
        summary.setSubtotal(calculationResult.getSubtotal());
        summary.setDeliveryCharge(calculationResult.getDeliveryCharge());
        summary.setGrandTotal(calculationResult.getGrandTotal());

        return summary;
    }
}