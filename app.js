const express = require("express");
const path = require("path");
const ejsMate = require("ejs-mate");
const PORT = process.env.PORT || 3000;

const app = express();

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static("public"));

app.get("/", (req, res) => {
	res.render("pages/index");
});

app.get("/about", (req, res) => {
	res.render("pages/about");
});

app.get("/single", (req, res) => {
	res.render("pages/single");
});

app.get("/blog", (req, res) => {
	res.render("pages/blog");
});

app.get("/category", (req, res) => {
	res.render("pages/category");
});

app.get("/contact", (req, res) => {
	res.render("pages/contact");
});

app.get("/search", (req, res) => {
	res.render("pages/search-result");
});

// 404 page
app.use((req, res) => {
	res.status(404).render("pages/404");
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
