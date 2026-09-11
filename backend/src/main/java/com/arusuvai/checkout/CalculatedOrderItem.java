package com.arusuvai.checkout;

import com.arusuvai.combopack.ComboPackEntity;
import com.arusuvai.order.OrderItemType;
import com.arusuvai.product.ProductEntity;
import com.arusuvai.sweetbox.SweetBoxEntity;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
public class CalculatedOrderItem {

    private OrderItemType itemType;

    private ProductEntity product;

    private SweetBoxEntity sweetBox;

    private ComboPackEntity comboPack;

    private String weight;

    private Integer quantity;

    private BigDecimal pricePerUnit;

    private BigDecimal itemTotal;
}