import express from "express";
import bodyParser from "body-parser";
import Project from "./models/project.js";
import clientRouter from "./routes/auth-route.js";
import projectRouter from "./routes/project-route.js";
import taskRouter from "./routes/task-route.js";
import dotenv from "dotenv";
import db from "./db.js";
import jwtAuth from "./middleware/jwtMiddleware.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
// jwtAuth,
app.get("/api/home", jwtAuth, async (req, res) => {
  try {
    const data = await Project.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.use("/", clientRouter);
app.use("/", projectRouter);
app.use("/project", taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
