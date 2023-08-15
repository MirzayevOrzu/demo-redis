const Todo = require("./Todo");

const listTodos = async ({ filters = {} }) => {
  const lists = await Todo.find({ ...filters, is_deleted: false });

  return lists;
};

module.exports = listTodos;
