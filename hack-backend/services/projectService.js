// services/projectService.js
const Project = require('../models/Project');

// Get all projects
exports.getAllProjects = async () => {
  return await Project.find().sort({ name: 1 });
};

// Get project by ID
exports.getProjectById = async (id) => {
  return await Project.findById(id);
};

// Create a project
exports.createProject = async (projectData) => {
  const project = new Project(projectData);
  await project.save();
  return project;
};

// Update a project
exports.updateProject = async (id, updateData) => {
  return await Project.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

// Delete a project
exports.deleteProject = async (id) => {
  return await Project.findByIdAndDelete(id);
};