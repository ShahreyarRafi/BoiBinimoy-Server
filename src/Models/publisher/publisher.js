const { Schema, default: mongoose } = require("mongoose");

const publisherSchemaa = new Schema({
  publisher: {
    type: String,
    require: true,
  },
  logo: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
});

module.exports = mongoose.model("Publishers", publisherSchemaa);
