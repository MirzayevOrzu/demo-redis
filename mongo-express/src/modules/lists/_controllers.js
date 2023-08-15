const httpValidator = require("../../shared/http-validator");
const {
  postListSchema,
  getListSchema,
  patchListSchema,
  deleteListSchema,
} = require("./_schemas");
const addList = require("./add-list");
const editList = require("./edit-list");
const listLists = require("./list-lists");
const removeList = require("./remove-list");
const showList = require("./show-list");

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const postList = async (req, res, next) => {
  try {
    httpValidator({ body: req.body }, postListSchema);

    const result = await addList({ ...req.body, user: req.user.id });

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getLists = async (req, res, next) => {
  try {
    const result = await listLists({ filters: { user: req.user.id } });

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const getList = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, getListSchema);

    const result = await showList({ id: req.params.id, user: req.user.id });

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const patchList = async (req, res, next) => {
  try {
    httpValidator({ params: req.params, body: req.body }, patchListSchema);

    const result = await editList({
      id: req.params.id,
      user: req.user.id,
      ...req.body,
    });

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @param {express.Request} req
 * @param {express.Response} res
 * @param {express.NextFunction} next
 */
const deleteList = async (req, res, next) => {
  try {
    httpValidator({ params: req.params }, deleteListSchema);

    const result = await removeList({
      id: req.params.id,
      user: req.user.id,
    });

    res.status(201).json({
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  postList,
  getLists,
  getList,
  patchList,
  deleteList,
};
