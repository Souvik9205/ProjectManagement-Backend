import express from "express";
const taskRouter = express.Router();
import Project from "../models/project.js";

taskRouter.put("/:id/taskcreate", async (req, res) => {
  try {
    const projectid = req.params.id;
    const taskName = req.body.name;
    const project = await Project.findById(projectid);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const existingTask = project.task.find((task) => task.name === taskName);
    if (existingTask) {
      return res
        .status(400)
        .json({ message: "Task with the same name already exists" });
    }
    project.task.push({ name: taskName });
    const response = await project.save();
    console.log("Task added to project:", taskName);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
taskRouter.get("/:id/task", async (req, res) => {
  try {
    const projectId = req.params.id;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const tasks = project.task;
    console.log("Tasks fetched");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
taskRouter.get("/:id/task/:taskid", async (req, res) => {
  try {
    const projectId = req.params.id;
    const taskId = req.params.taskid;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const task = project.task.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    console.log("Tasks fetched");
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
taskRouter.put("/:projectId/task/:taskId", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const { name } = req.body;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const task = project.task.id(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    task.name = name;
    const updatedProject = await project.save();
    console.log("Task updated");
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
taskRouter.delete("/:projectId/task/:taskId", async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const taskId = req.params.taskId;
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    const taskIndex = project.task.findIndex((task) => task._id == taskId);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
    project.task.splice(taskIndex, 1);
    const updatedProject = await project.save();
    console.log("Task deleted");
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default taskRouter;
