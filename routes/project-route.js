import express from "express";
const projectRouter = express.Router();
import Project from "../models/project.js";

projectRouter.post("/create", async (req, res) => {
  try {
    const projectData = req.body;
    const newProject = new Project(projectData);
    const result = await newProject.save();
    console.log("project data stored");
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
projectRouter.get("/project/:id", async (req, res) => {
  try {
    const projectId = req.params.id;
    const response = await Project.findById(projectId);
    if (!response) {
      res.status(404).send("Project not found");
    }
    console.log("Project data fetched");
    res.status(200).send(response);
  } catch (err) {
    res.status(500).send("Internal server error");
  }
});
projectRouter.put("/update/:id", async (req, res) => {
  try {
    const projectid = req.params.id;
    const updatedProject = req.body;
    const response = await Project.findByIdAndUpdate(
      projectid,
      updatedProject,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!response) {
      return res.status(404).json({ message: "Project not found" });
    }
    console.log("data updated");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
projectRouter.delete("/delete/:id", async (req, res) => {
  try {
    const projectid = req.params.id;
    const response = await Project.findByIdAndDelete(projectid);
    if (!response) {
      return res.status(404).json({ message: "Project not found" });
    }
    console.log("data deleted");
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default projectRouter;
