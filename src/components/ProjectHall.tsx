import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowDown } from 'lucide-react';

export type HallProject = {
  number: string;
  title: string;
  category: string;
  image: string;
};

type ProjectHallProps = {
  projects: HallProject[];
  onSelect: (project: HallProject) => void;
};

function makePlaque(project: HallProject) {
  const canvas = document.createElement('canvas');
  canvas.width = 768;
  canvas.height = 128;
  const context = canvas.getContext('2d');
  if (!context) return new THREE.CanvasTexture(canvas);

  context.fillStyle = '#d3d2bb';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#334337';
  context.font = '600 22px Arial';
  context.fillText(`${project.number}  /  ${project.category.toUpperCase()}`, 20, 34);
  context.fillStyle = '#17221b';
  context.font = '600 30px Arial';
  const title = project.title.length > 45 ? `${project.title.slice(0, 43)}...` : project.title;
  context.fillText(title, 20, 88);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function makeWallTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext('2d');
  if (!context) return null;

  context.fillStyle = '#24352d';
  context.fillRect(0, 0, 512, 512);
  for (let y = 20; y < 512; y += 128) {
    context.fillStyle = 'rgba(211, 232, 204, 0.04)';
    context.fillRect(0, y, 512, 2);
  }
  for (let x = 22; x < 512; x += 122) {
    context.fillStyle = 'rgba(4, 12, 9, 0.08)';
    context.fillRect(x, 0, 2, 512);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 1);
  return texture;
}

