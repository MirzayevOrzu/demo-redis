const { NotFoundError } = require("../../shared/errors");
const Todo = require("./Todo");

const removeTodo = async ({ id, user }) => {
  const existing = await Todo.findOne({ _id: id, is_deleted: false, user });

  if (!existing) {
    throw new NotFoundError("Todo topilmadi.");
  }

  return Todo.findByIdAndUpdate(id, { is_deleted: true }).select("-is_deleted");
};

module.exports = removeTodo;
