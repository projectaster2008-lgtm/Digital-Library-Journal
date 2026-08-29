import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomTheme } from '../types';

interface FloatingDustProps {
  count?: number;
  color?: string;
  speedMultiplier?: number;
}

function FloatingDust({ count = 280, color = '#C9A96E', speedMultiplier = 1 }: FloatingDustProps) {
  const pointsRef = useRef<THREE.Points>(null!);

  const [positions, scales] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 14;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;
      sc[i] = Math.random() * 0.04 + 0.015;
    }
    return [pos, sc];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    for (let i = 0; i < count; i++) {
      // Gentle floating upward and slight sine drift
      positions[i * 3 + 1] += delta * 0.12 * speedMultiplier;
      positions[i * 3] += Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.002;

      // Wrap around bounds
      if (positions[i * 3 + 1] > 5) {
        positions[i * 3 + 1] = -5;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.015 * speedMultiplier;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={scales.length}
          array={scales}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color={color}
        transparent
        opacity={0.55}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function StylizedShelves({ theme }: { theme: RoomTheme }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (!groupRef.current) return;
    // Gentle breathing parallax
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.08;
    groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.02;
  });

  const shelfColor = useMemo(() => {
    switch (theme) {
      case 'paper': return '#4A3B2C';
      case 'forest': return '#18241C';
      case 'dawn': return '#2F2026';
      case 'night':
      default: return '#1A1815';
    }
  }, [theme]);

  const bookColors = ['#8C6D46', '#2A3B30', '#5E3832', '#3D4856', '#C9A96E'];

  return (
    <group ref={groupRef} position={[0, -0.5, -4]}>
      {/* Background Library Arch / Shelves Structure */}
      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[16, 12]} />
        <meshStandardMaterial color={shelfColor} roughness={0.9} metalness={0.1} />
      </mesh>

      {/* Horizontal Shelves */}
      {[-2, 0, 2].map((y, idx) => (
        <group key={idx} position={[0, y, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[10, 0.15, 1.2]} />
            <meshStandardMaterial color="#2E241A" roughness={0.7} />
          </mesh>

          {/* Row of Books */}
          {Array.from({ length: 18 }).map((_, bIdx) => {
            const width = 0.2 + (bIdx % 3) * 0.08;
            const height = 0.9 + (bIdx % 4) * 0.25;
            const xPos = -4 + bIdx * 0.46;
            const color = bookColors[bIdx % bookColors.length];
            return (
              <mesh key={bIdx} position={[xPos, height / 2 + 0.08, (Math.random() - 0.5) * 0.1]}>
                <boxGeometry args={[width, height, 0.7]} />
                <meshStandardMaterial color={color} roughness={0.8} />
              </mesh>
            );
          })}
        </group>
      ))}

      {/* Warm Antique Desk Lamp / Candlestick */}
      <group position={[2.4, 0.6, 0.5]}>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.04, 0.1, 0.5, 16]} />
          <meshStandardMaterial color="#C9A96E" metalness={0.7} roughness={0.3} />
        </mesh>
        <pointLight color="#FFE3A8" intensity={2.4} distance={6} decay={2} />
      </group>
    </group>
  );
}

function SceneContent({ theme, isEntering }: { theme: RoomTheme; isEntering?: boolean }) {
  const lightConfig = useMemo(() => {
    switch (theme) {
      case 'paper':
        return {
          ambient: '#EDE6D8',
          ambientInt: 0.85,
          sun: '#F5E6CC',
          sunInt: 2.0,
          dustColor: '#8C7355',
        };
      case 'forest':
        return {
          ambient: '#1C271F',
          ambientInt: 0.6,
          sun: '#A2C4A8',
          sunInt: 1.8,
          dustColor: '#95B89C',
        };
      case 'dawn':
        return {
          ambient: '#2E2228',
          ambientInt: 0.7,
          sun: '#FFD1AA',
          sunInt: 2.2,
          dustColor: '#DCAE7D',
        };
      case 'night':
      default:
        return {
          ambient: '#0B0B0A',
          ambientInt: 0.45,
          sun: '#C9A96E',
          sunInt: 1.6,
          dustColor: '#C9A96E',
        };
    }
  }, [theme]);

  return (
    <>
      <ambientLight color={lightConfig.ambient} intensity={lightConfig.ambientInt} />
      <directionalLight
        position={[4, 6, 4]}
        color={lightConfig.sun}
        intensity={lightConfig.sunInt}
        castShadow
      />
      <pointLight position={[-3, 2, 1]} color="#C9A96E" intensity={1.2} distance={8} />

      <FloatingDust
        count={isEntering ? 350 : 220}
        color={lightConfig.dustColor}
        speedMultiplier={isEntering ? 1.5 : 0.8}
      />
      <StylizedShelves theme={theme} />
    </>
  );
}

interface Library3DSceneProps {
  theme: RoomTheme;
  isReadingMode?: boolean;
  isEntering?: boolean;
}

export const Library3DScene: React.FC<Library3DSceneProps> = ({
  theme,
  isReadingMode = false,
  isEntering = false,
}) => {
  if (isReadingMode) {
    // Blueprint rule 06 & 41: When in reading mode, Three.js disappears so typography wins
    return null;
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none transition-opacity duration-1000 z-0"
      style={{ opacity: isEntering ? 0.95 : 0.45 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <SceneContent theme={theme} isEntering={isEntering} />
      </Canvas>
    </div>
  );
};
