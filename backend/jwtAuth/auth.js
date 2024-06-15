const jwt = require("jsonwebtoken");
const secret = process.env.secret;

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).json({ msg: "JWT Auth failed! No token." });
  } else {
    try {
      await jwt.verify(token, secret, (error, decoded) => {
        if (error) {
          return res.status(401).json({ msg: "Token verification failed!" });
        } else {
          req.user = decoded.user;
          next();
        }
      });
    } catch (err) {
      console.error("Auth Error!");
      res.status(500).json({ msg: "Server Error!" });
    }
  }
};

module.exports = auth;
