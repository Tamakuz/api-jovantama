import mongoose from "mongoose";

const usingNowSchema = new mongoose.Schema(
  {
    using_now: [
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

export default mongoose.model("Using_now", usingNowSchema);
