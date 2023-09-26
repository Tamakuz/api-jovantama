import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    titleSkill: {
      type: String,
      required: [true, "Nama skill wajib diisi"],
    },
    svg: {
      type: String,
    },
    fileNameSvg: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Skill", skillSchema)
