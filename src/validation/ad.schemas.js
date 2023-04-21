import * as Joi from 'joi';

export const schemas = Joi.object({
  title: Joi
  .string()
  .max(250)
  .required()
  .messages({
    'string.base': 'Le titre est obligatoire',
    'string.empty': 'Le titre est obligatoire',
    'any.required': 'Le titre est obligatoire',
    'string.max': 'Le titre doit contenir au maximum 250 caractères',
  }),
content: Joi
  .string()
  .max(250)
  .required()
  .messages({
    'string.base': 'Le résumé est obligatoire',
    'string.empty': 'Le résumé est obligatoire',
    'any.required': 'Le résumé est obligatoire',
    'string.max': 'Le résumé doit contenir au maximum 250 caractères',
  }),
postal_code: Joi
  .string()
  // regex from our SQl DOMAIN "postal_code_fr" in DB
  .pattern(/(^0[1-9]\d{3}$)|(^1\d{4}$)|(^20[012]\d{2}$|^20600$|^20620$)|(^2[1-9]\d{3}$)|(^[3-8]\d{4}$)|(^9[0-5]\d{3}$)/)
  .required()
  .messages({
    'string.base': 'Le code postal est obligatoire',
    'string.empty': 'Le code postal est obligatoire',
    'string.pattern.base': 'Le code postal n\'est pas au bon format',
    'any.required': 'Le code postal est obligatoire',
  }),
city: Joi
  .string()
  .min(2)
  .required()
  .messages({
    'string.base': 'La ville est obligatoire',
    'string.empty': 'La ville est obligatoire',
    'string.min': 'La ville doit contenir au moins 2 caractères',
    'any.required': 'La ville est obligatoire',
  }),
});
