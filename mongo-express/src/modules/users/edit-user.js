const { NotFoundError } = require("../../shared/errors");
const User = require("./User");

const editUser = async ({ id, ...changes }) => {
  const existing = await User.findOne({ _id: id, is_deleted: false });

  if (!existing) {
    throw new NotFoundError("Foydalanuvchi topilmadi.");
  }

  return User.findByIdAndUpdate(id, changes, { new: true }).select(
    "-password -is_deleted"
  );
};

module.exports = editUser;
