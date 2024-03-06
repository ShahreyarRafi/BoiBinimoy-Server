const express = require("express");
const {
  getTotalOrders,
} = require("../../Controller/AdminDashboardController/AdminDashboardController");

const adminDashboardRouters = express.Router();

// get total order ruter
adminDashboardRouters.get("/total-orders", getTotalOrders);

module.exports = adminDashboardRouters;
