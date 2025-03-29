let mongoose = require("mongoose");
let review = require("./review.js")

const listschema = mongoose.Schema({
    title:{
        type:String,
        require:true,
    },
    desc:String,
    img: {
        type: String,
        default: "/image/default.jpg",
        set: (v) => (v === "" ? "/image/default.jpg" : v),
    },
    price : Number,
    location : String,
    country : String,
    reviews:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"review"
        }
    ]
})

listschema.post("findOneAndDelete",async(listing)=>{
    if(listing){
        let delet = await review.deleteMany({_id:{$in: listing.reviews}});
        console.log(delet)
    }
})
let list = mongoose.model("list",listschema);

module.exports = list;