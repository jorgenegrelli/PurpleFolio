"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Animated 3D organic blob on a transparent canvas.
 * Key light follows the cursor — hovering anywhere on the page shifts
 * the highlight across the surface, like illuminating with a torch.
 */
export function AnimatedBlob3D() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const SIZE = 700;
    const dpr = Math.min(window.devicePixelRatio, 2);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      premultipliedAlpha: false,
    });
    renderer.setClearColor(0x000000, 0); // fully transparent
    renderer.setPixelRatio(dpr);
    renderer.setSize(SIZE, SIZE, false);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 3.2;

    const geometry = new THREE.IcosahedronGeometry(1.1, 7);
    const positionAttr = geometry.attributes.position as THREE.BufferAttribute;
    const originalPositions = new Float32Array(positionAttr.array);

    // Slightly lighter than page bg so the shape silhouette is visible;
    // specular highlights do the heavy visual lifting.
    const material = new THREE.MeshPhongMaterial({
      color: new THREE.Color(0x130a28),
      specular: new THREE.Color(0xe2d4ff),
      shininess: 240,
      transparent: true,
      opacity: 0.92,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    scene.add(new THREE.AmbientLight(0x0d0520, 0.7));

    // Key light — follows cursor; defaults to orbit when no mouse input
    const keyLight = new THREE.PointLight(0xf0e6ff, 10, 16);
    scene.add(keyLight);

    // Rim — fixed left edge glow
    const rimLight = new THREE.PointLight(0x6d28d9, 3, 12);
    rimLight.position.set(-4, 1, 1.5);
    scene.add(rimLight);

    // Bottom fill
    const fillLight = new THREE.PointLight(0x3b0764, 1.5, 8);
    fillLight.position.set(0.5, -4, 1);
    scene.add(fillLight);

    // Smoothed light target — lerped toward mouse or default orbit
    const lightTarget = new THREE.Vector3(4.5, 3.5, 3.0);
    const lightCurrent = new THREE.Vector3(4.5, 3.5, 3.0);
    let mouseActive = false;
    let lastMouseTime = 0;

    const onMouseMove = (e: MouseEvent) => {
      // Map viewport coords to 3D light space
      const nx = (e.clientX / window.innerWidth) * 2 - 1;   // -1 left → +1 right
      const ny = -(e.clientY / window.innerHeight) * 2 + 1; // -1 bottom → +1 top

      lightTarget.set(
        nx * 5.5,          // horizontal range
        ny * 4.0 + 0.5,    // vertical range, slight upward bias
        3.5,
      );
      mouseActive = true;
      lastMouseTime = performance.now();
    };

    window.addEventListener("mousemove", onMouseMove);

    const clock = new THREE.Clock();
    let animId: number;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      // If mouse inactive for >2s, drift back to orbit
      if (mouseActive && performance.now() - lastMouseTime > 2000) {
        mouseActive = false;
      }

      if (!mouseActive) {
        // Default orbit path
        lightTarget.set(
          4.5 * Math.cos(t * 0.22),
          3.5 + 1.5 * Math.sin(t * 0.13),
          3.0 + 1.5 * Math.sin(t * 0.09),
        );
      }

      // Smooth lerp toward target (speed differs: fast for mouse, slow for orbit)
      const lerpSpeed = mouseActive ? 0.08 : 0.03;
      lightCurrent.lerp(lightTarget, lerpSpeed);
      keyLight.position.copy(lightCurrent);

      // Vertex displacement
      for (let i = 0; i < positionAttr.count; i++) {
        const ox = originalPositions[i * 3];
        const oy = originalPositions[i * 3 + 1];
        const oz = originalPositions[i * 3 + 2];

        const len = Math.sqrt(ox * ox + oy * oy + oz * oz);
        const nx = ox / len;
        const ny = oy / len;
        const nz = oz / len;

        const w1 = 0.40 * Math.sin(t * 0.40 + ox * 1.8 + oy * 1.2);
        const w2 = 0.20 * Math.sin(t * 0.70 + oy * 2.8 + oz * 1.1);
        const w3 = 0.12 * Math.sin(t * 0.55 + oz * 3.2 + ox * 0.9);
        const w4 = 0.08 * Math.sin(t * 0.18);

        positionAttr.setXYZ(i, nx * (1 + w1 + w2 + w3 + w4), ny * (1 + w1 + w2 + w3 + w4), nz * (1 + w1 + w2 + w3 + w4));
      }

      positionAttr.needsUpdate = true;
      geometry.computeVertexNormals();

      mesh.rotation.y = t * 0.10;
      mesh.rotation.x = Math.sin(t * 0.07) * 0.22;
      mesh.rotation.z = Math.sin(t * 0.05) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={700}
      height={700}
      aria-hidden="true"
      className="pointer-events-none absolute"
      style={{
        width: 700,
        height: 700,
        right: "2%",
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 0,
      }}
    />
  );
}
