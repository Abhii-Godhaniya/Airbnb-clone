const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");
//show all listings
router.get("/listings", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
});
//new route 
router.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});
//show listing by id
router.get("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).send("Listing not found.");
  }
  res.render("listings/show.ejs", { listing });
});

//create route 
router.post("/listings", async(req,res)=>{
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings")
});
//edit route
router.get("/listings/:id/edit", async (req, res) => {
    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        return res.status(404).send("Listing not found.");
    }

    res.render("listings/edit.ejs", { listing });
});
//update route
router.put("/listings/:id", async (req, res) => {
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
    return res.status(404).send("Listing not found.");
  }

  res.redirect(`/listings/${id}`);
});

router.delete("/listings/:id", async (req, res) => {
  const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);

  if (!deletedListing) {
    return res.status(404).send("Listing not found.");
  }

  res.redirect("/listings");
});

module.exports = router;
