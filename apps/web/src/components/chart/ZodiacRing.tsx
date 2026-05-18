import * as THREE from 'three';
import { Line } from '@react-three/drei';

export function ZodiacRing() {
  return (
    <group>
      {/* 黄道面底色 */}
      <mesh>
        <circleGeometry args={[0.92, 64]} />
        <meshBasicMaterial
          color="#11111C"
          side={THREE.DoubleSide}
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* 外环 */}
      <mesh>
        <ringGeometry args={[0.92, 1.0, 64]} />
        <meshBasicMaterial
          color="#C9A876"
          side={THREE.DoubleSide}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* 12 宫分隔刻度 */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r1 = 0.92;
        const r2 = 1.0;
        const x1 = r1 * Math.cos(angle);
        const y1 = r1 * Math.sin(angle);
        const x2 = r2 * Math.cos(angle);
        const y2 = r2 * Math.sin(angle);
        return (
          <Line
            key={i}
            points={[
              new THREE.Vector3(x1, y1, 0),
              new THREE.Vector3(x2, y2, 0),
            ]}
            color="#C9A876"
            lineWidth={1}
            transparent
            opacity={0.6}
          />
        );
      })}

      {/* 星座名称标记 (HTML overlay) */}
      <SignLabels />
    </group>
  );
}

const signNames = [
  '♈', '♉', '♊', '♋', '♌', '♍',
  '♎', '♏', '♐', '♑', '♒', '♓',
];

function SignLabels() {
  return (
    <>
      {signNames.map((glyph, i) => {
        const mid = (i * 30 + 15) * (Math.PI / 180);
        const r = 1.12;
        const x = r * Math.cos(mid);
        const y = r * Math.sin(mid);
        return (
          <HtmlLabel key={i} position={[x, y, 0]} text={glyph} />
        );
      })}
    </>
  );
}

import { Html } from '@react-three/drei';

function HtmlLabel({
  position,
  text,
}: {
  position: [number, number, number];
  text: string;
}) {
  return (
    <Html center position={position} style={{ pointerEvents: 'none' }}>
      <span className="text-micro text-fg-dim select-none">{text}</span>
    </Html>
  );
}
