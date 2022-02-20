const Joi = require("joi");
const mongoose = require("mongoose");

//creating a model
const Team = mongoose.model(
  "Team",
  new mongoose.Schema({
    id: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    role: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    password: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 1024,
    },
  })
);

/*
 * model validation schema
 */
function validateMember(member) {
  const schema = Joi.object({
    id: Joi.string(),
    name: Joi.string().min(5).max(50),
    role: Joi.string().min(5).max(50),
    email: Joi.string().min(5).max(50),
    password: Joi.string().min(5).max(255).required(),
  });
  return schema.validate(member);
}

exports.Team = Team;
exports.validateMember = validateMember;
