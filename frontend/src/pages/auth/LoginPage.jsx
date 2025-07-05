import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../redux/features/auth/authThunks';
import { useNavigate, Link } from 'react-router-dom';

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const { register, handleSubmit } = useForm();

  const onSubmit = data => {
    dispatch(loginUser(data))
      .unwrap()
      .then(() => navigate('/app/dashboard'))
      .catch(() => {});
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center text-primary-green">Welcome Back</h2>
      {error && <p className="text-red-400 text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm mb-2 text-secondary-green">Email address</label>
          <input
            type="email"
            {...register('email')}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-black"
          />
        </div>

        <div>
          <label className="block text-sm mb-2 text-secondary-green">Password</label>
          <input
            type="password"
            {...register('password')}
            required
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-black"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary-green hover:bg-primary-focus rounded-lg text-white font-semibold transition-colors duration-200"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      {/* 🔗 Link to Register */}
      <p className="mt-6 text-center text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-primary-green hover:text-primary-focus hover:underline">
          Register
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
