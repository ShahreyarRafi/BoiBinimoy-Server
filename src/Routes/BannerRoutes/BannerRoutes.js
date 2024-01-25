const express = require("express");
const { deleteBannerData, getOneBannerData, postBannerData, updateBannerData, getAllBannerData } = require("../../Controller/BannerData/BannerData");


// get all data
const getAllBannerDataRoute = express.Router();
getAllBannerDataRoute.get("/bannerData",  getAllBannerData);

// get one data
const getOneBannerRoute = express.Router();
getOneBannerRoute.get("/bannerData/:id", getOneBannerData);


// post one banner
const postBannerRote = express.Router();
postBannerRote.post("/bannerData", postBannerData);


// update banner 
const updateBannerRoute = express.Router();
updateBannerRoute.patch("/bannerData/:id", updateBannerData);


// delete banner 
const deleteBannerRoute = express.Router();
deleteBannerRoute.delete("/bannerData/:id", deleteBannerData)



module.exports = { getAllBannerDataRoute, getOneBannerRoute, postBannerRote, updateBannerRoute, deleteBannerRoute}