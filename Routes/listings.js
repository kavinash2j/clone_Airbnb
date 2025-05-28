let express = require("express");
let Route = express.Router();
const wrapAsync = require("../util/wrapAsync.js")
const expressError = require("../util/ExpressError.js");
const { listingSchema,reviewSchema } = require("../schema.js");
const list = require("../modules/listing.js");
const flash = require("connect-flash");
const {islogin,isOwner,vaildateListing} = require("../middlewear.js");
const {index,edit, destroy, newListing, renderEditForm} = require("../controller/listings.js")
const multer = require("multer");
const {storage} =  require("../cloudConfig.js");
const upload = multer({storage})
 
Route.route('/').get(wrapAsync(async (req, res) => {
    let arr = await list.find();
    res.render("listings/index.ejs", { arr })
}))
.post(upload.single('listing[image]'),vaildateListing, wrapAsync(newListing))
 


// new listings
Route.get("/new",islogin,(req, res) => {
    res.render("listings/new.ejs");
})

Route.route("/:id")
.get(wrapAsync(index))
.delete(islogin,isOwner,wrapAsync(destroy))
.put(isOwner,upload.single('img'),wrapAsync(renderEditForm))

//edit route
Route.get("/:id/edit", islogin,isOwner,wrapAsync(edit))

module.exports = Route;