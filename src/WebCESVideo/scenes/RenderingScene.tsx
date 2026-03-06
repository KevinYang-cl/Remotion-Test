import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
} from "remotion";
import { TechBackground } from "../components/TechBackground";
import { GlowBox } from "../components/GlowBox";
import { ConnectionLine } from "../components/ConnectionLine";
import { TypewriterText } from "../components/TypewriterText";

export const RenderingScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Pipeline flow: FrameProvider → Clip → WebGL → Canvas
  const pipelineSteps = [
    {
      title: "FrameProviders",
      subtitle: "Decode media frames",
      color: "#22c55e",
      x: 80,
      y: 180,
      items: ["VideoFrameFinder", "AudioFrameFinder", "ImageFrameFinder", "TitleFrameFinder"],
    },
    {
      title: "Clips",
      subtitle: "Process & compose",
      color: "#f59e0b",
      x: 380,
      y: 180,
      items: ["getFrameAt()", "applyEffect()", "segments[]"],
    },
    {
      title: "WebGL Controller",
      subtitle: "GPU compositing",
      color: "#00f0ff",
      x: 680,
      y: 180,
      items: ["Preview Context", "Produce Context", "Shader Effects"],
    },
    {
      title: "Output",
      subtitle: "OffscreenCanvas",
      color: "#ff6b6b",
      x: 980,
      y: 180,
      items: ["ImageBitmap", "AudioPacket"],
    },
  ];

  // Animated pipeline progress bar
  const pipelineProgress = interpolate(frame, [30, 100], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <TechBackground color="#22c55e" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 40,
        }}
      >
        <TypewriterText
          text="// Rendering Pipeline"
          fontSize={28}
          color="#22c55e"
          glowColor="#22c55e"
          fontWeight={700}
          delay={0}
          speed={1.5}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            marginTop: 20,
          }}
        >
          {/* Pipeline boxes */}
          {pipelineSteps.map((step, i) => (
            <React.Fragment key={step.title}>
              <div
                style={{
                  position: "absolute",
                  left: step.x,
                  top: step.y,
                }}
              >
                <GlowBox
                  title={step.title}
                  subtitle={step.subtitle}
                  color={step.color}
                  delay={10 + i * 12}
                  width={210}
                  height={75}
                  fontSize={15}
                />
              </div>

              {/* Sub-items */}
              {step.items.map((item, j) => (
                <div
                  key={item}
                  style={{
                    position: "absolute",
                    left: step.x + 15,
                    top: step.y + 90 + j * 28,
                    opacity: interpolate(
                      frame - (20 + i * 12 + j * 4),
                      [0, 10],
                      [0, 0.8],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }
                    ),
                    transform: `translateX(${interpolate(
                      frame - (20 + i * 12 + j * 4),
                      [0, 10],
                      [15, 0],
                      {
                        extrapolateLeft: "clamp",
                        extrapolateRight: "clamp",
                      }
                    )}px)`,
                  }}
                >
                  <div
                    style={{
                      fontSize: 12,
                      fontFamily: "'Courier New', monospace",
                      color: `${step.color}bb`,
                      padding: "3px 10px",
                      borderLeft: `2px solid ${step.color}60`,
                    }}
                  >
                    {item}
                  </div>
                </div>
              ))}

              {/* Arrow to next */}
              {i < pipelineSteps.length - 1 && (
                <ConnectionLine
                  x1={step.x + 210}
                  y1={step.y + 37}
                  x2={pipelineSteps[i + 1].x}
                  y2={pipelineSteps[i + 1].y + 37}
                  color={step.color}
                  delay={15 + i * 12}
                />
              )}
            </React.Fragment>
          ))}

          {/* Render modes */}
          <div
            style={{
              position: "absolute",
              bottom: 80,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 60,
            }}
          >
            {[
              {
                mode: "PREVIEW",
                desc: "Live playback on OffscreenCanvas",
                color: "#00f0ff",
              },
              {
                mode: "PRODUCE",
                desc: "Full-res encoding to MP4",
                color: "#ff6b6b",
              },
            ].map((m, i) => {
              const mOpacity = interpolate(
                frame - (70 + i * 10),
                [0, 15],
                [0, 1],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }
              );
              return (
                <div
                  key={m.mode}
                  style={{
                    opacity: mOpacity,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      fontSize: 18,
                      fontFamily: "'Courier New', monospace",
                      fontWeight: 700,
                      color: m.color,
                      textShadow: `0 0 10px ${m.color}60`,
                    }}
                  >
                    {m.mode}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      fontFamily: "'Courier New', monospace",
                      color: "#ffffff60",
                    }}
                  >
                    {m.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pipeline progress bar */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 100,
              right: 100,
              height: 3,
              background: "#ffffff10",
              borderRadius: 2,
            }}
          >
            <div
              style={{
                width: `${pipelineProgress * 100}%`,
                height: "100%",
                background:
                  "linear-gradient(90deg, #22c55e, #f59e0b, #00f0ff, #ff6b6b)",
                borderRadius: 2,
                boxShadow: "0 0 10px #22c55e60",
              }}
            />
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
