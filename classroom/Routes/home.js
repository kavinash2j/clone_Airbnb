let express = require("express");
let Routes = express.Router();

Routes.get("/",(req,res)=>{
    res.send("This is the Home Page")
})

module.exports = Routes;