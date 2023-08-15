const { NotFoundError } = require("../../shared/errors");
const User = require("./User");

const removeUser = async ({ id }) => {
  const existing = await User.findOne({ _id: id, is_deleted: false });

  if (!existing) {
    throw new NotFoundError("Foydalanuvchi topilmadi.");
  }

  return User.findByIdAndUpdate(id, {
    is_deleted: true,
    username: `${existing.username}_${Date.now()}_deleted`,
  }).select("-password -is_deleted");
};

module.exports = removeUser;
