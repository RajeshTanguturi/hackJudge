// controllers/projectController.js
const Project = require('../models/Project');
const projectService = require('../services/projectService');
const resultService = require('../services/resultService');
const Student = require('../models/Student');

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await projectService.getProjectById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a project

exports.createProject = async (req, res) => {
  try {
    const {
      name,
      description,
      teamName,
      teamMembers,
      projectUrl,
      githubUrl,
      demoUrl,
      technologies,
      category,
      hackathonId
    } = req.body;

    if (!hackathonId) {
      return res.status(400).json({ msg: 'hackathonId is required' });
    }

    // Extract all emails from teamMembers
    const emails = teamMembers.map(member => member.email);

    // Check if any team member is already in another project for this hackathon
    const alreadyEnrolled = await Project.find({
      "teamMembers.email": { $in: emails },
      hackathonId: hackathonId
    });

    if (alreadyEnrolled.length > 0) {
      // Collect emails of already enrolled students
      const enrolledEmails = [];
      alreadyEnrolled.forEach(project => {
        project.teamMembers.forEach(member => {
          if (emails.includes(member.email) && !enrolledEmails.includes(member.email)) {
            enrolledEmails.push(member.email);
          }
        });
      });
      return res.status(400).json({
        msg: 'Some team members are already enrolled in another project for this hackathon',
        alreadyEnrolled: enrolledEmails
      });
    }

    // Check if all team members are registered students
    const registeredStudents = await Student.find({ email: { $in: emails } }).select('email');
    const registeredEmails = registeredStudents.map(s => s.email);
    const notRegistered = emails.filter(email => !registeredEmails.includes(email));
    if (notRegistered.length > 0) {
      return res.status(400).json({ msg: 'Some team members are not registered', notRegistered });
    }

    const project = await projectService.createProject({
      name,
      description,
      teamName,
      teamMembers: teamMembers || [],
      projectUrl,
      githubUrl,
      demoUrl,
      technologies: technologies || [],
      category,
      hackathonId: hackathonId
    });

    res.json(project);
  } catch (err) {
    console.error("Error Creating project ", err.message);
    res.status(500).send('Server Error');
  }
};


// Update a project
exports.updateProject = async (req, res) => {
  try {
    const {
      name,
      description,
      teamName,
      teamMembers,
      projectUrl,
      githubUrl,
      demoUrl,
      technologies,
      category,
      isActive
    } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (teamName) updateData.teamName = teamName;
    if (teamMembers) updateData.teamMembers = teamMembers;
    if (projectUrl) updateData.projectUrl = projectUrl;
    if (githubUrl) updateData.githubUrl = githubUrl;
    if (demoUrl) updateData.demoUrl = demoUrl;
    if (technologies) updateData.technologies = technologies;
    if (category) updateData.category = category;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    const project = await projectService.updateProject(req.params.id, updateData);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const project = await projectService.deleteProject(req.params.id);
    
    if (!project) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    
    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Get project results
exports.getProjectResults = async (req, res) => {
  try {
    const results = await resultService.getProjectResults(req.params.id);
    
    if (!results) {
      return res.status(404).json({ msg: 'Results not found' });
    }
    
    res.json(results);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found' });
    }
    res.status(500).send('Server Error');
  }
};
