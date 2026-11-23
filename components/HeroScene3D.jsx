'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * Procedural Canvas Texture Generator for realistic golden fried pastry,
 * flaky meat-pie crust, and glossy peppered chicken glaze.
 */
function createFoodTexture({ baseColor, speckleColor, highlightColor, speckles = 260, seed = 1 }) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 256, 256);

  // Simple deterministic pseudo-random generator
  let s = seed * 9301 + 49297;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  for (let i = 0; i < speckles; i++) {
    const x = rand() * 256;
    const y = rand() * 256;
    const r = 1.2 + rand() * 5.5;
    ctx.fillStyle = rand() > 0.45 ? speckleColor : highlightColor;
    ctx.globalAlpha = 0.14 + rand() * 0.22;
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  const tex = new THREE.CanvasTexture(canvas);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** 1. 3D Puff-Puff â€” plump golden-brown Nigerian fried dough ball */
function createPuffPuff(mat) {
  const geo = new THREE.SphereGeometry(0.46, 36, 36);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    // Subtle organic handmade puff-puff dimples
    const wave = 1 + 0.045 * Math.sin(x * 7.5 + y * 5.2) * Math.cos(z * 6.3);
    pos.setXYZ(i, x * wave, y * 0.94 * wave, z * wave);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, mat);
}

/** 2. 3D Samosa â€” crispy puffed golden triangular pocket */
function createSamosa(mat) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.56);
  shape.quadraticCurveTo(0.32, 0.08, 0.56, -0.36);
  shape.quadraticCurveTo(0, -0.44, -0.56, -0.36);
  shape.quadraticCurveTo(-0.32, 0.08, 0, 0.56);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.11,
    bevelSize: 0.09,
    bevelSegments: 5,
    curveSegments: 16,
  });
  geo.center();
  return new THREE.Mesh(geo, mat);
}

/** 3. 3D Nigerian Meat Pie â€” iconic half-moon flaky pastry with crimped fork edge */
function createMeatPie(crustMat, edgeMat) {
  const group = new THREE.Group();

  const pieShape = new THREE.Shape();
  pieShape.moveTo(-0.62, -0.14);
  pieShape.absarc(0, -0.14, 0.62, Math.PI, 0, true);
  pieShape.lineTo(-0.62, -0.14);

  const bodyGeo = new THREE.ExtrudeGeometry(pieShape, {
    depth: 0.16,
    bevelEnabled: true,
    bevelThickness: 0.13,
    bevelSize: 0.08,
    bevelSegments: 6,
    curveSegments: 24,
  });
  bodyGeo.center();
  const body = new THREE.Mesh(bodyGeo, crustMat);
  group.add(body);

  // Crimped scalloped edge bumps along the curved arc
  const crimpCount = 11;
  for (let i = 0; i < crimpCount; i++) {
    const angle = Math.PI * (0.08 + (i / (crimpCount - 1)) * 0.84);
    const bead = new THREE.Mesh(new THREE.SphereGeometry(0.068, 12, 12), edgeMat);
    bead.position.set(Math.cos(angle) * 0.66, Math.sin(angle) * 0.66 - 0.25, 0);
    bead.scale.set(1.1, 0.75, 1.35);
    group.add(bead);
  }

  return group;
}

/** 4. 3D Spring Roll â€” crispy golden wrapped cylinder */
function createSpringRoll(mat, endMat) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.21, 0.76, 12, 24), mat);
  body.rotation.z = Math.PI / 2;
  group.add(body);

  // Subtle diagonal wrapper seam ring
  const seam = new THREE.Mesh(new THREE.TorusGeometry(0.212, 0.016, 8, 28), endMat);
  seam.rotation.y = Math.PI / 2.2;
  seam.rotation.x = 0.25;
  group.add(seam);

  return group;
}

