import Joi from 'joi';

export const createContactSchema = Joi.object({
  name: Joi.string().required().min(1),
  email: Joi.string().required().email(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

export const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
})
  .min(1)
  .messages({
    'object.min': 'Body must have at least one field',
  });

export const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});