export default function ProjectHall({ projects, onSelect }: ProjectHallProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const [webglUnavailable, setWebglUnavailable] = useState(false);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    } catch {
      setWebglUnavailable(true);
      return undefined;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));
    renderer.setSize(stage.clientWidth, stage.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.domElement.className = 'work-hall-canvas';
    renderer.domElement.setAttribute('aria-label', 'Three-dimensional project gallery. Scroll to walk through the hall. Select a framed project to see details.');
    renderer.domElement.setAttribute('role', 'group');
    renderer.domElement.setAttribute('tabindex', '0');
    stage.prepend(renderer.domElement);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#111a16');
    scene.fog = new THREE.FogExp2('#111a16', 0.027);

    const camera = new THREE.PerspectiveCamera(68, stage.clientWidth / stage.clientHeight, 0.1, 60);
    camera.position.set(0, 1.72, 9.5);

    const warmGold = new THREE.MeshStandardMaterial({ color: '#92774a', metalness: 0.72, roughness: 0.3 });
    const darkTrim = new THREE.MeshStandardMaterial({ color: '#111c17', metalness: 0.22, roughness: 0.7 });
    const wallTexture = makeWallTexture();
    const wallMaterial = new THREE.MeshStandardMaterial({
      color: '#b6c3ae',
      map: wallTexture ?? undefined,
      roughness: 0.88,
      metalness: 0.02,
    });
    const floorMaterial = new THREE.MeshStandardMaterial({ color: '#28302a', roughness: 0.38, metalness: 0.16 });
    const ceilingMaterial = new THREE.MeshStandardMaterial({ color: '#17221c', roughness: 0.94 });

    scene.add(new THREE.HemisphereLight('#d8ead4', '#111610', 1.7));
    const entranceLight = new THREE.PointLight('#d9edca', 24, 20, 1.6);
    entranceLight.position.set(0, 4.8, 7);
    scene.add(entranceLight);

    const addBox = (
      width: number,
      height: number,
      depth: number,
      material: THREE.Material,
      position: [number, number, number],
      receiveShadow = false,
    ) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), material);
      mesh.position.set(...position);
      mesh.receiveShadow = receiveShadow;
      scene.add(mesh);
      return mesh;
    };

    const hallLength = 40;
    const hallCenter = -5;
    addBox(10.4, 0.28, hallLength, floorMaterial, [0, -0.15, hallCenter], true);
    addBox(10.4, 0.22, hallLength, ceilingMaterial, [0, 6.2, hallCenter]);
    addBox(0.22, 6.5, hallLength, wallMaterial, [-5.05, 3.02, hallCenter], true);
    addBox(0.22, 6.5, hallLength, wallMaterial, [5.05, 3.02, hallCenter], true);
    addBox(10.2, 6.5, 0.24, wallMaterial, [0, 3.02, -25.15], true);

    for (const side of [-1, 1]) {
      const baseboard = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.22, hallLength), darkTrim);
      baseboard.position.set(side * 4.88, 0.22, hallCenter);
      scene.add(baseboard);

      for (let index = 0; index < 7; index += 1) {
        const z = 10 - index * 5.6;
        const pilaster = new THREE.Mesh(new THREE.BoxGeometry(0.17, 6.15, 0.12), darkTrim);
        pilaster.position.set(side * 4.86, 3.02, z);
        scene.add(pilaster);

        const cap = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.055, 0.16), warmGold);
        cap.position.set(side * 4.82, 5.96, z);
        scene.add(cap);
      }
    }

    for (let index = 0; index < 18; index += 1) {
      const z = 12 - index * 2.15;
      const floorLine = new THREE.Mesh(
        new THREE.BoxGeometry(10, 0.012, 0.018),
        new THREE.MeshStandardMaterial({ color: '#8f947f', roughness: 0.72, metalness: 0.15 }),
      );
      floorLine.position.set(0, 0.0, z);
      scene.add(floorLine);
    }

    for (let index = 0; index < 7; index += 1) {
      const z = 8 - index * 5.1;
      const lamp = new THREE.Mesh(new THREE.BoxGeometry(1.45, 0.035, 0.28), warmGold);
      lamp.position.set(0, 6.04, z);
      scene.add(lamp);

      const light = new THREE.PointLight('#ffe2ae', 32, 9, 1.7);
      light.position.set(0, 5.45, z);
      scene.add(light);
    }

    const frameGroups: THREE.Group[] = [];
    const textureLoader = new THREE.TextureLoader();
    projects.forEach((project, index) => {
      const side = index % 2 === 0 ? 1 : -1;
      const z = 4 - index * 8;
      const group = new THREE.Group();
      group.position.set(side * 4.78, 3.15, z);
      group.rotation.y = side === 1 ? -Math.PI / 2 : Math.PI / 2;
      group.userData.project = project;

      const backing = new THREE.Mesh(new THREE.BoxGeometry(2.78, 2.08, 0.16), darkTrim);
      backing.castShadow = true;
      group.add(backing);

      const frame = new THREE.Mesh(new THREE.BoxGeometry(2.7, 2, 0.12), warmGold);
      frame.position.z = 0.095;
      frame.castShadow = true;
      group.add(frame);

      const mat = new THREE.Mesh(new THREE.PlaneGeometry(2.53, 1.84), new THREE.MeshStandardMaterial({ color: '#d0cfbd', roughness: 0.8 }));
      mat.position.z = 0.16;
      group.add(mat);

      const imageMaterial = new THREE.MeshBasicMaterial({ color: '#d0d0c4' });
      const image = new THREE.Mesh(new THREE.PlaneGeometry(2.3, 1.22), imageMaterial);
      image.position.set(0, 0.22, 0.175);
      group.add(image);
      textureLoader.load(project.image, (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        imageMaterial.map = texture;
        imageMaterial.color.set('#ffffff');
        imageMaterial.needsUpdate = true;
      });

      const plaque = new THREE.Mesh(
        new THREE.PlaneGeometry(2.3, 0.34),
        new THREE.MeshBasicMaterial({ map: makePlaque(project), toneMapped: false }),
      );
      plaque.position.set(0, -0.58, 0.18);
      group.add(plaque);

      for (const x of [-1.22, 1.22]) {
        const screw = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 8), warmGold);
        screw.position.set(x, 0.87, 0.19);
        group.add(screw);
      }

      scene.add(group);
      frameGroups.push(group);

      const pictureLight = new THREE.SpotLight('#ffe0aa', 22, 5.5, Math.PI / 5, 0.62, 1.4);
      pictureLight.position.set(side * 4.1, 4.45, z + 0.65);
      pictureLight.target.position.set(side * 4.7, 3.1, z);
      scene.add(pictureLight, pictureLight.target);
    });

    const target = new THREE.Vector3(0, 1.72, -1);
    let desiredProgress = 0;
    let currentZ = camera.position.z;
    let pointerX = 0;
    let pointerY = 0;
    let keyboardFrameIndex = 0;
    let animationFrame = 0;
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const updateProgress = () => {
      const rect = stage.getBoundingClientRect();
      const travel = stage.offsetHeight - window.innerHeight;
      desiredProgress = travel > 0 ? THREE.MathUtils.clamp(-rect.top / travel, 0, 1) : 0;
    };
    const onPointerMove = (event: PointerEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
      if (event.type === 'pointermove') {
        pointer.set(pointerX, -pointerY);
        raycaster.setFromCamera(pointer, camera);
        const hit = raycaster.intersectObjects(frameGroups, true).length > 0;
        renderer.domElement.style.cursor = hit ? 'pointer' : 'grab';
      }
    };
    const onClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.set(((event.clientX - rect.left) / rect.width) * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(frameGroups, true)[0];
      let targetGroup = hit?.object ?? null;
      while (targetGroup && !targetGroup.userData.project) targetGroup = targetGroup.parent;
      if (targetGroup?.userData.project) onSelect(targetGroup.userData.project as HallProject);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        keyboardFrameIndex = (keyboardFrameIndex + 1) % projects.length;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        keyboardFrameIndex = (keyboardFrameIndex - 1 + projects.length) % projects.length;
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        onSelect(projects[keyboardFrameIndex]);
      }
    };
    const onResize = () => {
      const width = stage.clientWidth;
      const height = stage.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    renderer.domElement.addEventListener('pointermove', onPointerMove);
    renderer.domElement.addEventListener('click', onClick);
    renderer.domElement.addEventListener('keydown', onKeyDown);
    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', onResize);
    updateProgress();

    const render = () => {
      currentZ = THREE.MathUtils.damp(currentZ, 9.5 - desiredProgress * 26, 5.2, 1 / 60);
      camera.position.set(pointerX * 0.22, 1.72 - pointerY * 0.12, currentZ);
      target.set(pointerX * 0.65, 1.72 - pointerY * 0.22, currentZ - 9);
      camera.lookAt(target);
      renderer.render(scene, camera);
      animationFrame = window.requestAnimationFrame(render);
    };
    render();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', onResize);
      renderer.domElement.removeEventListener('pointermove', onPointerMove);
      renderer.domElement.removeEventListener('click', onClick);
      renderer.domElement.removeEventListener('keydown', onKeyDown);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach((material) => {
            if ('map' in material && material.map instanceof THREE.Texture) material.map.dispose();
            material.dispose();
          });
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onSelect, projects]);

  return (
    <section className="work-walk" id="project-hall" aria-label="Three-dimensional selected projects gallery">
      <div className="work-hall-stage" ref={stageRef}>
        {webglUnavailable && <div className="work-hall-fallback">3D gallery is unavailable in this browser. Use the project list below to explore the work.</div>}
        <div className="work-hall-heading">
          <span>APXCORE <i /> PROJECT HALL</span>
          <span className="work-hall-counter"><span className="work-hall-live-dot" /> SCROLL TO WALK <ArrowDown size={13} /></span>
        </div>
        <div className="work-hall-bottom-label"><span>01 — 03</span><span>SELECT A FRAME TO EXPLORE</span></div>
        <div className="work-hall-project-list" aria-label="Projects">
          {projects.map((project) => (
            <button key={project.number} type="button" onClick={() => onSelect(project)}>{project.title}</button>
          ))}
        </div>
      </div>
    </section>
  );
}