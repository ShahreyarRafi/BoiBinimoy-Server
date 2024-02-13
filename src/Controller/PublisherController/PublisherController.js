const publisher = require("../../Models/publisher/publisher");

// get all publisher
exports.getAllPublisher = async (req, res) => {
  try {
    const allPublisher = await publisher.find();
    res.json(allPublisher);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a publisher
exports.getPublisherById = async (req, res) => {
  try {
    const aPublisher = await publisher.findById(req.params.id);
    if (!aPublisher) {
      res.status(404).json({ error: "Publisher not found" });
    } else {
      res.jso(aPublisher);
    }
  } catch (error) {
    res.status(500).josn({ error: err.message });
  }
};
