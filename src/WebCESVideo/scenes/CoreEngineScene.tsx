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

export const CoreEngineScene: React.FC = () => {
  const frame = useCurrentFrame();

  const centerX = 640;

  return (
    <AbsoluteFill>
      <TechBackground color="#ff6b6b" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 40,
        }}
      >
        {/* Title */}
        <TypewriterText
          text="// Core Data Model"
          fontSize={28}
          color="#ff6b6b"
          glowColor="#ff6b6b"
          fontWeight={700}
          delay={0}
          speed={1.5}
        />

        {/* Hierarchy: Movie → Track → Clips */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "100%",
            marginTop: 30,
          }}
        >
          {/* Movie box (top center) */}
          <div
            style={{
              position: "absolute",
              left: centerX - 120,
              top: 20,
            }}
          >
            <GlowBox
              title="Movie"
              subtitle="Root Project Container"
              color="#ff6b6b"
              delay={10}
              width={240}
              height={80}
              fontSize={18}
            />
          </div>

          {/* Movie properties */}
          <div
            style={{
              position: "absolute",
              left: centerX + 150,
              top: 25,
              opacity: interpolate(frame, [25, 40], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {["aspectRatio", "fps: 30", "playState", "volume"].map(
              (prop, i) => (
                <div
                  key={prop}
                  style={{
                    fontSize: 13,
                    fontFamily: "'Courier New', monospace",
                    color: "#ff6b6b90",
                    marginBottom: 3,
                    transform: `translateX(${interpolate(
                      frame - 25 - i * 3,
                      [0, 10],
                      [20, 0],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
                    )}px)`,
                  }}
                >
                  ▸ {prop}
                </div>
              )
            )}
          </div>

          {/* Track boxes (middle row) */}
          {[0, 1, 2].map((i) => (
            <React.Fragment key={i}>
              <div
                style={{
                  position: "absolute",
                  left: centerX - 340 + i * 260,
                  top: 160,
                }}
              >
                <GlowBox
                  title={`Track ${i + 1}`}
                  subtitle={
                    i === 0
                      ? "Video Layer"
                      : i === 1
                        ? "Audio Layer"
                        : "Overlay Layer"
                  }
                  color="#ffaa00"
                  delay={20 + i * 8}
                  width={200}
                  height={70}
                  fontSize={15}
                />
              </div>
              <ConnectionLine
                x1={centerX}
                y1={100}
                x2={centerX - 240 + i * 260}
                y2={160}
                color="#ffaa00"
                delay={20 + i * 8}
              />
            </React.Fragment>
          ))}

          {/* Clip types (bottom row) */}
          {[
            { name: "VideoClip", color: "#00f0ff", icon: "🎬" },
            { name: "AudioClip", color: "#22c55e", icon: "🎵" },
            { name: "ImageClip", color: "#f59e0b", icon: "🖼️" },
            { name: "TitleClip", color: "#ec4899", icon: "📝" },
            { name: "StickerClip", color: "#8b5cf6", icon: "⭐" },
          ].map((clip, i) => (
            <div
              key={clip.name}
              style={{
                position: "absolute",
                left: centerX - 450 + i * 190,
                top: 310,
              }}
            >
              <GlowBox
                title={clip.name}
                color={clip.color}
                delay={45 + i * 5}
                width={160}
                height={55}
                fontSize={13}
                icon={clip.icon}
              />
            </div>
          ))}

          {/* Connections from tracks to clips */}
          <ConnectionLine
            x1={centerX - 240}
            y1={230}
            x2={centerX - 360}
            y2={310}
            color="#00f0ff"
            delay={50}
          />
          <ConnectionLine
            x1={centerX - 240}
            y1={230}
            x2={centerX - 170}
            y2={310}
            color="#22c55e"
            delay={55}
          />
          <ConnectionLine
            x1={centerX}
            y1={230}
            x2={centerX + 10}
            y2={310}
            color="#f59e0b"
            delay={60}
          />
          <ConnectionLine
            x1={centerX + 260}
            y1={230}
            x2={centerX + 190}
            y2={310}
            color="#ec4899"
            delay={65}
          />
          <ConnectionLine
            x1={centerX + 260}
            y1={230}
            x2={centerX + 370}
            y2={310}
            color="#8b5cf6"
            delay={70}
          />

          {/* IClip interface label */}
          <div
            style={{
              position: "absolute",
              left: centerX - 80,
              top: 290,
              opacity: interpolate(frame, [45, 55], [0, 0.7], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              fontSize: 12,
              fontFamily: "'Courier New', monospace",
              color: "#ffffff60",
            }}
          >
            implements IClip
          </div>

          {/* Bottom info: shared clip properties */}
          <div
            style={{
              position: "absolute",
              bottom: 30,
              left: 0,
              right: 0,
              display: "flex",
              justifyContent: "center",
              gap: 40,
              opacity: interpolate(frame, [70, 90], [0, 0.6], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            {[
              "startTime",
              "endTime",
              "trim()",
              "split()",
              "getFrameAt()",
              "applyEffect()",
            ].map((prop) => (
              <div
                key={prop}
                style={{
                  fontSize: 12,
                  fontFamily: "'Courier New', monospace",
                  color: "#ffffff50",
                  padding: "4px 10px",
                  border: "1px solid #ffffff20",
                  borderRadius: 3,
                }}
              >
                {prop}
              </div>
            ))}
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
