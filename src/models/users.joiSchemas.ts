import Joi from "joi";

export const userSchemaJoi = Joi.object().keys({
    email: Joi.string().email().required()
  });