import slot from "../model/slots.js";
import bookedslot from "../model/bookedslots.js";
import student from "../model/student.js";
export const getslots = async (req, res, next) => {
  try {
    const slots = await slot.find();

    const filteredslots = await slots.map((c) => {
      const { createdAt, updatedAt, __v, ...other } = c._doc;
      return other;
    });

    res.status(200).json(filteredslots);
  } catch (err) {
    res.json(err);
  }
};

const updateslot = async (id) => {
  try {
    const slots = await slot.updateOne({ _id: id }, { status: "Fill" });
  } catch (err) {
    res.json(err);
  }
};

export const bookslots = async (req, res, next) => {
  try {
    const studentdetails = await student.findOne({
      universityid: req.body.studentid,
    });
    const booking = new bookedslot({
      deanid: req.body.deanid,
      studentid: req.body.studentid,
      slotid: req.body.slotid,
      studentname: studentdetails.name,
    });
    const bookedslots = await booking.save();
    updateslot(req.body.slotid);
    res.status(200).json(bookedslots);
  } catch (err) {
    res.json(err);
  }
};
export const getpendingsessions = async (req, res) => {
  try {
    const slots = await bookedslot
      .find({ deanid: req.params.deanid })
      .populate("slotid");
    const filteredslots = await slots.map((c) => {
      const details = {
        Yourid: c.deanid,
        slotname: c.slotid.slotname,
        slottime: c.slotid.time,
        studentname: c.studentname,
        studentid: c.studentid,
      };
      return details;
    });
    const result = filteredslots.filter((c) => c.slottime >= 10);
    res.status(200).json(result);
  } catch (err) {
    res.json(err);
  }
};