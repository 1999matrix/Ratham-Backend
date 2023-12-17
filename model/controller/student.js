import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/student.js";

export const stdregister = async (req, res) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const newuser = new User({
      ...req.body,
      password: hash,
    });
    const saveduser = await newuser.save();
    res.status(200).json(saveduser);
  } catch (err) {
    throw err;
  }
};
export const stdlogin = async (req, res, next) => {
  try {
    const user = await User.findOne({ universityid: req.body.universityid });
    if (!user) return res.status(401).json("user not found");

    const passwordcorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordcorrect) return res.status(401).json("incorrect password");

    const token = jwt.sign({ id: user.universityid }, process.env.SecretKey);

    const { password, ...other } = user;

    res.status(200).json({ token: token });
  } catch (err) {
    res.json(err);
  }
};