const Module = require("../models/module");
const Question = require("../models/question");
const Attempt = require("../models/attempt");

const index = async (req, res) => {
  const modules = await Module.find({});
  res.render("vercent/index", { modules });
};

const renderNewForm = (req, res) => {
  res.render("vercent/new");
};

const createModule = async (req, res) => {
  const newModule = new Module(req.body);
  await newModule.save();
  res.redirect("/vercent");
};

const showModule = async (req, res) => {
  const module = await Module.findById(req.params.id).populate("questions");
  res.render("vercent/show", { module });
};

const renderEditForm = async (req, res) => {
  const module = await Module.findById(req.params.id).populate("questions");
  res.render("vercent/edit", { module });
};

const updateModule = async (req, res) => {
  await Module.findByIdAndUpdate(req.params.id, req.body);
  res.redirect(`/vercent/${req.params.id}`);
};

const deleteModule = async (req, res) => {
  await Module.findByIdAndDelete(req.params.id);
  res.redirect("/vercent");
};

const submitAttempt = async (req, res) => {
  try {
    const { answers, moduleId } = req.body;

    if (!answers || answers.length === 0) {
      return res.send("No answers submitted");
    }

    // ✅ Remove invalid IDs
    const questionIds = answers
      .map(a => a.question)
      .filter(id => id && id !== "");

    const questions = await Question.find({
      _id: { $in: questionIds }
    });

    const questionMap = {};
    questions.forEach(q => {
      questionMap[q._id] = q;
    });

    let score = 0;
    const evaluatedAnswers = [];

    for (let ans of answers) {

      if (!ans.question) continue;

      const question = questionMap[ans.question];
      if (!question) continue;

      const selected = parseInt(ans.selectedAnswer);
      const correct = question.answer;

      const isCorrect = selected === correct;

      if (isCorrect) score++;

      evaluatedAnswers.push({
        question,
        selectedAnswer: selected,
        correctAnswer: correct,
        isCorrect
      });
    }

    const attempt = new Attempt({
      answers: evaluatedAnswers.map(a => ({
        question: a.question._id,
        selectedAnswer: a.selectedAnswer,
        isCorrect: a.isCorrect
      })),
      score,
      totalQuestions: evaluatedAnswers.length,
      module: moduleId
    });

    await attempt.save();

    res.render("vercent/result", {
      score,
      total: evaluatedAnswers.length,
      percentage: (score / evaluatedAnswers.length) * 100,
      evaluatedAnswers
    });

  } catch (err) {
    console.log(err);
    res.status(500).send("Error evaluating attempt");
  }
};

module.exports = {
  index,
  renderNewForm,
  createModule,
  showModule,
  renderEditForm,
  updateModule,
  deleteModule,
  submitAttempt,
};