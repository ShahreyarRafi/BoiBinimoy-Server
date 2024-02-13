const writer = require("../../Models/writer/writer");

exports.getAllWriter = async (req, res) => {
  try {
    const writers = await writer.find();
    res.json(writers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
