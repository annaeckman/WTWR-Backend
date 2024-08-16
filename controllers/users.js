const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const validator = require("validator");
const User = require("../models/user");

const {
  BAD_REQUEST,
  NOT_FOUND,
  DEFAULT,
  CONFLICT,
  UNAUTHORIZED,
} = require("../utils/errors");
const { SUCCESSFUL_REQUEST } = require("../utils/status");
const { JWT_SECRET } = require("../utils/config");

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  // Check if email is missing
  if (!email) {
    return res.status(BAD_REQUEST).send({ message: "Email is required" });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid email format" });
  }

  return User.findOne({ email })
    .then((existingUser) => {
      if (existingUser) {
        throw new Error("Email already in use");
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => {
      User.create({ name, avatar, email, password: hash }).then((newUser) => {
        const response = newUser.toObject();
        delete response.password;

        return res.status(SUCCESSFUL_REQUEST).send({ data: response });
      });
    })
    .catch((err) => {
      console.error(err);
      if (err.name === "ValidationError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.message === "Email already in use") {
        return res
          .status(CONFLICT)
          .send({ message: "An account exists already with this email" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(BAD_REQUEST)
      .send({ message: "Invalid email or password" });
  }

  if (!validator.isEmail(email)) {
    return res.status(BAD_REQUEST).send({ message: "Invalid email format" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });

      return res.send({ token });
    })
    .catch((err) => {
      console.error("Login error:", err.name);
      if (err.message === "Incorrect email or password") {
        return res
          .status(UNAUTHORIZED)
          .send({ message: "Invalid email or password" });
      }
      return res.status(DEFAULT).send({
        message: "Internal server error from the catch in login controller",
      });
    });
};

const getCurrentUser = (req, res) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      console.error(err);
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      if (err.name === "CastError") {
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.user._id,
    { name: req.body.name, avatar: req.body.avatar },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        console.error(err);
        return res.status(BAD_REQUEST).send({ message: "Invalid data" });
      }
      if (err.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND).send({ message: err.message });
      }
      return res
        .status(DEFAULT)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getCurrentUser,
  loginUser,
  updateUser,
};
