const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const route = require("./api/routes");
const database = require("./config/database");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/api", route);

database.connect;

app.listen(PORT, () => {
	console.log(`listening on http://localhost:${PORT}`);
});
