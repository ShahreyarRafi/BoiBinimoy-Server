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
    const writer = await Writers.findById(req.params.id);
    if (!writer) {
      res.status(404).json({ error: "writer not found" });
    } else {
      res.json(writer);
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

// update writer
exports.updateWriter = async (req, res) => {
  try {
    const updatedWriter = await Writers.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedWriter) {
      res.status(404).json({ error: "Wriber not found" });
    } else {
      res.json(updatedWriter);
    }
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

// delete a writer
exports.deleteWriter = async (req, res) => {
  try {
    const deleteWriter = await Writers.findByIdAndDelete(req.params.id);
    if (!deleteWriter) {
      res.status(404).json({ error: "Writer not found" });
    } else {
      res.json({ message: "Writer Deleted Successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
};
