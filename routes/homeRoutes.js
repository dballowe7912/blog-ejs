const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");
const catchAsync = require("../utils/catchAsync");

router.route("/home").get(
	catchAsync(async (req, res) => {
		const blogs = await Blog.find({});
		const pets = await Blog.findByCategory("pets");
		const gardening = await Blog.findByCategory("gardening");
		res.render("pages/index", { title: "Home", blogs, pets, gardening });
	})
);

module.exports = router;
