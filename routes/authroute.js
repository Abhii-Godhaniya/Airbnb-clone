const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

router.get("/",(req,res)=>{
    res.send("hello");
});

module.exports = router;