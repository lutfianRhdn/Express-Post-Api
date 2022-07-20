const chai = require("chai");
const assert = require("chai").expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);
require("dotenv").config();

const api = chai.request(`http://localhost:${process.env.PORT}`);

describe("Auth", function () {
	describe("login", function () {
		it("should return a token", async () => {
			const res = await api
				.post("/api/auth/login")
				.set("Content-Type", "application/json")
				.send({
					email: "admin10@admin.com",
					password: "password",
				});
			assert(res.status).equal(200);
			assert(res.body.data.token).to.be.a("string");
		});
		it("should return user not found", async () => {
			const res = await api
				.post("/api/auth/login")
				.set("Content-Type", "application/json")
				.send({
					email: "",
					password: "",
				});
			assert(res.status).equal(404);
			assert(res.body.data.message).to.equal(
				"email / password invalid"
			);
		});
	});
	describe("register", function () {
		it("should return already email", async function () {
			const res = await api
				.post("/api/auth/register")
				.set("Content-Type", "application/json")
				.send({
					name: "admin10",
					email: "admin10@gmail.com",
					password: "password",
				});
			assert(res.status).equal(400);
			assert(res.body.data.message).equal("User already exists");
		});
		it("should return user created", async function () {
			const data = {
				name: "admin10",
				email: "admin1120@admin.com",
				password: "password",
			};
			const res = await api
				.post("/api/auth/register")
				.set("Content-Type", "application/json")
				.send(data);
			assert(res.status).equal(200);
		});
	});
});
