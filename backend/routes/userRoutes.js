import express from 'express';
import {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateProfile,
  getAllUsers,
  getUserById
} from '../controllers/userControllers.js';

import { protect } from '../middleware/authMiddleware.js';
import upload from '../utils/multer.js'; // for uploading profile pic

const router = express.Router();

// @route   POST /api/users/register
// @desc    Register a new user (with optional profile picture)
router.post('/register', upload.single('profilePic'), registerUser);

// @route   POST /api/users/login
// @desc    Login user
router.post('/login', loginUser);

// @route   POST /api/users/logout
// @desc    Logout user
router.post('/logout', logoutUser);

// @route   GET/PUT /api/users/profile
// @desc    Get or update user profile (must be logged in)
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, upload.single('pic'), updateProfile);

// Get all users (protected)
router.get('/all', protect, getAllUsers);

// Get user by ID (protected)
router.get('/:id', protect, getUserById);


export default router;
