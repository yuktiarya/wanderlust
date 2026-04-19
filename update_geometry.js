const mongoose = require("mongoose");
const Listing = require("./models/listing");

async function fixGeometry() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    
    // Find all listings that are missing the geometry property entirely
    let missingGeometry = await Listing.updateMany(
        { geometry: { $exists: false } },
        { $set: { geometry: { type: "Point", coordinates: [78.1360, 29.3732] } } }
    );
    console.log("Updated completely missing geometry listings:", missingGeometry.modifiedCount);

    // Find all listings that have geometry but missing standard geometry.type (bypassed from frontend typos)
    let badGeometry = await Listing.updateMany(
        { "geometry.type": { $exists: false } },
        { $set: { "geometry.type": "Point", "geometry.coordinates": [78.1360, 29.3732] } }
    );
    console.log("Updated bad geometry listings:", badGeometry.modifiedCount);

    mongoose.disconnect();
}

fixGeometry().catch(console.error);
