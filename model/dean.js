import mongoose from "mongoose";

const DeanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    universityid: {
      type: Number,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Dean", DeanSchema);