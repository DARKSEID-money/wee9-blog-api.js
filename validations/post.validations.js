const Joi = require("joi");

const createPostSchema = Joi.object({
  title: Joi.string().min(5).required(),
  content: Joi.string().min(20).required(),
  author: Joi.string().optional().default("Guest"),
});

const updatePostSchema = Joi.object({
  title: Joi.string().min(5).optional(),
  content: Joi.string().min(20).optional(),
  author: Joi.string().optional(),
}).min(1);

module.exports = { createPostSchema, updatePostSchema };