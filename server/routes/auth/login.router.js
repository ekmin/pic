const express = require("express");
const auth = require("../../middleware/auth");

const {GetToken, LoginUser} = require("../../controllers/auth/login.controller");

const loginRouter = express.Router();

loginRouter.get("/", auth, GetToken);
loginRouter.post("/", LoginUser);

module.exports = loginRouter;