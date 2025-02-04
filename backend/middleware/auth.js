const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || authorization.startsWith("Bearer")) {
    return res.status(401).send({ message: "Authorization required" });
  }
  const token = authorization.replace("Bearer", "");
  let playload;
  try {
    playload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res.status(401).send({ message: "Authorization required" });
  }
  req.user = playload;
  next();
};
