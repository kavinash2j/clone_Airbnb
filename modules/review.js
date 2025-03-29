const { date } = require("joi");
let mongoose = require("mongoose");
const { type } = require("os");

let reviewschema = new mongoose.Schema({
    Comment:String,
    rating:{
        type:Number,
        min:1,
        max:5
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

let review = mongoose.model("review",reviewschema);

module.exports = review;