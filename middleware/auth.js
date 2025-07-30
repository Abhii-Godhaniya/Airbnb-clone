const AppError = require("../utils/AppError");

const isloggedin = (req, res, nexxt)=>{
    if(!req.user){
        throw new AppError("Error! You must be logged in to create lsiting.")
        // return res.redirect()
    }
    next();
}
module.exports=isloggedin;