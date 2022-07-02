const mongoose = require("mongoose");

const Schema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	desc: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	createdAt: {
		type: Date,
		default: new Date().now,
	},
});

module.exports = mongoose.model("Post", Schema);
