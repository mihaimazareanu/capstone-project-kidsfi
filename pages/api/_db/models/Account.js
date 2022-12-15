import mongoose from "mongoose";

const AccountSchema = new mongoose.Schema({
  id: {type: mongoose.Types.ObjectId},

  name: {
    type: String,
  },
  startAmount: {
    type: Number,
  },
});

// This is important in serverless environments: Check if the model exists and otherwise create a new one.
// The model name is the first parameter you pass to mongoose.model()

export const Account =
  mongoose.models.Account ||
  mongoose.model("Account", AccountSchema, "children");
