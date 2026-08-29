import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { RoomTheme, GardenAtmosphere, Season } from '../types';
import mistyMountainBg from '../assets/images/misty_mountain_bg_1788010304423.jpg';

interface DynamicParticlesProps {
  atmosphere: GardenAtmosphere;
  season: Season;
  mousePos: React.MutableRefObject<[number, number]>;
}

// Fixed maximum buffer capacity to prevent ANY WebGL buffer resizing error across season switches
const MAX_PARTICLES = 800;

/**
 * Creates high-performance procedural textures for seasonal particle types:
 * - Spring: Soft, curved cherry blossom petal
 * - Autumn: Delicate deciduous leaf shape
 * - Winter: Crystalline 6-point snowflake
 * - Summer: Soft-glowing sun mote / dandelion seed
 * - Mist: Soft diffuse Gaussian cloud puff
 */
function createParticleTexture(type: 'spring' | 'summer' | 'autumn' | 'winter' | 'mist'): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return new THREE.CanvasTexture(canvas);
  }

  ctx.clearRect(0, 0, 64, 64);

  if (type === 'mist') {
    // Soft Gaussian fog cloud
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(230, 245, 255, 0.65)');
    grad.addColorStop(0.4, 'rgba(210, 230, 245, 0.35)');
    grad.addColorStop(0.8, 'rgba(190, 215, 235, 0.1)');
    grad.addColorStop(1, 'rgba(180, 210, 230, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 30, 0, Math.PI * 2);
    ctx.fill();
  } else if (type === 'spring') {
    // Cherry blossom petal
    const grad = ctx.createRadialGradient(32, 28, 2, 32, 32, 28);
    grad.addColorStop(0, 'rgba(255, 255, 255, 0.98)');
    grad.addColorStop(0.4, 'rgba(255, 192, 203, 0.9)');
    grad.addColorStop(0.85, 'rgba(255, 182, 193, 0.75)');
    grad.addColorStop(1, 'rgba(255, 182, 193, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(32, 8);
    ctx.bezierCurveTo(48, 14, 54, 38, 38, 52);
    ctx.bezierCurveTo(34, 56, 30, 56, 26, 52);
    ctx.bezierCurveTo(10, 38, 16, 14, 32, 8);
    ctx.closePath();
    ctx.fill();
  } else if (type === 'autumn') {
    // Autumn falling leaf
    const grad = ctx.createRadialGradient(32, 32, 4, 32, 32, 26);
    grad.addColorStop(0, 'rgba(255, 230, 160, 0.95)');
    grad.addColorStop(0.5, 'rgba(235, 130, 60, 0.9)');
    grad.addColorStop(0.85, 'rgba(195, 60, 30, 0.75)');
    grad.addColorStop(1, 'rgba(180, 50, 20, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.moveTo(32, 6);
    ctx.bezierCurveTo(52, 20, 52, 44, 32, 58);
    ctx.bezierCurveTo(12, 44, 12, 20, 32, 6);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 240, 200, 0.45)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(32, 10);
    ctx.lineTo(32, 52);
    ctx.stroke();
  } else if (type === 'winter') {
    // Crystalline snowflake
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 28);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.35, 'rgba(230, 245, 255, 0.85)');
    grad.addColorStop(0.7, 'rgba(180, 225, 255, 0.4)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const angle = (i * Math.PI) / 3;
      ctx.beginPath();
      ctx.moveTo(32 + Math.cos(angle) * 22, 32 + Math.sin(angle) * 22);
      ctx.lineTo(32 - Math.cos(angle) * 22, 32 - Math.sin(angle) * 22);
      ctx.stroke();
    }
  } else {
    // Summer sun mote
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 28);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(255, 235, 160, 0.9)');
    grad.addColorStop(0.65, 'rgba(240, 200, 100, 0.4)');
    grad.addColorStop(1, 'rgba(240, 180, 50, 0)');

    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(32, 32, 26, 0, Math.PI * 2);
    ctx.fill();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  return texture;
}

/**
 * ─── REALISTIC 3D RAIN STREAKS & SPLASH SYSTEM ───
 */
