const express = require("express");
const {
  getTotalOrders,
  getTotalSales,
  getLowStockBooks,
} = require("../../Controller/AdminDashboardController/AdminDashboardController");

const adminDashboardRouters = express.Router();

// get total order router
adminDashboardRouters.get("/total-orders", getTotalOrders);

// get total sells router
adminDashboardRouters.get("/total-sales", getTotalSales);

// get low stokes books router
adminDashboardRouters.get("/low-stock-books", getLowStockBooks);

module.exports = adminDashboardRouters;
