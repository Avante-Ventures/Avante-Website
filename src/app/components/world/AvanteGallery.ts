import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

// An imaginary brand gallery, built from the unmodified official Avante mark.
// It is a destination for the experience, not a rendering of an owned office.
export function createAvanteGallery(renderer: THREE.WebGLRenderer, onLoad: () => void) {
  const group = new THREE.Group();
  const sculpture = new THREE.Group();
  const geometries: THREE.BufferGeometry[] = [], materials: THREE.Material[] = [];
  const geo = <T extends THREE.BufferGeometry>(value: T) => { geometries.push(value); return value; };
  const mat = <T extends THREE.Material>(value: T) => { materials.push(value); return value; };
  const pmrem = new THREE.PMREMGenerator(renderer), room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, .04);
  room.dispose(); pmrem.dispose();
  const signal = new AbortController();
  let disposed = false;
  group.add(sculpture);
  sculpture.position.set(1.9, .05, 0);
  const floor = new THREE.Mesh(geo(new THREE.PlaneGeometry(14, 14)), mat(new THREE.ShaderMaterial({
    transparent: true, depthWrite: false,
    vertexShader: 'varying vec2 floorUv; void main(){floorUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}',
    fragmentShader: 'varying vec2 floorUv; void main(){float a=pow(max(0.,1.-length(floorUv-.5)*2.),1.3);gl_FragColor=vec4(.024,.018,.065,a*.85);}',
  })));
  floor.rotation.x = -Math.PI / 2; floor.position.set(1.9, -1.95, 0); group.add(floor);
  const plinth = new THREE.Mesh(geo(new THREE.CylinderGeometry(1.62, 1.7, .15, 96)), mat(new THREE.MeshPhysicalMaterial({ color: '#080918', metalness: .4, roughness: .26, clearcoat: .6, envMap: environment.texture, envMapIntensity: .18 })));
  plinth.position.set(1.9, -1.82, 0); group.add(plinth);
  const rose = mat(new THREE.MeshBasicMaterial({ color: '#B05B8D', transparent: true, opacity: .55 }));
  const gold = mat(new THREE.MeshBasicMaterial({ color: '#FAB437', transparent: true, opacity: .7 }));
  [1.72, 2.2, 3.05].forEach((radius, index) => {
    const ring = new THREE.Mesh(geo(new THREE.TorusGeometry(radius, index === 0 ? .007 : .003, 6, 128)), index === 0 ? gold : rose);
    ring.rotation.x = -Math.PI / 2; ring.position.set(1.9, -1.93, 0); group.add(ring);
  });
  const portal = new THREE.Mesh(geo(new THREE.TorusGeometry(2.75, .018, 8, 128, Math.PI * 1.4)), mat(new THREE.MeshBasicMaterial({ color: '#7C4B98', transparent: true, opacity: .4 })));
  portal.position.set(1.9, -.05, -1.4); portal.rotation.z = -.2; group.add(portal);
  const illumination = new THREE.PointLight('#B05B8D', 12, 12, 2); illumination.position.set(3, 1, 3); group.add(illumination);
  const warm = new THREE.PointLight('#FAB437', 9, 10, 2); warm.position.set(-.3, 2, 1); group.add(warm);

  fetch('/world-assets/avante-A.svg', { signal: signal.signal }).then(response => { if (!response.ok) throw new Error('Mark unavailable'); return response.text(); }).then(svg => {
    if (disposed) return;
    // SVGLoader only parses paths: the authoritative silhouette stays unchanged.
    const data = new SVGLoader().parse(svg.replace('fill="url(#avanteA)"', 'fill="#ffffff"'));
    const shapes = data.paths.flatMap(path => SVGLoader.createShapes(path));
    const geometry = geo(new THREE.ExtrudeGeometry(shapes, { depth: 150, steps: 1, bevelEnabled: true, bevelThickness: 16, bevelSize: 10, bevelSegments: 3, curveSegments: 8 }));
    geometry.computeBoundingBox();
    const size = geometry.boundingBox!.getSize(new THREE.Vector3());
    geometry.center(); geometry.scale(3.5 / size.y, -3.5 / size.y, 3.5 / size.y);
    geometry.computeBoundingBox();
    const palette = ['#FAB437', '#F9B437', '#E47A5C', '#B05B8D', '#7C4B98', '#454697', '#304B9B'].map(color => new THREE.Color(color));
    const positions = geometry.attributes.position, colors = new Float32Array(positions.count * 3);
    const bounds = geometry.boundingBox!;
    const color = new THREE.Color();
    for (let i = 0; i < positions.count; i++) {
      const t = THREE.MathUtils.clamp((positions.getX(i) - bounds.min.x) / (bounds.max.x - bounds.min.x), 0, 1) * (palette.length - 1);
      const index = Math.min(palette.length - 2, Math.floor(t));
      color.copy(palette[index]).lerp(palette[index + 1], t - index);
      colors.set([color.r, color.g, color.b], i * 3);
    }
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const metal = mat(new THREE.MeshPhysicalMaterial({ vertexColors: true, metalness: .32, roughness: .32, clearcoat: .45, clearcoatRoughness: .22, envMap: environment.texture, envMapIntensity: .4, side: THREE.DoubleSide }));
    const mark = new THREE.Mesh(geometry, metal);
    sculpture.add(mark);
    const reflection = new THREE.Mesh(geometry, mat(new THREE.MeshBasicMaterial({ vertexColors: true, transparent: true, opacity: .075, side: THREE.DoubleSide, depthWrite: false })));
    reflection.scale.y = -1; reflection.position.y = -3.85; sculpture.add(reflection);
    onLoad();
  }).catch(error => { if (error.name !== 'AbortError') console.warn('Avante sculpture could not load. The ventures remain available.'); });

  return {
    group,
    update(arrival: number, pointer: THREE.Vector2) {
      group.visible = arrival > 0;
      sculpture.rotation.y = -.3 + arrival * .5 + pointer.x * .16;
      sculpture.rotation.x = pointer.y * .04;
      sculpture.position.z = -.8 + arrival * .8;
      group.position.y = -.3 * (1 - arrival);
    },
    dispose() { disposed = true; signal.abort(); environment.dispose(); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); },
  };
}
