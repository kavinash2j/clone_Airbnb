const list = require("../modules/listing.js");
let review = require("../modules/review.js");

module.exports.deletereview = async(req,res)=>{
    let {id,reviewid} = req.params;
    let deltereview = await review.findByIdAndDelete(reviewid);
    console.log(deltereview,"   ");
    req.flash("success","Delete successfully");
    let deletelising = await list.findByIdAndUpdate(id,{$pull:{reviews:reviewid}});
    console.log(deletelising);
    res.redirect(`/listings/${id}`)
}
module.exports.newReview = async (req, res) => {
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
}