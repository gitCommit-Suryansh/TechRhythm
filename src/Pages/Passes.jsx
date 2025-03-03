import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, Rocket, Crown, Check, X, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Passes = () => {
  const [selectedPass, setSelectedPass] = useState(null);

  const passes = [
    {
      type: "BRONZE",
      icon: Crown,
      price: "199",
      color: "from-[#815d40] to-[#4c3222]",
      features: [
        { text: "Access to 1 Tech Event", included: true },
        { text: "Event Certificate", included: true },
        { text: "Seminar and Workshops", included: true },
        { text: "Goodies", included: true },
        { text: "Accommodation", included: false },
        { text: "Food", included: false },
        { text: "All Events Access", included: false },
      ]
    },
    {
      type: "SILVER",
      icon: Shield,
      price: "599",
      color: "from-gray-400 to-gray-300",
      features: [
        { text: "Access to all Events", included: true },
        { text: "Event Certificate", included: true },
        { text: "Seminar and Workshops", included: true },
        { text: "Goodies", included: true },
        { text: "Breakfast", included: true },
        { text: "Lunch and Dinner", included: false },
        { text: "Accommodation", included: false },
      ]
    },
    {
      type: "GOLD",
      icon: Rocket,
      price: "999",
      color: "from-yellow-400 to-yellow-300",
      features: [
        { text: "Access to All Tech Events", included: true },
        { text: "Event Certificate", included: true },
        { text: "Seminar and Workshops", included: true },
        { text: "Premium Goodies", included: true },
        { text: "Accommodation", included: true },
        { text: "3 Meals/Day", included: true },
        { text: "Priority Access", included: true },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
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

      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-['Press_Start_2P'] bg-gradient-to-r from-[#52e500] via-blue-400 to-[#52e500] bg-clip-text text-transparent mb-4">
            Choose Your Pass
          </h1>
          <p className="text-gray-400 font-space-grotesk text-lg">
            Select the perfect pass that suits your tech journey
          </p>
        </motion.div>

        {/* Passes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {passes.map((pass, index) => (
            <motion.div
              key={pass.type}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative ${selectedPass === pass.type ? 'scale-105' : ''}`}
            >
              <motion.div
                className={`h-full bg-gradient-to-br from-black/80 to-[#52e500]/5 backdrop-blur-xl rounded-xl p-8 border ${
                  selectedPass === pass.type ? 'border-[#52e500]' : 'border-[#52e500]/20'
                } hover:border-[#52e500] transition-all duration-300 cursor-pointer`}
                onClick={() => setSelectedPass(pass.type)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Pass Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pass.color} p-3 flex items-center justify-center`}>
                    <pass.icon size={32} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-['Press_Start_2P'] text-[#52e500] mb-2">{pass.type}</h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-3xl font-bold">₹</span>
                    <span className="text-4xl font-bold">{pass.price}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {pass.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      {feature.included ? (
                        <Check className="text-[#52e500]" size={20} />
                      ) : (
                        <X className="text-red-500" size={20} />
                      )}
                      <span className="font-space-grotesk">{feature.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Select Button */}
                <motion.button
                  className={`w-full py-3 rounded-lg font-bold flex items-center justify-center gap-2 group transition-all duration-300 ${
                    selectedPass === pass.type
                      ? 'bg-gradient-to-r from-[#52e500] to-blue-500 text-black'
                      : 'bg-[#52e500]/10 text-[#52e500] hover:bg-[#52e500]/20'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedPass === pass.type ? 'Selected' : 'Select Pass'}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Continue Button */}
        {selectedPass && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mt-12"
          >
            <Link to="/payment">
              <motion.button
                className="bg-gradient-to-r from-[#52e500] to-blue-500 text-black px-8 py-3 rounded-lg font-bold hover:from-blue-500 hover:to-[#52e500] transition-all duration-300 flex items-center gap-2 mx-auto group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </Link>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Passes; 