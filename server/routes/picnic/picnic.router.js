const express = require("express");
const auth = require("../../middleware/auth");
const checkObjectId = require("../../middleware/checkObjectId");

const {
  CreatePicnic,
  GetPicnics,
  GetUserPicnics,
  GetIdPicnic,
  UpdatePicnic,
  DeltePicnic,
  AddMsg,
  DeleteMsg,
} = require("../../controllers/picnic/picnic.controller");

const picnicRouter = express.Router();

picnicRouter.post("/", auth, CreatePicnic);
picnicRouter.get("/all", auth, GetPicnics);
picnicRouter.get("/user", auth, GetUserPicnics);
picnicRouter.get("/:id", [auth, checkObjectId("id")], GetIdPicnic)
picnicRouter.put("/:id", [auth, checkObjectId("id")], UpdatePicnic);
picnicRouter.delete("/:id", [auth, checkObjectId("id")], DeltePicnic);
picnicRouter.post("/message/:id", [auth, checkObjectId("id")], AddMsg);
picnicRouter.delete("/message/:id/:message_id", auth, DeleteMsg);

module.exports = picnicRouter;
