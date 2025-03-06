import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { QrCode } from "lucide-react"; 
import axios from "axios";
import { Html5QrcodeScanner } from "html5-qrcode";

const VerifyPass = () => {
  const [qrValue, setQrValue] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [userId, setUserId] = useState(null); // Store user ID after verification
  const [checkInMessage, setCheckInMessage] = useState("");
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const scannerRef = useRef(null);

  useEffect(() => {
    if (isScanning) {
      scannerRef.current = new Html5QrcodeScanner("qr-reader", {
        fps: 10,
        qrbox: { width: 250, height: 250 },
      });

      scannerRef.current.render(
        async (decodedText) => {
          setIsScanning(false); // Stop scanning after first detection
          scannerRef.current.clear();
          setQrValue(decodedText); // Display scanned QR value
          handleScan(decodedText); // Call API
        },
        (errorMessage) => {
          console.error("QR Scan Error:", errorMessage);
        }
      );
    }
    return () => scannerRef.current?.clear();
  }, [isScanning]);

  const handleScan = async (passId) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/verify/verifypass`,
        { passId }
      );

      if (response.data.verified) {
        setVerificationMessage("✅ Pass Verified Successfully!");
        setIsVerified(true); 
        setUserId(response.data.userId); // Store userId for check-in
      } else {
        setVerificationMessage("❌ QR Verification Failed. Pass Not Found.");
        setIsVerified(false);
        setUserId(null);
      }
    } catch (error) {
      console.error("Error verifying QR code:", error);
      setVerificationMessage("⚠️ Error verifying QR code.");
      setIsVerified(false);
      setUserId(null);
    }
  };

  const handleCheckIn = async () => {
    if (!userId) return;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/verify/checkIn`,
        { userId }
      );

      if (response.data.message === "Check-in successful.") {
        setCheckInMessage("✅ Participant Checked In Successfully!");
        setIsCheckedIn(true);
      } else {
        setCheckInMessage("❌ Check-In Failed. Try Again.");
      }
    } catch (error) {
      console.error("Error during check-in:", error);
      setCheckInMessage("⚠️ Error during check-in.");
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, rotateY: -90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{ type: "spring", stiffness: 50, damping: 15, duration: 0.8 }}
        className="w-full max-w-md bg-[#0a0a0a] border-2 border-[#52e500] rounded-3xl overflow-hidden shadow-2xl shadow-[#52e500]/30 p-6"
      >
        <h1 className="text-3xl font-bold text-[#52e500] mb-4 text-center">
          QR Code Scanner
        </h1>
        <div className="flex justify-center mb-4">
          <QrCode className="text-[#52e500] w-16 h-16" />
        </div>
        <p className="text-white text-center mb-4">Click the button below to open the scanner.</p>
        
        <button
          onClick={() => setIsScanning(true)}
          className="bg-[#52e500] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#3ba000] transition-colors w-full"
        >
          Open Scanner
        </button>

        {isScanning && <div id="qr-reader" className="mt-4"></div>}

        {/* Display scanned QR value */}
        {qrValue && (
          <motion.p className="mt-4 text-center text-lg text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            Scanned QR Code: <span className="font-bold text-[#52e500]">{qrValue}</span>
          </motion.p>
        )}

        {/* Show verification result */}
        {verificationMessage && (
          <motion.p className="mt-4 text-center text-lg text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {verificationMessage}
          </motion.p>
        )}

        {/* Show "Check-In" button only if pass is verified */}
        {isVerified && !isCheckedIn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-[#ffcc00] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#d4a600] transition-colors w-full mt-4"
            onClick={handleCheckIn}
          >
            ✅ Check-In Participant
          </motion.button>
        )}

        {/* Show check-in result */}
        {checkInMessage && (
          <motion.p className="mt-4 text-center text-lg text-white" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {checkInMessage}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyPass;
