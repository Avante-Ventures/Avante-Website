import { useRef, useState } from "react";
import { ContactModal } from "@/app/components/ContactModal";
import { StageMount } from "@/app/components/stage3d/StageMount";
import { BackToTop } from "@/app/components/BackToTop";
import { CinematicHud } from "@/app/components/CinematicHud";
import { AtmosphereField } from "@/app/components/AtmosphereField";
import { CursorGlow } from "@/app/components/CursorGlow";
import { Navbar } from "@/app/components/Navbar";
import { HeroConvergencePoster } from "@/app/components/heroes/HeroConvergencePoster";
import { DualityScene } from "@/app/components/DualityScene";
import { VentureBuilderScene } from "@/app/components/VentureBuilderScene";
import { VerticalsScene } from "@/app/components/VerticalsScene";
import { WhoWeAreScene } from "@/app/components/WhoWeAreScene";
import { ClosingScene } from "@/app/components/ClosingScene";
import { Footer } from "@/app/components/Footer";

// The homepage scroll-film. One continuous world (AtmosphereField) behind a
// documentary instrument frame (CinematicHud), with eight beats that each
// read as a distinct instrument:
//   0 Convergence (hero)  → the world's AI lands on São Paulo, becomes the "A"
//   1 Show the work        → the thesis DEMONSTRATED: a raw judicial doc the
//                            machine reads → a structured decision (αlphajuri)
//   2 Duality (SF ⇄ SP)   → Silicon Valley playbooks + local operators
//   3 Venture Builder     → what a venture builder is (and why AI-native)
//   4 Verticals           → what we're building
//   5 Track record        → what this team has built and exited
//   6 Who we are          → the operators
//   7 Quiet close         → think in public + the memo (dawn payoff)
export function AppContent() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  // The cinematic 3D stage spans beats 3–7 (VentureBuilder → Closing). This
  // ref wraps exactly that band so the stage can measure its scroll range and
  // each station's window. Footer is intentionally outside the band.
  const stageBandRef = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="min-h-screen w-full flex justify-center"
      style={{ backgroundColor: "var(--avante-background)", position: "relative" }}
    >
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />

      <BackToTop />

      {/* One continuous dusk->dawn world behind the whole film */}
      <AtmosphereField />

      <CursorGlow />

      <Navbar />

      {/* The cinematic 3D stage for beats 3–7 — a fixed WebGL layer (or static
          poster on Tier 0) that sits behind the editorial HTML. Mounted here so
          it layers above AtmosphereField (z:0) and below the content frame (z:3). */}
      <StageMount bandRef={stageBandRef} />

      {/* Main frame */}
      <div className="w-full max-w-[1440px] mx-auto" style={{ position: "relative", zIndex: 3 }}>
        <div id="hero">
          <HeroConvergencePoster />
        </div>

        {/* Define the category SECOND, with the sharpest beat (swarm consensus):
            the fund-vs-studio contrast lands right after the hero, before any
            further abstraction. Sits on the AtmosphereField (outside the 3D band). */}
        <VentureBuilderScene />

        {/* The cinematic 3D stage band — begins at Duality (where "San Francisco
            · 37°46′N" appears) and runs through the Closing finale. The rayitos
            field emerges as SF lands and rises to its subtle crescendo at the
            close. Track record lives in the founder profiles (no repetition);
            its one collective stat folds into the Closing. */}
        <div ref={stageBandRef} style={{ position: "relative" }}>
          {/* Operators + Silicon Valley playbooks (the SF ⇄ SP duality) */}
          <DualityScene />

          {/* Who we are — the operators, full-bleed image accordion */}
          <WhoWeAreScene />

          {/* What we're building — the verticals */}
          <VerticalsScene />

          {/* Quiet close — collective stat bridge + think in public + the
              memo, over the rayitos rising to their subtle finale. id=contact */}
          <ClosingScene />
        </div>

        <Footer />
      </div>
    </div>
  );
}
