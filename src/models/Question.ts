import * as mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";
import random from "mongoose-simple-random";

const QuestionSchema = new mongoose.Schema(
  {
    gistId: {
      type: String,
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
    choice: {
      type: Array,
      required: true,
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

export = Question;
