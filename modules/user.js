const { required } = require("joi");
let mongoose = require("mongoose");
const { type } = require("os");
const passportLocalMongoose = require("passport-local-mongoose");

let userschema = mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
})

userschema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User",userschema);
  

