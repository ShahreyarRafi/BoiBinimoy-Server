const writer = require("../../Models/writer/writer");

// get all writer
exports.getAllWriter = async (req, res) => {
  try {
    const writers = await writer.find();
    res.json(writers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a writer by id
exports.getWriterById = async (req, res) => {
  try {
    const writer = await writer.findById(req.params.id);
    if (!writer) {
      res.status(404).json({ error: "writer not found" });
    } else {
      res.json(writer);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
