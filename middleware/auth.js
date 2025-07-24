const isloggedin = (req, res, nexxt)=>{
    if(!req.user){
        res.status(401).send("You must be logged in")
    }
    nexxt();
}
module.exports=isloggedin;