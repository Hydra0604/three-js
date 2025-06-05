import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import NestedCubes from './components/NestedCubes';
import BackgroundMusic from './components/BackgroundMusic';
import './App.css';
import { useSpring, animated as a } from '@react-spring/three';

export default function App() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Camera spring animation
  const { camPos } = useSpring({
    camPos: hovered ? [12, 12, 24] : [8, 8, 16],
    config: { mass: 1, tension: 120, friction: 18 },
  });

  return (
    <div className="canvas-wrapper">
      <BackgroundMusic />
      
      {/* Heading */}
      <div className="heading" style={{ color: '#8f4040' }}>
        I love you <span style={{ color: 'red' }}>❤</span>
      </div>

      {/* Custom Cursor */}
      <div
        className="cursor-dot"
        style={{ top: `${mouse.y}px`, left: `${mouse.x}px` }}
      />

      <Canvas
        shadows
        camera={{ position: [8, 8, 16], fov: 45 }}
      >
        <ambientLight intensity={0.5} />
        <ambientLight intensity={0.8} />
        <hemisphereLight
          skyColor="#ffffff"
          groundColor="#444444"
          intensity={1}
        />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1.5}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-far={20}
          shadow-camera-left={-5}
          shadow-camera-right={5}
          shadow-camera-top={5}
          shadow-camera-bottom={-5}
        />
        <directionalLight position={[-5, -5, -5]} intensity={0.8} />
        <NestedCubes onHover={setHovered} />
        <OrbitControls enablePan={false} enableZoom={true} />
      </Canvas>
    </div>
  );
}

