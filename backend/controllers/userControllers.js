import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users/register
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  // Optional profilePic from Cloudinary
  let profilePic;
  if (req.file) {
    profilePic = req.file.path;
  }

  const user = await User.create({
    name,
    email,
    password,
    profilePic,
    // role is optional, defaults to 'member'
  });

  if (user) {
    generateToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});




// @desc    Login user
// @route   POST /api/users/login
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(401);
    throw new Error("Please register first");
  }

  const passwordMatch = await user.matchPassword(password);
  if (passwordMatch) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePic: user.profilePic,
      role: user.role
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});



// @desc    Logout user
// @route   POST /api/users/logout
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ message: 'User logged out' });
});



// @desc    Get user profile
// @route   GET /api/users/profile
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    profilePic: req.user.profilePic,
    role: req.user.role
  };

  res.status(200).json(user);
});

// @desc    Update user profile
// @route   PUT /api/users/profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  let profilePic;
  if (req.file) {
    profilePic = req.file.path;
  }

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profilePic = profilePic || user.profilePic;

    // Optional: Allow role update only if explicitly passed
    if (req.body.role) {
      user.role = req.body.role;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      profilePic: updatedUser.profilePic,
      role: updatedUser.role
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// Get all users (for assignee dropdown)
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}, '_id name email profilePic role'); 
  res.status(200).json(users);
});

// Get single user by ID
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');

  if (!user) {
    res.status(404);
    throw new Error('User not found');
  }

  res.status(200).json(user);
});


export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateProfile,
  getAllUsers,      
  getUserById       
};


