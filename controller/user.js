let User = require("../modules/user.js")

module.exports.midsignup  = async(req,res)=>{
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
   
}
module.exports.midlogin = async(req,res)=>{
    // let {username,passsword} = req.body;
    // res.send("welcome to wander lust your are loged in! ")
    req.flash("success","welcome to wander-lust")
    console.log("by the hello " ,res.locals.redirectUrl); 
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","logged you out");
        res.redirect("/listings");
    })
}