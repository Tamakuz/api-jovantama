import mongoose from "mongoose";

const workSchema = new mongoose.Schema(
  {
    titleWork: {
      type: String,
      required: true,
    },
    destImage: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
    tags: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    desc: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Work", workSchema)
