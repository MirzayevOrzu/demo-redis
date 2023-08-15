const { compare } = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UnauthorizedError } = require("../../shared/errors");
const config = require("../../shared/config");
const User = require("./User");

const loginUser = async ({ username, password }) => {
  const existing = await User.findOne({ username, is_deleted: false });

  if (!existing) {
    throw new UnauthorizedError("Incorrect username or password.");
  }

  const match = await compare(password, existing.password);

  if (!match) {
    throw new UnauthorizedError("Incorrect username or password.");
  }

  const token = jwt.sign({ user: { id: existing._id } }, config.jwt.secret);

  return token;
};

module.exports = loginUser;
