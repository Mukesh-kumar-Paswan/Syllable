const Question = require("../models/question");
const Attempt = require("../models/attempt.js");
const wrapAsync = require("../Utils/wrapAsync.js");

module.exports.index = wrapAsync(async (req, res) => {
  const allQuestion = await Question.find({});
  res.render("syllable/index.ejs", { allQuestion });
});

module.exports.submit = wrapAsync(async (req, res) => {
  // 1. Get the answers from the form (submitted as an object)
  const submittedAnswers = req.body.answers;
  const results = [];

  // 2. Iterate through each question answered
  for (const [questionId, selectedValue] of Object.entries(submittedAnswers)) {
    const question = await Question.findById(questionId);

    // Compare index (ensure both are Numbers)
    const isCorrect = question.answer === parseInt(selectedValue);

    // 3. Create the Attempt using your Schema's exact field names
    const attempt = new Attempt({
      question: questionId,
      selectedAns: parseInt(selectedValue), // MATCHED TO YOUR SCHEMA
      isCorrect: isCorrect,
    });

    await attempt.save();

    results.push({
      title: question.title,
      isCorrect: isCorrect,
      correctAnswer: question.options[question.answer],
      userAnswer: question.options[selectedValue],
    });
  }

  // 4. Calculate score and render result
  const score = results.filter((r) => r.isCorrect).length;
  res.render("syllable/answer.ejs", { results, score, total: results.length });
});
