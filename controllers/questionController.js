const Question = require("../models/question");
const Module = require("../models/module");

// NEW FORM
module.exports.renderNewForm = (req, res) => {
  const { moduleId } = req.params;
  res.render("questions/new", { moduleId });
};

// CREATE
module.exports.createQuestion = async (req, res) => {
  const { moduleId } = req.params;

  console.log(req.body);

  let title, options, answer;

  // ✅ Case 1: Nested (correct)
  if (req.body.question) {
    title = req.body.question.title;
    options = req.body.question.options;
    answer = req.body.question.answer;
  }

  // ✅ Case 2: Flat (your current case)
  else {
    title = req.body["question.title"];
    options = req.body["question.options"];
    answer = req.body["question.answer"];
  }

  // ensure array
  if (!Array.isArray(options)) {
    options = [options];
  }

  answer = parseInt(answer);

  if (!title || options.length < 4 || isNaN(answer)) {
    return res.send("Invalid data");
  }

  const question = new Question({
    title,
    options,
    answer
  });

  await question.save();

  await Module.findByIdAndUpdate(moduleId, {
    $push: { questions: question._id }
  });

  res.redirect(`/vercent/${moduleId}`);
};

// EDIT FORM
module.exports.renderEditForm = async (req, res) => {
  const { id } = req.params;
  const question = await Question.findById(id);
  res.render("questions/edit", { question });
};

// UPDATE
module.exports.updateQuestion = async (req, res) => {
  const { id } = req.params; // question id

  let title, options, answer;

  if (req.body.question) {
    title = req.body.question.title;
    options = req.body.question.options;
    answer = req.body.question.answer;
  } else {
    title = req.body["question.title"];
    options = req.body["question.options"];
    answer = req.body["question.answer"];
  }

  if (!Array.isArray(options)) {
    options = [options];
  }

  answer = parseInt(answer);

  await Question.findByIdAndUpdate(id, {
    title,
    options,
    answer
  });

  // ✅ IMPORTANT: find module that contains this question
  const module = await Module.findOne({ questions: id });

  res.redirect(`/vercent/${module._id}`);
};
// DELETE
module.exports.deleteQuestion = async (req, res) => {
  const { id, moduleId } = req.params;

  await Question.findByIdAndDelete(id);

  await Module.findByIdAndUpdate(moduleId, {
    $pull: { questions: id }
  });

  res.redirect(`/vercent/${moduleId}`);
};