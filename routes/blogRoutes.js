const express = require("express");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const Blog = require("../models/blogModel");

router.get(
	"/category/:category",
	catchAsync(async (req, res) => {
		const blogs = await Blog.findByCategory(req.params.category);
		res.render("blogs/category", { title: "Category", blogs });
	})
);

// TODO set this as the main blog page, link to categories
router.get(
	"/blogs",
	catchAsync(async (req, res) => {
		const allBlogs = await Blog.find({});
		res.render("blogs/all", { title: "Featured Blogs", allBlogs });
	})
);

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

router.post(
	"/new",
	catchAsync(async (req, res) => {
		const blog = new Blog(req.body.blog);
		await blog.save();
		res.redirect(`/single/${blog._id}`);
	})
);

module.exports = router;
