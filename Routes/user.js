let express = require("express");
let Route  = express.Router();
let User = require("../modules/user.js")
let wrapAsync = require("../util/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middlewear.js");

Route.get("/listings/signup", async (req, res) => {
    res.render("user/signup.ejs");
})
Route.post("/listings/signup",wrapAsync(async(req,res)=>{
    try {
        let {username , email , password} = req.body;
        // console.log(username,email,password);
        let fakeruser = new User({
            email:email,
            username:username,
        });
        let newuser = await User.register(fakeruser,password);
        req.login(newuser,(err)=>{
            if(err){
                next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings")
        })
    } catch (e) {
        req.flash("error",e.message);
        res.redirect("/listings/signup");
    }
   
}))
Route.get("/listings/login",(req,res)=>{
    res.render("user/login.ejs");
})
Route.post("/listings/login",saveRedirectUrl,passport.authenticate('local',{failureRedirect:"/listings/login",failureFlash:true}),wrapAsync(async(req,res)=>{
    // let {username,passsword} = req.body;
    // res.send("welcome to wander lust your are loged in! ")
    req.flash("success","welcome to wander-lust")
    console.log("by the hello " ,res.locals.redirectUrl); 
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}))
Route.get("/listings/logout",(req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out");
        res.redirect("/listings");
    })
})
module.exports = Route;