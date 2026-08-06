package com.arusuvai.admin;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.math.BigDecimal;

@Getter
@AllArgsConstructor
public class AdminSummaryResponseDTO {

    private long totalOrders;

    private BigDecimal totalSales;

    private long totalCustomers;

    private long totalProducts;

}