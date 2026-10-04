"use client";

export default function InteractiveBackground() {
  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none bg-[#020617]">
      {/* Subtle coordinate grid for a professional, technical feel */}
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, #334155 1px, transparent 1px),
            linear-gradient(to bottom, #334155 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}
      />
      <div 
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(to right, #94A3B8 1px, transparent 1px),
            linear-gradient(to bottom, #94A3B8 1px, transparent 1px)
          `,
          backgroundSize: '200px 200px'
        }}
      />
      {/* Subtle vignette */}
      <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#020617] opacity-60" />
    </div>
  );
}
