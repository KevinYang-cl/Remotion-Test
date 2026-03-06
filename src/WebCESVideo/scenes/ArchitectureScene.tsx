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
import { ConnectionLine } from "../components/ConnectionLine";
import { TypewriterText } from "../components/TypewriterText";

export const ArchitectureScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 5,
  });

  // Layout: Main Thread (left) <-> Web Worker (right)
  const mainThreadX = 200;
  const workerX = 840;

  return (
    <AbsoluteFill>
      <TechBackground color="#8b5cf6" />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 40,
        }}
      >
        {/* Section title */}
        <div
          style={{
            opacity: titleSpring,
            marginBottom: 20,
          }}
        >
          <TypewriterText
            text="// System Architecture"
            fontSize={28}
            color="#8b5cf6"
            glowColor="#8b5cf6"
            fontWeight={700}
            delay={0}
            speed={1.5}
          />
        </div>

        {/* Architecture diagram area */}
        <div style={{ position: "relative", width: "100%", height: "100%", marginTop: 10 }}>
          {/* Main Thread label */}
          <div
            style={{
              position: "absolute",
              left: mainThreadX - 100,
              top: 40,
              opacity: interpolate(frame, [10, 25], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontFamily: "'Courier New', monospace",
                color: "#00f0ff",
                textShadow: "0 0 10px #00f0ff60",
                padding: "4px 16px",
                border: "1px solid #00f0ff40",
                borderRadius: 4,
                background: "#00f0ff10",
                textAlign: "center",
              }}
            >
              Main Thread
            </div>
          </div>

          {/* Worker Thread label */}
          <div
            style={{
              position: "absolute",
              left: workerX - 90,
              top: 40,
              opacity: interpolate(frame, [10, 25], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                fontSize: 18,
                fontFamily: "'Courier New', monospace",
                color: "#ff6b6b",
                textShadow: "0 0 10px #ff6b6b60",
                padding: "4px 16px",
                border: "1px solid #ff6b6b40",
                borderRadius: 4,
                background: "#ff6b6b10",
                textAlign: "center",
              }}
            >
              Web Worker
            </div>
          </div>

          {/* Dividing line */}
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 35,
              width: 1,
              height: interpolate(frame, [15, 40], [0, 520], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              background:
                "linear-gradient(to bottom, #ffffff40, #ffffff10, #ffffff40)",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: 82,
              transform: "translateX(-50%)",
              fontSize: 11,
              fontFamily: "'Courier New', monospace",
              color: "#ffffff50",
              opacity: interpolate(frame, [35, 50], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            Comlink Proxy
          </div>

          {/* Main Thread boxes */}
          <div style={{ position: "absolute", left: mainThreadX - 100, top: 100 }}>
            <GlowBox
              title="WebCES"
              subtitle="Facade API"
              color="#00f0ff"
              delay={15}
              width={200}
              height={70}
              fontSize={15}
            />
          </div>
          <div style={{ position: "absolute", left: mainThreadX - 140, top: 200 }}>
            <GlowBox
              title="VisualContext"
              subtitle="Fabric.js Canvas"
              color="#00f0ff"
              delay={25}
              width={160}
              height={65}
              fontSize={13}
            />
          </div>
          <div style={{ position: "absolute", left: mainThreadX + 30, top: 200 }}>
            <GlowBox
              title="AudioProcessor"
              subtitle="Web Audio API"
              color="#00f0ff"
              delay={30}
              width={160}
              height={65}
              fontSize={13}
            />
          </div>
          <div style={{ position: "absolute", left: mainThreadX - 140, top: 310 }}>
            <GlowBox
              title="Producer"
              subtitle="Encoder + Muxer"
              color="#00f0ff"
              delay={35}
              width={160}
              height={65}
              fontSize={13}
            />
          </div>
          <div style={{ position: "absolute", left: mainThreadX + 30, top: 310 }}>
            <GlowBox
              title="TimerWorker"
              subtitle="Precision Tick"
              color="#00f0ff"
              delay={40}
              width={160}
              height={65}
              fontSize={13}
            />
          </div>

          {/* Worker Thread boxes */}
          <div style={{ position: "absolute", left: workerX - 90, top: 100 }}>
            <GlowBox
              title="Movie"
              subtitle="Project Model"
              color="#ff6b6b"
              delay={20}
              width={180}
              height={70}
              fontSize={15}
            />
          </div>
          <div style={{ position: "absolute", left: workerX - 90, top: 200 }}>
            <GlowBox
              title="Track[]"
              subtitle="Timeline Layers"
              color="#ff6b6b"
              delay={30}
              width={180}
              height={60}
              fontSize={14}
            />
          </div>
          <div style={{ position: "absolute", left: workerX - 90, top: 290 }}>
            <GlowBox
              title="Clips & Effects"
              subtitle="Video|Audio|Image|Title"
              color="#ff6b6b"
              delay={40}
              width={180}
              height={60}
              fontSize={13}
            />
          </div>
          <div style={{ position: "absolute", left: workerX - 90, top: 380 }}>
            <GlowBox
              title="WebGL Controller"
              subtitle="GPU Rendering"
              color="#ff6b6b"
              delay={50}
              width={180}
              height={60}
              fontSize={13}
            />
          </div>
          <div style={{ position: "absolute", left: workerX - 90, top: 470 }}>
            <GlowBox
              title="MediaDataManager"
              subtitle="Ref-Counted Cache"
              color="#ff6b6b"
              delay={55}
              width={180}
              height={60}
              fontSize={13}
            />
          </div>

          {/* Connection lines */}
          <ConnectionLine
            x1={mainThreadX + 100}
            y1={135}
            x2={workerX - 90}
            y2={135}
            color="#ffffff"
            delay={45}
            dashed
          />
          <ConnectionLine
            x1={mainThreadX + 100}
            y1={342}
            x2={workerX - 90}
            y2={320}
            color="#ffaa00"
            delay={55}
            dashed
          />
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
