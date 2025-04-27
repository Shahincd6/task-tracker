import Project from '../models/Project.js';

const createProject = async (req, res) => {
  const projectsCount = await Project.countDocuments({ user: req.user._id });
  
  if (projectsCount >= 4) {
    return res.status(400).json({ message: 'Maximum 4 projects allowed' });
  }

  const project = await Project.create({ user: req.user._id, title: req.body.title });
  res.status(201).json(project);
};

const getProjects = async (req, res) => {
  const projects = await Project.find({ user: req.user._id });
  res.json(projects);
};
 
const deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { createProject, getProjects , deleteProject };
