"use client";
import { useEffect, useState } from "react";

export default function InteractiveBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Calculate normalized mouse coordinates (-1 to 1)
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
      {/* Moving dot pattern (parallax) */}
      <div 
        className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] opacity-[0.25] transition-transform duration-700 ease-out"
        style={{
          backgroundImage: "radial-gradient(#a898c5 2px, transparent 2px)",
          backgroundSize: "40px 40px",
          transform: `translate(${mousePosition.x * -25}px, ${mousePosition.y * -25}px)`
        }}
      />
      
      {/* Cursor follower (glow) */}
      <div
        className="absolute w-[800px] h-[800px] rounded-full blur-[120px] bg-purple-400 opacity-[0.08] transition-transform duration-200 ease-out"
        style={{
          left: '50%',
          top: '50%',
          transform: `translate(calc(-50% + ${mousePosition.x * 300}px), calc(-50% + ${mousePosition.y * 300}px))`
        }}
      />
    </div>
  );
}