/** 5. 3D Peppered Chicken Drumstick â€” glazed spicy chicken leg with bone tip */
function createChickenDrumstick(chickenMat, boneMat, chiliMat) {
  const group = new THREE.Group();

  // Lathe profile for plump drumstick
  const points = [
    new THREE.Vector2(0.0, -0.62),
    new THREE.Vector2(0.09, -0.58),
    new THREE.Vector2(0.11, -0.25),
    new THREE.Vector2(0.24, -0.02),
    new THREE.Vector2(0.36, 0.22),
    new THREE.Vector2(0.34, 0.45),
    new THREE.Vector2(0.19, 0.6),
    new THREE.Vector2(0.0, 0.64),
  ];
  const meatGeo = new THREE.LatheGeometry(points, 28);
  const meat = new THREE.Mesh(meatGeo, chickenMat);
  group.add(meat);

  // Crisp bone tip
  const boneShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 0.34, 16), boneMat);
  boneShaft.position.y = -0.7;
  group.add(boneShaft);

  const knob1 = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 14), boneMat);
  knob1.position.set(-0.045, -0.86, 0);
  const knob2 = new THREE.Mesh(new THREE.SphereGeometry(0.075, 14, 14), boneMat);
  knob2.position.set(0.045, -0.86, 0);
  group.add(knob1, knob2);

  // Tiny green pepper / herb flecks on the peppered glaze
  const fleckPositions = [
    [0.24, 0.26, 0.25],
    [-0.22, 0.35, 0.22],
    [0.12, 0.45, -0.26],
    [-0.26, 0.14, -0.18],
  ];
  fleckPositions.forEach(([fx, fy, fz]) => {
    const fleck = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.03, 0.06), chiliMat);
    fleck.position.set(fx, fy, fz);
    fleck.rotation.set(fx * 3, fy * 4, fz * 2);
    group.add(fleck);
  });

  return group;
}

/** 6. 3D Peppered Beef Skewer â€” glossy seared beef cubes on a bamboo stick */
function createBeefSkewer(beefMat, stickMat, pepperMat) {
  const group = new THREE.Group();
  const stick = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.55, 10), stickMat);
  group.add(stick);

  [-0.32, 0.04, 0.38].forEach((y, i) => {
    const cube = new THREE.Mesh(new THREE.DodecahedronGeometry(0.19, 1), beefMat);
    cube.scale.set(1.1, 0.88, 0.95);
    cube.position.y = y;
    cube.rotation.set(i * 0.7, i * 1.1, 0.3);
    group.add(cube);
  });

  const bellPepper = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.07, 0.18), pepperMat);
  bellPepper.position.y = -0.14;
  bellPepper.rotation.y = 0.6;
  group.add(bellPepper);

  return group;
}

/**
 * Interactive 3D Floating Small Chops Scene (Three.js)
 * Replaces abstract shapes with recognizable 3D Puff-Puff, Samosa, Meat Pie,
 * Spring Roll, Peppered Chicken Drumstick & Peppered Beef Skewer â€” positioned
 * cleanly around the perimeter & right platter stage so the hero stays airy.
 */
