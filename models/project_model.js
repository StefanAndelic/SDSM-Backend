const Joi = require("joi");
const mongoose = require("mongoose");

//creating a model
const Project = mongoose.model(
  "Project",
  new mongoose.Schema({
    id: {
      type: String,
      required: true,
      trim: true,
      maxlength: 255,
    },
    phase: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    activity: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
      maxlength: 255,
    },
    task: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    input: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
    output: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 255,
    },
  })
);

/*
 * model validation schema
 */
function validateProject(project) {
  const schema = Joi.object({
    id: Joi.string(),
    phase: Joi.string().min(5).max(50),
    activity: Joi.string().min(5).max(50),
    task: Joi.string().min(5).max(50),
    input: Joi.string().min(5).max(50),
    output: Joi.string().min(5).max(50),
  });
  return schema.validate(project);
}

exports.Project = Project;
exports.validateProject = validateProject;
