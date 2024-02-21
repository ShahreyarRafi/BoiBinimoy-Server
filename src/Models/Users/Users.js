const bcrypt = require("bcrypt");
const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      maxlength: [30, "User name length can be maximum 30 characters"],
      minlenght: [3, "User name length can be minimum 3 characters"],
    },
    email: {
      type: String,
      required: [true, "User email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (v) => {
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
            v
          );
        },
        message: "Please enter a valid email",
      },
    },
    password: {
      type: String,
      // required: [true, "User password is required"],
      minlenght: [6, "User password length can be minimum 6 characters"],
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
    },
    phone_number: {
      type: String
    },
    image: {
      type: String,
      default: "https://i.ibb.co/8zx0Bd0/placeholder.png"
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
    },
    profession: {
      type: String,
    },
    date_of_birth: {
      type: String,
    },
    reg_date: {
      type: String,
    },
    location: {
      country: {
        type: String,
      },
      city: {
        type: String,
      },
      street: {
        type: String,
      },
      address_line: {
        type: String,
      },
      zip_code: {
        type: String,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isModerator: {
      type: Boolean,
      default: false,
    },
    isPublisher: {
      type: Boolean,
      default: false,
    },
    isSeller: {
      type: Boolean,
      default: false,
    },
    isUser: {
      type: Boolean,
      default: true,
    },
    interest: {
      type: [String],
    },
    isBanne: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Users = model("Users", userSchema);

module.exports = Users;
