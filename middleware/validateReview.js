const AppError = require("../utils/AppError");
const { reviewJoiSchema } = require("../validations");

const validateReview = (req, res, next)=>{
    const { error } = reviewJoiSchema.validate(req.body,{abortEarly: false});
    if(error){
        const msg = error.details.map(el => el.message).join(", ");
        throw new AppError(msg, 400);
    }
    next();
};
module.exports = validateReview;