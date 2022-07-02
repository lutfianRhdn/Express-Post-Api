const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	refreshToken: {
		type: String,
		default: "",
	},
	createdAt: {
		type: Date,
		default: new Date().now,
	},
});
Schema.methods = {
	comparePassword: function (password) {
		return bcrypt.compare(password, this.password);
	},
	generateToken: function (
		secretKey = process.env.ACCESS_TOKEN_SECRET_KEY,
		expiresIn = "15m"
	) {
		const token = jwt.sign({ id: this._id }, secretKey, { expiresIn });
		return token;
	},
};
Schema.options.toJSON = {
	transform: function (doc, ret, options) {
		return {
			name: ret.name,
			email: ret.email,
			token: ret.token,
			createdAt: ret.createdAt,
		};
	},
};

module.exports = mongoose.model("User", Schema);
