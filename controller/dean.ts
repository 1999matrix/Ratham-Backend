import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/dean";
import slots from "../model/slots";
import { Document, Types } from "mongoose";

const createslot = async (id: string, name: string) => {
  const slot1 = new slots({
    deanid: id,
    deanname: name,
    slotname: "Slot 1",
    time: 10,
    day: "Thursday",
    status: "available",
  });
  const slot2 = new slots({
    deanid: id,
    deanname: name,
    slotname: "Slot 2",
    time: 10,
    day: "Friday",
    status: "available",
  });

  const newslot1 = await slot1.save();
  const newslot2 = await slot2.save();
};

export const dnregister = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newuser = new User({
      ...req.body,
      password: hash,
    });
    const saveduser = await newuser.save();
    createslot(req.body.universityid, req.body.name);
    res.status(200).json(saveduser);
  } catch (err) {
    throw err;
  }
};
export const dnlogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ universityid: req.body.universityid });
    if (!user) return res.status(401).json("user not found");

    const passwordcorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordcorrect) return res.status(401).json("incorrect password");

    const token = jwt.sign({ id: user.universityid }, process.env.SecretKey!);

    const { password, ...other } = user;

    res.status(200).json(token);
  } catch (err) {
    res.json(err);
  }
};