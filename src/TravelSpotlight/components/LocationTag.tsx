import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

/**
 * A location tag chip displayed at the top-right corner.
 */
export const LocationTag: React.FC<{
  label: string;
  delay?: number;
}> = ({ label, delay = 15 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
    delay,
  });

  const slideX = interpolate(entrance, [0, 1], [60, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-start",
        alignItems: "flex-end",
        paddingTop: 50,
        paddingRight: 30,
        zIndex: 15,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 20px",
          borderRadius: 30,
          background: "rgba(255,255,255,0.2)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255,255,255,0.3)",
          opacity,
          transform: `translateX(${slideX}px)`,
        }}
      >
        <span style={{ fontSize: 22 }}>📍</span>
        <span
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: "#FFFFFF",
            letterSpacing: 1,
          }}
        >
          {label}
        </span>
      </div>
    </AbsoluteFill>
  );
};
