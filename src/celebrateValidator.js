const { celebrate, Joi, Segments} = require('celebrate');

module.exports = {
  signup: celebrate({
    [Segments.body]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      password: Joi.string().required(),
    }),
  }),
}