const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Blog = require("../models/blogModel");

router.get("/category", (req, res) => {
	res.render("blogs/category", { title: "Category" });
});

// TODO set this as the main blog page, link to categories
router.get("/blogs", (req, res) => {
	res.render("blogs/all", { title: "Blog" });
});

router.get(
	"/single/:id",
	catchAsync(async (req, res) => {
		const blog = await Blog.findById(req.params.id);
		res.render("blogs/single", { title: "Single", blog });
	})
);

// TODO create POST route to handle new blog creation
router.get("/new", (req, res) =>
	res.render("blogs/new", { title: "New Blog" })
);

module.exports = router;
