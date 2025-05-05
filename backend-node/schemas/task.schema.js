const Joi = require('joi');

const id = Joi.string().min(1);
const description = Joi.string().min(3).max(100);
const done = Joi.boolean();
const userId = Joi.string().min(1);

const createTaskSchema = Joi.object({
  description: description.required(),
  userId: userId.required(),
});

const updateTaskSchema = Joi.object({
  description,
});

const getTaskSchema = Joi.object({
  id: id.required(),
});



module.exports = { createTaskSchema, updateTaskSchema, getTaskSchema };