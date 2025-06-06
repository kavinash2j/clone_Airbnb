const joi = require("joi");
const review = require("./modules/review");

module.exports.listingSchema = joi.object({
        title:joi.string().required(),
        desc:joi.string().required(),
        location:joi.string().required(),
        country : joi.string().required(),
        price:joi.number().required(),
        img:joi.string().allow("",null),
});

module.exports.reviewSchema = joi.object({
        review : joi.object({
                rating:joi.number().required().min(1).max(5),
                Comment:joi.string().required(),
        }).required()
})