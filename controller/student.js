// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";
// import User from "../model/student.js";

// export const stdregister = async (req, res) => {
//   try {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(req.body.password, salt);
//     const newuser = new User({
//       ...req.body,
//       password: hash,
//     });
//     const saveduser = await newuser.save();
//     res.status(200).json(saveduser);
//   } catch (err) {
//     throw err;
//   }
// };
// export const stdlogin = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ universityid: req.body.universityid });
//     if (!user) return res.status(401).json("user not found");

//     const passwordcorrect = await bcrypt.compare(
//       req.body.password,
//       user.password
//     );
//     if (!passwordcorrect) return res.status(401).json("incorrect password");

//     const token = jwt.sign({ id: user.universityid }, process.env.SecretKey);

//     const { password, ...other } = user;

//     res.status(200).json({ token: token });
//   } catch (err) {
//     res.json(err);
//   }
// };


import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../model/student.js";

export const stdregister = async (req, res) => {
  try {
    // const saltRounds = 10;
    // const salt = bcrypt.genSaltSync(saltRounds);
    // const hashedPassword = bcrypt.hashSync(req.body.password, salt);
   

    const newUser = new User({
      ...req.body,
      // password: hashedPassword,
      password: req.body.password,
    });

    const savedUser = await newUser.save();
    res.status(200).json(savedUser);
  } catch (err) {
     console.error(err);
    res.status(500).json({ error: "Internal Server Error " });
  }
};

export const stdlogin = async (req, res) => {
  try {
    const user = await User.findOne({ universityid: req.body.universityid });

    if (!user) {
      return res.status(401).json("User not found");
    }

    const passwordCorrect = await bcrypt.compare(
      req.body.password || "", // Add this line to handle undefined password
      user.password
    );

    if (!passwordCorrect) {
      return res.status(401).json("Incorrect password");
    }

    const token = jwt.sign({ id: user.universityid }, process.env.SecretKey);

    const { password, ...userWithoutPassword } = user;

    res.status(200).json({ token, user: userWithoutPassword });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
