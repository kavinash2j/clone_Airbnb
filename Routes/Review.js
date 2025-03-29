let express = require("express");
let Route = express.Router({ mergeParams: true });
let review = require("../modules/review.js");
const wrapAsync = require("../util/wrapAsync.js")
const expressError = require("../util/ExpressError.js");
const { listingSchema,reviewSchema } = require("../schema.js");
const list = require("../modules/listing.js");



let vaildateReview = ((req, res, next) => {
    // console.log(req.body);
    let { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new expressError(400, error);
    } else {
        next();
    }
})

Route.post("/", vaildateReview,wrapAsync(async (req, res) => {
    // console.log(req.params)
    let listing = await list.findById(req.params.id);
    let data = req.body.review;
    console.log(data.Comment);
    console.log(data.rating);
    let data_add = new review({
        Comment: data.Comment,
        rating: data.rating
    });
    await data_add.save();
    let datapush = await listing.reviews.push(data_add);

    await listing.save();
    req.flash("success","new review added successfully");
    res.redirect(`/listings/${listing._id}`)
}))

Route.delete("/:reviewid",async(req,res)=>{
    let {id,reviewid} = req.params;
    let deltereview = await review.findByIdAndDelete(reviewid);
    console.log(deltereview,"   ");
    req.flash("success","Delete successfully");
    let deletelising = await list.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    console.log(deletelising);
    res.redirect(`/listings/${id}`)
})

module.exports = Route;