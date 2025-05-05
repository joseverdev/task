const Joi = require('joi');

const id = Joi.string().min(1);
const username = Joi.string().min(3).max(30);
const password = Joi.string().min(3).max(30);

const createUserSchema = Joi.object({
  username: username.required(),
  password: password.required(),
})



module.exports = { createUserSchema};