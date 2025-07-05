import { createSlice } from '@reduxjs/toolkit';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  watchTask,
  unwatchTask,
} from './taskThunks';

const initialState = {
  tasks: [],
  taskDetails: null,
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    clearTaskDetails: state => {
      state.taskDetails = null;
    }
  },
  extraReducers: builder => {
    builder
      // CREATE
      .addCase(createTask.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET ALL
      .addCase(getTasks.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // GET SINGLE
      .addCase(getTaskById.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTaskById.fulfilled, (state, action) => {
        state.loading = false;
        state.taskDetails = action.payload;
      })
      .addCase(getTaskById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // UPDATE
      .addCase(updateTask.fulfilled, (state, action) => {
        state.taskDetails = action.payload;
        state.tasks = state.tasks.map(task =>
          task._id === action.payload._id ? action.payload : task
        );
      })

      // DELETE
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task._id !== action.payload);
      })

      // WATCH
      .addCase(watchTask.fulfilled, (state, action) => {
        if (state.taskDetails?._id === action.payload.taskId) {
          state.taskDetails.watchers = action.payload.watchers;
        }
      })

      // UNWATCH
      .addCase(unwatchTask.fulfilled, (state, action) => {
        if (state.taskDetails?._id === action.payload.taskId) {
          state.taskDetails.watchers = action.payload.watchers;
        }
      });
  }
});

export const { clearTaskDetails } = taskSlice.actions;
export default taskSlice.reducer;
