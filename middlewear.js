const list = require("./modules/listing.js");
const expressError = require("./util/ExpressError.js");
const { listingSchema,reviewSchema } = require("./schema.js");


module.exports.islogin = (req,res,next)=>{
    console.log(req.originalUrl);
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You Need To Login First")
        res.redirect("/listings/login");
    }else{
        next();
    }1
}
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}
module.exports.isOwner =  async (req,res,next)=>{
    let {id} = req.params;
    let listing = await list.findById(id);
    if(!listing.owner._id.equals(res.locals.currUser._id)){
        req.flash("error","You don't have permission");
        return res.redirect(`/listings/${id}`);
    }
    next();
}

module.exports.vaildateListing = (req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new expressError(400, error);
    } else {
        next();
    }
}
module.exports.vaildateReview = ((req, res, next) => {
    // console.log(req.body);
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new expressError(400, error);
    } else {
        next();
    }
})