const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");
const catchAsync = require("../utils/catchAsync");

router.route("/home").get(
	catchAsync(async (req, res) => {
		const blogs = await Blog.find({});
		const pets = await Blog.findByCategory("pets");
		const gardening = await Blog.findByCategory("gardening");
		const technology = await Blog.findByCategory("technology");
		const conspiracy = await Blog.findByCategory("conspiracy");
		const news = await Blog.findByCategory("news");
		res.render("pages/index", {
			title: "Home",
			blogs,
			pets,
			gardening,
			technology,
			conspiracy,
			news,
		});
	})
);

module.exports = router;
