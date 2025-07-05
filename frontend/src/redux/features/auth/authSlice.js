import { createSlice } from '@reduxjs/toolkit';
import { loginUser, registerUser, fetchCurrentUser } from './authThunks';

const initialState = {
  user: null,
  loading: false,
  error: null,
  userLoaded: false, //  flag to track whether we checked cookie
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.userLoaded = true; // Optional: treat logout as "user has been checked"
    },
  },
  extraReducers: builder => {
    builder
      // Login
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userLoaded = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.userLoaded = true;
      })

      // ✅ Register
      .addCase(registerUser.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.userLoaded = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.user = null;
        state.userLoaded = true;
      })

      // ✅ Fetch user from cookie (for persistent login on refresh)
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.userLoaded = true;
      })
      .addCase(fetchCurrentUser.rejected, state => {
        state.user = null;
        state.userLoaded = true;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
