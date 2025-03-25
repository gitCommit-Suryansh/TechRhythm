import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Lock, User, Eye, EyeOff, School, Phone ,Cpu} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  // Create refs for form fields
  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const collegeRef = useRef();
  const passwordRef = useRef();
  const termsRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!termsRef.current.checked) {
      setError('Please accept the terms and conditions');
      setLoading(false);
      return;
    }

    // Create form data object
    const formData = {
      fullName: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
      college: collegeRef.current.value,
      password: passwordRef.current.value
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/auth/Signup`, formData);
      if (response.status === 200) {
        // Redirect to login page on successful signup
        navigate('/Login');
      } else {
        setError(response.data.message || 'Signup failed');
      }
    } catch (error) {
      setError(error.response.data.message || 'Signup failed');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white">
            <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 0.8 }}
                transition={{ duration: 0.5 }}
                className="text-xl flex items-center space-x-3"
            >
                <Cpu className="animate-pulse text-[#52e500]" />
                <span>Loading ...</span>
            </motion.div>
        </div>
    );
}

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

      {/* Signup Container */}
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
          <div className="text-sm text-gray-400 font-space-grotesk">Join the tech revolution!</div>
        </motion.div>

        {/* Signup Form */}
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

            {/* Full Name */}
            <div className="space-y-2">
              <label className="text-sm font-space-grotesk text-gray-300 flex items-center gap-2">
                <User size={16} className="text-[#52e500]" />
                Full Name
              </label>
              <input
                ref={nameRef}
                type="text"
                required
                className="w-full bg-black/50 border border-[#52e500]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#52e500] transition-colors font-space-grotesk text-white"
                placeholder="Enter your full name"
              />
            </div>

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

            {/* Mobile Number */}
            <div className="space-y-2">
              <label className="text-sm font-space-grotesk text-gray-300 flex items-center gap-2">
                <Phone size={16} className="text-[#52e500]" />
                Mobile Number
              </label>
              <input
                ref={phoneRef}
                type="tel"
                required
                pattern="[0-9]{10}"
                maxLength="10"
                className="w-full bg-black/50 border border-[#52e500]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#52e500] transition-colors font-space-grotesk text-white"
                placeholder="Enter 10 digit mobile number"
              />
            </div>

            {/* College Name */}
            <div className="space-y-2">
              <label className="text-sm font-space-grotesk text-gray-300 flex items-center gap-2">
                <School size={16} className="text-[#52e500]" />
                College/School/Company Name
              </label>
              <input
                ref={collegeRef}
                type="text"
                required
                className="w-full bg-black/50 border border-[#52e500]/20 rounded-lg px-4 py-3 focus:outline-none focus:border-[#52e500] transition-colors font-space-grotesk text-white"
                placeholder="Enter your college name"
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
                  minLength="8"
                  className="w-full bg-black/50 border border-[#52e500]/20 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:border-[#52e500] transition-colors font-space-grotesk text-white"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#52e500] transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-1">Must be at least 8 characters long</p>
            </div>

            {/* Terms */}
            <div className="flex items-start gap-2">
              <input
                ref={termsRef}
                type="checkbox"
                required
                className="mt-1 w-4 h-4 rounded border-[#52e500]/20 bg-black/50 checked:bg-[#52e500] checked:border-[#52e500] transition-colors"
              />
              <p className="text-sm text-gray-400">
                I agree to the{' '}
                <Link to="/terms" className="text-[#52e500] hover:text-[#3ba000] transition-colors">
                  Terms of Service
                </Link>
                {' '}and{' '}
                <Link to="/privacy" className="text-[#52e500] hover:text-[#3ba000] transition-colors">
                  Privacy Policy
                </Link>
              </p>
            </div>

            {/* Sign Up Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-[#52e500] to-blue-500 text-black font-bold py-3 rounded-lg flex items-center justify-center gap-2 group hover:from-blue-500 hover:to-[#52e500] transition-all duration-300"
            >
              Create Account
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-4 my-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#52e500]/20 to-transparent" />
            <span className="text-gray-400 font-space-grotesk text-sm">OR</span>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#52e500]/20 to-transparent" />
          </div>

          {/* Login Link */}
          <p className="text-center mt-8 text-gray-400 font-space-grotesk">
            Already have an account?{' '}
            <Link to="/Login" className="text-[#52e500] hover:text-[#3ba000] transition-colors">
              Log in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;

