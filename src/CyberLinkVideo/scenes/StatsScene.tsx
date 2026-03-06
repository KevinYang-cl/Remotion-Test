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
import { AnimatedCounter } from "../components/AnimatedCounter";
import { GradientText } from "../components/GradientText";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const StatsScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Central ring pulse
  const ringPulse = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.95, 1.05]
  );

  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 0,
    durationInFrames: 25,
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #1a0a3e 0%, #0a0a1a 70%)",
        fontFamily,
      }}
    >
      <ParticleBackground count={35} baseHue={250} />

      {/* Central decorative ring */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 500,
            height: 500,
            borderRadius: "50%",
            border: "1px solid rgba(123, 47, 247, 0.1)",
            transform: `scale(${ringPulse})`,
            position: "absolute",
          }}
        />
        <div
          style={{
            width: 350,
            height: 350,
            borderRadius: "50%",
            border: "1px solid rgba(0, 212, 255, 0.08)",
            transform: `scale(${1 / ringPulse})`,
            position: "absolute",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
        }}
      >
        {/* Title */}
        <div style={{ opacity: titleEntrance, marginBottom: 20 }}>
          <GradientText
            text="卓越成就"
            fontSize={50}
            gradient="linear-gradient(90deg, #00d4ff, #ff2dce)"
            fontFamily={fontFamily}
          />
        </div>

        {/* Stats row */}
        <div
          style={{
            display: "flex",
            gap: 80,
            alignItems: "center",
          }}
        >
          <AnimatedCounter
            target={200}
            suffix="+"
            label="專利技術"
            fontSize={72}
            color="#00d4ff"
            delay={10}
          />

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 100,
              background:
                "linear-gradient(180deg, transparent, rgba(123, 47, 247, 0.5), transparent)",
            }}
          />

          <AnimatedCounter
            target={4}
            suffix="億+"
            label="軟體及 App 出貨量"
            fontSize={72}
            color="#7b2ff7"
            delay={20}
          />

          {/* Divider */}
          <div
            style={{
              width: 1,
              height: 100,
              background:
                "linear-gradient(180deg, transparent, rgba(255, 45, 206, 0.5), transparent)",
            }}
          />

          <AnimatedCounter
            target={1000}
            suffix="+"
            label="國際獎項"
            fontSize={72}
            color="#ff2dce"
            delay={30}
          />
        </div>

        {/* Bottom subtitle */}
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "#ffffff88",
            opacity: interpolate(frame, [60, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            letterSpacing: 2,
          }}
        >
          持續進行革命性的多媒體創新
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
