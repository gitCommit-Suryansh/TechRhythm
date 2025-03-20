import React from 'react';
import { motion } from 'framer-motion';

const sponsors = [
  {
    name: "Unstop",
    tier: "outer",
    logo: "/unstop.png",
    orbitRadius: 280,
    startAngle: 45
  },
  {
    name: "xyz",
    tier: "outer",
    logo: "xyz_logo2.png",
    orbitRadius: 280,
    startAngle: 135
  },
  {
    name: "Sheryians coding school",
    tier: "outer",
    logo: "/sheryians_logo.jpeg",
    orbitRadius: 280,
    startAngle: 135
  },
  {
    name: "gdg",
    tier: "middle",
    logo: "gdg_logo.jpg",
    orbitRadius: 180,
    startAngle: 45
  },
  {
    name: "Plus 91 Labs",
    tier: "middle",
    logo: "/plus91labs_logo.jpeg",
    orbitRadius: 180,
    startAngle: 135
  },
  {
    name: "techobytes",
    tier: "outer",
    logo: "/techobytes_logo.jpeg",
    orbitRadius: 180,
    startAngle: 225
  },
  {
    name: "Numeric Infotech",
    tier: "middle",
    logo: "/Numericinfotech_logo.jpeg",
    orbitRadius: 180,
    startAngle: 315
  },
  {
    name: "SERVICENOW",
    tier: "inner",
    logo: "/NOW_BIG.png",
    orbitRadius: 100,
    startAngle: 90
  },
  {
    name: "xyz logo",
    tier: "outer",
    logo: "/xyz_logo2.png",
    orbitRadius: 280,
    startAngle: 225
  }
];

const SponsorsSection = () => {
  return (
    <section className="relative">
      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-black to-transparent z-10" />
      
      <div className="py-20 bg-black" style={{ transform: window.innerWidth < 768 ? 'scale(0.75)' : 'scale(1)' }}>
        <div className="container mx-auto px-4">
          <div className="relative w-full h-[600px]">
            <div className="absolute inset-0 flex justify-center items-center">
              {/* Central Text */}
              <div className="absolute z-10 text-center">
                <h2 className="text-4xl font-bold text-gray-500 leading-tight">
                  OUR
                  <br />
                  SPONSORS
                </h2>
              </div>
              
              {/* Orbit Paths */}
              <div className="absolute">
                <div className="orbit-path" style={{ width: '200px', height: '200px' }} />
                <div className="orbit-path" style={{ width: '360px', height: '360px' }} />
                <div className="orbit-path" style={{ width: '560px', height: '560px' }} />
              </div>

              {/* Sponsors */}
              <div className="orbit-container">
                {sponsors.map((sponsor, index) => (
                  <motion.div
                    key={index}
                    className="sponsor-wrapper"
                    style={{
                      '--orbit-radius': `${sponsor.orbitRadius}px`,
                      '--start-angle': `${sponsor.startAngle}deg`
                    }}
                  >
                    <motion.div
                      className="sponsor-logo"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="w-20 h-20 object-contain bg-white rounded-full p-3"
                      />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .orbit-container {
          position: relative;
          width: 100%;
          height: 100%;
          animation: rotate 30s linear infinite;
        }

        .sponsor-wrapper {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) 
                     rotate(var(--start-angle)) 
                     translateX(var(--orbit-radius));
        }

        .sponsor-logo {
          transform: rotate(calc(-1 * var(--start-angle)));
          animation: counter-rotate 30s linear infinite;
        }

        .orbit-path {
          position: absolute;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes counter-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }
      `}</style>
    </section>
  );
};

export default SponsorsSection;