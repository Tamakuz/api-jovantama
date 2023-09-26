import mongoose from "mongoose";

const learningSchema = new mongoose.Schema(
  {
    learning: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Skill",
      },
    ],
    author: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Learning", learningSchema);