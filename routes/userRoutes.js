const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

// TODO create bio page and profile page
// Login
router
	.get("/login", (req, res) => {
		res.render("pages/login", { title: "Login to Account" });
	})
	.post(
		"/login",
		passport.authenticate("local", { failureRedirect: "/login" }),
		function (req, res) {
			res.redirect("/home");
		}
	);

// Register
router
	.get("/register", (req, res) => {
		res.render("pages/register", { title: "Register New Account" });
	})
	.post(
		"/register",
		catchAsync(async (req, res) => {
			try {
				const { email, username, password } = req.body;
				const user = new User({ username, email });
				const registeredUser = await User.register(user, password);
				res.redirect("/home");
			} catch (error) {
				console.log(error);
				res.redirect("register");
			}
		})
	);

router.get("/logout", function (req, res, next) {
	req.logout(function (err) {
		if (err) {
			return next(err);
		}
		res.redirect("/login");
	});
});

router.get("/profile", (req, res) => {
	res.render("users/profile", { title: "Profile Page" });
});

module.exports = router;
