import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createAvanteGallery } from '../world/AvanteGallery';

// Decorative, demand-rendered architecture. All process information is HTML.
export default function InteriorScene({ mode, stage, onReady }: { mode: 'gallery' | 'process'; stage: number; onReady: (ready: boolean) => void }) {
  const host = useRef<HTMLDivElement>(null), targetStage = useRef(stage), invalidate = useRef<() => void>(() => {});
  useEffect(() => { targetStage.current = stage; invalidate.current(); }, [stage]);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); } catch { return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.4));
    renderer.setClearColor(0, 0); renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.6;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(36, 1, .1, 60);
    scene.add(new THREE.HemisphereLight('#fff2df', '#37304e', 3.2));
    const key = new THREE.DirectionalLight('#ffd9b6', 4); key.position.set(-4, 7, 5); scene.add(key);
    const fill = new THREE.DirectionalLight('#bc9cdc', 3); fill.position.set(4, 4, -2); scene.add(fill);
    const geometries: THREE.BufferGeometry[] = [], materials: THREE.Material[] = [];
    let disposed = false, contextLost = false, frame = 0, available = mode === 'process', shownStage = targetStage.current, entrance = 0, previous = performance.now();
    const pointer = new THREE.Vector2(), destination = new THREE.Vector2();
    const group = new THREE.Group(); scene.add(group);
    const gallery = mode === 'gallery' ? createAvanteGallery(renderer, () => { available = true; draw(performance.now()); }) : null;
    if (gallery) { gallery.group.position.x = -1.9; group.add(gallery.group); }
    const levels: THREE.Group[] = [];
    if (!gallery) {
      const box = new THREE.BoxGeometry(1, 1, 1); geometries.push(box);
      const colors = ['#e4be84', '#daaa91', '#c799a9', '#a08fb7', '#817caa', '#646b99'];
      function solid(color: string, metalness = .22) { const material = new THREE.MeshStandardMaterial({ color, metalness, roughness: .32 }); materials.push(material); return material; }
      const base = new THREE.Mesh(box, solid('#e9d8c7')); base.scale.set(3.5, .22, 2.7); base.position.y = -1.7; group.add(base);
      const columns = solid('#ccb4a5', .5);
      for (let i = 0; i < 6; i++) {
        const level = new THREE.Group(); level.userData.y = -1.35 + i * .47; group.add(level); levels.push(level);
        const slab = new THREE.Mesh(box, solid(colors[i])); slab.scale.set(2.8 - i * .1, .13, 2.05); level.add(slab);
        for (const x of [-1.05, 1.05]) for (const z of [-.75, .75]) { const column = new THREE.Mesh(box, columns); column.scale.set(.065, .36, .065); column.position.set(x, -.245, z); level.add(column); }
      }
      group.rotation.y = -.42;
    }
    const schedule = () => { if (!disposed && !contextLost && !document.hidden && !frame) frame = requestAnimationFrame(draw); };
    function draw(now: number) {
      frame = 0; if (disposed || contextLost) return;
      const elapsed = Math.min((now - previous) / 1000, .05); previous = now;
      entrance = Math.min(1, entrance + elapsed / 1.7);
      pointer.lerp(destination, 1 - Math.exp(-elapsed / .13));
      shownStage += (targetStage.current - shownStage) * (1 - Math.exp(-elapsed / .18));
      if (gallery) gallery.update(1, pointer);
      else levels.forEach((level, i) => { const amount = THREE.MathUtils.clamp(shownStage - i + 1, .025, 1); level.scale.set(1, amount, 1); level.position.y = level.userData.y + (1 - amount) * .35; level.visible = amount > .03; });
      camera.position.set(4.2 + pointer.x * .4 + (1 - entrance) * .45, 2.6 + pointer.y * .2, 7.2);
      if (gallery) camera.position.set(.8 + pointer.x * .45 + (1 - entrance) * .3, .4 + pointer.y * .2, 7.8);
      camera.lookAt(0, -.12, 0); renderer.render(scene, camera);
      if (available) onReady(true);
      if (entrance < 1 || pointer.distanceTo(destination) > .002 || Math.abs(targetStage.current - shownStage) > .002) schedule();
    }
    const resize = () => { if (!el.clientWidth || !el.clientHeight) return; renderer.setSize(el.clientWidth, el.clientHeight); camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); draw(performance.now()); };
    const move = (e: PointerEvent) => { if (e.pointerType !== 'mouse') return; const r = el.getBoundingClientRect(); destination.set((e.clientX - r.left) / r.width - .5, (e.clientY - r.top) / r.height - .5); schedule(); };
    const leave = () => { destination.set(0, 0); schedule(); };
    const visibility = () => { if (document.hidden) { cancelAnimationFrame(frame); frame = 0; } else { previous = performance.now(); schedule(); } };
    const lost = (event: Event) => { event.preventDefault(); contextLost = true; available = false; cancelAnimationFrame(frame); frame = 0; onReady(false); };
    renderer.domElement.addEventListener('webglcontextlost', lost);
    el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave); document.addEventListener('visibilitychange', visibility);
    const observer = new ResizeObserver(resize); observer.observe(el);
    invalidate.current = () => { if (document.hidden) draw(performance.now()); else schedule(); };
    resize();
    return () => { disposed = true; cancelAnimationFrame(frame); invalidate.current = () => {}; observer.disconnect(); document.removeEventListener('visibilitychange', visibility); el.removeEventListener('pointermove', move); el.removeEventListener('pointerleave', leave); renderer.domElement.removeEventListener('webglcontextlost', lost); gallery?.dispose(); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); renderer.dispose(); renderer.domElement.remove(); };
  }, [mode, onReady]);
  return <div ref={host} className="interior-webgl" />;
}
