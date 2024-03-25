const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const dotenv = require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// view engine
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Utils
const ExpressError = require("./utils/ExpressError");

// global variables
const PORT = process.env.PORT || 3000;

app.use(
	require("express-session")({
		secret: "keyboard cat",
		resave: false,
		saveUninitialized: false,
	})
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use("*/css", express.static(path.join(__dirname, "public/css")));
app.use(
	"*/fonts/flaticon/*",
	express.static(path.join(__dirname, "public/fonts"))
);
app.use(
	"*/fonts/icomoon/*",
	express.static(path.join(__dirname, "public/fonts"))
);
app.use("*/images", express.static(path.join(__dirname, "public/images")));
app.use("*/js", express.static(path.join(__dirname, "public/js")));
app.use("*/scss", express.static(path.join(__dirname, "public/scss")));

// Routes
app.use("/", homeRoutes);
app.use("/", userRoutes);
app.use("/", blogRoutes);

// TODO Finish creating route folder structures
app.get("/about", (req, res) => {
	res.render("pages/about", { title: "About Us" });
});

app.get("/contact", (req, res) => {
	res.render("pages/contact", { title: "Contact" });
});

app.get("/search", (req, res) => {
	res.render("pages/search-result", { title: "Search Result" });
});

// passport config
var User = require("./models/userModel");
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// mongoDB setup
// TODO create dbconnect file, implement try, catch with error handler
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/ejs-blog";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

// Error Handlers
app.all("*", (req, res, next) => {
	next(new ExpressError("Page Not Found", 404));
});

app.use((err, req, res, next) => {
	const { statusCode = 500 } = err;
	if (!err.message) err.message = "Something went wrong!";
	res.status(statusCode).render("error", { err, title: "Error Page" });
});

app.listen(PORT, () =>
	console.log(
		`Server is listening on port ${PORT} in ${process.env.NODE_ENV} mode`
	)
);
