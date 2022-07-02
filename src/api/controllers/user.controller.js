const User = require("../models/User");
const response = require("../utils/response");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
module.exports = {
	login: async (req, res) => {
		const { email, password } = req.body;
		try {
			const user = await User.findOne({ email });
			if (!user)
				return response(
					res,
					{ message: "email / password invalid" },
					404
				);
			const isMatch = await user.comparePassword(password);
			if (!isMatch)
				return response(
					res,
					{ message: "email / password invalid" },
					404
				);
			const refreshToken = user.generateToken(
				process.env.REFRESH_TOKEN_SECRET_KEY,
				"1d"
			);
			await user.updateOne({ refreshToken });
			res.cookie("refreshToken", refreshToken, {
				maxAge: 24 * 60 * 60 * 1000,
				httpOnly: true,
			});
			const token = user.generateToken();
			return response(res, { user, token }, 200);
		} catch (err) {
			console.log(err);
			response(res, err, 400);
		}
	},
	register: async (req, res) => {
		const { name, email, password } = req.body;
		try {
			const passwordHashed = await bcrypt.hash(password, 10);
			const user = await User.create({
				name,
				email,
				password: passwordHashed,
			});
			return response(res, { user }, 200);
		} catch (err) {
			error = Object.keys(err.errors).map((key) => {
				return { [key]: err.errors[key].message };
			});

			return response(res, error, 400);
		}
	},
	logout: async (req, res) => {
		try {
			const user = await User.findOne({ _id: req.user.id });
			user.updateOne({ refreshToken: "" });
			res.clearCookie("refreshToken");
			response(res, { message: "logout success" }, 200);
		} catch (err) {
			response(res, err, 400);
		}
	},
	refreshToken: async (req, res) => {
		const { refreshToken } = req.cookies;
		try {
			const user = await User.findOne({ refreshToken });
			console.log(user);
			if (!user)
				response(res, { message: "refresh token invalid" }, 404);
			const token = user.generateToken();
			response(res, { token }, 200);
		} catch (err) {
			response(res, err, 400);
		}
	},
};
