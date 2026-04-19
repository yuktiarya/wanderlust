if(process.env.NODE_ENV != "production") {
   require('dotenv').config();
}  
console.log(process.env.SECRET);

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema} = require("./schema.js");
const { getSystemErrorMessage } = require('util');
const Review = require('./models/review.js');
const listings = require("./routes/listing.js");
const review = require('./routes/review.js');
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/user.js");

const userRouter = require("./routes/user.js");
const listRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");

const dbUrl = process.env.ATLASDB_URL;

main()
     .then(() =>{
        console.log("Connected to MongoDB");
     })
     .catch((err) => {
        console.log(err);
     });

async function main() {
    await mongoose.connect(dbUrl, { autoSelectFamily: false });
}

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

app.use((req, res, next) => {
    res.locals.success = "";
    res.locals.error = "";
    res.locals.currUser = null;
    next();
});

app.use(express.urlencoded({extended:true})); //to parse the form data sent in the request body
app.use(methodOverride("_method")); //to override POST requests with _method parameter
app.engine("ejs", ejsMate); //to use ejs-mate for layout support
app.use(express.static(path.join(__dirname,"public"))); //to serve static files from the public directory

const store = MongoStore.create({
    mongoUrl: dbUrl,
    mongoOptions: { autoSelectFamily: false },
    crypto: {
        secret: process.env.SECRET,
    },
    touchAfter: 24* 3600,
});

store.on("error",() => {
    console.log("ERROR in MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret:process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        httpOnly: true, // to prevent client-side JavaScript from accessing the cookie  
    },
};

// app.get("/",(req,res)=>{
//     res.send("get started!");
// });

app.use(session(sessionOptions)); //to use sessions for flash messages and other session data   
app.use(flash()); //to use flash messages for displaying success or error messages

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req,res,next) => {
    res.locals.success = req.flash("success");
    // console.log(res.locals.success);
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});

app.get("/demouser", async(req,res)=>{
    let fakeUser = new User({
        email: "student@gmail.com",
        username: "yukti arya",
    });
    let registeredUser = await User.register(fakeUser, "helloWorld");
    res.send(registeredUser);
});

// app.get("/testListing", async (req,res)=> {
//     let sampleListing = new Listing({
//         title : "My New Villa",
//         description:"By the beach",
//         price: 1000,
//         location: "Calangute Goa",
//         country: "India"
//     });

//     await sampleListing.save();
//     console.log("sample was saved");
//     res.send(sampleListing);
// });



app.use("/listings",listRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/",userRouter);
// Catch-all middleware for handling undefined routes
app.use((req,res,next) => {
    next(new ExpressError(404, "Page Not Found"));
});

// Error handling middleware
app.use((err,req,res,next) => {
    let {statusCode = 500, message = "Something went wrong!"} = err;
    res.status(statusCode).render("error", { message });
    // res.status(statusCode).send(message)
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});
