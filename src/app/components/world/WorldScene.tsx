import { useEffect, useRef, type MutableRefObject } from 'react';
import * as THREE from 'three';
import { COMPACT_QUERY, geographicPoint, journeyPose } from './journey.mjs';
import { createAvanteGallery } from './AvanteGallery';

type Country = { name: string; polygons: number[][][][] };
type Props = { progress: MutableRefObject<number>; onReady: () => void; onFailure: () => void };

export default function WorldScene({ progress, onReady, onFailure }: Props) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { onFailure(); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.setClearColor(0x06070d, 0);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 160);
    const globe = new THREE.Group();
    scene.add(globe);
    const textures: THREE.Texture[] = [], materials: THREE.Material[] = [], geometries: THREE.BufferGeometry[] = [];
    const trackGeo = <T extends THREE.BufferGeometry>(g: T) => { geometries.push(g); return g; };
    const trackMat = <T extends THREE.Material>(m: T) => { materials.push(m); return m; };
    const sphereGeo = trackGeo(new THREE.SphereGeometry(2.15, 96, 64));
    const globeMat = trackMat(new THREE.MeshStandardMaterial({ color: '#ffffff', roughness: .82, metalness: .1 }));
    globe.add(new THREE.Mesh(sphereGeo, globeMat));
    const atmosphere = trackMat(new THREE.ShaderMaterial({
      transparent: true, depthWrite: false, side: THREE.BackSide, blending: THREE.AdditiveBlending,
      uniforms: { tint: { value: new THREE.Color('#7C4B98') } },
      vertexShader: 'varying vec3 n; varying vec3 v; void main(){ vec4 p=modelViewMatrix*vec4(position,1.); n=normalize(normalMatrix*normal); v=normalize(-p.xyz); gl_Position=projectionMatrix*p; }',
      fragmentShader: 'varying vec3 n; varying vec3 v; uniform vec3 tint; void main(){ float f=pow(max(0.,1.-abs(dot(normalize(n),normalize(v)))),4.); gl_FragColor=vec4(tint,f*.4); }',
    }));
    const halo = new THREE.Mesh(sphereGeo, atmosphere); halo.scale.setScalar(1.035); globe.add(halo);
    const lineMat = trackMat(new THREE.LineBasicMaterial({ color: '#B05B8D', transparent: true, opacity: .09 }));
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts = Array.from({ length: 181 }, (_, i) => new THREE.Vector3(...geographicPoint(lat, i * 2 - 180, 2.155)));
      globe.add(new THREE.Line(trackGeo(new THREE.BufferGeometry().setFromPoints(pts)), lineMat));
    }
    for (let lon = -180; lon < 180; lon += 30) {
      const pts = Array.from({ length: 91 }, (_, i) => new THREE.Vector3(...geographicPoint(i * 2 - 90, lon, 2.155)));
      globe.add(new THREE.Line(trackGeo(new THREE.BufferGeometry().setFromPoints(pts)), lineMat));
    }
    const sp = new THREE.Vector3(...geographicPoint(-23.55, -46.63, 2.17));
    const sf = new THREE.Vector3(...geographicPoint(37.4, -122.1, 2.17));
    const arcPts = Array.from({ length: 81 }, (_, i) => {
      const t = i / 80;
      return sf.clone().lerp(sp, t).normalize().multiplyScalar(2.18 + Math.sin(t * Math.PI) * .44);
    });
    globe.add(new THREE.Line(trackGeo(new THREE.BufferGeometry().setFromPoints(arcPts)), trackMat(new THREE.LineBasicMaterial({ color: '#FAB437', transparent: true, opacity: .75 }))));

    scene.add(new THREE.AmbientLight('#eef0f7', 1.65));
    const sun = new THREE.DirectionalLight('#eef0f7', 2.4); sun.position.set(-3, 6, 7); scene.add(sun);
    const rim = new THREE.DirectionalLight('#304B9B', 3.2); rim.position.set(5, 2, -4); scene.add(rim);

    let seed = 42;
    const random = () => { seed = (seed * 1664525 + 1013904223) >>> 0; return seed / 4294967296; };

    let disposed = false, frame = 0, inView = true, ready = false, cityOnly = false, announced = false;
    let compact = matchMedia(COMPACT_QUERY).matches;
    const mouse = new THREE.Vector2(), pointer = new THREE.Vector2();
    const signal = new AbortController();
    const gallery = createAvanteGallery(renderer, () => draw());
    scene.add(gallery.group);
    const draw = () => {
      frame = 0;
      if (disposed || !inView) return;
      pointer.lerp(mouse, .065);
      const pose = journeyPose(progress.current);
      gallery.update(pose.arrival, pointer);
      // Phone artwork occupies its own upper viewport, above the copy.
      gallery.group.position.x = compact ? -1.9 : 0;
      globe.visible = pose.globeVisible;
      globe.position.set(compact ? -pose.approach * .25 : 1.55 - pose.approach * .8, compact ? -pose.approach * .2 : .1 - pose.approach * .55, 0);
      globe.rotation.set(-.12 - pose.approach * .32 + pointer.y * .018, -.15 - pose.approach * .65 + pointer.x * .025, -.08);
      globe.scale.setScalar(1 + pose.approach * 1.8);
      globeMat.opacity = 1 - pose.landing;
      globeMat.transparent = pose.landing > 0;
      camera.position.set(pointer.x * .045, pointer.y * .025, 8.6);
      camera.lookAt(0, 0, 0);
      renderer.autoClear = true;
      // The opaque film owns this interval; clear the globe once, then leave
      // the GPU available for decoding instead of rendering an empty scene.
      const filmOnly = !pose.globeVisible && pose.arrival === 0;
      if (!filmOnly || !cityOnly) renderer.render(scene, camera);
      cityOnly = filmOnly;
      if (ready && !announced) { announced = true; onReady(); }
      if (pointer.distanceTo(mouse) > .002) schedule();
    };
    const schedule = () => { if (!frame && !disposed && inView && !document.hidden) frame = requestAnimationFrame(draw); };
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      compact = matchMedia(COMPACT_QUERY).matches;
      renderer.setPixelRatio(Math.min(devicePixelRatio, compact ? 1.25 : 1.5));
      renderer.setSize(w, h); camera.aspect = w / Math.max(h, 1); camera.updateProjectionMatrix(); schedule();
    };
    const move = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; const r = el.getBoundingClientRect(); mouse.set((e.clientX - r.left) / r.width - .5, (e.clientY - r.top) / r.height - .5); schedule(); };
    const lost = (e: Event) => { e.preventDefault(); onFailure(); };
    renderer.domElement.addEventListener('webglcontextlost', lost);
    const update = () => { if (document.hidden) draw(); else schedule(); };
    window.addEventListener('avante-world-update', update);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('visibilitychange', schedule);
    const resizeObserver = new ResizeObserver(resize); resizeObserver.observe(el);
    const observer = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; if (inView) schedule(); else { cancelAnimationFrame(frame); frame = 0; } }); observer.observe(el);
    resize();
    fetch('/world-assets/land.json', { signal: signal.signal }).then(r => { if (!r.ok) throw new Error('Map unavailable'); return r.json(); }).then((countries: Country[]) => {
      if (disposed) return;
      const canvas = document.createElement('canvas'); canvas.width = 2048; canvas.height = 1024;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#080b1c'; ctx.fillRect(0, 0, 2048, 1024);
      const brand = ctx.createLinearGradient(400, 850, 900, 180);
      [[0, '#FAB437'], [.17, '#F9B437'], [.34, '#E47A5C'], [.5, '#B05B8D'], [.65, '#7C4B98'], [.83, '#454697'], [1, '#304B9B']].forEach(([stop, color]) => brand.addColorStop(Number(stop), String(color)));
      countries.forEach(country => {
        ctx.fillStyle = brand;
        ctx.strokeStyle = country.name === 'Brazil' ? '#FAB437' : '#B05B8D'; ctx.lineWidth = country.name === 'Brazil' ? 1.6 : .6;
        country.polygons.forEach(polygon => {
          ctx.beginPath();
          polygon.forEach(ring => ring.forEach(([lon, lat], i) => {
            const x = (lon + 180) / 360 * 2048, y = (90 - lat) / 180 * 1024;
            if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
          }));
          ctx.closePath(); ctx.fill('evenodd'); ctx.stroke();
        });
      });
      const data = ctx.getImageData(0, 0, 2048, 1024).data;
      ctx.fillStyle = '#eef0f7';
      for (let y = 3; y < 1024; y += 5) for (let x = 3; x < 2048; x += 5) {
        if (data[(y * 2048 + x) * 4] > 40) { ctx.globalAlpha = .18 + random() * .34; ctx.fillRect(x, y, 1, 1); }
      }
      ctx.globalAlpha = 1;
      const tex = new THREE.CanvasTexture(canvas); tex.colorSpace = THREE.SRGBColorSpace; textures.push(tex);
      globeMat.map = tex; globeMat.needsUpdate = true; ready = true; draw();
    }).catch(error => { if (error.name !== 'AbortError' && !disposed) onFailure(); });
    return () => {
      disposed = true; signal.abort(); cancelAnimationFrame(frame); observer.disconnect(); resizeObserver.disconnect();
      window.removeEventListener('avante-world-update', update); window.removeEventListener('pointermove', move);
      document.removeEventListener('visibilitychange', schedule); renderer.domElement.removeEventListener('webglcontextlost', lost);
      gallery.dispose(); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose()); renderer.dispose(); renderer.domElement.remove();
    };
  }, [progress, onReady, onFailure]);
  return <div ref={host} className="world-canvas" aria-hidden="true" />;
}
