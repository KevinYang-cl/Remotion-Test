import React from "react";
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

export const GlowBox: React.FC<{
  title: string;
  subtitle?: string;
  color?: string;
  delay?: number;
  width?: number;
  height?: number;
  icon?: string;
  fontSize?: number;
}> = ({
  title,
  subtitle,
  color = "#00f0ff",
  delay = 0,
  width = 200,
  height = 80,
  icon,
  fontSize = 16,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    delay,
    config: { damping: 15, stiffness: 120 },
  });

  const scale = interpolate(entrance, [0, 1], [0.6, 1]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const glowIntensity = interpolate(
    Math.sin((frame - delay) * 0.08),
    [-1, 1],
    [0.4, 1]
  );

  const borderOpacity = interpolate(entrance, [0, 1], [0, 0.8]);

  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`,
        border: `1px solid ${color}`,
        borderRadius: 8,
        transform: `scale(${scale})`,
        opacity,
        boxShadow: `0 0 ${15 * glowIntensity}px ${color}40, inset 0 0 ${10 * glowIntensity}px ${color}10`,
        borderColor: `${color}${Math.round(borderOpacity * 255)
          .toString(16)
          .padStart(2, "0")}`,
        padding: "8px 12px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Corner accents */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 12,
          height: 12,
          borderTop: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 12,
          height: 12,
          borderTop: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: 12,
          height: 12,
          borderBottom: `2px solid ${color}`,
          borderLeft: `2px solid ${color}`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          width: 12,
          height: 12,
          borderBottom: `2px solid ${color}`,
          borderRight: `2px solid ${color}`,
        }}
      />

      {icon && (
        <div
          style={{
            fontSize: 22,
            marginBottom: 4,
          }}
        >
          {icon}
        </div>
      )}
      <div
        style={{
          color: "#fff",
          fontSize,
          fontFamily: "'Courier New', monospace",
          fontWeight: 700,
          textAlign: "center",
          textShadow: `0 0 10px ${color}`,
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      {subtitle && (
        <div
          style={{
            color: `${color}cc`,
            fontSize: fontSize * 0.7,
            fontFamily: "'Courier New', monospace",
            textAlign: "center",
            marginTop: 2,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
