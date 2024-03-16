const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	author: {
		type: String,
		required: true,
	},
	date: {
		type: String,
	},
	image: {
		type: String,
	},
	category: {
		type: String,
	},
});
// TODO change images into an array
// TODO hook up multer and cloudinary for images
module.exports = mongoose.model("Blog", blogSchema);
