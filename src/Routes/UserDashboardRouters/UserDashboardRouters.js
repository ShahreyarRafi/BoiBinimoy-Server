const express = require("express");
const {
  getMyTotalOrders,
} = require("../../Controller/UserDashboardController/UserDashboardController");
const userDashboardRouters = express.Router();

userDashboardRouters.get("/:email/total-orders", getMyTotalOrders);

module.exports = userDashboardRouters;
