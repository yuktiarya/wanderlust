const mongoose = require("mongoose");
const Listing = require("./models/listing");

async function fixOwners() {
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
    // Assign to itsyukti20 based on the ID we got from terminal
    const userId = new mongoose.Types.ObjectId("69e316d5a55543195dd4856e"); 
    
    // Find listings missing an owner and patch them
    let missing = await Listing.updateMany({ owner: { $exists: false } }, { $set: { owner: userId } });
    console.log("Updated missing owner listings:", missing.modifiedCount);
    
    // Also patch listings where owner is manually saved as null
    let nulls = await Listing.updateMany({ owner: null }, { $set: { owner: userId } });
    console.log("Updated null owner listings:", nulls.modifiedCount);

    mongoose.disconnect();
}

fixOwners().catch(console.error);
