const { NotFoundError } = require("../../shared/errors");
const List = require("./List");

const showList = async ({ id, user }) => {
  const list = await List.findOne({ _id: id, is_deleted: false, user })
    .select("-is_deleted")
    .populate({
      path: "todos",
      select: "-is_deleted",
    });

  if (!list) {
    throw new NotFoundError("List topilmadi.");
  }

  return list;
};

module.exports = showList;
