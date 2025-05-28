const list = require("../modules/listing")


module.exports.index = async (req, res) => {
    let { id } = req.params;
    let temp = await list.findById(id).populate("reviews").populate("owner");
    if (!temp) {
        req.flash("error", "you request listing is not exist");
        res.redirect("/listings")
    }
    console.log(temp);
    res.render("listings/show.ejs", { temp });
};

module.exports.destroy = async (req, res) => {
    let { id } = req.params;
    req.flash("success", "Delete successfully");
    await list.findByIdAndDelete(id);
    res.redirect("/listings")
};

module.exports.edit = async (req, res) => {
    let { id } = req.params;
    let temp = await list.findById(id);
    if (!temp) {
        req.flash("error", "you request listing is not exist");
        res.redirect("/listings")
    }
    let originalImageUrl = temp.img.url;
    originalImageUrl = originalImageUrl.replace("/upload","/upload/w_250");
    res.render("listings/Edit.ejs", { temp,originalImageUrl });
}

module.exports.newListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let list1 = new list(req.body)
    list1.owner = req.user._id;
    list1.img = { url, filename };
    await list1.save();
    req.flash("success", "new listing added successfully");
    res.redirect("/listings")
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    req.flash("success", "Listing Edit successfully");
    console.log(req.body);
    let list1 = await list.findByIdAndUpdate(id, req.body);
    if (typeof(req.file) !== "undefined") {
        let url = req.file.path;
        let filename = req.file.filename;
        list1.img = { url, filename };
        list1.save();
    }
    res.redirect(`/listings/${id}`);
}