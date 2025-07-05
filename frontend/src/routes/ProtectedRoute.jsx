import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const { user, userLoaded } = useSelector((state) => state.auth);

  if (!userLoaded) {
    // Still checking cookie — return loading or null
    return <div className="p-4 text-center text-gray-400">Loading...</div>;
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
