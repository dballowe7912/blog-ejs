const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const blogs = require("./blogs");
const users = require("./users");
const Blog = require("../models/blogModel");
const User = require("../models/userModel");

const dbUrl = process.env.DB_URL || "mongodb://localhost:27017/ejs-blog";
mongoose.connect(dbUrl);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
	console.log("Database connected");
});

const seedDB = async () => {
	await Blog.deleteMany({});
	await User.deleteMany({});
	for (let i = 0; i < blogs.length; i++) {
		const b = new Blog({
			title: blogs[i].title,
			body: blogs[i].body,
			author: blogs[i].author,
			date: blogs[i].date,
			image: blogs[i].image,
			category: blogs[i].category,
		});
		await b.save();
	}
	for (let i = 0; i < users.length; i++) {
		const u = new User({
			username: users[i].username,
			email: users[i].email,
			password: users[i].password,
			isAdmin: users[i].isAdmin,
		});
		await u.save();
	}
};

seedDB().then(() => {
	mongoose.connection.close();
});
