import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { stageState, subscribeStage, opacityFor, intensityFor } from "./useStageProgress";
import { lerpColor } from "@/app/lib/brandGradient";

// Stage3D — the cinematic 3D stage for beats 3–7. The ONLY file that imports
// three/R3F, so it lives in a lazy-loaded chunk and never touches first paint.
// A single fixed, transparent WebGL layer behind the editorial HTML: the camera
// descends a dark corridor of converging light-rays, driven by the shared
// scroll bus (stageState.progress). frameloop="demand" — the loop runs only
// while scrolling / settling, then idles (CWV).
//
// The ray field is a direct 3D port of the HERO's convergence look: rays sit on
// a radial layout around the central axis (organized, not random), each colored
// by its angle with the FULL vivid brand gradient (gold·coral·mauve·indigo),
// with a bright head dot + a trail toward centre — exactly the hero's
// dot+stroke language, just in depth.

const Z_START = 6; // camera z at progress 0 (top of the band)
const Z_END = -22; // camera z at progress 1 (descended through the corridor)

function brandColorThree(t: number) {
  const [r, g, b] = lerpColor(t);
  return new THREE.Color(r / 255, g / 255, b / 255);
}

// A small, crisp round dot sprite for the bright ray HEADS (like the hero's
// filled dot). Kept small so the saturated vertex color reads as a vivid point,
// never a fuzzy smudge.
function makeDotSprite() {
  const s = 48;
  const cv = document.createElement("canvas");
  cv.width = cv.height = s;
  const ctx = cv.getContext("2d");
  if (ctx) {
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.45, "rgba(255,255,255,0.5)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
  }
  const tex = new THREE.CanvasTexture(cv);
  tex.needsUpdate = true;
  return tex;
}

// Camera rig: dolly z = lerp(Z_START, Z_END, progress), smoothed in useFrame so
// it never snaps to raw scroll. Slow, cinematic glide.
function Rig() {
  const { camera, invalidate } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, Z_START));

  useEffect(() => subscribeStage(() => invalidate()), [invalidate]);

  useFrame((_, dt) => {
    const p = stageState.progress;
    target.current.set(0, 0, THREE.MathUtils.lerp(Z_START, Z_END, p));
    const k = 1 - Math.pow(0.18, Math.min(dt, 0.05));
    camera.position.lerp(target.current, k);
    camera.lookAt(0, 0, camera.position.z - 8);
    if (camera.position.distanceTo(target.current) > 0.003) invalidate();
  });

  return null;
}

