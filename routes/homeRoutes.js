const express = require("express");
const router = express.Router();
const Blog = require("../models/blogModel");
const catchAsync = require("../utils/catchAsync");

router.route("/home").get(
	catchAsync(async (req, res) => {
		const blogs = await Blog.find({});
		res.render("pages/index", { title: "Home", blogs });
	})
);

module.exports = router;
