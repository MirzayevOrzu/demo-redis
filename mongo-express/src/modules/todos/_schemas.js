const Joi = require("joi");

exports.postTodoSchema = {
  body: Joi.object({
    text: Joi.string().required(),
    list: Joi.string().required(),
  }),
};

exports.getTodoSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

exports.patchTodoSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    text: Joi.string(),
    is_done: Joi.boolean(),
    list: Joi.string(),
  }),
};

exports.deleteTodoSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
