import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/navigation/Navbar';
import axios from 'axios'
import '../App.css'

const Participants = () => {

  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedRow, setExpandedRow] = useState(null);
  const [passId, setPassId] = useState('');
  const [passType, setPassType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginId, setLoginId] = useState('');

  const handleLogin = () => {
    if (loginId === '3admin') {
      setIsLoggedIn(true);
    } else {
      alert('Invalid login ID. Please try again.');
    }
  };

  useEffect(() => {
    const fetchParticipants = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/participants/allparticipants`);
        if (response.status === 200  ) {
          setParticipants(response.data.users);
          console.log(response.data)
        } else {
          setError("Error fetching participants");
        }
      } catch (err) {
        setError("Error fetching participants");
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      fetchParticipants();
    }
  }, [isLoggedIn]);

  const handleRowClick = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  const handleSave = async (participantId) => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/participants/updatepassid`, {
        id: participantId,
        passId,
        passType,
      });
      setPassId('');
      setPassType('');
      setExpandedRow(null);
    } catch (error) {
      console.error("Error updating pass ID:", error);
    }
  };

  const filteredParticipants = participants.filter(participant => {
    const fullName = participant.fullName.toLowerCase();
    const email = participant.email.toLowerCase();
    const phone=participant.phone
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      email.includes(searchQuery.toLowerCase())||
      phone.includes(searchQuery)

    );
  });

  // Calculate statistics
  const totalWithPassId = participants.filter(participant => participant.passId).length;
  const totalCheckedIn = participants.filter(participant => participant.checkedIn === true).length;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded shadow-md">
          <h2 className="text-xl mb-4">Login</h2>
          <input
            type="text"
            placeholder="Enter Login ID"
            value={loginId}
            onChange={(e) => setLoginId(e.target.value)}
            className="mb-4 p-2 rounded text-black"
          />
          <button onClick={handleLogin} className="bg-green-500 text-white p-2 rounded">
            OK
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
    {/* <Navbar /> */}
    <div className="min-h-screen bg-black text-white py-32 relative overflow-hidden">
      
      <div className="container mx-auto px-4">
      <motion.h1 
          className="text-4xl md:text-5xl font-['Press_Start_2P'] bg-gradient-to-r from-[#52e500] via-blue-400 to-[#52e500] bg-clip-text text-transparent mb-8 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Admin Panel
        </motion.h1>

        {/* Statistics Display */}
        <div className="flex justify-between mb-4">
          <div className="flex-grow"></div> {/* Empty div to push stats to the right */}
          <div className="bg-gray-800 p-4 rounded shadow-md text-right">
            <p className="text-green-400">Pass ID Enrolled: <span className="text-white">{totalWithPassId}</span></p>
            <p className="text-green-400">Checked-In Participants: <span className="text-white">{totalCheckedIn}</span></p>
          </div>
        </div>

        <input
          type="text"
          placeholder="Search by name or email..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-4 p-2 rounded text-black"
        />

        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 border border-[#52e500]">
            <thead>
              <tr className="bg-gradient-to-r from-[#52e500] to-blue-500 text-white">
                <th className="py-3 px-4 border-b text-left">Full Name</th>
                <th className="py-3 px-4 border-b text-left">Email</th>
                <th className="py-3 px-4 border-b text-left">Phone</th>
                <th className="py-3 px-4 border-b text-left">College</th>
                <th className="py-3 px-4 border-b text-left">Pass ID</th>
                <th className="py-3 px-4 border-b text-left">Pass Type</th>
                <th className="py-3 px-4 border-b text-left">Pass Amount</th>
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((participant, index) => (
                <React.Fragment key={index}>
                  <tr onClick={() => handleRowClick(index)} className="text-gray-300 hover:bg-gray-700 cursor-pointer">
                    <td className="py-3 px-4 border-b text-left flex-col justify-center">{participant.fullName}</td>
                    <td className="py-3 px-4 border-b text-left flex-col justify-center">{participant.email}</td>
                    <td className="py-3 px-4 border-b text-left flex-col justify-center">{participant.phone}</td>
                    <td className="py-3 px-4 border-b text-left flex-col justify-center">{participant.college}</td>
                    <td className="py-3 px-4 border-b text-left flex-col justify-center">{participant.passId || 'null'}</td>
                    <td className="py-3 px-4 border-b text-left flex-col justify-center">{participant.passType || 'null'}</td>
                    <td className="py-3 px-4 border-b text-left flex-col justify-center">{participant.passAmount || 'null'}</td>
                  </tr>
                  {expandedRow === index && (
                    <tr>
                      <td colSpan="4" className="bg-gray-700">
                        <div className="flex flex-col p-4">
                          <div className="flex">
                            <input
                              type="text"
                              placeholder="Enter Pass ID"
                              value={passId}
                              onChange={(e) => setPassId(e.target.value)}
                              className="mb-2 p-1 text-black rounded mr-2"
                            />
                            <select
                              value={passType}
                              onChange={(e) => setPassType(e.target.value)}
                              className="mb-2 p-1 text-black rounded"
                            >
                              <option value="" disabled>Select Pass Type</option>
                              <option value="BRONZE">BRONZE</option>
                              <option value="SILVER">SILVER</option>
                              <option value="GOLD">GOLD</option>
                              <option value="PLATINUM">PLATINUM</option>
                            </select>
                          </div>
                          <button onClick={() => handleSave(participant._id)} className="bg-green-500 text-white p-2 rounded mt-2">
                            Save
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </>
  );
};

export default Participants;
