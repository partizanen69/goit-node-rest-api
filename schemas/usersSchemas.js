import Joi from 'joi';

export const registerUserSchema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});
