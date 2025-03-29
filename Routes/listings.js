let express = require("express");
let Route = express.Router();
const wrapAsync = require("../util/wrapAsync.js")
const expressError = require("../util/ExpressError.js");
const { listingSchema,reviewSchema } = require("../schema.js");
const list = require("../modules/listing.js");
const flash = require("connect-flash");
const {islogin} = require("../middlewear.js");
 
let vaildateListing = ((req, res, next) => {
    let { error } = listingSchema.validate(req.body);
    if (error) {
        throw new expressError(400, error);
    } else {
        next();
    }
})

Route.get("/", wrapAsync(async (req, res) => {
    let arr = await list.find();
    res.render("listings/index.ejs", { arr })
}))

// new listings
Route.get("/new",islogin,(req, res) => {
    res.render("listings/new.ejs");
})

//see listing
Route.get("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    let temp = await list.findById(id).populate("reviews");
    if(!temp){
        req.flash("error","you request listing is not exist");
        res.redirect("/listings")
    }
    res.render("listings/show.ejs", { temp });
}))

//edit route
Route.get("/:id/edit", islogin,wrapAsync(async (req, res) => {
    let { id } = req.params;
    let temp = await list.findById(id);
    if(!temp){
        req.flash("error","you request listing is not exist");
        res.redirect("/listings")
    }
    res.render("listings/Edit.ejs", { temp });
}))

// delete route
Route.delete("/:id", islogin,wrapAsync(async (req, res) => {
    let { id } = req.params;
    req.flash("success","Delete successfully");
    await list.findByIdAndDelete(id);
    res.redirect("/listings")
}))


Route.post("/", vaildateListing, wrapAsync(async (req, res, next) => {
    let list1 = new list(req.body)
    await list1.save();
    req.flash("success","new listing added successfully");
    res.redirect("/listings")
}))


Route.put("/:id", wrapAsync(async (req, res) => {
    let { id } = req.params;
    req.flash("success","new listing added successfully");
    await list.findByIdAndUpdate(id, req.body);
    res.redirect(`/listings/${id}`);
}))

module.exports = Route;