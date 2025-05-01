// external imports
const express = require("express");

// internal imports
const { getInbox } = require("../controllers/inboxController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");

// define subApp router
const inboxRoute = express.Router();

// get logIn page
inboxRoute.get("/", decorateHtmlResponse("Inbox"), getInbox);

// module exports
module.exports = inboxRoute;
