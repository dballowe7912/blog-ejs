// dependencies
// npm packages
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const session = require("express-session");
const dotenv = require("dotenv").config();
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/userModel");
const ExpressError = require("./utils/ExpressError");

// const MongoDBStore = require("connect-mongo")(session);

// utils
const catchAsync = require("./utils/catchAsync");

// routers
const homeRoutes = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");

// global variables
const PORT = process.env.PORT || 3000;

// mongoDB setup
// TODO create dbconnect file, implement try, catch with error handler
const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/ejs-blog";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const sessionConfig = {
	secret: "thisisatestingsecret",
	resave: false,
	saveUninitialized: true,
	cookie: {
		httpOnly: true,
		// 1000 miliseconds in a second * 60 seconds in a minute, 60 minutes in an hour, 24 hours in a day, 7 days in a week === expires in one week
		expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
		maxAge: 1000 * 60 * 60 * 24 * 7,
	},
};

const app = express();

// middlewares
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
	res.locals.currentUser = req.user;
	next();
});

// Routes
app.use("/", homeRoutes);
app.use("/", userRoutes);

// TODO Finish creating route folder structures
app.get("/about", (req, res) => {
	res.render("pages/about", { title: "About Us" });
});

app.get("/single", (req, res) => {
	res.render("pages/single", { title: "Single Blog" });
});

app.get("/blog", (req, res) => {
	res.render("pages/blog", { title: "Blog" });
});

app.get("/category", (req, res) => {
	res.render("pages/category", { title: "Category" });
});

app.get("/contact", (req, res) => {
	res.render("pages/contact", { title: "Contact" });
});

app.get("/search", (req, res) => {
	res.render("pages/search-result", { title: "Search Result" });
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
