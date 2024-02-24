import express from "express";
import jsonwebtoken from "jsonwebtoken";
const clientRouter = express.Router();
import Client from "../models/client.js";
import dotenv from "dotenv";
dotenv.config();

clientRouter.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    const newClient = new Client({ username, password });
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
    if (password === client.password) {
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
