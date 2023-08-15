const { NotFoundError } = require("../../shared/errors");
const List = require("./List");

const removeList = async ({ id, user }) => {
  const existing = await List.findOne({ _id: id, is_deleted: false, user });

  if (!existing) {
    throw new NotFoundError("List topilmadi.");
  }

  return List.findByIdAndUpdate(id, { is_deleted: true }).select("-is_deleted");
};

module.exports = removeList;
