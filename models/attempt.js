const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attemptSchema = new Schema({
  question: {
    type: Schema.Types.ObjectId,
    ref: "Question",
  },
  selectedAns: {
    type: Number,
    required: true,
  },
  isCorrect: {
    type: Boolean,
  },
});

module.exports = mongoose.model("Attempt", attemptSchema);
