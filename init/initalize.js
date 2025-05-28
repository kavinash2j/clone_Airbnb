const mongoose = require("mongoose");
const lists = require("../modules/listing.js");
let initdata = require("./data.js");

async function main() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}
main().then(()=>{
    console.log("connection successfully");
}).catch((err)=>{
    console.log(err);
})

async function init(){
    await lists.deleteMany();
    initdata = initdata.map((obj) => ({...obj , owner : "67dedbdb0754863a3a9a257c"}));
    await lists.insertMany(initdata);
    console.log("sucessfully")
}

init();
