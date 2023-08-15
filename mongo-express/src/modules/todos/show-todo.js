const { NotFoundError } = require("../../shared/errors");
const Todo = require("./Todo");

const showTodo = async ({ id, user }) => {
  const todo = await Todo.findOne({ _id: id, is_deleted: false, user })
    .select("-is_deleted")
    .populate("list", "-is_deleted"); // populate 1-usul
  // .populate({ path: "list", select: "-is_deleted" }) // populate 2-usul
  // .populate({ path: "user", select: "-password -is_deleted" }) // populate 2-usul
  // .populate([ // populate 3-usul
  //   { path: "list", select: "-is_deleted" },
  //   { path: "user", select: "-password -is_deleted" },
  // ])

  if (!todo) {
    throw new NotFoundError("Todo topilmadi.");
  }

  return todo;
};

module.exports = showTodo;
