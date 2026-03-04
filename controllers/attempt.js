const Attempt = require("../models/attempt");
const Question = require("../models/question");
const wrapAsync = require("../Utils/wrapAsync");

module.exports.submit = wrapAsync(async (req, res) => {
  const { questionId, selectedAnswer } = req.body;

  const question = await Question.findById(questionId);
  const isCorrect = question.answer === selectedAnswer;
  const attempt = new Attempt({
    question: questionId,
    selectedAnswer,
    isCorrect,
  });

  await attempt.save();
  res.render("answer.ejs");
});
