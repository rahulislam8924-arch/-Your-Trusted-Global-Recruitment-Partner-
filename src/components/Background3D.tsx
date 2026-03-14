import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

// Shared Geometries and Materials to save memory and WebGL context resources
const globeGeometry = new THREE.SphereGeometry(12, 32, 32);
const innerGlobeGeometry = new THREE.SphereGeometry(11.8, 32, 32);
const cityGeometry = new THREE.SphereGeometry(0.12, 8, 8);
const planeGeometry = new THREE.ConeGeometry(0.3, 1.2, 3);
const orbitGeometry = new THREE.RingGeometry(1, 1, 64); // Will be scaled

const globeMaterial = new THREE.MeshBasicMaterial({ color: "#ff3333", wireframe: true, transparent: true, opacity: 0.08 });
const innerGlobeMaterial = new THREE.MeshBasicMaterial({ color: "#0a0a0a", transparent: true, opacity: 0.9 });
const cityMaterial = new THREE.MeshBasicMaterial({ color: "#ff3333", transparent: true, opacity: 0.8 });
const planeMaterial = new THREE.MeshBasicMaterial({ color: "#ff3333" });
const whitePlaneMaterial = new THREE.MeshBasicMaterial({ color: "#ffffff" });
const orbitMaterial = new THREE.MeshBasicMaterial({ color: "#ff3333", transparent: true, opacity: 0.1, side: THREE.DoubleSide });
const whiteOrbitMaterial = new THREE.MeshBasicMaterial({ color: "#ffffff", transparent: true, opacity: 0.1, side: THREE.DoubleSide });

const Globe = () => {
  const globeRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.05;
      globeRef.current.rotation.z = 0.1;
    }
  });

  const cities = useMemo(() => {
    const pts = [];
    const samples = 60;
    const offset = 2 / samples;
    const increment = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < samples; i++) {
      const y = ((i * offset) - 1) + (offset / 2);
      const r = Math.sqrt(1 - Math.pow(y, 2));
      const phi = ((i + 1) % samples) * increment;

      const x = Math.cos(phi) * r;
      const z = Math.sin(phi) * r;

      pts.push(new THREE.Vector3(x * 12, y * 12, z * 12));
    }
    return pts;
  }, []);

  const paths = useMemo(() => {
    const lines = [];
    for(let i = 0; i < 25; i++) {
      const start = cities[Math.floor(Math.random() * cities.length)];
      const end = cities[Math.floor(Math.random() * cities.length)];
      if (start === end) continue;
      
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(13.5); 
      const curve = new THREE.QuadraticBezierCurve3(start, mid, end);
      lines.push(curve.getPoints(20));
    }
    return lines;
  }, [cities]);

  return (
    <group ref={globeRef}>
      <mesh geometry={globeGeometry} material={globeMaterial} />
      <mesh geometry={innerGlobeGeometry} material={innerGlobeMaterial} />
      {cities.map((p, i) => (
        <mesh key={i} position={p} geometry={cityGeometry} material={cityMaterial} />
      ))}
      {paths.map((pts, i) => (
        <line key={`path-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={pts.length}
              array={new Float32Array(pts.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#ff3333" transparent opacity={0.2} />
        </line>
      ))}
    </group>
  );
};

const OrbitingPlane = ({ radius, speed, angleOffset, color = "#ff3333", tilt = 0 }: { radius: number, speed: number, angleOffset: number, color?: string, tilt?: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const mat = color === "#ffffff" ? whitePlaneMaterial : planeMaterial;
  const orbitMat = color === "#ffffff" ? whiteOrbitMaterial : orbitMaterial;

  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime() * speed + angleOffset;
      groupRef.current.position.x = Math.cos(t) * radius;
      groupRef.current.position.z = Math.sin(t) * radius;
      groupRef.current.rotation.y = -t;
    }
  });

  return (
    <group rotation={[tilt, 0, 0]}>
      <group ref={groupRef}>
        <Float speed={4} rotationIntensity={0.5} floatIntensity={0.5}>
          <mesh rotation={[Math.PI / 2, 0, 0]} geometry={planeGeometry} material={mat} />
        </Float>
      </group>
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={[radius, radius, 1]}>
        <ringGeometry args={[0.998, 1.002, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.1} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

export default function Background3D() {
  const [webglAvailable, setWebglAvailable] = useState(true);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      setWebglAvailable(false);
    }
  }, []);

  if (!webglAvailable) {
    return (
      <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#0a0a0a] to-[#1a0000] pointer-events-none">
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[-1] bg-gradient-to-br from-[#0a0a0a] to-[#1a0000] pointer-events-none">
      <Canvas 
        camera={{ position: [0, 2, 28], fov: 60 }}
        dpr={[1, 1.5]} // Limit pixel ratio for performance
        gl={{ 
          powerPreference: "low-power",
          antialias: false,
          stencil: false,
          depth: true
        }}
      >
        <fog attach="fog" args={['#0a0a0a', 20, 50]} />
        <ambientLight intensity={0.5} />
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
        
        <Globe />
        
        <OrbitingPlane radius={14.5} speed={0.4} angleOffset={0} tilt={0.2} />
        <OrbitingPlane radius={16.5} speed={0.3} angleOffset={Math.PI} tilt={-0.3} color="#ffffff" />
        <OrbitingPlane radius={18.5} speed={0.5} angleOffset={Math.PI / 2} tilt={0.5} />
      </Canvas>
    </div>
  );
}
