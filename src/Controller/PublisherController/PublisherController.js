const publisher = require("../../Models/publisher/publisher");

exports.getAllPublisher = async (req, res) => {
  try {
    const allPublisher = await publisher.find();
    res.json(allPublisher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
