// external imports
const express = require("express");

// internal imports
const { getLogIn } = require("../controllers/logInController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// define subApp router
const logInRoute = express.Router();

// get logIn page
logInRoute.get("/", decorateHtmlResponse("logIn"), getLogIn);

// module exports
module.exports = logInRoute;
