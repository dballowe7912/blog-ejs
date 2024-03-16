const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Blog = require("../models/blogModel");

router.get("/category", (req, res) => {
	res.render("pages/category", { title: "Category" });
});

// TODO set this as the main blog page, link to categories
router.get("/blog", (req, res) => {
	res.render("pages/blog", { title: "Blog" });
});

// Set as expanded view of selected blog
router.get(
	"/single/:id",
	catchAsync(async (req, res) => {
		const blog = await Blog.findById(req.params.id);
		res.render("pages/single", { title: "Single", blog });
	})
);

module.exports = router;
