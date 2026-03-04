const mongoose = require("mongoose");
const Question = require("../models/question");
const initData = require("./data.js");

async function main() {
    try {
    await mongoose.connect("mongodb://127.0.0.1:27017/syllable");
    console.log("Successfully Connected to The Mongoose Server");
  } catch (err) {
    console.log(`Sorry for error ${err}`);
  }
}

main();

const seedDB = async () => {
    await Question.deleteMany({});
    await Question.insertMany(initData.data);
    console.log("Successfully Data is Initialised With Sample Data");
};

seedDB();