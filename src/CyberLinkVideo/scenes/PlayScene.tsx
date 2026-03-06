import React from "react";
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

export const PlayScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // DVD disc spinning animation
  const discRotation = interpolate(frame, [0, 120], [0, 360]);

  const discEntrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
    delay: 5,
  });

  const textEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
    delay: 15,
  });

  const featureDelay1 = 25;
  const featureDelay2 = 35;
  const featureDelay3 = 45;

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 30% 60%, #0a1a3e 0%, #0a0a1a 70%)",
        fontFamily,
      }}
    >
      <ParticleBackground count={20} baseHue={200} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "0 80px",
        }}
      >
        {/* Left: Disc visual */}
        <div
          style={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: discEntrance,
            transform: `scale(${interpolate(discEntrance, [0, 1], [0.5, 1])})`,
          }}
        >
          <div
            style={{
              width: 280,
              height: 280,
              borderRadius: "50%",
              background: `conic-gradient(
                from ${discRotation}deg,
                #00d4ff33,
                #7b2ff733,
                #ff2dce33,
                #00d4ff33
              )`,
              border: "2px solid rgba(0, 212, 255, 0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow:
                "0 0 60px rgba(0, 212, 255, 0.2), inset 0 0 40px rgba(0, 0, 0, 0.5)",
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#0a0a1a",
                border: "2px solid rgba(0, 212, 255, 0.2)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  fontSize: 32,
                  fontWeight: 900,
                  color: "#00d4ff",
                }}
              >
                ▶
              </div>
            </div>
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
              opacity: interpolate(textEntrance, [0, 1], [0, 1]),
            }}
          >
            <div
              style={{
                width: 40,
                height: 3,
                background: "linear-gradient(90deg, transparent, #00d4ff)",
                borderRadius: 2,
              }}
            />
            <span
              style={{
                color: "#00d4ff",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: 6,
              }}
            >
              Play
            </span>
          </div>

          <div
            style={{
              opacity: interpolate(textEntrance, [0, 1], [0, 1]),
              transform: `translateX(${interpolate(textEntrance, [0, 1], [40, 0])}px)`,
            }}
          >
            <GradientText
              text="無與倫比的影音體驗"
              fontSize={42}
              gradient="linear-gradient(90deg, #00d4ff, #7b2ff7)"
              delay={10}
              fontFamily={fontFamily}
            />
          </div>

          {/* Feature items */}
          {[
            { text: "🏆 全球首款 Ultra HD Blu-ray 軟體播放器", delay: featureDelay1 },
            { text: "🎬 PowerDVD — 旗艦級媒體播放器", delay: featureDelay2 },
            { text: "🌐 跨裝置影音串流", delay: featureDelay3 },
          ].map((feature, i) => {
            const fEntrance = spring({
              frame: frame - feature.delay,
              fps,
              config: { damping: 200 },
              durationInFrames: 25,
            });
            return (
              <div
                key={i}
                style={{
                  fontSize: 22,
                  color: "#ffffffcc",
                  opacity: fEntrance,
                  transform: `translateX(${interpolate(fEntrance, [0, 1], [30, 0])}px)`,
                  padding: "10px 0",
                  borderBottom: "1px solid rgba(123, 47, 247, 0.15)",
                }}
              >
                {feature.text}
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
