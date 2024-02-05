const BannerData = require("../../Models/bannerData/BannerData");


// getting all banner data
const getAllBannerData = async(req, res) => {
    try{
        const result = await BannerData.find();
        res.send(result)

    } catch (error) {
        console.error("Error getting banner data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};

// post a banner data
const postBannerData = async(req, res) => {
    try{
        const banner = req.body;
        const newBanner = new BannerData(banner);
        const result = await newBanner.save();
        res.send(result)

    } catch (error) {
        console.error("Error post banner data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};
// get one banner data
const getOneBannerData = async(req, res) => {
    try{
        const id =  req.params.id;
        const result = await BannerData.findById(id);
        res.send(result)

    } catch (error) {
        console.error("Error getting banner data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};

// update  banner data
const updateBannerData = async(req, res) => {
    try{
        const updateBannerData = await BannerData.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
          );
          if (!updateBannerData) {
            res.status(404).json({ error: "Book not found" });
          } else {
            res.send(updateBannerData);
          }
    } catch (error) {
        console.error("Error updating banner data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};

// delete  banner data
const deleteBannerData = async(req, res) => {
    try{
        const deleteBanner = await BannerData.findByIdAndDelete(req.params.id);
          if (!deleteBanner) {
            res.status(404).json({ error: "Book not found" });
          } else {
            res.send(deleteBanner);
          }
    } catch (error) {
        console.error("Error updating banner data:", error);
        res.status(500).json({ message: "Internal server error" });
      }
};



module.exports = { getAllBannerData, postBannerData, getOneBannerData, updateBannerData, deleteBannerData }