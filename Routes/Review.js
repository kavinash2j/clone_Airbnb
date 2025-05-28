let express = require("express");
let Route = express.Router({ mergeParams: true });
let review = require("../modules/review.js");
const wrapAsync = require("../util/wrapAsync.js")
const expressError = require("../util/ExpressError.js");
const { listingSchema,reviewSchema } = require("../schema.js");
const list = require("../modules/listing.js");
const {vaildateReview} = require("../middlewear.js"); 
const { deletereview, newReview } = require("../controller/review.js");



// new review
Route.post("/", vaildateReview,wrapAsync(newReview))

// delete review
Route.delete("/:reviewid",deletereview)

module.exports = Route;