const Joi = require("joi");

module.exports = Joi.object({
  offset: Joi.number().integer(),
  limit: Joi.number().integer().when("offset", {
    is: Joi.exist(),
    then: Joi.required(),
    otherwise: Joi.forbidden(),
  }),
});
