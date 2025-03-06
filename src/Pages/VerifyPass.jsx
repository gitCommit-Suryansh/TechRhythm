import React, { useState } from "react";
import { motion } from "framer-motion";
import { QrCode } from "lucide-react"; // Import an icon for the scanner
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { QrReader } from "react-qr-reader"; // Correct named import

const VerifyPass = () => {
  const [scannedData, setScannedData] = useState(null);
  const [verificationMessage, setVerificationMessage] = useState("");
  const [isScanning, setIsScanning] = useState(false); // State to control scanning
  const navigate = useNavigate();

  const handleScan = async (data) => {
    if (data) {
      setScannedData(data);
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_BACKEND_URL}/verifyPass`,
          { passId: data }
        );
        if (response.status === 200) {
          setVerificationMessage("QR Verified Successfully!");
        } else {
          setVerificationMessage("QR Verification Failed.");
        }
      } catch (error) {
        console.error("Error verifying QR code:", error);
        setVerificationMessage("Error verifying QR code.");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
    setVerificationMessage("Error scanning QR code.");
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, rotateY: -90 }}
        animate={{ opacity: 1, rotateY: 0 }}
        transition={{
          type: "spring",
          stiffness: 50,
          damping: 15,
          duration: 0.8,
        }}
        className="w-full max-w-md bg-[#0a0a0a] border-2 border-[#52e500] rounded-3xl overflow-hidden shadow-2xl shadow-[#52e500]/30 p-6"
      >
        <h1 className="text-3xl font-bold text-[#52e500] mb-4 text-center">
          Verify Pass
        </h1>
        <div className="flex justify-center mb-4">
          <QrCode className="text-[#52e500] w-16 h-16" />
        </div>
        <p className="text-white text-center mb-4">
          Click the button below to open the scanner.
        </p>
        <button
          onClick={() => setIsScanning(true)} // Start scanning when button is clicked
          className="bg-[#52e500] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#3ba000] transition-colors w-full"
        >
          Open Scanner
        </button>
        {isScanning && (
          <div className="mt-4">
            <QrReader
              constraints={{ facingMode: "environment" }} // Ensures the rear camera is used on mobile
              scanDelay={300} // Adjust the scan delay
              onResult={(result, error) => {
                if (result) {
                  handleScan(result.text); // Extract text from the scanned result
                }
                if (error) {
                  handleError(error);
                }
              }}
              style={{ width: "100%" }}
            />
          </div>
        )}
        {verificationMessage && (
          <motion.p
            className="mt-4 text-center text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {verificationMessage}
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default VerifyPass;
