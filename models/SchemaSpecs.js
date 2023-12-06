const mongoose = require("mongoose");

const specsSchema = mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  date: { type: String, required: true },
  title: { type: String, required: true },
  guitarPick: { type: Array, required: true },
  content: { type: String, required: true },
  selectedRecord: { type: String, default: "" },
  Deadline: { type: String, required: true },
  Situation: { type: String, required: true },
});

module.exports = mongoose.model("specs", specsSchema);
