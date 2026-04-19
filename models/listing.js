const mongoose = require("mongoose");
const review = require("./review");
const Review = require("./review.js");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
     title: {
        type: String,
        required: true
     },
     description: String,
     image: {
        filename: {
           type: String,
           default: "listingimage"
        },
        url: {
           type: String,
           default: "https://images.unsplash.com/reserve/bOvf94dPRxWu0u3QsPjF_tree.jpg?q=80&w=1176&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
     },
     price:Number,
     location: String,
     country: String,
     reviews: [
      {
         type: Schema.Types.ObjectId,
         ref: "Review"
      },
     ],
     owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
     },
     category: {
      type: String,
      enum: ["Trending", "Rooms", "Iconic Cities", "Mountains", "Castles", "Amazing Pools", "Camping", "Farms", "Arctic", "Domes", "Boats"]
     },
     geometry: {
      type: {
      type: String,
      enum: ["Point"],
      required: true,
     },
     coordinates: {
      type: [Number],
      required: true,
     },
   },
});

listingSchema.post("findOneAndDelete", async (listing) => {
   if(listing) {
      await review.deleteMany({
         _id: {$in: listing.reviews}
      });
   }
});

const Listing = mongoose.model("Listing", listingSchema); //collection name is "listings"
module.exports = Listing; //exporting the model to be used in other files

