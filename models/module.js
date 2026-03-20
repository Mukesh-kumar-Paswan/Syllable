const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Question = require("./question.js");

const moduleSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  img: {
    type: String,
    default: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
    set: (v) =>
      v === ""
        ? "https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
        : v,
  },
  ProblemStatement: {
    type: String,
    required: true,
  },
  questions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

moduleSchema.post("findOneAndDelete", async (module) => {
  if (module) {
    await Question.deleteMany({ _id: { $in: module.questions } });
  }
});

module.exports = mongoose.model("Module", moduleSchema);
