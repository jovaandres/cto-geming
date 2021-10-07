const mongoose = require('mongoose');
const uniqueValidator = require("mongoose-unique-validator");
const random = require('mongoose-simple-random');

const QuestionSchema = new mongoose.Schema(
  {
    gistUrl: {
      type: String,
      match: [/https:\/\/gist\.github\.com\//, "is invalid"],
      required: true
    },
    filename: {
      type: String,
      required: true
    },
    language: {
      type: String,
      required: true
    },
    score: {
      type: Number,
      required: true
    }
  }
);

QuestionSchema.plugin(random);
QuestionSchema.plugin(uniqueValidator, {type: "mongoose-unique-validator"});

const Question = mongoose.model("Question", QuestionSchema);

module.exports = Question;
