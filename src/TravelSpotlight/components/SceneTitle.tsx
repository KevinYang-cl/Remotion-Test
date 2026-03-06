import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";

type SceneTitleProps = {
  emoji: string;
  title: string;
  subtitle?: string;
  position?: "top" | "center";
  delay?: number;
};

export const SceneTitle: React.FC<SceneTitleProps> = ({
  emoji,
  title,
  subtitle,
  position = "top",
  delay = 10,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay,
  });

  const slideX = interpolate(entrance, [0, 1], [-80, 0]);
  const opacity = interpolate(entrance, [0, 1], [0, 1]);

  const subtitleEntrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
    delay: delay + 10,
  });
  const subOpacity = interpolate(subtitleEntrance, [0, 1], [0, 1]);

  const isCenter = position === "center";

  return (
    <AbsoluteFill
      style={{
        justifyContent: isCenter ? "center" : "flex-start",
        alignItems: isCenter ? "center" : "flex-start",
        paddingTop: isCenter ? 0 : 100,
        paddingLeft: isCenter ? 0 : 40,
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: isCenter ? "center" : "flex-start",
          opacity,
          transform: isCenter
            ? `scale(${entrance})`
            : `translateX(${slideX}px)`,
        }}
      >
        {/* Emoji badge */}
        <div
          style={{
            fontSize: 56,
            marginBottom: 8,
          }}
        >
          {emoji}
        </div>
        {/* Title */}
        <div
          style={{
            fontSize: isCenter ? 52 : 44,
            fontWeight: 900,
            color: "#FFFFFF",
            textShadow: "0 4px 20px rgba(0,0,0,0.7), 0 2px 6px rgba(0,0,0,0.5)",
            letterSpacing: 2,
            lineHeight: 1.3,
            textAlign: isCenter ? "center" : "left",
          }}
        >
          {title}
        </div>
        {/* Subtitle */}
        {subtitle && (
          <div
            style={{
              marginTop: 12,
              fontSize: 28,
              fontWeight: 500,
              color: "rgba(255,255,255,0.85)",
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
              opacity: subOpacity,
              textAlign: isCenter ? "center" : "left",
            }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};
