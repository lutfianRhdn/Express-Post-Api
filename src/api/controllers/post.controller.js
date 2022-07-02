const Post = require("../models/Post");
const response = require("../utils/response");
module.exports = {
	index: async (req, res) => {
		try {
			const posts = await Post.find().populate("user");
			response(res, { posts }, 200);
		} catch (err) {
			console.log(err);
			response(res, err, 400);
		}
	},
	detail: async (req, res) => {
		try {
			const post = await Post.findOne({ _id: req.params.id }).populate(
				"user"
			);
			return response(res, { post }, 200);
		} catch (err) {
			console.log(err);
			return response(res, err, 400);
		}
	},
	store: async (req, res) => {
		try {
			const { title, desc } = req.body;
			const post = await Post.create({
				title,
				desc,
				user: req.user.id,
			});
			response(res, { post }, 200);
		} catch (err) {
			res.status(400);
			errors = Object.keys(err.errors).map((el) => {
				return { [el]: err.errors[el].message };
			});
			response(res, errors, 400);
		}
	},
	update: async (req, res) => {
		const { title, desc } = req.body;
		const id = req.params.id;
		try {
			const post = await Post.findOneAndUpdate(
				{ _id: id },
				{ title, desc }
			);
			response(res, { post }, 200);
		} catch (err) {
			res.status(400);
			errors = Object.keys(err.errors).map((el) => {
				return { [el]: err.errors[el].message };
			});
			response(res, errors, 400);
		}
	},
	destroy: async (req, res) => {
		try {
			await Post.deleteOne({ _id: req.params.id });
			response(res, { message: "delete success" }, 200);
		} catch (err) {
			response(res, err, 400);
		}
	},
};
