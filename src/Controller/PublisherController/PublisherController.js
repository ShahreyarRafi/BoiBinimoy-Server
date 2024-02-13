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
      res.json(aPublisher);
    }
  } catch (error) {
    res.status(500).josn({ error: err.message });
  }
};

// add a publisher
exports.addPublisher = async (req, res) => {
  const newPublisher = new publisher(req.body);
  try {
    const savePublisher = await newPublisher.save();
    res.status(201).json(savePublisher);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};

// update a publisher
exports.updatePublisher = async (req, res) => {
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

// delete a publisher
exports.deletePublisher = async (req, res) => {
  try {
    const deletedPublisher = await publisher.findByIdAndDelete(req.params.id);
    if (!deletedPublisher) {
      res.status(404).json({ error: "Publisher not found" });
    } else {
      res.json({ message: "Publisher Deleted Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