export default function HeroScene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / Math.max(1, container.clientHeight),
      0.1,
      100
    );
    camera.position.set(0, 0, 10.5);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.12;
    container.appendChild(renderer.domElement);

    // Warm studio daylight for appetizing food materials
    const hemiLight = new THREE.HemisphereLight(0xfffaf2, 0xe8c49a, 1.45);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xfff6ea, 2.0);
    keyLight.position.set(5, 8, 8);
    scene.add(keyLight);

    const warmRim = new THREE.PointLight(0xe8521a, 1.8, 26);
    warmRim.position.set(-7, 2, 5);
    scene.add(warmRim);

    // Procedural appetizing food materials
    const puffTex = createFoodTexture({
      baseColor: '#d97724',
      speckleColor: '#9a4310',
      highlightColor: '#f5b041',
      speckles: 320,
      seed: 11,
    });
    const pastryTex = createFoodTexture({
      baseColor: '#e4a243',
      speckleColor: '#b96d1e',
      highlightColor: '#f8d288',
      speckles: 260,
      seed: 23,
    });
    const chickenTex = createFoodTexture({
      baseColor: '#b83214',
      speckleColor: '#6e1908',
      highlightColor: '#e85d1a',
      speckles: 340,
      seed: 37,
    });

    const puffMat = new THREE.MeshPhysicalMaterial({
      map: puffTex,
      roughness: 0.48,
      metalness: 0.02,
      clearcoat: 0.22,
      clearcoatRoughness: 0.45,
    });

    const samosaMat = new THREE.MeshPhysicalMaterial({
      map: pastryTex,
      roughness: 0.42,
      metalness: 0.04,
      clearcoat: 0.35,
      clearcoatRoughness: 0.35,
    });

    const pieCrustMat = new THREE.MeshPhysicalMaterial({
      map: pastryTex,
      color: 0xf4c06a,
      roughness: 0.38,
      clearcoat: 0.48,
      clearcoatRoughness: 0.25,
    });

    const pieEdgeMat = new THREE.MeshStandardMaterial({
      color: 0xd98e32,
      roughness: 0.5,
    });

    const springRollMat = new THREE.MeshPhysicalMaterial({
      map: pastryTex,
      color: 0xebb052,
      roughness: 0.36,
      clearcoat: 0.35,
    });

    const chickenMat = new THREE.MeshPhysicalMaterial({
      map: chickenTex,
      roughness: 0.28,
      clearcoat: 0.72,
      clearcoatRoughness: 0.2,
    });

    const beefMat = new THREE.MeshPhysicalMaterial({
      map: chickenTex,
      color: 0x7c2512,
      roughness: 0.32,
      clearcoat: 0.65,
    });

    const boneMat = new THREE.MeshStandardMaterial({ color: 0xf5ecd9, roughness: 0.55 });
    const stickMat = new THREE.MeshStandardMaterial({ color: 0xdcb982, roughness: 0.7 });
    const greenPepperMat = new THREE.MeshStandardMaterial({ color: 0x2f8f46, roughness: 0.4 });

    const group = new THREE.Group();
    scene.add(group);
    const floatingItems = [];

    const addFood = (mesh, pos, rot, scale, speed, amp, spin) => {
      mesh.position.set(...pos);
      mesh.rotation.set(...rot);
      mesh.scale.setScalar(scale);
      group.add(mesh);
      floatingItems.push({
        mesh,
        basePos: mesh.position.clone(),
        speed,
        amp,
        spin,
      });
    };

    // Carefully staged around the right platter & outer corners (zero text overlap!)
    // 1. Peppered Chicken Drumstick â€” top right
    addFood(
      createChickenDrumstick(chickenMat, boneMat, greenPepperMat),
      [5.45, 2.25, -0.8],
      [0.3, 0.2, -0.55],
      1.05,
      0.72,
      0.22,
      [0.003, 0.006, 0.002]
    );

    // 2. Golden Samosa â€” top center-right above platter
    addFood(
      createSamosa(samosaMat),
      [1.15, 2.85, -1.1],
      [0.35, -0.4, 0.25],
      1.02,
      0.85,
      0.2,
      [0.004, 0.007, 0.002]
    );

    // 3. Nigerian Meat Pie â€” bottom right below platter
    addFood(
      createMeatPie(pieCrustMat, pieEdgeMat),
      [5.35, -2.25, -0.9],
      [0.25, -0.35, 0.22],
      0.98,
      0.66,
      0.22,
      [0.003, -0.006, 0.002]
    );

    // 4. Crispy Spring Roll â€” bottom center-right
    addFood(
      createSpringRoll(springRollMat, pieEdgeMat),
      [1.75, -2.95, -1.0],
      [0.4, 0.3, 0.35],
      1.08,
      0.78,
      0.18,
      [0.005, 0.005, 0.002]
    );

    // 5. Golden Puff-Puff Duo â€” far upper-left corner & mid-right edge
    addFood(
      createPuffPuff(puffMat),
      [-6.25, 2.65, -1.6],
      [0.2, 0.4, 0.1],
      0.95,
      0.82,
      0.2,
      [0.004, 0.005, 0.001]
    );
    addFood(
      createPuffPuff(puffMat),
      [6.15, 0.05, -1.5],
      [0.5, 0.2, 0.3],
      0.82,
      0.92,
      0.18,
      [0.003, 0.006, 0.002]
    );

    // 6. Peppered Beef Skewer â€” far bottom-left corner
    addFood(
      createBeefSkewer(beefMat, stickMat, greenPepperMat),
      [-6.1, -2.55, -1.5],
      [0.2, 0.3, -0.55],
      0.96,
      0.7,
      0.22,
      [0.002, 0.007, 0.001]
    );

    // Subtle floating warm spice motes
    const particleCount = 45;
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 16;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 9;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4 - 2.5;
    }
    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xe8521a,
      size: 0.055,
      transparent: true,
      opacity: 0.26,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    const targetPointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      targetPointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / Math.max(1, container.clientHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let frameId;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      currentPointer.x += (targetPointer.x - currentPointer.x) * 0.045;
      currentPointer.y += (targetPointer.y - currentPointer.y) * 0.045;

      const scrollShift = Math.min(window.scrollY / 650, 1.4);
      group.rotation.y = currentPointer.x * 0.14;
      group.rotation.x = -currentPointer.y * 0.08 + scrollShift * 0.14;
      group.position.y = scrollShift * 0.65;

      floatingItems.forEach((item, idx) => {
        item.mesh.position.y = item.basePos.y + Math.sin(t * item.speed + idx * 1.3) * item.amp;
        item.mesh.rotation.x += item.spin[0];
        item.mesh.rotation.y += item.spin[1];
        item.mesh.rotation.z += item.spin[2];
      });

      particles.rotation.y = t * 0.02 + currentPointer.x * 0.06;
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      puffTex.dispose();
      pastryTex.dispose();
      chickenTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="hero-canvas-layer" aria-hidden="true" />;
}

