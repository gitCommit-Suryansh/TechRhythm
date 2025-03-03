import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import Lenis from '@studio-freight/lenis';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import Signup from './Pages/Signup';
import Login from './Pages/Login'
import Passes from './Pages/Passes';


// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin);

const App = () => {
  // GSAP Animations
  useEffect(() => {
    const lenis = new Lenis();

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // Hero section parallax
      const heroImage = document.querySelector('.hero-image');
      if (heroImage) {
        gsap.to(heroImage, {
          yPercent: 50,
          ease: "none",
          scrollTrigger: {
            trigger: heroImage,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      // Updated Events section cards animation
      const eventCards = gsap.utils.toArray('.event-card');
      eventCards.forEach((card, i) => {
        if (card) {
          ScrollTrigger.create({
            trigger: card,
            start: "top bottom-=100",
            onEnter: () => {
              gsap.to(card, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: i * 0.2,
                ease: "power3.out",
                clearProps: "all"
              });
            },
            once: true
          });
        }
      });
    });

    return () => {
      ctx.revert();
      lenis.destroy();
    };
  }, []);

  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Passes' element={<Passes/>}/>
      </Routes>
    </Router>
    
  
  );
}

export default App;