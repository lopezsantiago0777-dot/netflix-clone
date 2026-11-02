import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().trim().min(2).max(50).required().label('El nombre'),
  lastName: Joi.string().trim().min(2).max(50).required().label('El apellido'),
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .label('El email'),
  password: Joi.string().min(8).max(64).required().label('La contraseña'),
  avatarUrl: Joi.string().uri().allow('').optional().label('El avatar'),
});

export const loginSchema = Joi.object({
  email: Joi.string()
    .trim()
    .lowercase()
    .email({ tlds: { allow: false } })
    .required()
    .label('El email'),
  password: Joi.string().required().label('La contraseña'),
});