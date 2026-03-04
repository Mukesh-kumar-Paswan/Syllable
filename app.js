// express
const express = require("express");
const app = express();

// mongoose
const mongoose = require("mongoose");

// additional
const path = require("path");
const methodOverride = require("method-override");

// ejs mate
const ejsMate = require("ejs-mate");
const { log } = require("console");

// Setting ejs
app.set("view engine" , "ejs");
app.engine("ejs" , ejsMate)

// setting path for view folder
app.set("views" , path.join(__dirname , "views"));

// Important Middlewares
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname , "public")));

// Express Error 
const ExpressError = require("./Utils/ExpressError");

// Routes 
const questionRoute = require("./routes/question");
const attemptRoute = require("./routes/attempt");

// starting the port
const port = 8080;

app.listen(port , () => {
    console.log(`http://localhost:${port}`);
});

// starting mongoose server
async function main () {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/syllable");
        console.log("Successfully Connected To Mongoose Server");
    } catch (err) {
        console.log("Sorry For The Error Please Try Again : " , err);
    }
};

main();

// Home Page Route
app.get("/" , (req , res) => {
    res.send(`<h1>Thankyou for visiting. Work in progress :) <h1>`);
});

// Pages Routes Start

// Question Page
app.use("/syllable" , questionRoute);

// Attempt Page
// app.use("/syllable/answer" , attemptRoute);


// Pages Routes End

// Error Middleware
app.use((req , res , next) => {
    next(new ExpressError (404 , "Page Not Found"));
});

// Error handling page
app.use((err , req , res ,next) => {
    let {status = 500 , message = "Some Thing went Wrong"} = err;
    res.status(status).render("Pages/error.ejs" , {err : message});
})