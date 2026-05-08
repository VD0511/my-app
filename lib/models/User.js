import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    age: {
      type: Number,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    contact: {
      type: String,
      default: "",
    },

    education: {
      type: String,
      default: "",
    },

    hobby: {
      type: String,
      default: "",
    },

    interest: {
      type: String,
      default: "",
    },

    profilePic: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

// Prevent model overwrite error
export const User =
  mongoose.models.users || mongoose.model("users", userSchema);
