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
        @keyframes float1 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(10vw, -15vh) scale(1.1); }
          66% { transform: translate(-10vw, -5vh) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-15vw, 10vh) scale(1.1); }
          66% { transform: translate(10vw, 15vh) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes float3 {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(15vw, 10vh) scale(0.9); }
          66% { transform: translate(-5vw, -15vh) scale(1.2); }
          100% { transform: translate(0, 0) scale(1); }
        }
        @keyframes endless-ripple {
          from { background-position: 0px 0px; }
          to { background-position: 120px 120px; }
        }
      `}} />
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden bg-[#f8f7f3]">
        
        {/* Parallax wrapper responsive to cursor */}
        <div 
          className="absolute inset-0 transition-transform duration-700 ease-out"
          style={{ transform: `translate(${mousePosition.x * -60}px, ${mousePosition.y * -60}px)` }}
        >
          {/* Organic Aurora Orbs */}
          <div 
            className="absolute top-[-10vh] left-[-10vw] w-[60vw] h-[60vw] rounded-full blur-[140px] opacity-[0.25]"
            style={{ backgroundColor: "#6356a4", animation: 'float1 20s ease-in-out infinite' }}
          />
          <div 
            className="absolute bottom-[-10vh] right-[-10vw] w-[50vw] h-[50vw] rounded-full blur-[160px] opacity-[0.20]"
            style={{ backgroundColor: "#8a7db3", animation: 'float2 25s ease-in-out infinite' }}
          />
          <div 
            className="absolute top-[20vh] right-[20vw] w-[40vw] h-[40vw] rounded-full blur-[120px] opacity-[0.15]"
            style={{ backgroundColor: "#dcd7e6", animation: 'float3 18s ease-in-out infinite' }}
          />
        </div>
        
        {/* Subtle textural noise overlay for a premium matte paper feel */}
        <div 
          className="absolute inset-0 opacity-[0.35] mix-blend-overlay z-10"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        />

        {/* Sweeping Curvy Lines Pattern */}
        <div 
          className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] opacity-[0.5] mix-blend-multiply transition-transform duration-700 ease-out z-0"
          style={{ 
            backgroundImage: `
              repeating-radial-gradient(circle at 0% 0%, transparent 0, transparent 40px, rgba(99, 86, 164, 0.15) 40px, rgba(99, 86, 164, 0.15) 41px),
              repeating-radial-gradient(circle at 100% 100%, transparent 0, transparent 60px, rgba(99, 86, 164, 0.1) 60px, rgba(99, 86, 164, 0.1) 61px)
            `,
            animation: 'endless-ripple 12s linear infinite',
            transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
          }}
        />
      </div>
    </>
  );
}
