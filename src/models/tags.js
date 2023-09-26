import mongoose from "mongoose";

const tagSchema = new mongoose.Schema(
  {
    tag: {
      type: String,
    },
  },
);

tagSchema.methods.toJSON = function () {
  return {
    tag: this.tag,
  };
};

export default mongoose.model("Tag", tagSchema);
