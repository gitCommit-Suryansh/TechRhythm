import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

function Navbar() {
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.8)"]
  );

  const scrollTo = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  // Add this state at the top of your App component
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const token = Cookies.get("token");

  return (
    <>
      <motion.nav
        style={{ backgroundColor: navBackground }}
        className="fixed w-full z-50 transition-all duration-300 backdrop-blur-sm border-b border-[#52e500]/10"
      >
        <div className="container mx-auto px-8 py-6 flex justify-between items-center">
          <motion.div
            className="text-2xl font-['Press_Start_2P'] bg-gradient-to-r from-[#52e500] to-[#3ba000] bg-clip-text text-transparent pixel-shadow"
            whileHover={{ scale: 1.05 }}
          >
            TECH-RHYTHM'25
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {["About", "Events", "Speakers", "Schedule"].map((item, index) => (
              <motion.button
                key={item}
                onClick={() => scrollTo(item.toLowerCase())}
                className="relative group px-4 py-2"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <span className="relative z-10 text-white group-hover:text-[#52e500] transition-colors duration-300 font-space-grotesk">
                  {item}
                </span>
                <motion.div
                  className="absolute inset-0 bg-[#52e500]/0 border border-[#52e500]/0 rounded-lg group-hover:bg-[#52e500]/5 group-hover:border-[#52e500]/50"
                  initial={false}
                  transition={{ duration: 0.3 }}
                />
                <div className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-[#52e500] group-hover:w-full group-hover:left-0 transition-all duration-300" />
              </motion.button>
            ))}

            {!token ? (
              <Link to="/Signup">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#52e500] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#3ba000] transition-colors mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register Now
                </motion.button>
              </Link>
            ) : (
              <Link to="/Passes">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-[#52e500] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#3ba000] transition-colors mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Passes
                </motion.button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-[#52e500] hover:text-[#3ba000] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </motion.button>

          {/* Mobile Menu */}
          <motion.div
            className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-md md:hidden ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: isMobileMenuOpen ? 1 : 0,
              y: isMobileMenuOpen ? 0 : -20,
            }}
            transition={{ duration: 0.2 }}
          >
            <div className="container mx-auto px-8 py-6 flex flex-col gap-4">
              {["About", "Events", "Speakers", "Schedule"].map(
                (item, index) => (
                  <motion.button
                    key={item}
                    onClick={() => {
                      scrollTo(item.toLowerCase());
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 text-white hover:text-[#52e500] transition-colors font-space-grotesk border-b border-[#52e500]/10"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    {item}
                  </motion.button>
                )
              )}
              {!token ? (
                <Link to="/Signup">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#52e500] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#3ba000] transition-colors mt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Register Now
                  </motion.button>
                </Link>
              ) : (
                <Link to="/Passes">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-[#52e500] text-black px-6 py-3 rounded-lg font-bold hover:bg-[#3ba000] transition-colors mt-4"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Passes
                  </motion.button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </motion.nav>
    </>
  );
}

export default Navbar;
