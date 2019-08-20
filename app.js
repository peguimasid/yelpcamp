var express        = require("express"),
    app            = express(),
    bodyParser     = require("body-parser"),
    mongoose       = require("mongoose"),
	passport       = require("passport"),
	flash          = require("connect-flash"),
	LocalStrategy  = require("passport-local"),
    Campground     = require("./models/campground"),
	Comment        = require("./models/comment"),
	User           = require("./models/user"),
	methodOverride = require("method-override"),
	seedDB         = require("./seeds");

//Require Routes
var commentRoutes    = require("./routes/comments"),
	authRoutes      = require("./routes/index"),
    campgroundRoutes = require("./routes/campgrounds");

  
mongoose.connect("mongodb+srv://Guilhermo:Ben10123@cluster0-t4dr0.mongodb.net/test?retryWrites=true&w=majority", {useNewUrlParser: true, useCreateIndex: true}).then(() => {
	console.log("Connected to DB!");
}).catch(err => {
	console.log("ERROR:", err.message);
});

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method")); 
app.use(flash());
// seedDB();

// PASSPORT CONFIGURATION
app.use(require("express-session")({
	secret: "Guilhermo e mto lindo",
	resave: false, 
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	next();
});
//fazendo isso estamos passando "currentUser" , "error" e "success" para os outros files.

app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);
app.use(authRoutes);



//============
//  SERVIDOR
//============
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Our app is running on port ${ PORT }`);
});