import React, { useRef, useState, useEffect } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';
import { animated, useSpring } from '@react-spring/three';
import { Leva } from 'leva';

const faceUrls = [
  '/images/face1.jpg',
  '/images/face2.jpg',
  '/images/face3.jpg',
  '/images/face4.jpg',
  '/images/face5.jpg',
  '/images/face6.jpg',
];

export default function Cuboid({ onHover }) {
  const groupRef = useRef();
  const textures = useLoader(THREE.TextureLoader, faceUrls);
  const [hovered, setHovered] = useState(false);

  const { offset } = useSpring({
    offset: hovered ? 0.3 : 0,
    config: { mass: 1, tension: 170, friction: 26 },
  });

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.005;
      groupRef.current.rotation.x += 0.002;
    }
  });

  useEffect(() => {
    if (onHover) onHover(hovered);
  }, [hovered, onHover]);

  const faces = [
    { pos: [1, 0, 0], rot: [0, -Math.PI / 2, 0], tex: textures[0] },
    { pos: [-1, 0, 0], rot: [0, Math.PI / 2, 0], tex: textures[1] },
    { pos: [0, 1, 0], rot: [Math.PI / 2, 0, 0], tex: textures[2] },
    { pos: [0, -1, 0], rot: [-Math.PI / 2, 0, 0], tex: textures[3] },
    { pos: [0, 0, 1], rot: [0, 0, 0], tex: textures[4] },
    { pos: [0, 0, -1], rot: [0, Math.PI, 0], tex: textures[5] },
  ];

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {faces.map(({ pos, rot, tex }, i) => (
        <animated.mesh
          key={i}
          position={offset.to((o) => [
            pos[0] * (1 + o),
            pos[1] * (1 + o),
            pos[2] * (1 + o),
          ])}
          rotation={rot}
          castShadow
          receiveShadow
        >
          <planeGeometry args={[1.8, 1.8]} />
          <meshStandardMaterial map={tex} side={THREE.DoubleSide} />
        </animated.mesh>
      ))}
    </group>
  );
}
