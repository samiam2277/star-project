'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { ZodiacRing } from './ZodiacRing';
import { HouseLines } from './HouseLines';
import { PlanetSprites } from './PlanetSprites';
import type { Planet } from '@/lib/astro/types';

interface Props {
  lons: Partial<Record<Planet, number>>;
  cusps: readonly number[] | null;
  onPlanetClick: (planet: Planet) => void;
}

export function NatalChart3D({ lons, cusps, onPlanetClick }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: 50 }}
      style={{ height: '64vh', width: '100%' }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={['#0B0B14']} />
      <ambientLight intensity={0.3} />
      <pointLight position={[3, 5, 3]} intensity={0.6} color="#C9A876" />
      <Stars count={200} factor={5} />
      <ZodiacRing />
      <HouseLines cusps={cusps} />
      <PlanetSprites lons={lons} onPlanetClick={onPlanetClick} />
      <OrbitControls enablePan={false} minDistance={1.5} maxDistance={6} />
    </Canvas>
  );
}
