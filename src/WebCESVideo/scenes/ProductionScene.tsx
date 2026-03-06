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

export const ProductionScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Encoding progress simulation
  const encodingProgress = interpolate(frame, [40, 110], [0, 100], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const progressBarWidth = interpolate(frame, [40, 110], [0, 600], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill>
      <TechBackground color="#f59e0b" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 40,
        }}
      >
        <TypewriterText
          text="// Production Pipeline"
          fontSize={28}
          color="#f59e0b"
          glowColor="#f59e0b"
          fontWeight={700}
          delay={0}
          speed={1.5}
        />

        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            marginTop: 30,
          }}
        >
          {/* Pipeline: Producer → VideoEncoder → AudioEncoder → Muxer → MP4 */}
          <div style={{ position: "absolute", left: 60, top: 60 }}>
            <GlowBox
              title="Producer"
              subtitle="Frame Iterator"
              color="#f59e0b"
              delay={10}
              width={180}
              height={70}
              fontSize={15}
            />
          </div>

          <div style={{ position: "absolute", left: 340, top: 20 }}>
            <GlowBox
              title="VideoEncoder"
              subtitle="WebCodecs API"
              color="#00f0ff"
              delay={20}
              width={180}
              height={65}
              fontSize={14}
            />
          </div>

          <div style={{ position: "absolute", left: 340, top: 110 }}>
            <GlowBox
              title="AudioEncoder"
              subtitle="WebCodecs API"
              color="#22c55e"
              delay={25}
              width={180}
              height={65}
              fontSize={14}
            />
          </div>

          <div style={{ position: "absolute", left: 620, top: 60 }}>
            <GlowBox
              title="Muxer"
              subtitle="recodemux / clm4"
              color="#8b5cf6"
              delay={30}
              width={180}
              height={70}
              fontSize={14}
            />
          </div>

          <div style={{ position: "absolute", left: 900, top: 60 }}>
            <GlowBox
              title="MP4 Blob"
              subtitle="Final Output"
              color="#ff6b6b"
              delay={35}
              width={180}
              height={70}
              fontSize={15}
            />
          </div>

          {/* Connections */}
          <ConnectionLine
            x1={240}
            y1={75}
            x2={340}
            y2={52}
            color="#00f0ff"
            delay={22}
          />
          <ConnectionLine
            x1={240}
            y1={115}
            x2={340}
            y2={142}
            color="#22c55e"
            delay={27}
          />
          <ConnectionLine
            x1={520}
            y1={52}
            x2={620}
            y2={80}
            color="#8b5cf6"
            delay={32}
          />
          <ConnectionLine
            x1={520}
            y1={142}
            x2={620}
            y2={115}
            color="#8b5cf6"
            delay={32}
          />
          <ConnectionLine
            x1={800}
            y1={95}
            x2={900}
            y2={95}
            color="#ff6b6b"
            delay={37}
          />

          {/* Encoding simulation */}
          <div
            style={{
              position: "absolute",
              left: 140,
              top: 230,
              right: 140,
            }}
          >
            <div
              style={{
                opacity: interpolate(frame, [35, 45], [0, 1], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                }),
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontFamily: "'Courier New', monospace",
                    color: "#f59e0bcc",
                  }}
                >
                  Encoding Progress
                </div>
                <div
                  style={{
                    fontSize: 13,
                    fontFamily: "'Courier New', monospace",
                    color: "#f59e0b",
                  }}
                >
                  {Math.round(encodingProgress)}%
                </div>
              </div>
              <div
                style={{
                  height: 6,
                  background: "#ffffff10",
                  borderRadius: 3,
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    width: progressBarWidth,
                    height: "100%",
                    background:
                      "linear-gradient(90deg, #f59e0b, #ff6b6b)",
                    borderRadius: 3,
                    boxShadow: "0 0 10px #f59e0b60",
                    transition: "none",
                  }}
                />
              </div>
            </div>
          </div>

          {/* Frame visualization */}
          <div
            style={{
              position: "absolute",
              left: 140,
              top: 300,
              display: "flex",
              gap: 3,
              opacity: interpolate(frame, [50, 60], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {Array.from({ length: 40 }).map((_, i) => {
              const filled =
                i <
                interpolate(frame, [50, 110], [0, 40], {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                });
              return (
                <div
                  key={i}
                  style={{
                    width: 16,
                    height: 24,
                    background: filled ? "#f59e0b30" : "#ffffff08",
                    border: `1px solid ${filled ? "#f59e0b60" : "#ffffff15"}`,
                    borderRadius: 2,
                  }}
                />
              );
            })}
          </div>

          {/* Tech stack info */}
          <div
            style={{
              position: "absolute",
              bottom: 40,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 30,
              opacity: interpolate(frame, [60, 80], [0, 0.7], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {[
              "VideoEncoder / VideoDecoder",
              "WebCodecs API",
              "MP4 Box ISO",
              "IndexedDB Storage",
            ].map((tech) => (
              <div
                key={tech}
                style={{
                  fontSize: 11,
                  fontFamily: "'Courier New', monospace",
                  color: "#ffffff50",
                  padding: "5px 12px",
                  border: "1px solid #ffffff15",
                  borderRadius: 3,
                }}
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
