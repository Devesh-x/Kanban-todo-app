import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

// Create Task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData, thunkAPI) => {
    try {
      const res = await axios.post(`${API}/tasks`, taskData, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create task');
    }
  }
);

// Get All Tasks
export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (filters = {}, thunkAPI) => {
    try {
      const query = new URLSearchParams(filters).toString();
      const res = await axios.get(`${API}/tasks?${query}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch tasks');
    }
  }
);

// Get Task by ID
export const getTaskById = createAsyncThunk(
  'tasks/getTaskById',
  async (taskId, thunkAPI) => {
    try {
      const res = await axios.get(`${API}/tasks/${taskId}`, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Task not found');
    }
  }
);

// Update Task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ taskId, updates }, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/tasks/${taskId}`, updates, {
        withCredentials: true,
      });
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update task');
    }
  }
);

// Delete Task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      await axios.delete(`${API}/tasks/${taskId}`, {
        withCredentials: true,
      });
      return taskId;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete task');
    }
  }
);

// Watch Task
export const watchTask = createAsyncThunk(
  'tasks/watchTask',
  async (taskId, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/tasks/${taskId}/watch`, {}, {
        withCredentials: true,
      });
      return { taskId, watchers: res.data.watchers };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to watch task');
    }
  }
);

// Unwatch Task
export const unwatchTask = createAsyncThunk(
  'tasks/unwatchTask',
  async (taskId, thunkAPI) => {
    try {
      const res = await axios.put(`${API}/tasks/${taskId}/unwatch`, {}, {
        withCredentials: true,
      });
      return { taskId, watchers: res.data.watchers };
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to unwatch task');
    }
  }
);
