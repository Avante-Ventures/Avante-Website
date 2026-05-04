import { motion } from 'motion/react';
import brazilMap3D from "figma:asset/74fa96e445ccfc4a7e6981a97d144c53880a9f45.png";
import usaMap3D from "figma:asset/6c4d6ef642d31dd41502fcb0023f6c5da5537058.png";

export function AvanteHeroBackground() {
  return (
    <div 
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {/* Base Animated Mesh Gradient - Avante Colors */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(152, 80, 154, 0.15), transparent), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(241, 139, 70, 0.12), transparent), radial-gradient(ellipse 50% 80% at 20% 100%, rgba(66, 70, 140, 0.18), transparent)',
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(66, 70, 140, 0.18), transparent), radial-gradient(ellipse 60% 60% at 20% 50%, rgba(249, 180, 55, 0.12), transparent), radial-gradient(ellipse 50% 70% at 80% 100%, rgba(152, 80, 154, 0.15), transparent)',
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(152, 80, 154, 0.15), transparent), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(241, 139, 70, 0.12), transparent), radial-gradient(ellipse 50% 80% at 20% 100%, rgba(66, 70, 140, 0.18), transparent)',
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(152, 80, 154, 0.15), transparent), radial-gradient(ellipse 60% 50% at 80% 50%, rgba(241, 139, 70, 0.12), transparent), radial-gradient(ellipse 50% 80% at 20% 100%, rgba(66, 70, 140, 0.18), transparent)'
        }}
      />

      {/* Subtle Grid Pattern */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          opacity: 0.3,
          maskImage: 'radial-gradient(ellipse 100% 60% at 50% 40%, black, transparent)'
        }}
      />

      {/* Floating Orbs - Avante Signature Colors */}
      <motion.div
        animate={{
          x: [0, 100, 0],
          y: [0, -80, 0],
          scale: [1, 1.1, 1],
          opacity: [0.08, 0.15, 0.08]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          position: 'absolute',
          top: '15%',
          left: '10%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(249, 180, 55, 0.2) 0%, rgba(241, 139, 70, 0.1) 40%, transparent 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 60, 0],
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.18, 0.1]
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        style={{
          position: 'absolute',
          top: '40%',
          right: '8%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(152, 80, 154, 0.25) 0%, rgba(66, 70, 140, 0.12) 40%, transparent 70%)',
          filter: 'blur(70px)',
          pointerEvents: 'none'
        }}
      />

      <motion.div
        animate={{
          x: [0, 80, 0],
          y: [0, -50, 0],
          scale: [1.1, 1, 1.1],
          opacity: [0.06, 0.12, 0.06]
        }}
        transition={{
          duration: 16,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4
        }}
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '15%',
          width: '450px',
          height: '450px',
          background: 'radial-gradient(circle, rgba(66, 70, 140, 0.2) 0%, rgba(241, 139, 70, 0.08) 40%, transparent 70%)',
          filter: 'blur(65px)',
          pointerEvents: 'none'
        }}
      />

      {/* USA Map 3D - Smaller Background Element at 20% opacity */}
      <div
        style={{
          position: 'absolute',
          left: '5%',
          top: '15%',
          width: '200px',
          height: 'auto',
          opacity: 0.2,
          zIndex: 0
        }}
        className="hidden md:block"
      >
        <img
          src={usaMap3D}
          alt=""
          style={{
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(66, 70, 140, 0.2))'
          }}
        />
      </div>

      {/* Brazil Map 3D - Smaller Background Element at 20% opacity */}
      <div
        style={{
          position: 'absolute',
          right: '5%',
          bottom: '15%',
          width: '180px',
          height: 'auto',
          opacity: 0.2,
          zIndex: 0
        }}
        className="hidden md:block"
      >
        <img
          src={brazilMap3D}
          alt=""
          style={{
            width: '100%',
            height: 'auto',
            filter: 'drop-shadow(0 10px 30px rgba(249, 180, 55, 0.2))'
          }}
        />
      </div>

      {/* Noise Texture Overlay */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E")`,
          pointerEvents: 'none',
          opacity: 0.6
        }}
      />

      {/* Vignette Effect */}
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, rgba(21, 30, 53, 0.6) 100%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}