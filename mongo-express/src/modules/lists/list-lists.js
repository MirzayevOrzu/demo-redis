const List = require("./List");

const listLists = async ({ filters = {} }) => {
  const lists = await List.find({ ...filters, is_deleted: false });

  return lists;
};

module.exports = listLists;
