import mongoose from "mongoose";

const SlotSchema = new mongoose.Schema(
  {
    deanid: {
      type: Number,
      required: true,
    },
    deanname: {
      type: String,
      required: true,
    },
    slotname: {
      type: String,
      required: true,
    },
    time: {
      type: Number,
      required: true,
    },
    day: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Slots", SlotSchema);