const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema ({
    title : {
        type : String,
        required : true,
    },
    options : [
        {
            type : String,
            required : true,
        }
    ],
    answer : {
        type : Number,
        required : true,
    },
});

module.exports = mongoose.model("Question" , questionSchema);