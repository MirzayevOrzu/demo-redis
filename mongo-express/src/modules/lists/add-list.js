const List = require("./List");

const addList = async (data) => {
  const result = await List.create(data);

  const { is_deleted, ...rest } = result.toObject();

  return rest;
};

module.exports = addList;
