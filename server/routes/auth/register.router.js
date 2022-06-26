const express = require("express");

const registerController = require("../../controllers/auth/register.controller");

const registerRouter = express.Router();

registerRouter.post("/", registerController);

module.exports = registerRouter;