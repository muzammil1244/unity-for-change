import jwt from "jsonwebtoken";
import { ProfileData } from "../module/Profile.js";

export const Authmiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ error: "Token required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_TOKEN);

    const userdata = await ProfileData.findById(decoded._id);
    if (!userdata) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = userdata;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ error: "Token expired" });
    } else if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ error: "Invalid token" });
    } else {
      console.error("Auth Middleware Error:", err);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
};
