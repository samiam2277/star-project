import { Line } from '@react-three/drei';
import * as THREE from 'three';

interface Props {
  cusps: readonly number[] | null;
}

export function HouseLines({ cusps }: Props) {
  if (!cusps || cusps.length < 13) return null;

  return (
    <group>
      {cusps.slice(1, 13).map((lon, i) => {
        const angle = (lon * Math.PI) / 180;
        const r = 0.92;
        const x = r * Math.cos(angle);
        const y = r * Math.sin(angle);
        return (
          <Line
            key={i}
            points={[
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(x, y, 0),
            ]}
            color="#2A2A38"
            lineWidth={1}
            transparent
            opacity={0.5}
          />
        );
      })}
    </group>
  );
}
