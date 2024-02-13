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

// add a publisher
exports.addPublisher = async (req, res) => {
  try {
    const updatedPublisher = await publisher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedPublisher) {
      res.status(404).json({ error: "Publisher not found" });
    } else {
      res.json(updatedPublisher);
    }
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};
