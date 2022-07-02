const mongoose = require("mongoose");
require("dotenv").config();

module.exports = {
	connect: mongoose.connect(process.env.DB_HOST).then(() => {
		console.log("Moongo DB Connected");
	}),
};
