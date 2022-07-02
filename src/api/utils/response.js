module.exports = (res, data, status = 200) => {
	res.status(status);
	res.json({
		data,
		meta: {
			status,
		},
	});
};
