import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

type Particle = {
  x: number;
  y: number;
  size: number;
  speed: number;
  opacity: number;
  hue: number;
  delay: number;
};

export const ParticleBackground: React.FC<{
  count?: number;
  baseHue?: number;
}> = ({ count = 40, baseHue = 260 }) => {
  const frame = useCurrentFrame();

  const particles = useMemo<Particle[]>(() => {
    const result: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const seed = i * 137.508;
      result.push({
        x: ((seed * 7.3) % 100),
        y: ((seed * 3.7) % 100),
        size: 2 + (seed % 6),
        speed: 0.3 + (seed % 1.5),
        opacity: 0.2 + ((seed * 0.1) % 0.6),
        hue: baseHue + ((seed * 2) % 60) - 30,
        delay: (seed * 0.5) % 30,
      });
    }
    return result;
  }, [count, baseHue]);

  return (
    <AbsoluteFill>
      {particles.map((p, i) => {
        const t = frame + p.delay;
        const px = ((p.x + t * p.speed * 0.15) % 110) - 5;
        const py = p.y + Math.sin(t * 0.05 + i) * 8;
        const scale = interpolate(
          Math.sin(t * 0.08 + i * 0.5),
          [-1, 1],
          [0.5, 1.5]
        );
        const glow = interpolate(
          Math.sin(t * 0.06 + i * 0.3),
          [-1, 1],
          [0.3, 1]
        );
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${px}%`,
              top: `${py}%`,
              width: p.size * scale,
              height: p.size * scale,
              borderRadius: "50%",
              background: `hsla(${p.hue}, 100%, 70%, ${p.opacity * glow})`,
              boxShadow: `0 0 ${p.size * 3}px hsla(${p.hue}, 100%, 60%, ${p.opacity * glow * 0.5})`,
              filter: `blur(${p.size > 5 ? 1 : 0}px)`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
