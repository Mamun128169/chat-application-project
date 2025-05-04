// external imports
const bcrypt = require("bcrypt");

// internal imports
const User = require("../Models/userModel");

// get users page
const getUsers = (req, res, next) => {
  res.render("users");
};

// add user
const addUser = async (req, res, next) => {
  try {
    let newUser;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (req.files && req.files.length > 0) {
      newUser = new User({
        ...req.body,
        avatar: req.files[0].filename,
        password: hashedPassword,
      });
    } else {
      newUser = new User({
        ...req.body,
        password: hashedPassword,
      });
    }

    // save the user
    await newUser.save();
    res.status(201).json({
      message: "User was added successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      errors: {
        common: {
          msg: "Unknown error occurred!",
        },
      },
    });
  }
};

module.exports = {
  getUsers,
  addUser,
};