function RealisticRainSystem({ mousePos }: { mousePos: React.MutableRefObject<[number, number]>; season?: Season }) {
  const rainLinesRef = useRef<THREE.LineSegments>(null!);
  const splashesRef = useRef<THREE.Points>(null!);
  const mistRef = useRef<THREE.Points>(null!);

  const rainCount = 1400;
  const splashCount = 90;
  const mistCount = 65;

  // Initialize rain streak line segments
  const [linePositions, rainVelocities, rainLengths] = useMemo(() => {
    const pos = new Float32Array(rainCount * 6);
    const vels = new Float32Array(rainCount);
    const lens = new Float32Array(rainCount);

    for (let i = 0; i < rainCount; i++) {
      const x = (Math.random() - 0.5) * 36;
      const y = (Math.random() - 0.5) * 28;
      const z = (Math.random() - 0.5) * 20;

      const length = 0.55 + Math.random() * 0.65 + (z > 0 ? 0.35 : 0);
      lens[i] = length;
      vels[i] = 16 + Math.random() * 9;

      const i6 = i * 6;
      pos[i6] = x;
      pos[i6 + 1] = y + length;
      pos[i6 + 2] = z;

      pos[i6 + 3] = x - 0.12;
      pos[i6 + 4] = y;
      pos[i6 + 5] = z;
    }
    return [pos, vels, lens];
  }, [rainCount]);

  // Ground splash ripples
  const [splashPositions, splashScales, splashLifetimes] = useMemo(() => {
    const pos = new Float32Array(splashCount * 3);
    const scales = new Float32Array(splashCount);
    const life = new Float32Array(splashCount);

    for (let i = 0; i < splashCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 32;
      pos[i * 3 + 1] = -7.5 + Math.random() * 0.8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 16;
      scales[i] = Math.random() * 0.2 + 0.1;
      life[i] = Math.random();
    }
    return [pos, scales, life];
  }, [splashCount]);

  // Atmospheric drifting highland rain mist
  const mistTexture = useMemo(() => createParticleTexture('mist'), []);
  const [mistPositions, mistSpeeds, mistDrifts] = useMemo(() => {
    const pos = new Float32Array(mistCount * 3);
    const spd = new Float32Array(mistCount);
    const drf = new Float32Array(mistCount);

    for (let i = 0; i < mistCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 36;
      pos[i * 3 + 1] = -5 + Math.random() * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 22;
      spd[i] = 0.15 + Math.random() * 0.25;
      drf[i] = Math.random() * Math.PI * 2;
    }
    return [pos, spd, drf];
  }, [mistCount]);

  const splashTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.clearRect(0, 0, 64, 64);
      ctx.strokeStyle = 'rgba(215, 240, 255, 0.85)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(32, 32, 22, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(180, 225, 255, 0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(32, 32, 12, 0, Math.PI * 2);
      ctx.stroke();
    }
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    const mouseX = mousePos.current[0];
    const time = state.clock.elapsedTime;
    const windX = -1.8 + mouseX * 0.8;

    // 1. Animate Rain Streaks
    if (rainLinesRef.current) {
      const pos = rainLinesRef.current.geometry.attributes.position.array as Float32Array;

      for (let i = 0; i < rainCount; i++) {
        const i6 = i * 6;
        const vel = rainVelocities[i];
        const len = rainLengths[i];
        const windTilt = windX * 0.04;

        pos[i6 + 1] -= vel * delta;
        pos[i6 + 4] -= vel * delta;
        pos[i6] += windX * delta * 0.35;
        pos[i6 + 3] = pos[i6] + windTilt;

        if (pos[i6 + 4] < -8.5) {
          const newX = (Math.random() - 0.5) * 36;
          const newY = 12 + Math.random() * 4;
          const newZ = (Math.random() - 0.5) * 20;

          pos[i6] = newX;
          pos[i6 + 1] = newY + len;
          pos[i6 + 2] = newZ;

          pos[i6 + 3] = newX + windTilt;
          pos[i6 + 4] = newY;
          pos[i6 + 5] = newZ;
        }
      }
      rainLinesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 2. Animate Splash Ripples
    if (splashesRef.current) {
      const splashPos = splashesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < splashCount; i++) {
        splashLifetimes[i] += delta * 2.2;
        if (splashLifetimes[i] > 1) {
          splashLifetimes[i] = 0;
          splashPos[i * 3] = (Math.random() - 0.5) * 32 + windX * 0.5;
          splashPos[i * 3 + 1] = -7.6 + Math.random() * 0.4;
          splashPos[i * 3 + 2] = (Math.random() - 0.5) * 16;
        }
      }
      splashesRef.current.geometry.attributes.position.needsUpdate = true;
    }

    // 3. Animate Mist Clouds
    if (mistRef.current) {
      const mistPos = mistRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < mistCount; i++) {
        const idx = i * 3;
        mistPos[idx] -= delta * mistSpeeds[i] * 1.2;
        mistPos[idx + 1] += Math.sin(time * 0.4 + mistDrifts[i]) * 0.006;

        if (mistPos[idx] < -18) {
          mistPos[idx] = 18;
          mistPos[idx + 1] = -4 + Math.random() * 10;
        }
      }
      mistRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group key="realistic-rain-group">
      <lineSegments ref={rainLinesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#CDE8F8"
          transparent
          opacity={0.65}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </lineSegments>

      <points ref={splashesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={splashPositions.length / 3}
            array={splashPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.42}
          map={splashTexture}
          transparent
          opacity={0.55}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>

      <points ref={mistRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={mistPositions.length / 3}
            array={mistPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={4.8}
          map={mistTexture}
          transparent
          opacity={0.38}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/**
 * ─── SEASONAL DRY PARTICLES ───
 * Uses a fixed MAX_PARTICLES buffer allocation + setDrawRange to completely eliminate
 * any "Resizing buffer attributes is not supported" WebGL errors!
 */
function SeasonalDryParticles({ season, atmosphere, mousePos }: DynamicParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null!);

  // Active particle count based on season
  const activeCount = useMemo(() => {
    switch (season) {
      case 'winter':
        return 750;
      case 'autumn':
        return 520;
      case 'spring':
        return 480;
      case 'summer':
      default:
        return 380;
    }
  }, [season]);

  const particleTexture = useMemo(() => {
    return createParticleTexture(season);
  }, [season]);

  // Always allocate FIXED buffer size (MAX_PARTICLES) to guarantee buffer array size never changes
  const [positions, speeds, drifts, flutters, scales, colors] = useMemo(() => {
    const pos = new Float32Array(MAX_PARTICLES * 3);
    const spd = new Float32Array(MAX_PARTICLES);
    const drf = new Float32Array(MAX_PARTICLES);
    const flt = new Float32Array(MAX_PARTICLES);
    const scl = new Float32Array(MAX_PARTICLES);
    const col = new Float32Array(MAX_PARTICLES * 3);

    const tempColor = new THREE.Color();

    for (let i = 0; i < MAX_PARTICLES; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 34;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 24;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 18;

      drf[i] = Math.random() * Math.PI * 2;
      flt[i] = Math.random() * 2 + 1;
      scl[i] = Math.random() * 0.5 + 0.75;

      if (season === 'winter') {
        spd[i] = Math.random() * 0.4 + 0.3;
      } else if (season === 'autumn') {
        spd[i] = Math.random() * 0.6 + 0.45;
      } else if (season === 'spring') {
        spd[i] = Math.random() * 0.3 + 0.2;
      } else {
        spd[i] = Math.random() * 0.25 + 0.15;
      }

      if (atmosphere === 'night') {
        if (season === 'winter') {
          tempColor.set(i % 2 === 0 ? '#EBF5FB' : '#D6EAF8');
        } else if (season === 'autumn') {
          tempColor.set(i % 2 === 0 ? '#D4AC0D' : '#CA6F1E');
        } else if (season === 'spring') {
          tempColor.set(i % 2 === 0 ? '#FADBD8' : '#D5F5E3');
        } else {
          tempColor.set(i % 2 === 0 ? '#FCF3CF' : '#A3E4D7');
        }
      } else if (atmosphere === 'evening') {
        if (season === 'autumn') {
          tempColor.set(i % 3 === 0 ? '#E67E22' : i % 3 === 1 ? '#D35400' : '#F39C12');
        } else if (season === 'winter') {
          tempColor.set(i % 2 === 0 ? '#F5CBA7' : '#E5E8E8');
        } else if (season === 'spring') {
          tempColor.set(i % 2 === 0 ? '#F5B7B1' : '#FAD7A0');
        } else {
          tempColor.set(i % 2 === 0 ? '#F8C471' : '#F5B041');
        }
      } else {
        if (season === 'spring') {
          const r = i % 5;
          if (r === 0) tempColor.set('#FFB7C5');
          else if (r === 1) tempColor.set('#FFCAD4');
          else if (r === 2) tempColor.set('#FFFFFF');
          else if (r === 3) tempColor.set('#FFF0F5');
          else tempColor.set('#D5F5E3');
        } else if (season === 'autumn') {
          const r = i % 5;
          if (r === 0) tempColor.set('#C0392B');
          else if (r === 1) tempColor.set('#D35400');
          else if (r === 2) tempColor.set('#E67E22');
          else if (r === 3) tempColor.set('#F39C12');
          else tempColor.set('#B7950B');
        } else if (season === 'winter') {
          const r = i % 4;
          if (r === 0) tempColor.set('#FFFFFF');
          else if (r === 1) tempColor.set('#EBF5FB');
          else if (r === 2) tempColor.set('#D4E6F1');
          else tempColor.set('#E8F8F5');
        } else {
          const r = i % 4;
          if (r === 0) tempColor.set('#F9E79F');
          else if (r === 1) tempColor.set('#FEF9E7');
          else if (r === 2) tempColor.set('#A9DFBF');
          else tempColor.set('#FAD7A0');
        }
      }

      col[i * 3] = tempColor.r;
      col[i * 3 + 1] = tempColor.g;
      col[i * 3 + 2] = tempColor.b;
    }

    return [pos, spd, drf, flt, scl, col];
  }, [atmosphere, season]);

  // Adjust draw range dynamically on geometry
  useEffect(() => {
    if (pointsRef.current && pointsRef.current.geometry) {
      pointsRef.current.geometry.setDrawRange(0, activeCount);
    }
  }, [activeCount]);

  const particleSize = useMemo(() => {
    if (season === 'spring') return 0.23;
    if (season === 'autumn') return 0.25;
    if (season === 'winter') return 0.18;
    return 0.19;
  }, [season]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.elapsedTime;
    const mouseX = mousePos.current[0];
    const mouseY = mousePos.current[1];

    for (let i = 0; i < activeCount; i++) {
      const idx = i * 3;
      const speed = speeds[i];
      const drift = drifts[i];
      const flutter = flutters[i];

      if (season === 'winter') {
        posArray[idx + 1] -= delta * 1.75 * speed;
        posArray[idx] += Math.sin(time * 0.9 * flutter + drift) * 0.015 + mouseX * 0.004;
        posArray[idx + 2] += Math.cos(time * 0.7 * flutter + drift) * 0.01;

        if (posArray[idx + 1] < -12) {
          posArray[idx + 1] = 12;
          posArray[idx] = (Math.random() - 0.5) * 34;
        }
      } else if (season === 'autumn') {
        posArray[idx + 1] -= delta * 2.35 * speed;
        posArray[idx] += Math.sin(time * 1.8 * flutter + drift) * 0.045 + mouseX * 0.008 + delta * 0.45;
        posArray[idx + 2] += Math.cos(time * 1.3 * flutter + drift) * 0.025;

        if (posArray[idx + 1] < -12) {
          posArray[idx + 1] = 12;
          posArray[idx] = (Math.random() - 0.5) * 34 - 3;
        }
      } else if (season === 'spring') {
        posArray[idx + 1] -= delta * 0.95 * speed;
        posArray[idx] += Math.sin(time * 1.1 * flutter + drift) * 0.025 + delta * 0.3 + mouseX * 0.005;
        posArray[idx + 1] += Math.cos(time * 0.8 * flutter + drift) * 0.012;
        posArray[idx + 2] += Math.sin(time * 0.6 * flutter + drift) * 0.018;

        if (posArray[idx + 1] < -12) {
          posArray[idx + 1] = 12;
          posArray[idx] = (Math.random() - 0.5) * 34;
        }
      } else {
        posArray[idx] += delta * 0.18 * speed + mouseX * 0.003;
        posArray[idx + 1] += Math.sin(time * 0.6 * flutter + drift) * 0.008 + mouseY * 0.002;
        posArray[idx + 2] += Math.cos(time * 0.5 * flutter + drift) * 0.008;

        if (posArray[idx] > 17) {
          posArray[idx] = -17;
        }
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef} key={`particles-${season}`}>
      <bufferGeometry drawRange={{ start: 0, count: activeCount }}>
        <bufferAttribute
          attach="attributes-position"
          count={MAX_PARTICLES}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={MAX_PARTICLES}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={particleSize}
        map={particleTexture}
        vertexColors
        transparent
        opacity={atmosphere === 'night' ? 0.9 : 0.82}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function CameraRig({ mousePos }: { mousePos: React.MutableRefObject<[number, number]> }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetX = mousePos.current[0] * 0.28;
    const targetY = mousePos.current[1] * 0.2;
    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export interface Garden3DSceneProps {
  atmosphere: GardenAtmosphere | RoomTheme;
  season?: Season;
  isReadingMode?: boolean;
}

export const Garden3DScene: React.FC<Garden3DSceneProps> = ({
  atmosphere,
  season = 'summer',
  isReadingMode = false,
}) => {
  const mousePos = useRef<[number, number]>([0, 0]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth) * 2 - 1;
    const y = -(e.clientY / window.innerHeight) * 2 + 1;
    mousePos.current = [x, y];
  };

  const currentAtmosphere: GardenAtmosphere = useMemo(() => {
    if (
      atmosphere === 'morning' ||
      atmosphere === 'afternoon' ||
      atmosphere === 'evening' ||
      atmosphere === 'night' ||
      atmosphere === 'rain'
    ) {
      return atmosphere;
    }
    if (atmosphere === 'paper') return 'afternoon';
    if (atmosphere === 'forest') return 'morning';
    if (atmosphere === 'dawn') return 'morning';
    return 'morning';
  }, [atmosphere]);

  const isRain = currentAtmosphere === 'rain';

  if (isReadingMode) {
    return null;
  }

  // Dynamic atmospheric overlay styling
  const overlayStyle = useMemo(() => {
    switch (currentAtmosphere) {
      case 'evening':
        return 'bg-gradient-to-t from-[#2B1B14]/80 via-[#9A5028]/35 to-[#F4A261]/25 mix-blend-multiply';
      case 'night':
        return 'bg-gradient-to-t from-[#09110F]/90 via-[#10231E]/70 to-[#0A1613]/50 mix-blend-multiply';
      case 'rain':
        return 'bg-gradient-to-t from-[#14232B]/85 via-[#2E424D]/55 to-[#506875]/35 mix-blend-multiply';
      case 'afternoon':
        return 'bg-gradient-to-t from-[#F4EBD9]/45 via-transparent to-[#FBF3E0]/25 mix-blend-soft-light';
      case 'morning':
      default:
        return 'bg-gradient-to-t from-[#F7F8F2]/65 via-[#FAF9F5]/35 to-transparent';
    }
  }, [currentAtmosphere]);

  // Seasonal tint overlay
  const seasonTint = useMemo(() => {
    switch (season) {
      case 'spring':
        return 'bg-[#FFB7C5]/10 mix-blend-soft-light';
      case 'autumn':
        return 'bg-[#D97736]/12 mix-blend-soft-light';
      case 'winter':
        return 'bg-[#8EC5C1]/14 mix-blend-soft-light';
      case 'summer':
      default:
        return 'bg-[#F2C96D]/10 mix-blend-soft-light';
    }
  }, [season]);

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`fixed inset-0 pointer-events-none transition-opacity duration-1000 z-0 season-${season} theme-${currentAtmosphere} overflow-hidden`}
      aria-hidden="true"
    >
      {/* ─── 01. Misty Highland Mountain Photo Background ─── */}
      <img
        src={mistyMountainBg}
        alt="Misty Mountain Valley Ambience"
        referrerPolicy="no-referrer"
        className={`absolute inset-0 w-full h-full object-cover object-center transform transition-all duration-1000 ease-out ${
          isRain
            ? 'scale-105 filter brightness-[0.88] contrast-[1.12] saturate-[0.85]'
            : 'scale-105 filter contrast-[1.03] brightness-[1.02]'
        }`}
      />

      {/* ─── 02. Atmospheric Mist & Time of Day Lighting Overlays ─── */}
      <div className={`absolute inset-0 transition-colors duration-1000 ${overlayStyle}`} />
      <div className={`absolute inset-0 transition-colors duration-1000 ${seasonTint}`} />

      {/* ─── 03. Rain Window Droplet Condensation Overlay ─── */}
      {isRain && (
        <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen transition-opacity duration-1000 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
      )}

      {/* ─── 04. Soft Vignette & Paper Grain Integration ─── */}
      <div className="absolute inset-0 bg-radial from-transparent via-transparent to-black/25 pointer-events-none" />

      {/* ─── 05. 3D Realistic Rainfall OR Seasonal Particle Layer ─── */}
      <div className="absolute inset-0 pointer-events-none">
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 48 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 1.5]}
        >
          <CameraRig mousePos={mousePos} />
          {isRain ? (
            <RealisticRainSystem key="realistic-rain" mousePos={mousePos} season={season} />
          ) : (
            <SeasonalDryParticles
              key={`seasonal-${season}-${currentAtmosphere}`}
              atmosphere={currentAtmosphere}
              season={season}
              mousePos={mousePos}
            />
          )}
        </Canvas>
      </div>
    </div>
  );
};
