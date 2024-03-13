const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const blogs = require("./blogs");
const Blog = require("../models/blogModel");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/ejs-blog";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const seedDB = async () => {
	await Blog.deleteMany({});
	for (let i = 0; i < blogs.length; i++) {
		const b = new Blog({
			title: blogs[i].title,
			body: blogs[i].body,
			author: blogs[i].author,
			date: blogs[i].date,
			image: blogs[i].image,
		});
		await b.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
