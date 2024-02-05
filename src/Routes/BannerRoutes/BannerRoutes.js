const express = require("express");
const {
  deleteBannerData,
  getOneBannerData,
  postBannerData,
  updateBannerData,
  getAllBannerData,
} = require("../../Controller/BannerData/BannerData");
const bannerRouter = express.Router();

// get all banner
bannerRouter.get("/banner", getAllBannerData);

// get a banner by id
bannerRouter.get("/banner/:id", getOneBannerData);

// post a banner
bannerRouter.post("/banner", postBannerData);

// update a banner
bannerRouter.patch("/banner/:id", updateBannerData);

// delete a banner
bannerRouter.delete("/banner/:id", deleteBannerData);

module.exports = bannerRouter;
