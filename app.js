require("dotenv").config();
const atlasurl = process.env.ATLAS_URL;

const express = require("express");
const app = express();
exports.app = app;
const monogoose = require("mongoose"); 
const path = require("path");
const list = require("./modules/listing.js");
const User = require("./modules/user.js");
const method_overriden = require("method-override");
const ejs_mate = require("ejs-mate");
const { listingSchema,reviewSchema } = require("./schema.js");
const { error } = require("console");
const session = require("express-session")
const mongostore = require("connect-mongo")
const flash = require("connect-flash");
const passport = require("passport");
const LocalStragy = require("passport-local");
const expressError = require("./util/ExpressError.js");


const userRoute = require("./Routes/user.js")
const ListingRoute = require("./Routes/listings.js")
const ReviewRoute = require("./Routes/Review.js")


async function main() {
    await monogoose.connect(atlasurl);
}
main().then((result) => {
    console.log("Database connected sucessfully")
}).catch((err) => {
    console.log(err);
})


const store = mongostore.create({
    mongoUrl:atlasurl,
    crypto:{    
        secret:"mysupersecretcode"
    },
    touchAfter: 24*3600,
})
store.on("err",()=>{
    console.log("error in mongo session",err);
})
const sessionoption = {
    store,
    secret : "mysupersecretcode",
    resave : false,
    saveUninitialized : true
}

app.use(flash());
app.use(session(sessionoption));
app.use(method_overriden("_method"))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.engine("ejs", ejs_mate);
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStragy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get("/", (req, res) => {
    res.send("we are creating the website");
})

// app.get("/testinguser",async(req,res)=>{
//     let fakeruser = new User({
//         email:"abc@gmail.com",
//         username:"lta-student",
//     });
//     let newuser = await User.register(fakeruser,"abc@kish");
//     res.send(newuser);
// })

app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
})
app.use("/",userRoute);
app.use("/listings",ListingRoute)
app.use("/listings/:id/review",ReviewRoute)


// app.all("*", (req, res, next) => {
//     next(new expressError(404, "this is all site error is triggered"))
// })
app.use((err, req, res, next) => {
    let { status = 500, message = "unknown error" } = err;
    console.log("middlewear error handle is trriged", message)
    res.render("Error.ejs", { message })
})

let port = 3000;
app.listen(port, () => {
    console.log("server is listing on 3000");
})
