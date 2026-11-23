'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

function createFoodTexture({ baseColor, speckleColor, highlightColor, speckles = 180, seed = 1 }) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = baseColor;
  ctx.fillRect(0, 0, 128, 128);

  let s = seed * 9301 + 49297;
  const rand = () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };

  for (let i = 0; i < speckles; i++) {
    const x = rand() * 128;
    const y = rand() * 128;
    const r = 0.8 + rand() * 3.2;
    ctx.fillStyle = rand() > 0.45 ? speckleColor : highlightColor;
    ctx.globalAlpha = 0.15 + rand() * 0.22;
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

function createPuffPuff(mat) {
  const geo = new THREE.SphereGeometry(0.46, 22, 22);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const wave = 1 + 0.045 * Math.sin(x * 7.5 + y * 5.2) * Math.cos(z * 6.3);
    pos.setXYZ(i, x * wave, y * 0.94 * wave, z * wave);
  }
  geo.computeVertexNormals();
  return new THREE.Mesh(geo, mat);
}

function createSamosa(mat) {
  const shape = new THREE.Shape();
  shape.moveTo(0, 0.56);
  shape.quadraticCurveTo(0.32, 0.08, 0.56, -0.36);
  shape.quadraticCurveTo(0, -0.44, -0.56, -0.36);
  shape.quadraticCurveTo(-0.32, 0.08, 0, 0.56);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.14,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.08,
    bevelSegments: 3,
    curveSegments: 10,
  });
  geo.center();
  return new THREE.Mesh(geo, mat);
}

function createMeatPie(crustMat, edgeMat) {
  const group = new THREE.Group();
  const pieShape = new THREE.Shape();
  pieShape.moveTo(-0.62, -0.14);
  pieShape.absarc(0, -0.14, 0.62, Math.PI, 0, true);
  pieShape.lineTo(-0.62, -0.14);

  const bodyGeo = new THREE.ExtrudeGeometry(pieShape, {
    depth: 0.15,
    bevelEnabled: true,
    bevelThickness: 0.11,
    bevelSize: 0.07,
    bevelSegments: 3,
    curveSegments: 14,
  });
  bodyGeo.center();
  group.add(new THREE.Mesh(bodyGeo, crustMat));

  const beadGeo = new THREE.SphereGeometry(0.068, 8, 8);
  for (let i = 0; i < 10; i++) {
    const angle = Math.PI * (0.08 + (i / 9) * 0.84);
    const bead = new THREE.Mesh(beadGeo, edgeMat);
    bead.position.set(Math.cos(angle) * 0.66, Math.sin(angle) * 0.66 - 0.25, 0);
    bead.scale.set(1.1, 0.75, 1.3);
    group.add(bead);
  }
  return group;
}

function createSpringRoll(mat, endMat) {
  const group = new THREE.Group();
  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.21, 0.76, 8, 16), mat);
  body.rotation.z = Math.PI / 2;
  group.add(body);

  const seam = new THREE.Mesh(new THREE.TorusGeometry(0.212, 0.016, 6, 18), endMat);
  seam.rotation.y = Math.PI / 2.2;
  seam.rotation.x = 0.25;
  group.add(seam);
  return group;
}

function createChickenDrumstick(chickenMat, boneMat, chiliMat) {
  const group = new THREE.Group();
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
  group.add(new THREE.Mesh(new THREE.LatheGeometry(points, 18), chickenMat));

  const boneShaft = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.08, 0.34, 10), boneMat);
  boneShaft.position.y = -0.7;
  group.add(boneShaft);

  const knobGeo = new THREE.SphereGeometry(0.075, 10, 10);
  const knob1 = new THREE.Mesh(knobGeo, boneMat);
  knob1.position.set(-0.045, -0.86, 0);
  const knob2 = new THREE.Mesh(knobGeo, boneMat);
  knob2.position.set(0.045, -0.86, 0);
  group.add(knob1, knob2);

  const fleckGeo = new THREE.BoxGeometry(0.06, 0.03, 0.06);
  [
    [0.24, 0.26, 0.25],
    [-0.22, 0.35, 0.22],
    [0.12, 0.45, -0.26],
  ].forEach(([fx, fy, fz]) => {
    const fleck = new THREE.Mesh(fleckGeo, chiliMat);
    fleck.position.set(fx, fy, fz);
    fleck.rotation.set(fx * 3, fy * 4, fz * 2);
    group.add(fleck);
  });

  return group;
}

