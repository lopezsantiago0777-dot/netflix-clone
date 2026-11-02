const options = {
  abortEarly: false,
  stripUnknown: true,
  errors: { wrap: { label: false } },
  messages: {
    'any.required': '{{#label}} es obligatorio',
    'string.empty': '{{#label}} no puede estar vacío',
    'string.base': '{{#label}} no es válido',
    'string.email': 'El email no tiene un formato válido',
    'string.min': '{{#label}} debe tener al menos {{#limit}} caracteres',
    'string.max': '{{#label}} no puede superar los {{#limit}} caracteres',
    'string.uri': '{{#label}} debe ser una URL válida',
  },
};

export const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, options);
  if (error) {
    return res.status(400).json({
      message: 'Datos inválidos',
      errors: error.details.map((d) => d.message),
    });
  }
  req.body = value;
  next();
};