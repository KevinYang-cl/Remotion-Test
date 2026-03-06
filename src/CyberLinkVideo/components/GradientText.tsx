import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const GradientText: React.FC<{
  text: string;
  fontSize?: number;
  gradient?: string;
  delay?: number;
  fontWeight?: number;
  fontFamily?: string;
}> = ({
  text,
  fontSize = 64,
  gradient = "linear-gradient(135deg, #00d4ff, #7b2ff7, #ff2dce)",
  delay = 0,
  fontWeight = 800,
  fontFamily = "sans-serif",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 15, stiffness: 120, mass: 0.8 },
  });

  const y = interpolate(entrance, [0, 1], [60, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <div
      style={{
        fontSize,
        fontWeight,
        fontFamily,
        background: gradient,
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        transform: `translateY(${y}px)`,
        opacity,
        textAlign: "center",
        lineHeight: 1.3,
      }}
    >
      {text}
    </div>
  );
};
