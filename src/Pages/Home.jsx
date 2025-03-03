import React from 'react'
import { motion, useInView } from 'framer-motion';
import { Calendar, Users, Trophy, Rocket, ArrowRight, Code, Lightbulb, Brain } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
import { useState,useEffect,useRef } from 'react';
import SponsorsSection from '../components/SponsorsSection';
import TestimonialsSection from '../components/TestimonialsSection';
import Navbar from '../components/navigation/Navbar';


function Home() {
    const fadeInUp = {
        initial: { y: 60, opacity: 0 },
        animate: { y: 0, opacity: 1 },
        transition: { duration: 0.6, ease: "easeOut" }
      };
      const events = [
        {
          title: "Kurukshetra",
          icon: Code,
          description: "24-hour hackathon to build innovative solutions for real-world problems",
          prize: "₹3,00,000",
          color: "from-purple-600 to-blue-600"
        },
        {
          title: "Manthan",
          icon: Lightbulb,
          description: "Present your groundbreaking startups projects and prototypes",
          prize: "₹2,00,000",
          color: "from-cyan-600 to-green-600"
        },
        {
          title: "EkLavya",
          icon: Brain,
          description: "Individual technical challenge for coding wizards",
          prize: "₹1,00,000",
          color: "from-orange-600 to-red-600"
        }
      ];
      // Speakers data
      const speakers = [
        {
          name: "Dr. Rajesh Kumar",
          designation: "Technical Director, Microsoft India",
          image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
          topic: "Future of Cloud Computing"
        },
        {
          name: "Priya Mehta",
          designation: "Lead Developer, Google",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
          topic: "AI & Machine Learning"
        },
        {
          name: "Amit Sharma",
          designation: "CTO, TechStartup India",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
          topic: "Emerging Technologies"
        }
      ];
    
      const CounterAnimation = ({ target, duration = 2 }) => {
        const [count, setCount] = useState(0);
        const ref = React.useRef(null);
        const isInView = useInView(ref);
      
        useEffect(() => {
          if (isInView) {
            let startTime;
            const updateCount = (timestamp) => {
              if (!startTime) startTime = timestamp;
              const progress = (timestamp - startTime) / (duration * 1000);
              
              if (progress < 1) {
                setCount(Math.min(Math.floor(target * progress), target));
                requestAnimationFrame(updateCount);
              } else {
                setCount(target);
              }
            };
            requestAnimationFrame(updateCount);
          }
        }, [isInView, target, duration]);
      
        return <span ref={ref}>{count}</span>;
      };
      const headerRef = useRef(null);
      const eventsRef = useRef(null);
      const speakersRef = useRef(null);
      const sponsorsRef = useRef(null);
    
  return (
    <>
    <div className="min-h-screen bg-black text-white overflow-x-hidden" data-scroll-container>
      <Navbar/>
    {/* Hero Section with Animated Background */}
        <header className="relative h-screen" data-scroll-section>
          <div className="absolute inset-0 bg-black/50">
            <motion.div className="absolute inset-0" animate={{background: [
                  "radial-gradient(circle at 50% 50%, rgba(0,0,255,0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 0% 100%, rgba(0,255,255,0.2) 0%, transparent 50%)",
                  "radial-gradient(circle at 100% 0%, rgba(255,0,255,0.2) 0%, transparent 50%)"
                ]
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <img 
              src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=3270&auto=format&fit=crop"
              alt="Hero background" 
              className="w-full h-full object-cover mix-blend-overlay hero-image"
            />
          </div>
          
      
          {/* Hero Content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4">
            {/* Add CodeCraft Society text */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div 
                className="inline-block relative"
                whileHover={{ scale: 1.05 }}
              >
                <motion.h2 
                  className="text-xl md:text-2xl font-['Press_Start_2P'] bg-gradient-to-r from-[#52e500] via-blue-400 to-[#52e500] bg-clip-text text-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  &lt;CodeCraft Society/&gt;
                </motion.h2>
                <motion.p
                  className="text-sm md:text-base text-[#52e500] tracking-[0.2em] font-space-grotesk mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  BY ITM UNIVERSITY PRESENTS
                </motion.p>
                
                {/* Animated underline */}
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#52e500] to-transparent"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                />
              </motion.div>
            </motion.div>

            {/* Existing TECH-RHYTHM heading */}
            <motion.h1 
              className="text-4xl md:text-6xl font-['Press_Start_2P'] mb-8 bg-gradient-to-r from-[#52e500] via-[#3ba000] to-[#52e500] bg-clip-text text-transparent pixel-shadow mt-3"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
            >
              TECH-RHYTHM 2025
            </motion.h1>

            {/* Updated subtitle with gradient and glow */}
            <motion.div 
              className="space-y-6 max-w-3xl mx-auto"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.2 }}
            >
              <motion.p 
                className="text-xl md:text-3xl font-space-grotesk bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent font-bold"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                ITM University's Premier Technical Extravaganza
              </motion.p>

              {/* Animated divider */}
              <motion.div 
                className="w-24 h-1 bg-gradient-to-r from-[#52e500] to-blue-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              />

              {/* Updated tagline with animated background */}
              <motion.p 
                className="text-lg md:text-xl relative inline-block px-6 py-2 rounded-lg overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <motion.span 
                  className="absolute inset-0 bg-gradient-to-r from-[#52e500]/10 via-blue-500/10 to-[#52e500]/10"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: 'linear'
                  }}
                />
                <span className="relative text-gray-300 font-space-grotesk tracking-wide">
                  <span className="text-[#52e500] font-semibold">Code</span> •{' '}
                  <span className="text-blue-400 font-semibold">Innovate</span> •{' '}
                  <span className="text-purple-400 font-semibold">Create</span>
                </span>
              </motion.p>
            </motion.div>

            {/* Updated buttons container */}
            <motion.div 
              className="flex flex-col md:flex-row gap-4 mt-12"
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.6 }}
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-[#52e500] to-blue-500 px-8 py-3 rounded-full text-black font-bold hover:from-blue-500 hover:to-[#52e500] transition-all duration-300 flex items-center gap-2 group shadow-lg shadow-[#52e500]/20"
              >
                Register Now 
                <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(82, 229, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
                className="border border-[#52e500] px-8 py-3 rounded-full transition-all duration-300 text-[#52e500] hover:shadow-lg hover:shadow-[#52e500]/20"
              >
                Learn More
              </motion.button>
            </motion.div>

            {/* Add floating tech elements */}
            <motion.div className="absolute inset-0 pointer-events-none">
              {[...Array(15)].map((_, i) => (
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
          </div>

          {/* Animated Background Elements */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
              animate={{
                x: ["0vw", "100vw"],
                y: ["0vh", "100vh"],
                scale: [1, 0],
                opacity: [0, 1, 0]
              }}
              transition={{
                duration: Math.random() * 10 + 5,
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}
            />
          ))}
        </header>
        {/* Events Section */}
        <section ref={eventsRef} className="py-20 relative" id="events" data-scroll-section>
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-5xl font-['Press_Start_2P'] text-center mb-16 text-[#52e500] pixel-shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Technical Events
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {events.map((event, index) => (
                <motion.div 
                  key={index}
                  className="event-card"
                  style={{ opacity: 0, y: 50 }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 400,
                    damping: 17
                  }}
                >
                  <div className="relative h-full bg-gradient-to-br from-black/80 to-blue-900/40 rounded-xl overflow-hidden backdrop-blur-sm border border-[#52e500]/30">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
                    <motion.div 
                      className="absolute -right-10 -top-10 w-40 h-40 blur-2xl"
                      animate={{
                        background: [
                          `radial-gradient(circle, ${event.glowColor || '#52e500'}40 0%, transparent 70%)`,
                          `radial-gradient(circle, ${event.glowColor || '#52e500'}20 30%, transparent 70%)`,
                        ],
                      }}
                      transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                    />
                    
                    <div className="relative p-8">
                      {/* Icon */}
                      <div className="mb-6">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#52e500] to-blue-500 p-3 flex items-center justify-center">
                          <event.icon size={32} className="text-black" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl font-['Press_Start_2P'] mb-4 text-[#52e500]">{event.title}</h3>
                      <p className="text-gray-300 mb-6 leading-relaxed">{event.description}</p>
                      
                      {/* Prize Pool */}
                      <div className="mb-6">
                        <span className="text-sm text-gray-400">Prize Pool</span>
                        <div className="text-2xl font-bold text-[#52e500]">{event.prize}</div>
                      </div>
                      
                      {/* Register Button */}
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-gradient-to-r from-[#52e500] to-blue-500 text-black px-6 py-3 rounded-lg font-bold hover:from-blue-500 hover:to-[#52e500] transition-all duration-300 flex items-center justify-center gap-2 group"
                      >
                        Register Now
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Speakers Section */}
        <section ref={speakersRef} className="py-20 relative bg-gradient-to-b from-black via-blue-900/20 to-black" id="speakers" data-scroll-section>
          <div className="container mx-auto px-4">
            <motion.h2 
              className="text-3xl md:text-5xl font-['Press_Start_2P'] text-center mb-16 text-[#52e500] pixel-shadow"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Tech Leaders
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {speakers.map((speaker, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100,
                    damping: 15
                  }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className="relative group"
                >
                  <div className="relative h-full bg-gradient-to-br from-[#0c0c0c] to-[#52e500]/5 rounded-xl overflow-hidden">
                    {/* Content Container */}
                    <div className="relative p-6">
                      {/* Speaker Image with Hexagon Mask */}
                      <div className="relative w-32 h-32 mx-auto mb-6">
                        <div className="absolute inset-0 bg-gradient-to-r from-[#52e500] to-blue-500 rounded-full opacity-20 blur-xl" />
                        <div className="relative w-full h-full hexagon-mask overflow-hidden">
                          <img 
                            src={speaker.image}
                            alt={speaker.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>

                      {/* Speaker Info */}
                      <div className="text-center space-y-3">
                        <h3 className="text-xl font-['Press_Start_2P'] text-[#52e500]">
                          {speaker.name}
                        </h3>
                        <div className="h-[2px] w-16 mx-auto bg-gradient-to-r from-transparent via-[#52e500] to-transparent" />
                        <p className="text-blue-400 font-space-grotesk">
                          {speaker.designation}
                        </p>
                      </div>

                      {/* Topic Container */}
                      <div className="mt-6 bg-black/40 backdrop-blur-sm rounded-lg p-4 border border-[#52e500]/10">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-2 h-2 rounded-full bg-[#52e500]" />
                          <span className="text-sm text-[#52e500] font-space-grotesk">Speaking On</span>
                        </div>
                        <p className="text-gray-300 font-space-grotesk">
                          {speaker.topic}
                        </p>
                      </div>

                      {/* Connect Button */}
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full mt-6 bg-gradient-to-r from-[#52e500]/10 to-[#52e500]/20 hover:from-[#52e500] hover:to-[#52e500] text-[#52e500] hover:text-black px-4 py-3 rounded-lg font-bold transition-colors duration-300 flex items-center justify-center gap-2 group border border-[#52e500]/50"
                      >
                        <span>CONNECT</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section with Counter Animation */}
        <section className="py-20" style={{ background: 'radial-gradient(circle, rgba(82, 229, 0, 0.1) 0%, rgba(0, 0, 0, 0.8) 70%)', marginTop: '-20px' }} data-scroll-section>
          <div className="container mx-auto px-4">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-8"
              initial={{ opacity: 0, y: 100 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                { icon: Calendar, value: 3, label: "Days of Tech Innovation" },
                { icon: Users, value: 2000, label: "Tech Enthusiasts" },
                { icon: Trophy, value: 2, label: "Lakh Prize Pool" },
                { icon: Rocket, value: 3, label: "Tech Events" }
              ].map((stat, index) => (
                <Card key={index}>
                  <CardContent>
                    <motion.div
                      className="stat-card bg-gradient-to-br from-black/40 to-[#52e500]/10 backdrop-blur-sm p-6 rounded-xl border border-[#52e500]/20"
                      whileHover={{ scale: 1.05, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div 
                        className="text-[#52e500] mx-auto mb-4"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <stat.icon size={48} />
                      </motion.div>
                      <h3 className="text-4xl font-bold mb-2 text-white/90">
                        <CounterAnimation target={stat.value} />
                        {stat.label === "Lakh Prize Pool" && "L+"}
                        {stat.value === 50000 && "+"}
                      </h3>
                      <p className="text-[#52e500]/80">{stat.label}</p>
                    </motion.div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Add Sponsors Section */}
        <SponsorsSection data-scroll-section />

        {/* Add Testimonials Section */}
        <TestimonialsSection data-scroll-section />

        {/* Footer Section */}
        <footer className="bg-gradient-to-b from-black to-[#0c1f14] relative" data-scroll-section>
          <div className="container mx-auto px-4 py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
              {/* Logo & Description */}
              <div className="space-y-6">
                <motion.div 
                  className="text-2xl font-['Press_Start_2P'] bg-gradient-to-r from-[#52e500] to-[#3ba000] bg-clip-text text-transparent"
                  whileHover={{ scale: 1.05 }}
                >
                  TECH-RHYTHM'25
                </motion.div>
                <p className="text-gray-400 font-space-grotesk">
                  ITM University's Premier Technical Extravaganza, organized by the CodeCraft Society to inspire and empower future tech leaders.
                </p>
              </div>

              {/* Explore Links */}
              <div>
                <h3 className="text-[#52e500] font-['Press_Start_2P'] text-lg mb-6">EXPLORE</h3>
                <ul className="space-y-4">
                  {['Home', 'Benefits', 'How it works?', 'Testimonials', 'FAQs'].map((item) => (
                    <li key={item}>
                      <motion.a 
                        href="#"
                        className="text-gray-400 hover:text-[#52e500] transition-colors font-space-grotesk flex items-center gap-2 group"
                        whileHover={{ x: 5 }}
                      >
                        <div className="w-1 h-1 bg-[#52e500] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        {item}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-[#52e500] font-['Press_Start_2P'] text-lg mb-6">CONTACT US</h3>
                <ul className="space-y-4">
                  <li>
                    <a href="mailto:esummit@itm.ac.in" className="text-gray-400 hover:text-[#52e500] transition-colors font-space-grotesk">
                      techrhythm@itm.ac.in
                    </a>
                  </li>
                  <li>
                    <a href="tel:+918750589268" className="text-gray-400 hover:text-[#52e500] transition-colors font-space-grotesk">
                      +91 62657 97401
                    </a>
                  </li>
                  <li>
                    <a href="tel:+917016204140" className="text-gray-400 hover:text-[#52e500] transition-colors font-space-grotesk">
                      +91 70005 90370
                    </a>
                  </li>
                </ul>
              </div>

              {/* Address */}
              <div>
                <h3 className="text-[#52e500] font-['Press_Start_2P'] text-lg mb-6">ADDRESS</h3>
                <address className="text-gray-400 font-space-grotesk not-italic">
                  Dept. SOET,MG Block<br />
                  ITM University<br />
                  Gwalior, Madhya Pradesh - 474001
                </address>
              </div>
            </div>

            {/* Social Links & Copyright */}
            <div className="mt-16 pt-8 border-t border-[#52e500]/20">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Social Icons */}
                <div className="flex gap-6">
                  {['facebook', 'instagram', 'linkedin', 'youtube'].map((social) => (
                    <motion.a
                      key={social}
                      href="#"
                      className="w-10 h-10 rounded-full bg-[#52e500]/10 flex items-center justify-center group hover:bg-[#52e500]"
                      whileHover={{ y: -3 }}
                    >
                      <img 
                        src={`/icons/${social}.svg`} 
                        alt={social}
                        className="w-5 h-5 invert group-hover:invert-0 transition-all"
                      />
                    </motion.a>
                  ))}
                </div>

                {/* Copyright */}
                <div className="text-gray-400 font-space-grotesk text-center md:text-right">
                  <p>© 2025 TECH-RHYTHM ITM University. All rights reserved.</p>
                  <p className="text-sm mt-1">Made with ❤️ by CodeCraft Society</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home