import React, { useEffect, useRef } from 'react';

const RippleEffect = () => {
  const canvasRef = useRef(null);
  const ripples = useRef([]);
  const mouse = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastRippleTime = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createRipple = (x, y) => {
      ripples.current.push({
        x,
        y,
        radius: 0,
        alpha: 0.7,
        velocity: 8,
        maxRadius: 125,
        lineWidth: 3,
        color: '#3ba000'
      });
    };

    const drawRipples = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      ripples.current.forEach((ripple, index) => {
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#3ba000';
        
        ctx.beginPath();
        ctx.strokeStyle = `rgba(59, 160, 0, ${ripple.alpha})`;
        ctx.lineWidth = ripple.lineWidth;
        ctx.arc(ripple.x, ripple.y, ripple.radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.fillStyle = `rgba(59, 160, 0, ${ripple.alpha * 0.05})`;
        ctx.fill();
        ctx.closePath();

        ctx.shadowBlur = 0;

        ripple.radius += ripple.velocity;
        ripple.alpha *= 0.96;
        ripple.lineWidth *= 0.97;

        if (ripple.alpha < 0.01) {
          ripples.current.splice(index, 1);
        }
      });

      const dx = mouse.current.x - lastPos.current.x;
      const dy = mouse.current.y - lastPos.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const currentTime = Date.now();

      if (distance > 15 && currentTime - lastRippleTime > 40) {
        createRipple(mouse.current.x, mouse.current.y);
        lastRippleTime = currentTime;
      }

      lastPos.current = { ...mouse.current };

      animationFrameId = requestAnimationFrame(drawRipples);
    };

    const handleMouseMove = (e) => {
      mouse.current = {
        x: e.clientX,
        y: e.clientY
      };
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();
    drawRipples();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] mix-blend-plus-lighter opacity-75"
      style={{ background: 'transparent' }}
    />
  );
};

export default RippleEffect; 