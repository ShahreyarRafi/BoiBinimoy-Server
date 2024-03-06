const express = require("express");
const {
  getTotalOrders,
  getTotalSales,
} = require("../../Controller/AdminDashboardController/AdminDashboardController");

const adminDashboardRouters = express.Router();

// get total order router
adminDashboardRouters.get("/total-orders", getTotalOrders);

// get total sells router
adminDashboardRouters.get("/total-sales", getTotalSales);

module.exports = adminDashboardRouters;
