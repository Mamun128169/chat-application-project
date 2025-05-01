// external imports
const express = require("express");

// internal imports
const { getUsers } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// define subApp router
const usersRoute = express.Router();

// get logIn page
usersRoute.get("/", decorateHtmlResponse("Users"), getUsers);

// module exports
module.exports = usersRoute;
