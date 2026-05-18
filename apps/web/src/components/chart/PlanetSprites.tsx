import { Html } from '@react-three/drei';
import type { Planet } from '@/lib/astro/types';

const planetOrder: Planet[] = [
  'sun',
  'moon',
  'mercury',
  'venus',
  'mars',
  'jupiter',
  'saturn',
  'uranus',
  'neptune',
  'pluto',
];

const planetColors: Record<string, string> = {
  sun: '#E0A82E',
  moon: '#C7C2B8',
  mercury: '#5B7A95',
  venus: '#B8838C',
  mars: '#C26B5C',
  jupiter: '#6B5B95',
  saturn: '#8A8595',
  uranus: '#5B7A95',
  neptune: '#4A3F6B',
  pluto: '#6B5B95',
};

const planetLabels: Record<string, string> = {
  sun: '☉',
  moon: '☽',
  mercury: '☿',
  venus: '♀',
  mars: '♂',
  jupiter: '♃',
  saturn: '♄',
  uranus: '♅',
  neptune: '♆',
  pluto: '♇',
};

interface Props {
  lons: Partial<Record<Planet, number>>;
  onPlanetClick: (planet: Planet) => void;
}

export function PlanetSprites({ lons, onPlanetClick }: Props) {
  return (
    <group>
      {planetOrder.map((p) => {
        const lon = lons[p];
        if (lon == null) return null;
        const angle = (lon * Math.PI) / 180;
        const r = 0.75;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        const color = planetColors[p] ?? '#fff';
        return (
          <PlanetNode
            key={p}
            position={[x, y, 0]}
            color={color}
            label={planetLabels[p] ?? p}
            onClick={() => onPlanetClick(p)}
          />
        );
      })}
    </group>
  );
}

function PlanetNode({
  position,
  color,
  label,
  onClick,
}: {
  position: [number, number, number];
  color: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <group position={position}>
      <mesh
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'pointer';
          }
        }}
        onPointerOut={() => {
          if (typeof document !== 'undefined') {
            document.body.style.cursor = 'auto';
          }
        }}
      >
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
        />
      </mesh>
      <Html
        center
        style={{
          pointerEvents: 'none',
          userSelect: 'none',
          transform: 'translateY(-12px)',
        }}
      >
        <span
          className="text-micro font-medium text-fg-primary"
          style={{ textShadow: '0 0 4px #0B0B14' }}
        >
          {label}
        </span>
      </Html>
    </group>
  );
}
