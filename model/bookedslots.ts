import mongoose from "mongoose";

const bookslotSchema = new mongoose.Schema(
  {
    deanid: {
      type: Number,
      required: true,
    },
    slotid: {
      type: mongoose.Types.ObjectId,
      required: true,
      unique: true,
      ref: "Slots",
    },
    studentid: {
      type: Number,
      required: true,
    },
    studentname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("bookslots", bookslotSchema);