// external imports
const express = require("express");

// internal imports
const { getUsers, addUser } = require("../controllers/usersController");
const decorateHtmlResponse = require("../middlewares/common/decorateHtmlResponse");
const avatarUploader = require("../middlewares/users/avatarUploader");
const {
  addUserValidators,
  addUserValidationHandler,
} = require("../middlewares/users/userValidators");

// define subApp router
const usersRoute = express.Router();

// get logIn page
usersRoute.get("/", decorateHtmlResponse("Users"), getUsers);

// Add user
usersRoute.post(
  "/",
  avatarUploader,
  addUserValidators,
  addUserValidationHandler,
  addUser
);

// module exports
module.exports = usersRoute;
