// src/pages/auth/RegisterPage.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../../redux/features/auth/authThunks';
import { useNavigate, Link } from 'react-router-dom';

const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector(state => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = data => {
    dispatch(registerUser(data))
      .unwrap()
      .then(() => navigate('/app/dashboard'))
      .catch(() => {});
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-8 text-center text-primary-green">Create Account</h2>
      {error && <p className="text-red-400 text-center mb-2">{error}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm mb-2 text-secondary-green">Full Name</label>
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-black"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>

        <div>
          <label className="block text-sm mb-2 text-secondary-green">Email address</label>
          <input
            type="email"
            {...register('email', { required: 'Email is required' })}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-black"
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm mb-2 text-secondary-green">Password</label>
          <input
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: { value: 6, message: 'Password must be at least 6 characters' }
            })}
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:border-primary-green focus:ring-2 focus:ring-primary-green focus:ring-opacity-20 text-black"
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary-green hover:bg-primary-focus rounded-lg text-white font-semibold transition-colors duration-200"
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>
      </form>

      {/* 🔗 Link to Login */}
      <p className="mt-6 text-center text-gray-600">
        Already have an account?{' '}
        <Link to="/login" className="text-primary-green hover:text-primary-focus hover:underline">
          Sign In
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
