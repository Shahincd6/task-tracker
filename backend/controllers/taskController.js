import Task from '../models/Task.js';

const createTask = async (req, res) => {
  const task = await Task.create({ 
    project: req.body.projectId,
    title: req.body.title,
    description: req.body.description
  });
  res.status(201).json(task);
};

const getTasks = async (req, res) => {
  const tasks = await Task.find({ project: req.params.projectId });
  res.json(tasks);
};

const updateTask = async (req, res) => {
  const task = await Task.findById(req.params.taskId);

  if (task) {
    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.status = req.body.status || task.status;

    if (task.status === 'Completed') {
      task.dateCompleted = new Date();
    }

    const updatedTask = await task.save();
    res.json(updatedTask);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
};

const deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.taskId);
  
      if (task) {
        res.json({ message: 'Task removed' });
      } else {
        res.status(404).json({ message: 'Task not found' });
      }
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
  

export { createTask, getTasks, updateTask, deleteTask };
