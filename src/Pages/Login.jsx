import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const emailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/auth/Login`, 
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        document.cookie = `token=${response.data.token}; path=/; max-age=86400; secure; samesite=strict`;
        navigate('/');
      } else {
        setError(response.data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        // Server responded with error
        setError(err.response.data.message || 'Invalid credentials');
      } else if (err.request) {
        // No response received
        setError('Network error - please check your connection');
      } else {
        // Other errors
        setError('An error occurred. Please try again');
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden py-20">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(82, 229, 0, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(82, 229, 0, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(82, 229, 0, 0.15) 0%, transparent 50%)"
          ]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Floating tech elements */}
      <motion.div className="absolute inset-0 pointer-events-none">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-[#52e500]/20 rounded-full"
            animate={{
              y: [0, -30, 0],
              opacity: [0, 1, 0],
              scale: [1, 1.2, 1]
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 2
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`
            }}
          />
        ))}
      </motion.div>

      {/* Login Container */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/">
            <h1 className="text-3xl font-['Press_Start_2P'] bg-gradient-to-r from-[#52e500] via-blue-400 to-[#52e500] bg-clip-text text-transparent mb-2">
              TECH-RHYTHM'25
            </h1>
          </Link>
          <div className="text-sm text-gray-400 font-space-grotesk">Welcome back, techie!</div>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-black/80 to-[#52e500]/5 backdrop-blur-xl rounded-xl p-8 border border-[#52e500]/20"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Message */}
            {error && (
              <div className="text-red-500 text-sm text-center bg-red-500/10 py-2 rounded-lg">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-space-grotesk text-gray-300 flex items-center gap-2">
                <Mail size={16} className="text-[#52e500]" />
                Email Address
              </label>
              <input
                ref={emailRef}
                type="email"
                required
                className="w-full bg-black/50 border border-[#52e500]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#52e500] transition-colors font-space-grotesk text-white"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-space-grotesk text-gray-300 flex items-center gap-2">
                <Lock size={16} className="text-[#52e500]" />
                Password
              </label>
              <div className="relative">
                <input
                  ref={passwordRef}
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full bg-black/50 border border-[#52e500]/20 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-[#52e500] transition-colors font-space-grotesk text-white"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#52e500] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex justify-end">
                <Link to="/forgot-password" className="text-sm text-[#52e500] hover:text-[#3ba000] transition-colors">
                  Forgot password?
                </Link>
              </div>
            </div>

            {/* Login Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#52e500] to-blue-500 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 group hover:from-blue-500 hover:to-[#52e500] transition-all duration-300"
            >
              Login
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#52e500]/20 to-transparent" />
            <span className="text-gray-400 font-space-grotesk text-sm">OR</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#52e500]/20 to-transparent" />
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-gray-400 font-space-grotesk">
            Don't have an account?{' '}
            <Link to="/signup" className="text-[#52e500] hover:text-[#3ba000] transition-colors">
              Sign up
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 