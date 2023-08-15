const Joi = require("joi");

module.export = (sortFields) =>
  Joi.object({
    by: Joi.string().valid(...sortFields),
    order: Joi.string().valid("asc", "desc"),
  });