function createBeefSkewer(beefMat, stickMat, pepperMat) {
  const group = new THREE.Group();
  group.add(new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 1.55, 8), stickMat));

  const cubeGeo = new THREE.DodecahedronGeometry(0.19, 0);
  [-0.32, 0.04, 0.38].forEach((y, i) => {
    const cube = new THREE.Mesh(cubeGeo, beefMat);
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
 * High-Performance 3D Floating Small Chops Scene
 * - Automatically PAUSES WebGL rendering via IntersectionObserver when scrolled out of view
 * - Uses lightweight Standard shaders & capped 1.5x pixelRatio so scrolling stays silky 60-120fps
 */
export default function HeroScene3D() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      container.clientWidth / Math.max(1, container.clientHeight),
      0.1,
      60
    );
    camera.position.set(0, 0, 10.5);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    scene.add(new THREE.HemisphereLight(0xfffaf2, 0xe8c49a, 1.45));
    const keyLight = new THREE.DirectionalLight(0xfff6ea, 1.9);
    keyLight.position.set(5, 8, 8);
    scene.add(keyLight);

    const warmRim = new THREE.PointLight(0xe8521a, 1.6, 24);
    warmRim.position.set(-7, 2, 5);
    scene.add(warmRim);

    const puffTex = createFoodTexture({
      baseColor: '#d97724',
      speckleColor: '#9a4310',
      highlightColor: '#f5b041',
      seed: 11,
    });
    const pastryTex = createFoodTexture({
      baseColor: '#e4a243',
      speckleColor: '#b96d1e',
      highlightColor: '#f8d288',
      seed: 23,
    });
    const chickenTex = createFoodTexture({
      baseColor: '#b83214',
      speckleColor: '#6e1908',
      highlightColor: '#e85d1a',
      seed: 37,
    });

    // Fast MeshStandardMaterial (much lighter than clearcoat physical shaders)
    const puffMat = new THREE.MeshStandardMaterial({ map: puffTex, roughness: 0.45, metalness: 0.04 });
    const samosaMat = new THREE.MeshStandardMaterial({ map: pastryTex, roughness: 0.38, metalness: 0.05 });
    const pieCrustMat = new THREE.MeshStandardMaterial({ map: pastryTex, color: 0xf4c06a, roughness: 0.35 });
    const pieEdgeMat = new THREE.MeshStandardMaterial({ color: 0xd98e32, roughness: 0.5 });
    const springRollMat = new THREE.MeshStandardMaterial({ map: pastryTex, color: 0xebb052, roughness: 0.36 });
    const chickenMat = new THREE.MeshStandardMaterial({ map: chickenTex, roughness: 0.26, metalness: 0.08 });
    const beefMat = new THREE.MeshStandardMaterial({ map: chickenTex, color: 0x7c2512, roughness: 0.3, metalness: 0.08 });
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
      floatingItems.push({ mesh, basePos: mesh.position.clone(), speed, amp, spin });
    };

    addFood(createChickenDrumstick(chickenMat, boneMat, greenPepperMat), [5.45, 2.25, -0.8], [0.3, 0.2, -0.55], 1.05, 0.72, 0.22, [0.003, 0.006, 0.002]);
    addFood(createSamosa(samosaMat), [1.15, 2.85, -1.1], [0.35, -0.4, 0.25], 1.02, 0.85, 0.2, [0.004, 0.007, 0.002]);
    addFood(createMeatPie(pieCrustMat, pieEdgeMat), [5.35, -2.25, -0.9], [0.25, -0.35, 0.22], 0.98, 0.66, 0.22, [0.003, -0.006, 0.002]);
    addFood(createSpringRoll(springRollMat, pieEdgeMat), [1.75, -2.95, -1.0], [0.4, 0.3, 0.35], 1.08, 0.78, 0.18, [0.005, 0.005, 0.002]);
    addFood(createPuffPuff(puffMat), [-6.25, 2.65, -1.6], [0.2, 0.4, 0.1], 0.95, 0.82, 0.2, [0.004, 0.005, 0.001]);
    addFood(createPuffPuff(puffMat), [6.15, 0.05, -1.5], [0.5, 0.2, 0.3], 0.82, 0.92, 0.18, [0.003, 0.006, 0.002]);
    addFood(createBeefSkewer(beefMat, stickMat, greenPepperMat), [-6.1, -2.55, -1.5], [0.2, 0.3, -0.55], 0.96, 0.7, 0.22, [0.002, 0.007, 0.001]);

    const targetPointer = { x: 0, y: 0 };
    const currentPointer = { x: 0, y: 0 };
    let isVisible = true;
    let frameId = null;

    const onPointerMove = (e) => {
      if (!isVisible) return;
      targetPointer.x = (e.clientX / window.innerWidth - 0.5) * 2;
      targetPointer.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };

    const onResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / Math.max(1, container.clientHeight);
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const clock = new THREE.Clock();

    const animate = () => {
      if (!isVisible || document.hidden) {
        frameId = null;
        return;
      }
      frameId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      currentPointer.x += (targetPointer.x - currentPointer.x) * 0.05;
      currentPointer.y += (targetPointer.y - currentPointer.y) * 0.05;

      group.rotation.y = currentPointer.x * 0.14;
      group.rotation.x = -currentPointer.y * 0.08;

      if (!prefersReduced) {
        for (let i = 0; i < floatingItems.length; i++) {
          const item = floatingItems[i];
          item.mesh.position.y = item.basePos.y + Math.sin(t * item.speed + i * 1.3) * item.amp;
          item.mesh.rotation.x += item.spin[0];
          item.mesh.rotation.y += item.spin[1];
          item.mesh.rotation.z += item.spin[2];
        }
      }

      renderer.render(scene, camera);
    };

    const startLoop = () => {
      if (!frameId && isVisible && !document.hidden) {
        clock.start();
        frameId = requestAnimationFrame(animate);
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else if (frameId) {
          cancelAnimationFrame(frameId);
          frameId = null;
        }
      },
      { threshold: 0.01 }
    );
    io.observe(container);

    const onVisibilityChange = () => {
      if (!document.hidden && isVisible) startLoop();
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);

    startLoop();

    return () => {
      io.disconnect();
      if (frameId) cancelAnimationFrame(frameId);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
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
