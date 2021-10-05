const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const random = require('mongoose-simple-random');

const QuestionSchema = new mongoose.Schema(
  {
    gistUrl: {
      type: String,
      match: [/https:\/\/api\.github\.com\/$/, "is invalid"],
      required: true
    },
    filename: {
      type: String,
      match: [/\S+\.\S/, "is invalid"],
      required: true
    },
    language: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      default: Math.floor(Math.random() * (25 - 5 + 1)) + 5
    }
  }
);

QuestionSchema.plugin(random);
QuestionSchema.plugin(uniqueValidator, {type: "mongoose-unique-validator"});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
