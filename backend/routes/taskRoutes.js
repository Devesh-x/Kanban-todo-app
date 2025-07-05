import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  watchTask,
  unwatchTask
} from '../controllers/taskControllers.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// /api/tasks
router
  .route('/')
  .post(protect, createTask)   // Create task
  .get(protect, getTasks);     // List & filter tasks

// /api/tasks/:id
router
  .route('/:id')
  .get(protect, getTaskById)   // View one task
  .put(protect, updateTask)    // Update fields/status
  .delete(protect, deleteTask);// Delete task

// /api/tasks/:id/watch
router.put('/:id/watch', protect, watchTask);

// /api/tasks/:id/unwatch
router.put('/:id/unwatch', protect, unwatchTask);

export default router;
