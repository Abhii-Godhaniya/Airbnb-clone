const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required : true
    },
    description: {
        type: String,
        required : true
    },
   image: {
      filename: {
        type:String
      },
      url: {
        type: String,
        default:
          "https://images.unsplash.com/photo-1589419896452-b460b8b390a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) =>
          !v || v.trim() === ""
            ? "https://images.unsplash.com/photo-1589419896452-b460b8b390a3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            : v,
      },
    },
    price: {
        type: Number,
        required : true
    },
    location: {
        type: String,
    },
    country: {
        type: String,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;