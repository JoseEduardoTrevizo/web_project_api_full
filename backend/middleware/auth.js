const jwt = require("jsonwebtoken");
require("dotenv").config();
const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer")) {
    return res.status(403).send({ message: "Authorization is required" });
  }
  const token = authorization.replace("Bearer ", "");
  let playload;
  try {
    playload = jwt.verify(token, JWT_SECRET || "dev_secret");
  } catch (err) {
    return res.status(403).send({ message: "Authorization is required", err });
  }
  req.user = playload;
  next();
};
