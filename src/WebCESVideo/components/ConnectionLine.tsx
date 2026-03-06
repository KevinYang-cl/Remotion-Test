import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const ConnectionLine: React.FC<{
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  delay?: number;
  dashed?: boolean;
  showArrow?: boolean;
}> = ({
  x1,
  y1,
  x2,
  y2,
  color = "#00f0ff",
  delay = 0,
  dashed = false,
  showArrow = true,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = interpolate(frame - delay, [0, 0.5 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  if (progress <= 0) return null;

  const angle = Math.atan2(y2 - y1, x2 - x1);

  const currentX2 = x1 + (x2 - x1) * progress;
  const currentY2 = y1 + (y2 - y1) * progress;

  // Animated data flow dot
  const dotProgress = ((frame - delay) % 30) / 30;
  const dotX = x1 + (x2 - x1) * dotProgress;
  const dotY = y1 + (y2 - y1) * dotProgress;

  const arrowSize = 8;
  const arrowX = currentX2;
  const arrowY = currentY2;

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
      }}
    >
      <line
        x1={x1}
        y1={y1}
        x2={currentX2}
        y2={currentY2}
        stroke={color}
        strokeWidth={2}
        strokeDasharray={dashed ? "6,4" : "none"}
        opacity={0.6}
      />
      {/* Glow line */}
      <line
        x1={x1}
        y1={y1}
        x2={currentX2}
        y2={currentY2}
        stroke={color}
        strokeWidth={4}
        opacity={0.15}
        strokeDasharray={dashed ? "6,4" : "none"}
      />
      {/* Data flow dot */}
      {progress >= 1 && (
        <circle
          cx={dotX}
          cy={dotY}
          r={3}
          fill={color}
          opacity={0.8}
        />
      )}
      {/* Arrow */}
      {showArrow && progress >= 1 && (
        <polygon
          points={`
            ${arrowX},${arrowY}
            ${arrowX - arrowSize * Math.cos(angle - 0.4)},${arrowY - arrowSize * Math.sin(angle - 0.4)}
            ${arrowX - arrowSize * Math.cos(angle + 0.4)},${arrowY - arrowSize * Math.sin(angle + 0.4)}
          `}
          fill={color}
          opacity={0.8}
        />
      )}
    </svg>
  );
};
