import asyncHandler from 'express-async-handler';
import Task from '../models/TaskModel.js';

// @desc    Create a new task
// @route   POST /api/tasks
// @access  Private
export const createTask = asyncHandler(async (req, res) => {
  const { title, description, dueDate, priority, assignees } = req.body;

  if (!title || !description || !dueDate || !priority || !assignees || !Array.isArray(assignees) || assignees.length === 0) {
    res.status(400);
    throw new Error('Please fill all required fields and assign at least one user');
  }

  const validStatuses = ['Todo', 'In Progress', 'Done'];
  if (req.body.status && !validStatuses.includes(req.body.status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const validPriorities = ['Low', 'Medium', 'High'];
  if (!validPriorities.includes(priority)) {
    res.status(400);
    throw new Error('Invalid priority');
  }

  if (isNaN(new Date(dueDate))) {
    res.status(400);
    throw new Error('Invalid due date');
  }

  const task = await Task.create({
    title,
    description,
    dueDate,
    priority,
    status: req.body.status || 'Todo',
    assignees,
    reporter: req.user._id,
  });

  res.status(201).json(task);
});

// @desc    Get all tasks (open to all logged-in users)
// @route   GET /api/tasks
// @access  Private
export const getTasks = asyncHandler(async (req, res) => {
  const { status, priority, dueSoon } = req.query;

  const filter = {};

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (dueSoon === 'true') {
    filter.dueDate = {
      $lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    };
  }

  const tasks = await Task.find(filter)
    .populate('assignees', 'name profilePic')
    .populate('reporter', 'name profilePic');

  res.json(tasks);
});

// @desc    Get a single task by ID
// @route   GET /api/tasks/:id
// @access  Private
export const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id)
    .populate('assignees', 'name profilePic')
    .populate('reporter', 'name profilePic');

  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  res.json(task);
});

// controllers/taskControllers.js

// @desc    Update a task (assignees can update status, only reporter can edit others)
// @route   PUT /api/tasks/:id
// @access  Private
export const updateTask = asyncHandler(async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      res.status(404);
      throw new Error('Task not found');
    }

    const isReporter = task.reporter.toString() === req.user._id.toString();
    const isAssignee = task.assignees
      .map(a => a.toString())
      .includes(req.user._id.toString());

    if (!isReporter && !isAssignee) {
      res.status(403);
      throw new Error('You are not authorized to update this task');
    }

    const { title, description, dueDate, priority, status, assignees } = req.body;

    // allow status change by reporter or assignee
    if (status !== undefined && (isReporter || isAssignee)) {
      task.status = status;
    }

    // only reporter can change everything else
    if (isReporter) {
      if (title !== undefined)       task.title       = title;
      if (description !== undefined) task.description = description;
      if (dueDate !== undefined)     task.dueDate     = dueDate;
      if (priority !== undefined)    task.priority    = priority;
      if (assignees !== undefined && Array.isArray(assignees)) {
        task.assignees = assignees; 
      }
    }

    await task.save();

    // Re-fetch with populate
    const populated = await Task.findById(task._id)
      .populate('assignees', 'name profilePic')
      .populate('reporter',  'name profilePic');

    res.json(populated);

  } catch (err) {
    console.error('❌ Error in updateTask:', err);
    if (!res.headersSent) {
      res.status(500).json({ message: err.message || 'Server error on update' });
    }
  }
});



// @desc    Delete task (only reporter)
// @route   DELETE /api/tasks/:id
// @access  Private
export const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  if (task.reporter.toString() !== req.user._id.toString()) {
    res.status(403);
    throw new Error('Only the reporter can delete this task');
  }

  await Task.deleteOne({ _id: task._id });
  res.json({ message: 'Task deleted successfully' });
});

// @desc    Add current user as watcher
// @route   PUT /api/tasks/:id/watch
// @access  Private
export const watchTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  const userId = req.user._id.toString();
  if (!task.watchers.includes(userId)) {
    task.watchers.push(userId);
    await task.save();
  }

  res.status(200).json({ watchers: task.watchers });
});

// @desc    Remove current user from watchers
// @route   PUT /api/tasks/:id/unwatch
// @access  Private
export const unwatchTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);
  if (!task) {
    res.status(404);
    throw new Error('Task not found');
  }

  task.watchers = task.watchers.filter(
    w => w.toString() !== req.user._id.toString()
  );
  await task.save();

  res.status(200).json({ watchers: task.watchers });
});
