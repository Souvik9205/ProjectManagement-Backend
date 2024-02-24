import express from "express";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";
const clientRouter = express.Router();
import Client from "../models/client.js";
import dotenv from "dotenv";
import jwtAuth from "../middleware/jwtMiddleware.js";
dotenv.config();

clientRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newClient = new Client({ username, password: hashedPassword });
    const result = await newClient.save();

    const token = jsonwebtoken.sign(
      { id: result._id, username: result.username },
      process.env.TOKEN_KEY,
      { expiresIn: 30000 }
    );
    console.log("client data stored");
    res.status(200).json({ token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

clientRouter.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const client = await Client.findOne({ username });
    if (!client) {
      return res.status(404).json({ message: "Client not found" });
    }
    const match = await bcrypt.compare(password, client.password);
    if (match) {
      const token = jsonwebtoken.sign(
        { id: client._id, username: client.username },
        process.env.TOKEN_KEY,
        { expiresIn: 30000 }
      );
      res.status(200).json(token);
    } else {
      res.status(401).json({ message: "Invalid password" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default clientRouter;
