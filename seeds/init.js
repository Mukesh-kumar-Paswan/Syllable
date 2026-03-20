const mongoose = require("mongoose");

const moduleData = require("./moduleData.js");
const {
  teamMeetingQuestions,
  officeCommunicationQuestions,
} = require("./questionData.js");

const Module = require("../models/module.js");
const Question = require("../models/question.js");

const mongoURL = "mongodb://127.0.0.1:27017/versantDB";

async function main() {
  try {
    await mongoose.connect(mongoURL);
    console.log("Connected to MongoDB");

    await initDB();
  } catch (err) {
    console.log(err);
  }
}

const initDB = async () => {
  try {
    await Module.deleteMany({});
    await Question.deleteMany({});

    const officeQuestions = await Question.insertMany(
      officeCommunicationQuestions,
    );
    const teamQuestions = await Question.insertMany(teamMeetingQuestions);
    
    moduleData.modules[0].questions = officeQuestions.map((q) => q._id);
    moduleData.modules[1].questions = teamQuestions.map((q) => q._id);

    // Insert modules
    await Module.insertMany(moduleData.modules);

    console.log("Database initialized successfully");
  } catch (err) {
    console.log(err);
  }
};

main();

// console.log(moduleData.modules);
// console.log(teamMeetingQuestions);
