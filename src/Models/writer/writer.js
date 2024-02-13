const { Schema, default: mongoose } = require("mongoose");

const writerSchema = new Schema({
  writer_name: {
    type: String,
    require: true,
  },
  profile: {
    type: String,
    require: true,
  },
  bio: {
    type: String,
    require: true,
  },
  birth: {
    type: String,
    require: true,
  },
  death: {
    type: String,
    require: true,
  },
  follower: {
    type: Number,
  },
});

module.exports = mongoose.model("Writer", writerSchema);
