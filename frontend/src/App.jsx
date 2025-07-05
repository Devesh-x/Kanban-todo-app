import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route } from 'react-router-dom';

import { fetchCurrentUser } from './redux/features/auth/authThunks';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';

import DashboardPage from './pages/user/DashboardPage';
import ManageTasksPage from './pages/user/ManageTasksPage';
import KanbanPage from './pages/user/KanbanPage';
import CreateTaskPage from './pages/user/CreateTaskPage';
import TeamPage from './pages/user/TeamPage';

import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AuthLayout from './layout/AuthLayout';
import MainLayout from './layout/MainLayout';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser()); // fetch from cookie on app load
  }, [dispatch]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Layout Routes */}
      <Route
        path="/app"
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="tasks" element={<ManageTasksPage />} />
        <Route path="kanban" element={<KanbanPage />} />
        <Route path="create" element={<CreateTaskPage />} />
        <Route path="team" element={<TeamPage />} />
      </Route>
    </Routes>
  );
}

export default App;
