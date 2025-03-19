import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-5xl font-['Press_Start_2P'] bg-gradient-to-r from-[#52e500] via-blue-400 to-[#52e500] bg-clip-text text-transparent mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Admin Panel
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Manage Participants Card */}
          <motion.div
            className="relative bg-gradient-to-br from-black/80 to-[#52e500]/5 backdrop-blur-xl rounded-xl p-8 border border-[#52e500]/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-['Press_Start_2P'] text-[#52e500] mb-4">Manage Participants</h2>
            <p className="text-gray-300 mb-6">View, edit, and manage all participants for the event.</p>
            <Link to="/participants">
              <motion.button 
                className="bg-gradient-to-r from-[#52e500] to-blue-500 text-black px-6 py-3 rounded-lg font-bold hover:from-blue-500 hover:to-[#52e500] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Go to Participants
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>

          {/* Verify Pass Card */}
          <motion.div
            className="relative bg-gradient-to-br from-black/80 to-[#52e500]/5 backdrop-blur-xl rounded-xl p-8 border border-[#52e500]/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <h2 className="text-2xl font-['Press_Start_2P'] text-[#52e500] mb-4">Verify Passes</h2>
            <p className="text-gray-300 mb-6">Check and verify the passes issued to participants.</p>
            <Link to="/verifypass">
              <motion.button 
                className="bg-gradient-to-r from-[#52e500] to-blue-500 text-black px-6 py-3 rounded-lg font-bold hover:from-blue-500 hover:to-[#52e500] transition-all duration-300 flex items-center justify-center gap-2"
              >
                Go to Verify Passes
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;  