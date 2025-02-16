import React from 'react';
import { motion } from 'framer-motion';

const sponsors = [
  {
    name: "Google",
    tier: "platinum",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2880px-Google_2015_logo.svg.png"
  },
  {
    name: "Microsoft",
    tier: "platinum",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png"
  },
  {
    name: "Amazon",
    tier: "gold",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png"
  },
  {
    name: "Meta",
    tier: "gold",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png"
  }
];

const SponsorsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-black via-blue-900/20 to-black relative">
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-5xl font-['Press_Start_2P'] text-center mb-16 text-[#52e500] pixel-shadow"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          Our Sponsors
        </motion.h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              className="bg-white/5 p-8 rounded-xl backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
            >
              <img 
                src={sponsor.logo}
                alt={sponsor.name}
                className="w-full h-auto object-contain filter invert"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SponsorsSection; 