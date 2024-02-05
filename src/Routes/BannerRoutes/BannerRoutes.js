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
bannerRouter.get("/bannerData", getAllBannerData);

// get a banner by id
bannerRouter.get("/bannerData/:id", getOneBannerData);

// post a banner
bannerRouter.post("/bannerData", postBannerData);

// update a banner
bannerRouter.patch("/bannerData/:id", updateBannerData);

// delete a banner
bannerRouter.delete("/bannerData/:id", deleteBannerData);

module.exports = bannerRouter;
