let mongoose = require("mongoose");
let review = require("./review.js");
const { type } = require("os");
const { ref } = require("joi");

const listschema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    desc:String,
    img: {
        url:String,
        filename:String,
    },
    price : Number,
    location : String,
    country : String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"review"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
})

listschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        let delet = await review.deleteMany({_id:{$in: listing.reviews}});
        console.log(delet)
    }
})
let list = mongoose.model("list",listschema);

module.exports = list;