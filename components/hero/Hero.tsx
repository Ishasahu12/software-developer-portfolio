"use client";

import GalaxyCanvas from "./GalaxyCanvas";
import HeroContent from "./HeroContent";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-void">
      <div className="absolute inset-x-0 top-0 h-[78vh] sm:inset-0 sm:h-full overflow-hidden pointer-events-none sm:pointer-events-auto">
        <GalaxyCanvas />
      </div>

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
