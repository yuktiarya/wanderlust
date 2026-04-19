const mongoose = require("mongoose");
const Listing = require("./models/listing.js");

require('dotenv').config();
const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const categories = [
  "Trending", "Rooms", "Iconic Cities", "Mountains", 
  "Castles", "Amazing Pools", "Camping", "Farms", 
  "Arctic", "Domes", "Boats"
];

const seedCategories = async () => {
    try {
        let allListings = await Listing.find({});
        for (let listing of allListings) {
            let randomCategory = categories[Math.floor(Math.random() * categories.length)];
            listing.category = randomCategory;
            await listing.save();
        }
        console.log(`Successfully assigned categories to ${allListings.length} existing listings!`);
    } catch (e) {
        console.log("Error assigning categories: ", e);
    } finally {
        mongoose.disconnect();
    }
}

seedCategories();
