"use client";

import GalaxyCanvas from "./GalaxyCanvas";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-void">
      <GalaxyCanvas />

      {/* Vignette */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 10%, rgba(18,18,15,0.5) 50%, #12120F 100%)",
        }}
      />

      <HeroContent />
    </section>
  );
}
