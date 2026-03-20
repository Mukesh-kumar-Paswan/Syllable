const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");

const mongoURL = "mongodb://127.0.0.1:27017/versantDB";

// Routes
const moduleRoutes = require("./routes/moduleRoutes");
const questionRoutes = require("./routes/questionRoutes");

// DB Connection
mongoose.connect(mongoURL)
  .then(() => console.log("Mongo Connected"))
  .catch(err => console.log(err));

// Middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routes
app.get("/", (req, res) => {
  res.send("<h1>Welcome to Syllable</h1>");
});

app.use("/vercent", moduleRoutes);
app.use("/questions", questionRoutes);

// Server
app.listen(8080, () => {
  console.log("Server Started");
});