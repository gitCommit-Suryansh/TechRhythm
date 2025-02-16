import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Hackathon Winner 2023",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    text: "Participating in the hackathon was an incredible experience. The mentorship and resources provided were exceptional."
  },
  {
    name: "Priya Patel",
    role: "TechnoVision Finalist",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    text: "The event helped me transform my project into something extraordinary. The feedback from industry experts was invaluable."
  },
  {
    name: "Alex Chen",
    role: "SoloTech Champion",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    text: "The competitive yet collaborative environment pushed me to deliver my best. Made great connections and learned so much!"
  }
];

const TestimonialsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray('.testimonial-card');
    
    cards.forEach((card, i) => {
      ScrollTrigger.create({
        trigger: card,
        start: 'top bottom-=100',
        onEnter: () => {
          gsap.to(card, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 0.8,
            ease: 'power3.out'
          });
        },
        once: true
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-b from-black via-blue-900/20 to-black">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-5xl font-['Press_Start_2P'] text-center mb-16 text-[#52e500] pixel-shadow"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          What Participants Say
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="testimonial-card opacity-0"
              style={{ 
                transform: `translate(${index % 2 === 0 ? -50 : 50}px, 50px)`,
              }}
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-gradient-to-br from-blue-900/40 to-purple-900/40 p-8 rounded-xl backdrop-blur-sm border border-blue-500/20 h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16">
                    <img 
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                    <div className="absolute inset-0 rounded-full border-2 border-[#52e500] animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{testimonial.name}</h3>
                    <p className="text-[#52e500]">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed">{testimonial.text}</p>
                <div className="mt-4 text-[#52e500]">
                  <span className="text-2xl">★★★★★</span>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;