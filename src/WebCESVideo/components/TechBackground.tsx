import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from "remotion";

export const TechBackground: React.FC<{
  variant?: "grid" | "circuit" | "matrix";
  color?: string;
}> = ({ variant = "grid", color = "#00f0ff" }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();

  const gridLines = [];
  const spacing = 60;

  // Animated grid
  if (variant === "grid" || variant === "circuit") {
    // Horizontal lines
    for (let y = 0; y <= height; y += spacing) {
      const offset = interpolate(frame, [0, 300], [0, spacing], {
        extrapolateRight: "extend",
      });
      const yPos = (y + offset) % height;
      const opacity = interpolate(
        Math.sin((yPos / height) * Math.PI * 2 + frame * 0.02),
        [-1, 1],
        [0.03, 0.12]
      );
      gridLines.push(
        <line
          key={`h-${y}`}
          x1={0}
          y1={yPos}
          x2={width}
          y2={yPos}
          stroke={color}
          strokeWidth={1}
          opacity={opacity}
        />
      );
    }
    // Vertical lines
    for (let x = 0; x <= width; x += spacing) {
      const offset = interpolate(frame, [0, 300], [0, spacing], {
        extrapolateRight: "extend",
      });
      const xPos = (x + offset) % width;
      const opacity = interpolate(
        Math.sin((xPos / width) * Math.PI * 2 + frame * 0.03),
        [-1, 1],
        [0.03, 0.12]
      );
      gridLines.push(
        <line
          key={`v-${x}`}
          x1={xPos}
          y1={0}
          x2={xPos}
          y2={height}
          stroke={color}
          strokeWidth={1}
          opacity={opacity}
        />
      );
    }
  }

  // Scanning line effect
  const scanY = interpolate(frame % 180, [0, 180], [0, height]);
  const scanOpacity = 0.3;

  // Floating particles
  const particles = [];
  for (let i = 0; i < 30; i++) {
    const seed = i * 137.508;
    const px =
      ((Math.sin(seed) * 0.5 + 0.5) * width +
        Math.sin(frame * 0.01 + seed) * 40) %
      width;
    const py =
      ((Math.cos(seed * 0.7) * 0.5 + 0.5) * height +
        frame * (0.3 + (i % 5) * 0.1)) %
      height;
    const pOpacity = interpolate(
      Math.sin(frame * 0.05 + seed),
      [-1, 1],
      [0.1, 0.5]
    );
    const pSize = 1.5 + (i % 3);
    particles.push(
      <circle
        key={`p-${i}`}
        cx={px}
        cy={py}
        r={pSize}
        fill={color}
        opacity={pOpacity}
      />
    );
  }

  // Radial gradient pulse
  const pulseOpacity = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.02, 0.08]
  );

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#0a0a1a", overflow: "hidden" }}
    >
      {/* Radial gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at 50% 50%, ${color}22 0%, transparent 70%)`,
          opacity: pulseOpacity * 10,
        }}
      />
      <svg
        width={width}
        height={height}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        {gridLines}
        {particles}
        {/* Scan line */}
        <rect
          x={0}
          y={scanY - 2}
          width={width}
          height={4}
          fill={color}
          opacity={scanOpacity}
        />
        <rect
          x={0}
          y={scanY - 40}
          width={width}
          height={80}
          fill={`url(#scanGrad-${variant})`}
          opacity={scanOpacity * 0.3}
        />
        <defs>
          <linearGradient
            id={`scanGrad-${variant}`}
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <stop offset="0%" stopColor={color} stopOpacity={0} />
            <stop offset="50%" stopColor={color} stopOpacity={0.3} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>
      </svg>
    </AbsoluteFill>
  );
};
