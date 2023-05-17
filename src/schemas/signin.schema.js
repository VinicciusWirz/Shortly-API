import Joi from "joi";

export const signinSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
