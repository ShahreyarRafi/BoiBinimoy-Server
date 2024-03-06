const express = require("express");
const {
  getTotalOrders,
  getTotalSales,
  getLowStockBooks,
  getRecentOrderedBooks,
} = require("../../Controller/AdminDashboardController/AdminDashboardController");

const adminDashboardRouters = express.Router();

// get total order router
adminDashboardRouters.get("/total-orders", getTotalOrders);

// get total sells router
adminDashboardRouters.get("/total-sales", getTotalSales);

// get low stokes books router
adminDashboardRouters.get("/low-stock-books", getLowStockBooks);

// get 5 recent order books router
adminDashboardRouters.get("/recent-ordered-books", getRecentOrderedBooks);

module.exports = adminDashboardRouters;
