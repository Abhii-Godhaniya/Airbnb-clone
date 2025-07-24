const localsMiddleware = (req, res, next)=>{
    res.locals.currUser = req.user || null;
    next();
}
module.exports= localsMiddleware;