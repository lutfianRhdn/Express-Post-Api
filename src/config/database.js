const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
	connect: mongoose
		.connect(
			process.env.DB_HOST || "mongodb://localhost:27017/my-codelabs"
		)
		.then(() => {
			console.log("Moongo DB Connected");
		}),
};
