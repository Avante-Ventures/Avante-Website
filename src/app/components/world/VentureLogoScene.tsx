import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { VENTURES, type VentureKind } from './ventures';

// Extrude the official marks. WIR's fine italic signature stays in the SVG layer.
export default function VentureLogoScene({ kind, onReady, onFailure }: { kind: VentureKind; onReady: () => void; onFailure: () => void }) {
  const host = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }); }
    catch { onFailure(); return; }
    renderer.setPixelRatio(Math.min(devicePixelRatio, matchMedia('(pointer: coarse)').matches ? 1.25 : 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.45;
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(30, 1, .1, 50);
    const sculpture = new THREE.Group();
    const restingX = kind === 'legal' ? -.09 : -.035, restingY = kind === 'legal' ? -.28 : .16;
    sculpture.rotation.set(restingX, restingY, 0);
    scene.add(sculpture);
    const pmrem = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
    let environment = pmrem.fromScene(room, .04);
    room.dispose(); pmrem.dispose();
    scene.environment = environment.texture;
    scene.add(new THREE.AmbientLight('#ffffff', 1.6));
    const key = new THREE.DirectionalLight('#fff4e8', 3.5); key.position.set(-3, 4, 6); scene.add(key);
    const rim = new THREE.DirectionalLight('#9fafe4', 2.5); rim.position.set(4, 1, -2); scene.add(rim);
    const geometries: THREE.BufferGeometry[] = [], materials: THREE.Material[] = [];
    const signal = new AbortController();
    let disposed = false, loaded = false, contextLost = false, frame = 0, width = 6, height = 2;
    const target = new THREE.Vector2(), pointer = new THREE.Vector2();
    const draw = () => {
      frame = 0;
      if (disposed || contextLost) return;
      pointer.lerp(target, .12);
      sculpture.rotation.y = restingY + pointer.x * .1;
      sculpture.rotation.x = restingX + pointer.y * .06;
      renderer.render(scene, camera);
      if (loaded) onReady();
      if (!document.hidden && pointer.distanceTo(target) > .001) schedule();
    };
    const schedule = () => { if (!disposed && !frame) { if (document.hidden) draw(); else frame = requestAnimationFrame(draw); } };
    const resize = () => {
      const w = el.clientWidth, h = el.clientHeight;
      renderer.setSize(w, h); camera.aspect = w / Math.max(1, h);
      const halfFov = Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      camera.position.set(0, .08, Math.max(height / (2 * halfFov), width / (2 * halfFov * camera.aspect)) * 1.32);
      camera.lookAt(0, 0, 0); camera.updateProjectionMatrix(); schedule();
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') return;
      const bounds = (el.closest('.venture-composition') ?? el).getBoundingClientRect();
      target.set((event.clientX - bounds.left) / bounds.width - .5, (event.clientY - bounds.top) / bounds.height - .5); schedule();
    };
    const leave = () => { target.set(0, 0); schedule(); };
    const lost = (event: Event) => {
      event.preventDefault(); contextLost = true;
      cancelAnimationFrame(frame); frame = 0; onFailure();
    };
    const restored = () => {
      // Render-target pixels are lost with the context; rebuild the reflections.
      const restoredPmrem = new THREE.PMREMGenerator(renderer), restoredRoom = new RoomEnvironment();
      environment.dispose();
      environment = restoredPmrem.fromScene(restoredRoom, .04);
      scene.environment = environment.texture;
      restoredRoom.dispose(); restoredPmrem.dispose();
      contextLost = false; resize();
    };
    const interaction = el.closest('.venture-composition') ?? el;
    interaction.addEventListener('pointermove', move as EventListener, { passive: true }); interaction.addEventListener('pointerleave', leave);
    renderer.domElement.addEventListener('webglcontextlost', lost);
    renderer.domElement.addEventListener('webglcontextrestored', restored);
    const observer = new ResizeObserver(resize); observer.observe(el); resize();

    fetch(VENTURES[kind].logo, { signal: signal.signal }).then(response => {
      if (!response.ok) throw new Error('Logo unavailable');
      return response.text();
    }).then(svg => {
      if (disposed) return;
      const document = new DOMParser().parseFromString(svg, 'image/svg+xml');
      const gradients = [...document.querySelectorAll('linearGradient')];
      const data = new SVGLoader().parse(svg.replace(/url\(#[^)]+\)/g, '#ffffff'));
      const parts = data.paths.map(path => {
        const shapes = SVGLoader.createShapes(path);
        const geometry = new THREE.ExtrudeGeometry(shapes, { depth: kind === 'legal' ? 110 : 18, steps: 1, curveSegments: 12, bevelEnabled: true, bevelThickness: kind === 'legal' ? 5 : .45, bevelSize: kind === 'legal' ? 3 : .3, bevelSegments: 3 });
        geometries.push(geometry); geometry.computeBoundingBox();
        return { path, geometry };
      });
      const bounds = new THREE.Box3(); parts.forEach(({ geometry }) => bounds.union(geometry.boundingBox!));
      const size = bounds.getSize(new THREE.Vector3()), center = bounds.getCenter(new THREE.Vector3());
      const scale = Math.min(6.8 / size.x, 3.2 / size.y);
      width = size.x * scale; height = size.y * scale;
      for (const { path, geometry } of parts) {
        const node = path.userData!.node as Element;
        const gradient = kind === 'legal' ? gradients[0] : node.getAttribute('class') === 'cls-1' ? gradients[0] : node.getAttribute('class') === 'cls-2' ? gradients[1] : undefined;
        const positions = geometry.attributes.position, colors = new Float32Array(positions.count * 3);
        const stops = gradient ? [...gradient.querySelectorAll('stop')].map(stop => ({ at: parseFloat(stop.getAttribute('offset') || '0') / (stop.getAttribute('offset')!.includes('%') ? 100 : 1), color: new THREE.Color(stop.getAttribute('stop-color')!) })) : [];
        const gradientX = (attribute: string, fallback: number) => {
          const value = gradient?.getAttribute(attribute);
          if (!value) return fallback;
          return value.includes('%') ? bounds.min.x + parseFloat(value) / 100 * size.x : Number(value);
        };
        const x1 = gradientX('x1', bounds.min.x), x2 = gradientX('x2', bounds.max.x);
        const color = new THREE.Color(kind === 'legal' ? '#f5f2ec' : '#ffffff');
        for (let i = 0; i < positions.count; i++) {
          if (stops.length) {
            const t = THREE.MathUtils.clamp((positions.getX(i) - x1) / (x2 - x1), 0, 1);
            const right = stops.findIndex(stop => stop.at >= t);
            if (right <= 0) color.copy(stops[right < 0 ? stops.length - 1 : 0].color);
            else { const a = stops[right - 1], b = stops[right]; color.copy(a.color).lerp(b.color, (t - a.at) / Math.max(.0001, b.at - a.at)); }
          }
          colors.set([color.r, color.g, color.b], i * 3);
        }
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.translate(-center.x, -center.y, -center.z); geometry.scale(scale, -scale, scale);
        const face = new THREE.MeshBasicMaterial({ vertexColors: true, toneMapped: false, side: THREE.DoubleSide });
        const edge = new THREE.MeshPhysicalMaterial({ color: kind === 'legal' ? '#9c7564' : '#5c4c84', metalness: kind === 'legal' ? .7 : .45, roughness: kind === 'legal' ? .32 : .38, envMapIntensity: .8, side: THREE.DoubleSide });
        materials.push(face, edge); sculpture.add(new THREE.Mesh(geometry, [face, edge]));
      }
      loaded = true; resize();
    }).catch(error => { if (!disposed && error.name !== 'AbortError') onFailure(); });
    return () => {
      disposed = true; signal.abort(); cancelAnimationFrame(frame); observer.disconnect();
      interaction.removeEventListener('pointermove', move as EventListener); interaction.removeEventListener('pointerleave', leave);
      renderer.domElement.removeEventListener('webglcontextlost', lost);
      renderer.domElement.removeEventListener('webglcontextrestored', restored);
      geometries.forEach(geometry => geometry.dispose()); materials.forEach(material => material.dispose()); environment.dispose();
      renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    };
  }, [kind, onReady, onFailure]);
  return <div ref={host} className="venture-logo-canvas" aria-hidden="true" />;
}
