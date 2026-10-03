"use client";
import { useEffect, useState } from "react";

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes endless-drift {
          from { background-position: 0px 0px; }
          to { background-position: 60px 60px; }
        }
      `}} />
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        
        {/* Parallax wrapper responsive to cursor */}
        <div 
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{
            transform: `translate(${mousePosition.x * -40}px, ${mousePosition.y * -40}px)`
          }}
        >
          {/* Continuously moving grid pattern */}
          <div 
            className="absolute w-[150%] h-[150%] -left-[25%] -top-[25%] opacity-[0.25]"
            style={{
              backgroundImage: `
                linear-gradient(rgba(99, 86, 164, 0.4) 1px, transparent 1px),
                linear-gradient(90deg, rgba(99, 86, 164, 0.4) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
              animation: 'endless-drift 15s linear infinite',
              // Add a slight 3D perspective tilt for depth
              transform: 'perspective(1000px) rotateX(45deg) scale(1.5)',
              transformOrigin: 'top center'
            }}
          />
        </div>

        {/* Soft fading gradient overlays to blend edges into the theme background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f7f3] via-transparent to-[#f8f7f3] opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f7f3] via-transparent to-[#f8f7f3] opacity-80" />
        
        {/* Cursor follower (glow) */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[140px] bg-[#6356a4] opacity-[0.08] transition-transform duration-200 ease-out"
          style={{
            left: '50%',
            top: '50%',
            transform: `translate(calc(-50% + ${mousePosition.x * 250}px), calc(-50% + ${mousePosition.y * 250}px))`
          }}
        />
      </div>
    </>
  );
}
