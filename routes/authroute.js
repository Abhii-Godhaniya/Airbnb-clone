const express = require("express");
const router = express.Router();
const Listing = require("../models/listing");

router.get("/listings",async (req,res)=>{
    const allListing = await Listing.find({});
     res.render("listings/index.ejs",{allListing});   
});
router.get("/listings/:id",async(req,res)=>{
    const {id} = req.params;
    const listing = await Listing.findById(id);
     if (!listing) {
        return res.status(404).send("Listing not found.");
    }
    res.render("listings/show.ejs",{listing});
})
router.put("/:id", async (req, res) => {
  const { title, description, price, country } = req.body;

  const listing = await Listing.findByIdAndUpdate(
    req.params.id,
    { title, description, price, country },
    { new: true }
  );

  if (!listing) {
    return res.status(404).json({ error: "Listing not found" });
  }
  
  res.json({ message: "Listing updated successfully!", listing });
});

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