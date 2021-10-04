const mongoose = require("mongoose");
const crypto = require("crypto");
const uniqueValidator = require("mongoose-unique-validator");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      lowercase: true,
      unique: true,
      index: true,
      required: [true, "is required"],
      match: [/\S+@\S+\.\S+/, "is invalid"]
    },
    isEmailConfirmed: {
      type: Boolean,
      default: false
    },
    firstName: {
      type: String,
      lowercase: true,
      required: [true, "is required"]
    },
    lastName: {
      type: String,
      lowercase: true,
      required: [true, "is required"]
    },
    salt: String,
    hash: String,
    suspended: { type: Boolean, default: false }
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { type: "mongoose-unique-validator" });

UserSchema.methods.setPassword = function(password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.validPassword = function(password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 10000, 512, "sha512")
    .toString("hex");
  return this.hash === hash;
};

UserSchema.methods.generateJWT = function() {
  const today = new Date();
  let exp = new Date(today);
  exp.setDate(today.getDate() + 30);

  return jwt.sign(
    {
      sub: "user",
      id: this._id,
      exp: parseInt(exp.getTime() / 1000)
    },
    process.env.APP_SECRET
  );
};

UserSchema.methods.authSerialize = function(accessToken = true) {
  return {
    id: this.id,
    email: this.email,
    firstName: this.firstName,
    lastName: this.lastName,
    isEmailConfirmed: this.isEmailConfirmed,
    accessToken: (() => {
      if (!accessToken) {
        return undefined;
      }
      return this.generateJWT();
    })()
  };
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
