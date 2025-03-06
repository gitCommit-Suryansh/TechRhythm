import React, { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";
import Cookies from "js-cookie";
import decodeToken from "../utils/decodeToken";
import { motion } from "framer-motion";
import { 
    Cpu, 
    Ticket, 
    Zap, 
    Radio, 
    Layers 
} from "lucide-react";
import { Link } from "react-router-dom";

const PassDetails = () => {
    const [passDetails, setPassDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const token = Cookies.get("token");
    const user = decodeToken(token);

    useEffect(() => {
        const fetchPassDetails = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/user/getuser/${user.id}`);
                setPassDetails(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching pass details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPassDetails();
    }, [user.id]);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl flex items-center space-x-3"
                >
                    <Cpu className="animate-pulse text-[#52e500]" />
                    <span>Loading Digital Pass...</span>
                </motion.div>
            </div>
        );
    }

    if (!passDetails || !passDetails.passId) {
        return (
            <div className="min-h-screen bg-black flex flex-col items-center justify-center text-[#52e500]">
                <motion.h2 
                    className="text-xl"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    No pass details found.
                </motion.h2>
                <Link to="/passes">
                    <motion.button
                        className="mt-4 bg-[#52e500] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#3ba000] transition-colors"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Buy Passes
                    </motion.button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 perspective-1000">
            <motion.div
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ 
                    type: "spring", 
                    stiffness: 50, 
                    damping: 15,
                    duration: 0.8 
                }}
                className="w-full max-w-md transform rotate-0 hover:rotate-1 transition-transform duration-300 ease-in-out"
            >
                <div className="relative bg-[#0a0a0a] border-2 border-[#52e500] rounded-3xl overflow-hidden shadow-2xl shadow-[#52e500]/30 p-6">
                    {/* Animated Grid Background */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute inset-0 bg-grid-[#52e500]/10"></div>
                    </div>

                    {/* Neon Border Animation */}
                    <div className="absolute inset-0 border-4 border-transparent animate-neon-border"></div>

                    {/* Header */}
                    <div className="relative z-10 mb-6">
                        <div className="flex justify-between items-center">
                            <h1 className="text-3xl font-bold text-[#52e500] tracking-wider flex items-center">
                                <Zap className="mr-2 text-[#52e500]" />
                                TECHRHYTHM
                            </h1>
                            <Radio className="text-[#52e500] opacity-70" />
                        </div>
                        <p className="text-white/70 text-sm flex items-center">
                            <Layers className="mr-2 text-[#52e500]" />
                            ITM University, Gwalior
                        </p>
                    </div>

                    {/* Pass Details */}
                    <div className="space-y-4 mb-6 relative z-10">
                        <div className="bg-[#1a1a1a] rounded-xl p-4 border border-[#52e500]/20">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="text-white/50 text-xs uppercase tracking-wider">Full Name</span>
                                    <p className="text-white font-medium text-lg truncate">
                                        {passDetails.fullName}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <span className="text-white/50 text-xs uppercase tracking-wider">Pass Type</span>
                                    <p className="text-[#52e500] font-bold text-lg">
                                        {passDetails.passType}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-4 flex justify-between items-center">
                                <div>
                                    <span className="text-white/50 text-xs uppercase tracking-wider">Pass Amount</span>
                                    <p className="text-white font-medium text-lg">
                                        ₹{passDetails.passAmount}
                                    </p>
                                </div>
                                <Ticket className="text-[#52e500] opacity-70" />
                            </div>
                        </div>
                    </div>

                    {/* QR Code Section */}
                    <div className="flex justify-center mb-6 relative z-10">
                        <div className="bg-[#1a1a1a] p-4 rounded-xl border border-[#52e500]/30">
                            <QRCodeSVG 
                                value={passDetails.passId} 
                                size={200} 
                                fgColor="#52e500"
                                bgColor="transparent"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center relative z-10">
                        <p className="text-[#52e500] text-xs tracking-wider opacity-70">
                            DIGITAL EVENT PASS · {passDetails.checkedIn ? 'VERIFIED' : 'NOT VERIFIED'}
                        </p>
                    </div>

                    {/* Glow Effect */}
                    <div className="absolute -inset-4 bg-[#52e500] rounded-3xl opacity-10 blur-3xl"></div>
                </div>
            </motion.div>
        </div>
    );
};

export default PassDetails;