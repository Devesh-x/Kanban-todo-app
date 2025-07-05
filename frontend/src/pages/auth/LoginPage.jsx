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
    <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-8 lg:p-10">
      {/* Header */}
      <div className="text-center mb-8">
        {/* Logo - matching landing page design */}
        <div className="flex items-center justify-center mb-6">
          <div className="w-10 h-10 bg-primary-green rounded-lg flex items-center justify-center mr-3">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <span className="text-2xl font-bold text-primary-green">Organiso</span>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
        <p className="text-gray-600">Sign in to your account to continue</p>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <p className="text-red-600 text-sm text-center">{error}</p>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email address
          </label>
          <div className="relative">
            <input
              type="email"
              {...register('email')}
              required
              placeholder="Enter your email"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green focus:ring-opacity-10 text-gray-900 placeholder-gray-500 transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              {...register('password')}
              required
              placeholder="Enter your password"
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-primary-green focus:ring-4 focus:ring-primary-green focus:ring-opacity-10 text-gray-900 placeholder-gray-500 transition-all duration-200"
            />
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-primary-green hover:bg-green-600 disabled:bg-gray-400 rounded-xl text-white font-semibold transition-all duration-200 transform hover:scale-[1.02] focus:ring-4 focus:ring-primary-green focus:ring-opacity-20"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Signing in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      {/* Divider */}
      <div className="my-6 flex items-center">
        <div className="flex-1 border-t border-gray-200"></div>
        <span className="px-4 text-sm text-gray-500">or</span>
        <div className="flex-1 border-t border-gray-200"></div>
      </div>

      {/* Register link */}
      <div className="text-center">
        <p className="text-gray-600 text-sm">
          Don't have an account?{' '}
          <Link 
            to="/register" 
            className="text-primary-green hover:text-green-600 font-semibold hover:underline transition-colors duration-200"
          >
            Create one now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
