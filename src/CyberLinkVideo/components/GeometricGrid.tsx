import React, { useMemo } from "react";
import { AbsoluteFill, useCurrentFrame, interpolate } from "remotion";

/**
 * Animated geometric lines / grid background for a techy vibe.
 */
export const GeometricGrid: React.FC<{
  color?: string;
  lineCount?: number;
}> = ({ color = "#7b2ff7", lineCount = 12 }) => {
  const frame = useCurrentFrame();

  const lines = useMemo(() => {
    const result: { x1: number; y1: number; x2: number; y2: number; delay: number }[] = [];
    for (let i = 0; i < lineCount; i++) {
      const seed = i * 97.3;
      result.push({
        x1: (seed * 3.1) % 100,
        y1: (seed * 1.7) % 100,
        x2: (seed * 5.3) % 100,
        y2: (seed * 2.9) % 100,
        delay: i * 3,
      });
    }
    return result;
  }, [lineCount]);

  return (
    <AbsoluteFill>
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 720"
        style={{ position: "absolute" }}
      >
        {lines.map((line, i) => {
          const progress = interpolate(
            frame - line.delay,
            [0, 30],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
          );
          const opacity = interpolate(
            Math.sin(frame * 0.03 + i * 0.5),
            [-1, 1],
            [0.03, 0.12]
          );
          const x1 = (line.x1 / 100) * 1280;
          const y1 = (line.y1 / 100) * 720;
          const x2Actual = x1 + ((line.x2 / 100) * 1280 - x1) * progress;
          const y2Actual = y1 + ((line.y2 / 100) * 720 - y1) * progress;

          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2Actual}
              y2={y2Actual}
              stroke={color}
              strokeWidth={1}
              opacity={opacity}
            />
          );
        })}
      </svg>
    </AbsoluteFill>
  );
};
