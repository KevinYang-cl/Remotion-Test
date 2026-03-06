import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { TechBackground } from "../components/TechBackground";

export const TechStackScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const techItems = [
    { name: "TypeScript", desc: "Type-safe codebase", color: "#3178c6" },
    { name: "WebGL2", desc: "GPU-accelerated rendering", color: "#ff6b6b" },
    { name: "Web Workers", desc: "Off-main-thread processing", color: "#22c55e" },
    { name: "WebCodecs", desc: "Hardware video encode/decode", color: "#f59e0b" },
    { name: "OffscreenCanvas", desc: "Worker-based canvas rendering", color: "#00f0ff" },
    { name: "IndexedDB", desc: "Client-side media storage", color: "#8b5cf6" },
    { name: "Fabric.js", desc: "Interactive canvas editing", color: "#ec4899" },
    { name: "Comlink", desc: "Worker communication proxy", color: "#ffffff" },
  ];

  return (
    <AbsoluteFill>
      <TechBackground color="#3178c6" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 40,
        }}
      >
        <div
          style={{
            opacity: spring({
              frame,
              fps,
              config: { damping: 200 },
              delay: 5,
            }),
            fontSize: 28,
            fontFamily: "'Courier New', monospace",
            fontWeight: 700,
            color: "#3178c6",
            textShadow: "0 0 15px #3178c640",
            marginBottom: 30,
          }}
        >
          {"// Technology Stack"}
        </div>

        {/* Grid layout */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 20,
            maxWidth: 1000,
          }}
        >
          {techItems.map((tech, i) => {
            const itemSpring = spring({
              frame,
              fps,
              delay: 15 + i * 6,
              config: { damping: 12, stiffness: 100 },
            });
            const scale = interpolate(itemSpring, [0, 1], [0.5, 1]);
            const opacity = interpolate(itemSpring, [0, 1], [0, 1]);
            const y = interpolate(itemSpring, [0, 1], [30, 0]);

            // Pulse glow
            const glowPulse = interpolate(
              Math.sin((frame - 15 - i * 6) * 0.06),
              [-1, 1],
              [0.3, 0.8]
            );

            return (
              <div
                key={tech.name}
                style={{
                  width: 220,
                  height: 110,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  background: `${tech.color}08`,
                  border: `1px solid ${tech.color}50`,
                  borderRadius: 10,
                  transform: `scale(${scale}) translateY(${y}px)`,
                  opacity,
                  boxShadow: `0 0 ${20 * glowPulse}px ${tech.color}30`,
                  padding: 14,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Top bar accent */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: "20%",
                    right: "20%",
                    height: 2,
                    background: `linear-gradient(90deg, transparent, ${tech.color}, transparent)`,
                  }}
                />
                <div
                  style={{
                    fontSize: 18,
                    fontFamily: "'Courier New', monospace",
                    fontWeight: 700,
                    color: tech.color,
                    textShadow: `0 0 8px ${tech.color}60`,
                    marginBottom: 6,
                  }}
                >
                  {tech.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontFamily: "'Courier New', monospace",
                    color: "#ffffff70",
                    textAlign: "center",
                  }}
                >
                  {tech.desc}
                </div>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
