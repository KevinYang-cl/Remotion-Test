import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const AnimatedCounter: React.FC<{
  target: number;
  suffix?: string;
  prefix?: string;
  fontSize?: number;
  color?: string;
  delay?: number;
  label: string;
  labelColor?: string;
}> = ({
  target,
  suffix = "",
  prefix = "",
  fontSize = 72,
  color = "#00d4ff",
  delay = 0,
  label,
  labelColor = "#ffffff99",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
    durationInFrames: 40,
  });

  const scale = spring({
    frame: frame - delay,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const count = Math.round(interpolate(entrance, [0, 1], [0, target]));

  const opacity = interpolate(entrance, [0, 0.3], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        opacity,
        transform: `scale(${interpolate(scale, [0, 1], [0.5, 1])})`,
      }}
    >
      <div
        style={{
          fontSize,
          fontWeight: 900,
          color,
          textShadow: `0 0 30px ${color}66, 0 0 60px ${color}33`,
          fontFamily: "sans-serif",
        }}
      >
        {prefix}
        {count}
        {suffix}
      </div>
      <div
        style={{
          fontSize: fontSize * 0.28,
          color: labelColor,
          marginTop: 8,
          fontWeight: 500,
          letterSpacing: 1,
          fontFamily: "sans-serif",
        }}
      >
        {label}
      </div>
    </div>
  );
};
