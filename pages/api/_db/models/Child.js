import mongoose from "mongoose";

// This is a demo model! Create your own model files in this directory to model your data.

const ChildSchema = new mongoose.Schema({
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

  isChild: {
    type: Boolean,
  },

  parentID: {
    type: mongoose.Types.ObjectId,
  },

  accounts: [
    {
      id: {type: mongoose.Types.ObjectId},

      name: {
        type: String,
      },

      startAmount: {
        type: Number,
      },

      interestRate: {
        type: Number,
      },

      stockName: {
        type: String,
      },

      WKN: {
        type: String,
      },

      startDate: {
        type: Date,
      },

      pcs: {
        type: Number,
      },
    },
  ],
});

// This is important in serverless environments: Check if the model exists and otherwise create a new one.
// The model name is the first parameter you pass to mongoose.model()

export const Child =
  mongoose.models.Child || mongoose.model("Child", ChildSchema, "children");
