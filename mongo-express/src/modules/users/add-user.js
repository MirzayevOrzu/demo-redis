const { hash } = require("bcryptjs");
const User = require("./User");

const addUser = async (data) => {
  const hashedPassword = await hash(data.password, 10);
  const result = await User.create({
    ...data,
    password: hashedPassword,
  });

  const { password, is_deleted, ...rest } = result.toObject();

  return rest;
};

module.exports = addUser;
