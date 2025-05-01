const createError = require("http-errors");

// 404 Not Found Handler
const notFoundHandler = (req, res, next) => {
  next(createError(404, "Your Requested Content Was Not Found!"));
};

// default Error handler
const errorHandler = (err, req, res, next) => {
  res.locals.error = process.env.NODE_ENV === "development" ? err : err.message;

  res.status(err.status || 500);

  if (!res.locals.html) {
    // html response
    res.render("error", { title: "Error page" });
  } else {
    res.json(res.locals.error);
  }
};

// module export
module.exports = {
  notFoundHandler,
  errorHandler,
};
