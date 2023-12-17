import jwt from "jsonwebtoken";

export const verifytoken = async (req, res, next) => {
  const header = req.headers.authorization;

  const token = header && header.split(" ")[1];
  try {
    if (token == null) return res.sendStatus(401);
    jwt.verify(token, process.env.SecretKey, (err, user) => {
      if (err) return res.sendStatus(403);

      next();
    });
  } catch (err) {
    res.send(err.message);
  }
};