// The convergence ray field — the hero's look, in 3D depth, now FLOWING:
// each star streams inward along its radial toward the centre and is reborn at
// the rim when it arrives (a perpetual convergence, exactly the hero's
// `rad -= spd`). Colour is baked by angle (full vivid gradient); only positions
// animate each frame.
const R_MAX = 13;
const R_MIN = 0.25;
function ConvergenceField() {
  const N = 720;
  const data = useMemo(() => {
    const linePos = new Float32Array(N * 2 * 3);
    const lineCol = new Float32Array(N * 2 * 3);
    const dotPos = new Float32Array(N * 3);
    const dotCol = new Float32Array(N * 3);
    const angs = new Float32Array(N);
    const rs = new Float32Array(N);
    const zs = new Float32Array(N);
    const trails = new Float32Array(N);
    const speeds = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      const ang = Math.random() * Math.PI * 2;
      angs[i] = ang;
      rs[i] = R_MIN + Math.random() * (R_MAX - R_MIN);
      zs[i] = Z_START - 2 - Math.random() * (Z_START - Z_END);
      trails[i] = 0.7 + Math.random() * 1.6;
      speeds[i] = 0.22 + Math.random() * 0.7; // world units / sec, inward (calm)
      // FULL vivid gradient by angle — exactly the hero.
      const c = brandColorThree((Math.cos(ang) + 1) / 2);
      const lo = i * 6;
      lineCol[lo] = c.r;
      lineCol[lo + 1] = c.g;
      lineCol[lo + 2] = c.b;
      lineCol[lo + 3] = c.r * 0.12;
      lineCol[lo + 4] = c.g * 0.12;
      lineCol[lo + 5] = c.b * 0.12;
      const dpo = i * 3;
      dotCol[dpo] = c.r;
      dotCol[dpo + 1] = c.g;
      dotCol[dpo + 2] = c.b;
    }

    const lineGeom = new THREE.BufferGeometry();
    lineGeom.setAttribute("position", new THREE.BufferAttribute(linePos, 3));
    lineGeom.setAttribute("color", new THREE.BufferAttribute(lineCol, 3));
    const dotGeom = new THREE.BufferGeometry();
    dotGeom.setAttribute("position", new THREE.BufferAttribute(dotPos, 3));
    dotGeom.setAttribute("color", new THREE.BufferAttribute(dotCol, 3));

    return { linePos, dotPos, angs, rs, zs, trails, speeds, lineGeom, dotGeom };
  }, []);
  const { lineGeom, dotGeom } = data;

  const dotSprite = useMemo(() => makeDotSprite(), []);

  const groupRef = useRef<THREE.Group>(null);
  const dotMatRef = useRef<THREE.PointsMaterial>(null);
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null);
  const warmTint = useMemo(() => new THREE.Color(), []);

  useEffect(
    () => () => {
      lineGeom.dispose();
      dotGeom.dispose();
      dotSprite.dispose();
    },
    [lineGeom, dotGeom, dotSprite]
  );

  // Per-frame: stream every star INWARD along its radial (reborn at the rim on
  // arrival) → a perpetual convergence toward the centre. Plus the by-progress
  // evolution (tighten→open→turn→warm). frameloop is "always" but the Canvas
  // only exists while the band is in view (IO), so the cost is scoped to 3–7.
  useFrame((_, dt) => {
    const dts = Math.min(dt, 0.05);
    const { linePos, dotPos, angs, rs, zs, trails } = data;
    const speeds = data.speeds;
    for (let i = 0; i < N; i++) {
      let r = rs[i] - speeds[i] * dts;
      if (r <= R_MIN) r = R_MAX; // reborn at the rim → endless convergence
      rs[i] = r;
      const ang = angs[i];
      const z = zs[i];
      const cx = Math.cos(ang);
      const sy = Math.sin(ang);
      const tip = Math.max(0, r - Math.min(trails[i], r - 0.02));
      const lo = i * 6;
      linePos[lo] = cx * r;
      linePos[lo + 1] = sy * r * 0.9;
      linePos[lo + 2] = z;
      linePos[lo + 3] = cx * tip;
      linePos[lo + 4] = sy * tip * 0.9;
      linePos[lo + 5] = z;
      const dpo = i * 3;
      dotPos[dpo] = cx * r;
      dotPos[dpo + 1] = sy * r * 0.9;
      dotPos[dpo + 2] = z;
    }
    lineGeom.attributes.position.needsUpdate = true;
    dotGeom.attributes.position.needsUpdate = true;

    const p = Math.min(1, Math.max(0, stageState.progress));
    const g = groupRef.current;
    if (g) {
      g.rotation.z = p * 0.4; // slow turn through the descent
      g.scale.setScalar(0.84 + p * 0.3); // tight at entry → opens descending
    }
    // warm tint grows in the back half → the dawn the camera descends toward
    const f = Math.min(1, Math.max(0, (p - 0.45) / 0.55));
    warmTint.setRGB(1, 1 - 0.16 * f, 1 - 0.32 * f);
    if (dotMatRef.current) dotMatRef.current.color.copy(warmTint);
    if (lineMatRef.current) lineMatRef.current.color.copy(warmTint);
  });

  return (
    <group ref={groupRef}>
      {/* radial trails */}
      <lineSegments geometry={lineGeom}>
        <lineBasicMaterial
          ref={lineMatRef}
          vertexColors
          transparent
          opacity={0.85}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>
      {/* bright vivid head dots */}
      <points geometry={dotGeom}>
        <pointsMaterial
          ref={dotMatRef}
          map={dotSprite}
          size={0.12}
          vertexColors
          transparent
          opacity={1}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

// The Avante "A" — a small, soft mark deep at the centre, exactly where every
// ray converges. It rides 15 units ahead of the camera on the central axis, so
// as you descend it stays the focal point the light streams INTO (the hero's
// "world converges into the A", made the anchor of the whole corridor).
function AvanteMark() {
  const tex = useMemo(() => new THREE.TextureLoader().load("/redesign-assets/avante-A.png"), []);
  const ref = useRef<THREE.Sprite>(null);
  const { camera } = useThree();
  useEffect(() => () => tex.dispose(), [tex]);
  useFrame(() => {
    if (ref.current) ref.current.position.set(0, 0, camera.position.z - 18);
  });
  return (
    <sprite ref={ref} scale={[1.25, 1.82, 1]}>
      <spriteMaterial map={tex} transparent opacity={0.72} depthWrite={false} />
    </sprite>
  );
}

export default function Stage3D() {
  const maxDpr = typeof window !== "undefined" ? Math.min(window.devicePixelRatio || 1, 1.75) : 1.5;
  const rootRef = useRef<HTMLDivElement | null>(null);

  // The continuity bridge: fade the whole WebGL layer in/out by scroll position
  // (opacityFor(raw)) so it EMERGES descending into beat 3 and is invisible over
  // beats 1–2 and the footer. Capped at MAX_LAYER_OPACITY so the 3D stays a
  // RECEDING backdrop — the editorial content is the hero, not the field.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const apply = () => {
      // envelope (in/out) × subtle finale crescendo — recedes mid-band, peaks at the close
      el.style.opacity = (opacityFor(stageState.raw) * intensityFor(stageState.raw)).toFixed(3);
    };
    apply();
    return subscribeStage(apply);
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none", opacity: 0 }}
    >
      <Canvas
        frameloop="always"
        dpr={[1, maxDpr]}
        gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, Z_START], fov: 55, near: 0.1, far: 120 }}
        style={{ width: "100%", height: "100%" }}
      >
        <fogExp2 attach="fog" args={[0x06070d, 0.05]} />
        <ConvergenceField />
        <AvanteMark />
        <Rig />
      </Canvas>
    </div>
  );
}
