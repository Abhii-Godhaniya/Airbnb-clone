const Listing = require("../models/listing");
const initData = require("./data");

const initDB = async()=>{
    try{
        await Listing.deleteMany({});
        await Listing.insertMany(initData.data);
        console.log("Data was saved");
    }catch(err){
        console.error("Error saving data:",err);
    }
};
module.exports = initDB