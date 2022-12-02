import mongoose from "mongoose";

// This is a demo model! Create your own model files in this directory to model your data.

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },

  isParent: {
    type: Boolean,
  },

  isChild: {
    type: Boolean,
  },

  accounts: {
    type: Object,
  },
});

// This is important in serverless environments: Check if the model exists and otherwise create a new one.
// The model name is the first parameter you pass to mongoose.model()

export const User =
  mongoose.models.User || mongoose.model("User", UserSchema, "users");
