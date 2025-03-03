import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "Aryan Sharma",
      role: "CSE Student, IIT Delhi",
      image: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40",
      quote: "TECHRHYTHM was an incredible platform to showcase my skills and network with industry professionals. The hackathon was challenging and rewarding."
    },
    {
      name: "Riya Patel",
      role: "AI Researcher, MIT",
      image: "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604",
      quote: "The quality of competitions and workshops was exceptional. TECHRHYTHM stands out as one of the best-organized tech festivals I've attended."
    },
    {
      name: "Vikram Singh",
      role: "Founder, TechNova",
      image: "https://images.unsplash.com/photo-1531427186611-ecfd6d936c79",
      quote: "As a speaker and judge, I was impressed by the talent pool. TECHRHYTHM creates the perfect environment for innovation and learning."
    }
  ];
  
  // Auto-advance testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [testimonials.length]);
  
  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };
  
  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };
  
  return (
    <div className="container mx-auto px-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center max-w-3xl mx-auto mb-16"
      >
        <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full border border-[#52e500]/30 bg-[#52e500]/5">
          <span className="text-xs font-medium text-white font-space-grotesk">PARTICIPANT EXPERIENCES</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-['Press_Start_2P'] text-center mb-4 text-[#52e500] pixel-shadow">
          What Participants Say
        </h2>
        <p className="text-gray-400 font-space-grotesk">
          Hear from previous participants about their TECHRHYTHM journey
        </p>
      </motion.div>
      
      <div className="relative max-w-5xl mx-auto">
        {/* Large quote icon */}
        <div className="absolute -top-10 -left-10 opacity-10">
          <Quote size={80} className="text-[#52e500]" />
        </div>
        
        {/* Testimonial cards */}
        <div className="relative h-[300px] md:h-[250px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <div className="h-full rounded-2xl overflow-hidden p-1 bg-gradient-to-br from-[#52e500]/20 to-blue-500/20">
                <div className="h-full rounded-2xl backdrop-blur-lg bg-black/80 p-8 md:p-12 border border-[#52e500]/20">
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Image with hexagon mask */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-[#52e500] to-blue-500 rounded-full opacity-20 blur-xl" />
                      <div className="relative w-full h-full hexagon-mask overflow-hidden border-2 border-[#52e500]/20">
                        <img 
                          src={testimonials[currentIndex].image} 
                          alt={testimonials[currentIndex].name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    
                    <div className="flex-1 text-center md:text-left">
                      <p className="text-gray-300 text-lg md:text-xl italic mb-6 leading-relaxed font-space-grotesk">
                        "{testimonials[currentIndex].quote}"
                      </p>
                      
                      <div>
                        <h4 className="text-white font-bold text-lg font-space-grotesk">{testimonials[currentIndex].name}</h4>
                        <p className="text-[#52e500] font-space-grotesk">{testimonials[currentIndex].role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Navigation buttons */}
        <div className="flex justify-center mt-8 gap-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prevTestimonial}
            className="w-12 h-12 rounded-full flex items-center justify-center border border-[#52e500]/20 bg-black/50 hover:bg-[#52e500]/10 transition-colors"
          >
            <ChevronLeft size={20} className="text-[#52e500]" />
          </motion.button>
          
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentIndex ? 'bg-[#52e500]' : 'bg-white/20'
              }`}
            />
          ))}
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={nextTestimonial}
            className="w-12 h-12 rounded-full flex items-center justify-center border border-[#52e500]/20 bg-black/50 hover:bg-[#52e500]/10 transition-colors"
          >
            <ChevronRight size={20} className="text-[#52e500]" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection; 