import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { scenePose } from './story.mjs';

type Props = { progress: React.MutableRefObject<number>; venture: number; labels: string[]; onReady: () => void; onFailure: () => void };

// One scene and one render loop; transforms are derived from scroll, never accumulated.
export default function CompoundScene({ progress, venture, labels, onReady, onFailure }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const selected = useRef(venture);
  selected.current = venture;
  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let renderer: THREE.WebGLRenderer;
    try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'low-power' }); }
    catch { onFailure(); return; }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x06070d, 0);
    el.appendChild(renderer.domElement);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, .1, 80);
    const root = new THREE.Group(); scene.add(root);
    const textures: THREE.Texture[] = [];
    const materials: THREE.Material[] = [];
    const geometries: THREE.BufferGeometry[] = [];
    const material = (color: string, metalness = .1, roughness = .55) => {
      const m = new THREE.MeshStandardMaterial({ color, metalness, roughness }); materials.push(m); return m;
    };
    const ink = material('#202331', .5, .34), edge = material('#a99990', .65, .3);
    const paper = material('#efe6d7', .02, .85), dark = material('#0c0e17', .3, .48);
    const amber = material('#FAB437', .5, .3);
    const box = (parent: THREE.Object3D, size: number[], pos: number[], mat: THREE.Material, radius = .035) => {
      const geo = new RoundedBoxGeometry(size[0], size[1], size[2], 2, Math.min(radius, Math.min(...size) / 3));
      geometries.push(geo); const mesh = new THREE.Mesh(geo, mat); mesh.position.set(...pos as [number, number, number]);
      mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
    };
    const texture = (kind: 'screen' | 'page' | 'label', text: string, variant = 0) => {
      const canvas = document.createElement('canvas'); canvas.width = 768; canvas.height = kind === 'label' ? 128 : 512;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = kind === 'page' ? '#eee6d8' : '#141622'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = kind === 'page' ? '#393641' : '#ede4d6'; ctx.font = '500 34px sans-serif';
      ctx.fillText(text, 38, kind === 'label' ? 78 : 66);
      if (kind !== 'label') {
        ctx.fillStyle = variant ? '#b584c4' : '#d99f4e'; ctx.fillRect(38, 97, 692, 3);
        if (kind === 'page') {
          for (let i = 0; i < 12; i++) { ctx.fillStyle = i === 5 || i === 8 ? '#d6ad70' : '#b9b1a8'; ctx.fillRect(38, 130 + i * 25, 380 + (i % 3) * 70, 6); }
          ctx.strokeStyle = '#7f7670'; ctx.strokeRect(38, 445, 240, 30);
        } else {
          ctx.fillStyle = '#282838'; ctx.fillRect(38, 132, 174, 334);
          for (let i = 0; i < 6; i++) { ctx.fillStyle = i === 1 ? '#d99f4e' : '#767180'; ctx.fillRect(60, 163 + i * 39, 112, 5); }
          for (let i = 0; i < 3; i++) { ctx.fillStyle = '#2a2938'; ctx.fillRect(240 + i * 167, 132, 152, 85); ctx.fillStyle = variant ? '#b584c4' : '#d99f4e'; ctx.fillRect(258 + i * 167, 152, 80, 5); }
          for (let i = 0; i < 6; i++) { ctx.fillStyle = i % 2 ? '#262536' : '#1d1e2b'; ctx.fillRect(240, 238 + i * 37, 490, 30); ctx.fillStyle = '#b9b2bd'; ctx.fillRect(257, 251 + i * 37, 110 + i * 30, 4); }
        }
      }
      const t = new THREE.CanvasTexture(canvas); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy()); textures.push(t); return t;
    };
    const surface = (parent: THREE.Object3D, width: number, height: number, tex: THREE.Texture, pos: number[], rotate = false) => {
      const g = new THREE.PlaneGeometry(width, height); geometries.push(g);
      const m = new THREE.MeshBasicMaterial({ map: tex, side: THREE.DoubleSide }); materials.push(m);
      const mesh = new THREE.Mesh(g, m); mesh.position.set(...pos as [number, number, number]); if (rotate) mesh.rotation.x = -Math.PI / 2; parent.add(mesh); return mesh;
    };
    scene.add(new THREE.HemisphereLight('#e1d5ec', '#251823', 2));
    const key = new THREE.DirectionalLight('#ffe1b7', 4.5); key.position.set(-3, 7, 4); key.castShadow = true;
    key.shadow.mapSize.set(2048, 2048); key.shadow.camera.left = -6; key.shadow.camera.right = 6; key.shadow.camera.top = 6; key.shadow.camera.bottom = -6; key.shadow.normalBias = .035; scene.add(key);
    const rim = new THREE.DirectionalLight('#ad80ca', 3.2); rim.position.set(5, 3, -4); scene.add(rim);
    const fill = new THREE.PointLight('#f5a559', 20, 15); fill.position.set(-4, 1, 2); scene.add(fill);

    // Architectural plinth and a tangible operator's desk.
    box(root, [5.6, .16, 3.55], [0, -.9, 0], dark, .12);
    box(root, [4.9, .06, 3.04], [0, -.8, 0], edge);
    box(root, [4.8, .18, 2.95], [0, .48, 0], ink, .09);
    box(root, [4.65, .014, 2.8], [0, .58, 0], dark);
    for (const x of [-1.95, 1.95]) for (const z of [-1.05, 1.05]) box(root, [.09, 1.2, .09], [x, -.16, z], edge);
    box(root, [4.86, .025, .025], [0, .46, 1.49], amber);

    const product = new THREE.Group(); root.add(product); product.position.set(.65, .65, -.44);
    box(product, [1.13, .045, .62], [0, 0, 0], edge);
    box(product, [.1, .5, .12], [0, .25, -.12], edge);
    box(product, [2.1, 1.36, .105], [0, 1, -.13], ink, .06);
    const screens = [texture('screen', 'αlphajuri'), texture('screen', 'WIR', 1)];
    const screen = surface(product, 1.97, 1.22, screens[0], [0, 1, -.071]);
    screen.name = 'workflow-screen';
    box(product, [1.6, .055, .55], [0, .025, .67], edge);
    for (let r = 0; r < 4; r++) for (let c = 0; c < 12; c++) box(product, [.105, .017, .072], [-.67 + c * .122, .064, .5 + r * .106], dark, .005);

    const documents = new THREE.Group(); root.add(documents); documents.position.set(-1.36, .65, .33); documents.rotation.y = -.18;
    const pages: THREE.Mesh[] = [];
    const pageFaces: THREE.Mesh[] = [];
    const pageTextures = [texture('page', '01 / αlphajuri'), texture('page', '01 / WIR', 1)];
    for (let i = 0; i < 4; i++) {
      pages.push(box(documents, [1.02, .018, 1.39], [i * .02, i * .025, i * .02], paper, .007));
      pageFaces.push(surface(documents, .98, 1.35, pageTextures[0], [i * .02, i * .025 + .011, i * .02], true));
      pageFaces[i].name = `workflow-page-${i}`;
    }
    const records = new THREE.Group(); root.add(records); records.position.set(1.65, .66, .65);
    for (let i = 0; i < 3; i++) {
      box(records, [.66, .13, .84], [0, i * .16, 0], ink);
      box(records, [.025, .035, .025], [-.22, i * .16, .43], amber);
      for (let j = 0; j < 4; j++) box(records, [.025, .012, .016], [.05 + j * .055, i * .16 + .01, .429], edge, .003);
    }
    // Desk lamp with a warm emissive diffuser.
    box(root, [.35, .035, .35], [-1.93, .6, -.92], edge);
    box(root, [.045, 1.08, .045], [-1.93, 1.16, -.92], edge);
    box(root, [.7, .045, .045], [-1.6, 1.7, -.92], edge);
    box(root, [.74, .045, .15], [-1.56, 1.68, -.92], amber);
    const lampMaterial = new THREE.MeshStandardMaterial({ color: '#ffe4ac', emissive: '#ffc575', emissiveIntensity: 2 }); materials.push(lampMaterial);
    box(root, [.65, .01, .11], [-1.56, 1.65, -.92], lampMaterial);

    const operator = new THREE.Group(); root.add(operator);
    box(operator, [.84, .1, .84], [.6, -.05, 2.04], ink, .08);
    box(operator, [.86, .89, .1], [.6, .45, 2.43], ink, .08);
    box(operator, [.07, .65, .07], [.6, -.43, 2.04], edge);
    box(operator, [.92, .065, .08], [.6, -.72, 2.04], edge);
    box(operator, [.08, .065, .92], [.6, -.72, 2.04], edge);

    const annotations = new THREE.Group(); root.add(annotations);
    const labelPositions = [[.65, 3.04, -.1], [1.75, 1.82, .88], [.6, .9, 2.7]];
    [labels[0], labels[1], labels[2]].forEach((label, i) => {
      surface(annotations, 1.35, .225, texture('label', `${String(i + 1).padStart(2, '0')} / ${label}`), labelPositions[i]);
    });
    // A duplicate uses shared geometry/materials. It appears only in the final beat.
    const second = root.clone(true); scene.add(second);
    const secondaryScreen = second.getObjectByName('workflow-screen') as THREE.Mesh;
    secondaryScreen.material = (screen.material as THREE.Material).clone(); materials.push(secondaryScreen.material);
    for (let i = 0; i < 4; i++) {
      const mesh = second.getObjectByName(`workflow-page-${i}`) as THREE.Mesh;
      mesh.material = (pageFaces[i].material as THREE.Material).clone(); materials.push(mesh.material);
    }
    // Three paths make the assembled company's relationships visible.
    const connections = new THREE.Group(); root.add(connections);
    const connectionMaterial = new THREE.LineBasicMaterial({ color: '#d59d68', transparent: true, opacity: .55 }); materials.push(connectionMaterial);
    [[[-1.3, 1.5, .35], [-1.3, 1.5, -.7], [.65, 1.5, -.7], [.65, 2.4, -.7]],
      [[.65, 2.4, -.7], [1.65, 2.4, -.7], [1.65, 1.2, .65]],
      [[1.65, 1.2, .65], [1.65, 1.2, 2.5], [.6, .5, 2.5]]].forEach(points => {
      const geo = new THREE.BufferGeometry().setFromPoints(points.map(([x, y, z]) => new THREE.Vector3(x, y, z))); geometries.push(geo); connections.add(new THREE.Line(geo, connectionMaterial));
    });
    // Thin ruled ground lines give perspective without an expensive environment map.
    const ground = new THREE.Group(); scene.add(ground);
    const lineMaterial = new THREE.LineBasicMaterial({ color: '#766252', transparent: true, opacity: .15 }); materials.push(lineMaterial);
    for (let i = -8; i <= 8; i++) {
      const geo = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(i, -.99, -8), new THREE.Vector3(i, -.99, 8)]); geometries.push(geo); ground.add(new THREE.Line(geo, lineMaterial));
      const geo2 = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-8, -.99, i), new THREE.Vector3(8, -.99, i)]); geometries.push(geo2); ground.add(new THREE.Line(geo2, lineMaterial));
    }
    const shadowGeo = new THREE.PlaneGeometry(30, 30); geometries.push(shadowGeo);
    const shadowMat = new THREE.ShadowMaterial({ opacity: .25 }); materials.push(shadowMat);
    const floor = new THREE.Mesh(shadowGeo, shadowMat); floor.rotation.x = -Math.PI / 2; floor.position.y = -.97; floor.receiveShadow = true; scene.add(floor);

    let frame = 0, active = true, disposed = false, lastProgress = -1, lastVenture = -1;
    const pointer = new THREE.Vector2();
    let lastX = 0, lastY = 0;
    const render = () => {
      frame = 0;
      if (disposed || !active || document.hidden) return;
      const p = progress.current;
      // No continuous rendering while idle; interpolation settles in a few frames.
      lastX += (pointer.x - lastX) * .07; lastY += (pointer.y - lastY) * .07;
      const pose = scenePose(p);
      root.position.x = -pose.compound * 1.7;
      root.rotation.y = pose.rotation + lastX * .035;
      documents.position.y = pose.paperY;
      documents.rotation.z = -.04 * pose.open;
      pages.forEach((page, i) => { page.position.y = i * (.025 + pose.open * .16); pageFaces[i].position.y = page.position.y + .011; });
      product.position.y = pose.screenY;
      records.position.y = pose.recordsY;
      annotations.visible = pose.build > .65;
      connections.visible = pose.build > .65;
      operator.position.z = pose.build * .5;
      second.visible = pose.compound > .01; second.scale.setScalar(pose.secondScale); second.position.set(3.2, -.24, -1.1); second.rotation.y = -.2;
      camera.position.set(4.6 + pose.compound, pose.cameraY + lastY * .12, pose.cameraZ);
      camera.lookAt(.15, .8 + pose.open * .35, 0);
      if (lastVenture !== selected.current) {
        (screen.material as THREE.MeshBasicMaterial).map = screens[selected.current];
        (secondaryScreen.material as THREE.MeshBasicMaterial).map = screens[1 - selected.current];
        pageFaces.forEach(mesh => { (mesh.material as THREE.MeshBasicMaterial).map = pageTextures[selected.current]; });
        for (let i = 0; i < 4; i++) ((second.getObjectByName(`workflow-page-${i}`) as THREE.Mesh).material as THREE.MeshBasicMaterial).map = pageTextures[1 - selected.current];
        lastVenture = selected.current;
      }
      renderer.render(scene, camera);
      lastProgress = p;
      if (Math.abs(pointer.x - lastX) + Math.abs(pointer.y - lastY) > .001) frame = requestAnimationFrame(render);
    };
    const schedule = () => { if (!frame && active && !document.hidden) frame = requestAnimationFrame(render); };
    const resize = () => { const width = el.clientWidth, height = el.clientHeight; if (!width || !height) return; renderer.setSize(width, height); camera.aspect = width / height; camera.updateProjectionMatrix(); schedule(); };
    const move = (event: PointerEvent) => { if (event.pointerType === 'touch') return; const r = el.getBoundingClientRect(); pointer.set((event.clientX - r.left) / r.width - .5, (event.clientY - r.top) / r.height - .5); schedule(); };
    const lost = (event: Event) => { event.preventDefault(); onFailure(); };
    const observer = new IntersectionObserver(([entry]) => { active = entry.isIntersecting; if (active) schedule(); }, { rootMargin: '80px' }); observer.observe(el);
    const ro = new ResizeObserver(resize); ro.observe(el);
    // Host custom event is dispatched when a workflow selector changes.
    const update = () => { if (progress.current !== lastProgress || selected.current !== lastVenture) schedule(); };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('compound-update', schedule);
    document.addEventListener('visibilitychange', schedule);
    el.addEventListener('pointermove', move); renderer.domElement.addEventListener('webglcontextlost', lost);
    resize(); render(); onReady();
    return () => {
      disposed = true; cancelAnimationFrame(frame); observer.disconnect(); ro.disconnect();
      window.removeEventListener('scroll', update); window.removeEventListener('compound-update', schedule); document.removeEventListener('visibilitychange', schedule);
      el.removeEventListener('pointermove', move); renderer.domElement.removeEventListener('webglcontextlost', lost);
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose());
      renderer.dispose(); renderer.forceContextLoss(); renderer.domElement.remove();
    };
  }, [progress, labels, onReady, onFailure]);
  useEffect(() => { window.dispatchEvent(new Event('compound-update')); }, [venture]);
  return <div ref={host} className="compound-webgl" aria-hidden="true" />;
}
