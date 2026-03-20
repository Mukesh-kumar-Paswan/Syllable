const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const attemptSchema = new Schema(
  {
    answers: [
      {
        question: {
          type: Schema.Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedAnswer: {
          type: Number,
          required: true,
        },
        isCorrect: {
          type: Boolean,
        },
      },
    ],

    score: {
      type: Number,
      default: 0,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    module: {
      type: Schema.Types.ObjectId,
      ref: "Module",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Attempt", attemptSchema);
