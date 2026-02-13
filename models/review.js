const { required } = require("joi");
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: [true, 'Review text cannot be blank']
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
  
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Review = mongoose.model("Review",reviewSchema);
module.exports = Review;