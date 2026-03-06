import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const NeonCard: React.FC<{
  children: React.ReactNode;
  delay?: number;
  glowColor?: string;
  width?: number | string;
  height?: number | string;
}> = ({
  children,
  delay = 0,
  glowColor = "#7b2ff7",
  width = "auto",
  height = "auto",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 14, stiffness: 100 },
  });

  const scale = interpolate(entrance, [0, 1], [0.7, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const pulse = interpolate(
    Math.sin((frame - delay) * 0.08),
    [-1, 1],
    [0.4, 0.8]
  );

  return (
    <div
      style={{
        width,
        height,
        padding: "24px 32px",
        borderRadius: 20,
        background: "rgba(255, 255, 255, 0.04)",
        border: `1px solid ${glowColor}55`,
        backdropFilter: "blur(10px)",
        boxShadow: `0 0 20px ${glowColor}${Math.round(pulse * 99)
          .toString(16)
          .padStart(2, "0")}, inset 0 0 20px ${glowColor}11`,
        transform: `scale(${scale})`,
        opacity,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );
};
