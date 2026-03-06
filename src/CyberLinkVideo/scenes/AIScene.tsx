import React, { useMemo } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansTC";
import { ParticleBackground } from "../components/ParticleBackground";
import { GradientText } from "../components/GradientText";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const AIScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Face scanning animation
  const scanY = interpolate(frame % 60, [0, 60], [0, 100]);

  const faceEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: 5,
  });

  // Face tracking dots
  const dots = useMemo(
    () => [
      { x: 35, y: 30, label: "" },
      { x: 65, y: 30, label: "" },
      { x: 50, y: 50, label: "" },
      { x: 40, y: 65, label: "" },
      { x: 60, y: 65, label: "" },
      { x: 50, y: 75, label: "" },
      { x: 30, y: 45, label: "" },
      { x: 70, y: 45, label: "" },
    ],
    []
  );

  // Accuracy counter
  const accuracyProgress = interpolate(frame, [30, 80], [0, 99.7], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 60% 40%, #1a0a2e 0%, #0a0a1a 70%)",
        fontFamily,
      }}
    >
      <ParticleBackground count={25} baseHue={300} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "0 60px",
        }}
      >
        {/* Left: Face scanning visual */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 300,
              height: 340,
              borderRadius: 30,
              border: "2px solid rgba(255, 45, 206, 0.3)",
              position: "relative",
              overflow: "hidden",
              opacity: faceEntrance,
              transform: `scale(${interpolate(faceEntrance, [0, 1], [0.7, 1])})`,
              background: "rgba(255, 45, 206, 0.03)",
            }}
          >
            {/* Scanning line */}
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: `${scanY}%`,
                height: 2,
                background:
                  "linear-gradient(90deg, transparent, #ff2dce, transparent)",
                boxShadow: "0 0 20px #ff2dce88",
              }}
            />

            {/* Face contour outline */}
            <svg
              viewBox="0 0 100 100"
              style={{
                position: "absolute",
                inset: "10%",
                width: "80%",
                height: "80%",
              }}
            >
              <ellipse
                cx={50}
                cy={45}
                rx={30}
                ry={38}
                fill="none"
                stroke="#ff2dce55"
                strokeWidth={1}
                strokeDasharray="4 3"
              />
            </svg>

            {/* Tracking dots */}
            {dots.map((dot, i) => {
              const dotEntrance = spring({
                frame: frame - 15 - i * 3,
                fps,
                config: { damping: 10, stiffness: 150 },
              });
              const pulse = interpolate(
                Math.sin(frame * 0.1 + i),
                [-1, 1],
                [3, 6]
              );
              return (
                <div
                  key={i}
                  style={{
                    position: "absolute",
                    left: `${dot.x}%`,
                    top: `${dot.y}%`,
                    width: pulse,
                    height: pulse,
                    borderRadius: "50%",
                    background: "#ff2dce",
                    boxShadow: "0 0 10px #ff2dce88",
                    transform: `translate(-50%, -50%) scale(${dotEntrance})`,
                  }}
                />
              );
            })}

            {/* Corner brackets */}
            {[
              { top: 8, left: 8 },
              { top: 8, right: 8 },
              { bottom: 8, left: 8 },
              { bottom: 8, right: 8 },
            ].map((pos, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  ...pos,
                  width: 20,
                  height: 20,
                  borderColor: "#ff2dce88",
                  borderStyle: "solid",
                  borderWidth: 0,
                  ...(i === 0
                    ? { borderTopWidth: 2, borderLeftWidth: 2 }
                    : i === 1
                      ? { borderTopWidth: 2, borderRightWidth: 2 }
                      : i === 2
                        ? { borderBottomWidth: 2, borderLeftWidth: 2 }
                        : { borderBottomWidth: 2, borderRightWidth: 2 }),
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        {/* Right: Text content */}
        <div
          style={{
            flex: 1.2,
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              opacity: interpolate(frame, [0, 15], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              style={{
                width: 40,
                height: 3,
                background:
                  "linear-gradient(90deg, transparent, #ff2dce)",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                color: "#ff2dce",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 6,
              }}
            >
              FaceMe® AI
            </span>
          </div>

          <GradientText
            text="AI 臉部辨識引擎"
            fontSize={44}
            gradient="linear-gradient(90deg, #ff2dce, #7b2ff7)"
            delay={10}
            fontFamily={fontFamily}
          />

          {/* Accuracy display */}
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              marginTop: 10,
              opacity: interpolate(frame, [25, 40], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <span
              style={{
                fontSize: 64,
                fontWeight: 900,
                color: "#ff2dce",
                textShadow: "0 0 30px #ff2dce66",
              }}
            >
              {accuracyProgress.toFixed(1)}%
            </span>
            <span
              style={{
                fontSize: 22,
                color: "#ffffff99",
              }}
            >
              辨識準確率
            </span>
          </div>

          <div
            style={{
              fontSize: 20,
              color: "#ffffffbb",
              lineHeight: 1.6,
              marginTop: 8,
              opacity: interpolate(frame, [50, 65], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            採用深度學習演算法，NIST 國際評比名列前茅
            <br />
            應用於智慧零售、智慧安全、智慧城市等領域
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
