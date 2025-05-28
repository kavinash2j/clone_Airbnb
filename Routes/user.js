let express = require("express");
let Route  = express.Router();
let User = require("../modules/user.js")
let wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewear.js");
const {  midlogin, midsignup, logout } = require("../controller/user.js");

Route.route("/listings/signup").get( async (req, res) => {
    res.render("user/signup.ejs");
})
.post(wrapAsync(midsignup))
// login redirect

Route.route("/listings/login")
.get((req,res)=>{
    res.render("user/login.ejs");
})

.post(saveRedirectUrl,
    passport.authenticate('local',{failureRedirect:"/listings/login",failureFlash:true})
    ,wrapAsync(midlogin))
// logout 

Route.get("/listings/logout",logout)
module.exports = Route;