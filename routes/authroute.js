const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
const isloggedin = require("../middleware/auth");
const wrapAsync = require("../utils/wrapAsync");
const AppError = require("../utils/AppError");
const validateListing = require("../middleware/validateListing");
const validateReview = require("../middleware/validateReview");
const Review = require("../models/review");

//show all listings
router.get("/listings", wrapAsync(async (req, res) => {
  const allListing = await Listing.find({});
  if(!allListing){
    throw new AppError("No listings found",404);
  }
  res.render("listings/index.ejs", { allListing });
}));
//new route 
router.get("/listings/new", wrapAsync(async (req, res) => {
  try {
    res.render("listings/new.ejs");
  } catch (err) {
    throw new AppError("❌ Failed to load form. Please try again later.", 500);
  }
}));
//show listing by id
router.get("/listings/:id", wrapAsync(async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id).populate("reviews");
  if (!listing) {
    return res.status(404).send("Listing not found.");
  }
  res.render("listings/show.ejs", { listing });
}));

//create route 
router.post("/listings", validateListing, wrapAsync(async(req,res)=>{
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings")
}));
//edit route
router.get("/listings/:id/edit", wrapAsync(async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        throw new AppError("❌ Cannot edit. Listing not found.",404);
    }

    res.render("listings/edit.ejs", { listing });
}));
//update route
router.put("/listings/:id",validateListing, wrapAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description, price, location, country, image } = req.body;

  const updatedListing = await Listing.findByIdAndUpdate(
    id,
    {
      title,
      description,
      price,
      location,
      country,
      image,
    },
    { new: true, runValidators: true }
  );

  if (!updatedListing) {
    throw new AppError("❌ Cannot update. Listing not found.",404);
  }

  res.redirect(`/listings/${id}`);
}));

router.delete("/listings/:id", wrapAsync( async(req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    throw new AppError("❌ Cannot Delete. Listing not found.",404);
  }

  res.redirect("/listings");
}));

//Post route for reviews
router.post("/listings/:id/reviews", validateReview , wrapAsync(async(req, res)=>{
    const { id } = req.params;
    const listing = await Listing.findById(id);
    const newReview = new Review(req.body.review);
    listing.reviews.push(newReview);
    await newReview.save();
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
}));

module.exports = router;
