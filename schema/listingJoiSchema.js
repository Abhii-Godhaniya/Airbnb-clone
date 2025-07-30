const Joi = require("joi");
const listingJoiSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required().messages({
      "string.empty": "Title is required.",
    }),

    description: Joi.string().required().messages({
      "string.empty": "Description is required.",
    }),

    image: Joi.object({
      filename: Joi.string().optional().allow(""),
      url: Joi.string().uri().optional().allow(""),
    }).optional(),

    price: Joi.number().required().min(0).messages({
      "number.base": "Price must be a number.",
      "any.required": "Price is required.",
    }),

    location: Joi.string().optional().allow(""),

    country: Joi.string().required().messages({
      "string.empty": "Country is required.",
    }),
    }).required(),
});
module.exports = listingJoiSchema;