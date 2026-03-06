import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { TechBackground } from "../components/TechBackground";
import { GlowBox } from "../components/GlowBox";
import { TypewriterText } from "../components/TypewriterText";

export const EffectsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const effectCategories = [
    {
      title: "Transition",
      items: ["Slide", "Wipe", "Blur", "Rotate", "Box"],
      color: "#ec4899",
      x: 80,
    },
    {
      title: "Blending",
      items: ["Normal", "Multiply", "Screen", "Overlay"],
      color: "#8b5cf6",
      x: 370,
    },
    {
      title: "WebGL FX",
      items: ["GPU Shaders", "Fragment FX", "Custom Filters"],
      color: "#00f0ff",
      x: 660,
    },
    {
      title: "PiP",
      items: ["Position", "Scale", "Crop", "Border"],
      color: "#f59e0b",
      x: 950,
    },
  ];

  return (
    <AbsoluteFill>
      <TechBackground color="#ec4899" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 40,
        }}
      >
        <TypewriterText
          text="// Effects System"
          fontSize={28}
          color="#ec4899"
          glowColor="#ec4899"
          fontWeight={700}
          delay={0}
          speed={1.5}
        />

        {/* BaseEffect hierarchy */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            marginTop: 20,
          }}
        >
          {/* BaseEffect root box */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
              top: 20,
            }}
          >
            <GlowBox
              title="BaseEffect"
              subtitle="Abstract Effect Class"
              color="#ffffff"
              delay={10}
              width={240}
              height={70}
              fontSize={16}
            />
          </div>

          {/* Effect categories */}
          {effectCategories.map((cat, i) => (
            <React.Fragment key={cat.title}>
              <div
                style={{
                  position: "absolute",
                  left: cat.x,
                  top: 150,
                }}
              >
                <GlowBox
                  title={cat.title}
                  color={cat.color}
                  delay={20 + i * 10}
                  width={200}
                  height={60}
                  fontSize={16}
                />
              </div>

              {/* Effect items */}
              {cat.items.map((item, j) => {
                const itemDelay = 35 + i * 10 + j * 5;
                const itemOpacity = interpolate(
                  frame - itemDelay,
                  [0, 10],
                  [0, 1],
                  {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }
                );
                const itemScale = spring({
                  frame,
                  fps,
                  delay: itemDelay,
                  config: { damping: 15, stiffness: 100 },
                });
                return (
                  <div
                    key={item}
                    style={{
                      position: "absolute",
                      left: cat.x + 20,
                      top: 225 + j * 45,
                      opacity: itemOpacity,
                      transform: `scale(${interpolate(itemScale, [0, 1], [0.7, 1])})`,
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontFamily: "'Courier New', monospace",
                        color: cat.color,
                        padding: "6px 14px",
                        background: `${cat.color}10`,
                        border: `1px solid ${cat.color}30`,
                        borderRadius: 4,
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <div
                        style={{
                          width: 6,
                          height: 6,
                          background: cat.color,
                          borderRadius: "50%",
                          boxShadow: `0 0 6px ${cat.color}`,
                        }}
                      />
                      {item}
                    </div>
                  </div>
                );
              })}

              {/* Connection line from BaseEffect */}
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
                  x1={640}
                  y1={90}
                  x2={cat.x + 100}
                  y2={150}
                  stroke={cat.color}
                  strokeWidth={1.5}
                  opacity={interpolate(
                    frame - (20 + i * 10),
                    [0, 15],
                    [0, 0.4],
                    {
                      extrapolateLeft: "clamp",
                      extrapolateRight: "clamp",
                    }
                  )}
                  strokeDasharray="4,4"
                />
              </svg>
            </React.Fragment>
          ))}

          {/* TransitionClip note */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              opacity: interpolate(frame, [80, 100], [0, 0.7], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontFamily: "'Courier New', monospace",
                color: "#ffffff70",
                padding: "8px 24px",
                border: "1px solid #ffffff20",
                borderRadius: 4,
                background: "#ffffff08",
              }}
            >
              TransitionClip + EffectClip → Applied between/on top of media clips
            </div>
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
