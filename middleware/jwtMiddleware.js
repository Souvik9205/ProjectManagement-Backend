import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const jwtAuth = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const user = jsonwebtoken.verify(token, process.env.TOKEN_KEY);
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "invalid token" });
  }
};

export default jwtAuth;
