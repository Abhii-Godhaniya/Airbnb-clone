const AppError = require("../utils/AppError");
const listingJoiSchema = require("../schema/listingJoiSchema");

const validateListing = (req, res, next)=>{
    const { error } = listingJoiSchema.validate(req.body,{abortEarly: false});
    if(error){
        const msg = error.details.map(el => el.message).join(", ");
        throw new AppError(msg, 400);
    }
    next();
};
module.exports = validateListing;