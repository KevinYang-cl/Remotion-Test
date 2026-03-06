import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { TechBackground } from "../components/TechBackground";

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: 10,
  });

  const taglineSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 25,
  });

  const statsSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 40,
  });

  // Rotating plus sign
  const plusRotate = interpolate(frame, [0, 300], [0, 360], {
    extrapolateRight: "extend",
  });

  const stats = [
    { label: "Modules", value: "15+" },
    { label: "Clip Types", value: "5" },
    { label: "Effect Types", value: "4" },
    { label: "Web APIs", value: "8" },
  ];

  return (
    <AbsoluteFill>
      <TechBackground color="#00f0ff" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* Decorative rotating element */}
        <div
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            border: "1px solid #00f0ff15",
            transform: `rotate(${plusRotate}deg)`,
            borderRadius: 8,
          }}
        />
        <div
          style={{
            position: "absolute",
            width: 250,
            height: 250,
            border: "1px solid #ff00ff15",
            transform: `rotate(${-plusRotate * 0.5}deg)`,
            borderRadius: 8,
          }}
        />

        {/* WebCES title */}
        <div
          style={{
            transform: `scale(${interpolate(titleSpring, [0, 1], [0.5, 1])})`,
            opacity: titleSpring,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontFamily: "'Courier New', monospace",
              fontWeight: 900,
              color: "#ffffff",
              textShadow:
                "0 0 20px #00f0ff, 0 0 40px #00f0ff40",
              textAlign: "center",
            }}
          >
            WebCES
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: taglineSpring,
            transform: `translateY(${interpolate(taglineSpring, [0, 1], [20, 0])}px)`,
          }}
        >
          <div
            style={{
              fontSize: 18,
              fontFamily: "'Courier New', monospace",
              color: "#00f0ffcc",
              textAlign: "center",
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Full-Featured Browser Video Editor
          </div>
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 40,
            marginTop: 30,
            opacity: statsSpring,
            transform: `translateY(${interpolate(statsSpring, [0, 1], [15, 0])}px)`,
          }}
        >
          {stats.map((stat, i) => {
            const statSpring = spring({
              frame,
              fps,
              delay: 45 + i * 6,
              config: { damping: 15, stiffness: 120 },
            });
            return (
              <div
                key={stat.label}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 6,
                  opacity: statSpring,
                  transform: `scale(${interpolate(statSpring, [0, 1], [0.7, 1])})`,
                }}
              >
                <div
                  style={{
                    fontSize: 36,
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 900,
                    color: "#00f0ff",
                    textShadow: "0 0 15px #00f0ff80",
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    fontFamily: "'Courier New', monospace",
                    color: "#ffffff60",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tech badges */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            gap: 12,
            opacity: interpolate(frame, [60, 80], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {[
            "OffscreenCanvas",
            "WebGL2",
            "WebCodecs",
            "Web Workers",
            "IndexedDB",
          ].map((tech) => (
            <div
              key={tech}
              style={{
                fontSize: 11,
                fontFamily: "'Courier New', monospace",
                color: "#00f0ff80",
                padding: "4px 12px",
                border: "1px solid #00f0ff30",
                borderRadius: 20,
              }}
            >
              {tech}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
