const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

// Login
router.get("/login", (req, res) => {
	res.render("pages/login", { title: "Login to Account" });
});

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

module.exports = router;
