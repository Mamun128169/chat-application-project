// external imports
const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const path = require("path");

// internal imports
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandlers");
const logInRoute = require("./routes/logInRoute");
const usersRoute = require("./routes/usersRoute");
const inboxRoute = require("./routes/inboxRoute");

// app configuration
const app = express();
dotenv.config();

// connect mongoDB with mongoose
mongoose
  .connect(process.env.MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("MongoDB connected Successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

// request parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set view engine
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "public")));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", logInRoute);
app.use("/users", usersRoute);
app.use("/inbox", inboxRoute);

// 404 not found handler
app.use(notFoundHandler);

// default Error handler
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log("Server is running on port", process.env.PORT);
});
