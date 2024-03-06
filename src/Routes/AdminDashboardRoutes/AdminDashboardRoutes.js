const express = require("express");
const {
  getTotalOrders,
  getTotalSales,
  getLowStockBooks,
  getRecentOrderedBooks,
  getTopSellingBooks,
  getTopBuyingCustomers,
  getTopSellingWriters,
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

// get 10 top  selling books router
adminDashboardRouters.get("/top-selling-books", getTopSellingBooks);

// get 10 top buying  custommer  router
adminDashboardRouters.get("/top-buying-customers", getTopBuyingCustomers);

module.exports = adminDashboardRouters;
