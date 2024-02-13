const Writers = require("../../Models/writer/writer");

// get all writer
exports.getAllWriter = async (req, res) => {
  try {
    const writers = await Writers.find();
    res.json(writers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// get a writer by id
exports.getWriterById = async (req, res) => {
  try {
    const Writers = await Writers.findById(req.params.id);
    if (!Writers) {
      res.status(404).json({ error: "writer not found" });
    } else {
      res.json(Writers);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// add a writer
exports.addWriter = async (req, res) => {
  const newWriter = new Writers(req.body);
  try {
    const saveWriter = await newWriter.save();
    res.status(201).json(saveWriter);
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
