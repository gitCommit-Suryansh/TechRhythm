import React from 'react';
import { motion } from 'framer-motion';

const sponsors = [
  {
    name: "Infosys",
    tier: "outer",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2880px-Google_2015_logo.svg.png",
    orbitRadius: 280,
    startAngle: 45
  },
  {
    name: "Waterbridge",
    tier: "outer",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/Microsoft_logo_%282012%29.svg/2560px-Microsoft_logo_%282012%29.svg.png",
    orbitRadius: 280,
    startAngle: 135
  },
  {
    name: "Freshworks",
    tier: "middle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png",
    orbitRadius: 180,
    startAngle: 45
  },
  {
    name: "BIRAC",
    tier: "middle",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Meta_Platforms_Inc._logo.svg/2560px-Meta_Platforms_Inc._logo.svg.png",
    orbitRadius: 180,
    startAngle: 135
  },
  {
    name: "ACCENTURE",
    tier: "middle",
    logo: "/accenture.png",
    orbitRadius: 180,
    startAngle: 225
  },
  {
    name: "WIPRO",
    tier: "middle",
    logo: "/wipro.png",
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
    name: "COGNIZANT",
    tier: "outer",
    logo: "/CTSH_BIG.png",
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
                  PAST
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