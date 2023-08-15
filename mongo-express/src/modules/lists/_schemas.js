const Joi = require("joi");

exports.postListSchema = {
  body: Joi.object({
    name: Joi.string().required(),
  }),
};

exports.getListSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};

exports.patchListSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
  body: Joi.object({
    name: Joi.string(),
  }),
};

exports.deleteListSchema = {
  params: Joi.object({
    id: Joi.string().required(),
  }),
};
