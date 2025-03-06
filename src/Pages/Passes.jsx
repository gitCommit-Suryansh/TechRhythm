import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Rocket, Crown, Check, X, ArrowRight } from "lucide-react";
import { useLocation ,useNavigate} from "react-router-dom";
import Cookies from "js-cookie";
import decodeToken from "../utils/decodeToken";
import axios from 'axios'
import CryptoJS from 'crypto-js';

const Passes = () => {
  const [selectedPass, setSelectedPass] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const location = useLocation();
  const token = Cookies.get("token");
  const user = decodeToken(token);
  const ENCRYPTION_KEY = "PhonepeEncryptionKey".padEnd(32, '0');
  const navigate = useNavigate();

  function decrypt(text) {
    const parts = text.split(':');
    const iv = CryptoJS.enc.Hex.parse(parts[0]);
    const encryptedText = CryptoJS.enc.Hex.parse(parts[1]);
  
    const decrypted = CryptoJS.AES.decrypt({ ciphertext: encryptedText },CryptoJS.enc.Utf8.parse(ENCRYPTION_KEY),{ iv: iv });
  
    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  useEffect(() => {
  
    const queryParams = new URLSearchParams(location.search);
    const paymentDetailsQuery = queryParams.get("paymentDetails");

    if (paymentDetailsQuery) {
          const decryptedData = decrypt(decodeURIComponent(paymentDetailsQuery));
          const paymentDetails = JSON.parse(decryptedData);
          console.log(paymentDetails)
          setPaymentStatus(paymentDetails.code === "PAYMENT_SUCCESS" ? "success" : "failed");

          // If payment is successful, register the pass
          if (paymentDetails.code === "PAYMENT_SUCCESS") {
            registerPass(paymentDetails);
          }
    }
  }, [location.search]); // Run this effect when location.search changes

  const registerPass = async (paymentDetails) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register/registerPass`,
        {
          email: user.email,
          paymentDetails: paymentDetails // Send the payment details
        }
      );

      if (response.status === 200) {
        console.log("Pass registered successfully:", response.data);
        setTimeout(() => navigate('/myPasses'), 3000);
      } else {
        console.error("Failed to register pass:", response.data);
      }
    } catch (error) {
      console.error("Error registering pass:", error);
    }
  };

  const passes = [
    {
      type: "BRONZE",
      icon: Crown,
      price: 199,
      color: "from-[#815d40] to-[#4c3222]",
      features: [
        { text: "Access to 1 Tech Event", included: true },
        { text: "Event Certificate", included: true },
        { text: "Seminar and Workshops", included: true },
        { text: "Goodies", included: true },
        { text: "Accommodation", included: false },
        { text: "Food", included: false },
        { text: "All Events Access", included: false },
      ],
    },
    {
      type: "SILVER",
      icon: Shield,
      price: 599,
      color: "from-gray-400 to-gray-300",
      features: [
        { text: "Access to all Events", included: true },
        { text: "Event Certificate", included: true },
        { text: "Seminar and Workshops", included: true },
        { text: "Goodies", included: true },
        { text: "Breakfast", included: true },
        { text: "Lunch and Dinner", included: false },
        { text: "Accommodation", included: false },
      ],
    },
    {
      type: "GOLD",
      icon: Rocket,
      price: 999,
      color: "from-yellow-400 to-yellow-300",
      features: [
        { text: "Access to All Tech Events", included: true },
        { text: "Event Certificate", included: true },
        { text: "Seminar and Workshops", included: true },
        { text: "Premium Goodies", included: true },
        { text: "Accommodation", included: true },
        { text: "3 Meals/Day", included: true },
        { text: "Priority Access", included: true },
      ],
    },
  ];

  // Handle pass selection and update total amount
  const handlePassSelection = (pass) => {
    setSelectedPass(pass.type);
    setTotalAmount(pass.price);
  };

  // Handle payment button click
  const handlePayment = async() => {
    console.log("clicked");
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/phonepe/pay`,
        {
          amount: totalAmount * 100,
          mobileNumber: user.phone,
          userId: user.id,
          passType:selectedPass
        }
      );
      if (response.status === 200) {
        window.location.assign(response.data.url);
        console.log(response.data);
      } else {
        throw new Error("Failed to initiate payment");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Failed to create order. Please try again.");
    }
   
  };

  // Payment Status Animation Component
  const PaymentStatusAnimation = () => (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-black/80 p-8 rounded-2xl border border-[#52e500] shadow-lg shadow-[#52e500]/20"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 200,
            damping: 20,
            delay: 0.2
          }}
          className={`w-20 h-20 mx-auto mb-4 rounded-full ${
            paymentStatus === "success" 
              ? "bg-[#52e500]" 
              : "bg-red-500"
          } flex items-center justify-center`}
        >
          <motion.div
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            {paymentStatus === "success" ? (
              <Check size={40} className="text-black" />
            ) : (
              <X size={40} className="text-black" />
            )}
          </motion.div>
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className={`text-2xl font-['Press_Start_2P'] ${
            paymentStatus === "success" 
              ? "text-[#52e500]" 
              : "text-red-500"
          } text-center mb-4`}
        >
          {paymentStatus === "success" 
            ? "Payment Successful!" 
            : "Payment Failed!"}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-gray-300 text-center"
        >
          {paymentStatus === "success" 
            ? "Thank you for purchasing the pass" 
            : "Please try again later"}
        </motion.p>
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          onClick={() => setPaymentStatus(null)}
          className={`mt-6 px-6 py-2 rounded-lg font-bold mx-auto block ${
            paymentStatus === "success"
              ? "bg-gradient-to-r from-[#52e500] to-blue-500 text-black"
              : "bg-gradient-to-r from-red-500 to-red-600 text-white"
          }`}
        >
          {paymentStatus === "success" ? "Continue" : "Try Again"}
        </motion.button>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-black text-white py-20 relative overflow-hidden">
      {/* Show payment status animation when payment status is set */}
      {paymentStatus && <PaymentStatusAnimation />}

      {/* Animated Background */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "radial-gradient(circle at 50% 50%, rgba(82, 229, 0, 0.15) 0%, transparent 50%)",
            "radial-gradient(circle at 0% 100%, rgba(82, 229, 0, 0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 100% 0%, rgba(82, 229, 0, 0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{ zIndex: 1 }}
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
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 2 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
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
              className={`relative ${
                selectedPass === pass.type ? "scale-105" : ""
              }`}
              style={{ zIndex: 2 }}
            >
              <motion.div
                className={`h-full bg-gradient-to-br from-black/80 to-[#52e500]/5 backdrop-blur-xl rounded-xl p-8 border ${
                  selectedPass === pass.type
                    ? "border-[#52e500]"
                    : "border-[#52e500]/20"
                } hover:border-[#52e500] transition-all duration-300 cursor-pointer`}
                onClick={() => handlePassSelection(pass)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Pass Header */}
                <div className="text-center mb-8">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${pass.color} p-3 flex items-center justify-center`}
                  >
                    <pass.icon size={32} className="text-black" />
                  </div>
                  <h3 className="text-2xl font-['Press_Start_2P'] text-[#52e500] mb-2">
                    {pass.type}
                  </h3>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-3xl font-bold">₹</span>
                    <span className="text-4xl font-bold">{pass.price}</span>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-4 mb-8">
                  {pass.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-gray-300"
                    >
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
                      ? "bg-gradient-to-r from-[#52e500] to-blue-500 text-black"
                      : "bg-[#52e500]/10 text-[#52e500] hover:bg-[#52e500]/20"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {selectedPass === pass.type ? "Selected" : "Select Pass"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </motion.div>
            </motion.div>
          ))}
          
          {selectedPass && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-12 space-y-4 md:col-start-2 md:col-span-1"
              style={{ zIndex: 2 }}
            >
              <div className="text-xl font-space-grotesk text-[#52e500]">
                Total Amount: ₹{totalAmount}
              </div>
              <button
                onClick={() => {
                  console.log("Button clicked");
                  handlePayment();
                }}
                className="bg-gradient-to-r from-[#52e500] to-blue-500 text-black px-8 py-3 rounded-lg font-bold hover:from-blue-500 hover:to-[#52e500] transition-all duration-300 flex items-center gap-2 mx-auto group"
                style={{ zIndex: 3 }}
              >
                Continue to Payment
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Passes;
