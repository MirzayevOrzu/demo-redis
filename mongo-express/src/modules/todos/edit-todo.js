const { NotFoundError } = require("../../shared/errors");
const Todo = require("./Todo");
const List = require("../lists/List");

const editTodo = async ({ id, user, list, ...changes }) => {
  const existing = await Todo.findOne({ _id: id, is_deleted: false, user });

  if (!existing) {
    throw new NotFoundError("Todo topilmadi.");
  }

  if (list) {
    const existingList = await List.findOne({ _id: list, user });

    if (!existingList) {
      throw new NotFoundError("List topilmadi.");
    }
  }

  return Todo.findByIdAndUpdate(id, changes, { new: true }).select(
    "-is_deleted"
  );
};

module.exports = editTodo;
