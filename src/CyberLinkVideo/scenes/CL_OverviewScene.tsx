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
import { NeonCard } from "../components/NeonCard";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const OverviewScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleEntrance = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 100 },
    delay: 5,
  });

  const card1Delay = 15;
  const card2Delay = 25;
  const card3Delay = 35;

  // Timeline bar animation
  const timelineProgress = interpolate(frame, [10, 80], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 30% 40%, #0d1b3e 0%, #0a0a1a 70%)",
        fontFamily,
      }}
    >
      <ParticleBackground count={25} baseHue={220} />

      {/* Title */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 60,
        }}
      >
        <div style={{ opacity: titleEntrance }}>
          <GradientText
            text="公司簡介"
            fontSize={52}
            gradient="linear-gradient(90deg, #00d4ff, #7b2ff7)"
            fontFamily={fontFamily}
          />
        </div>

        {/* Timeline bar */}
        <div
          style={{
            width: "70%",
            height: 3,
            background: "rgba(123, 47, 247, 0.2)",
            borderRadius: 2,
            marginTop: 20,
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${timelineProgress * 100}%`,
              height: "100%",
              background:
                "linear-gradient(90deg, #00d4ff, #7b2ff7)",
              borderRadius: 2,
              boxShadow: "0 0 10px #7b2ff7",
            }}
          />
        </div>

        {/* Info cards */}
        <div
          style={{
            display: "flex",
            gap: 30,
            marginTop: 50,
            justifyContent: "center",
            width: "90%",
          }}
        >
          <NeonCard delay={card1Delay} glowColor="#00d4ff" width="30%">
            <div
              style={{
                fontSize: 20,
                color: "#00d4ff",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              🏢 成立時間
            </div>
            <div
              style={{
                fontSize: 42,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              1996
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#ffffff88",
                marginTop: 8,
              }}
            >
              深耕多媒體 30 年
            </div>
          </NeonCard>

          <NeonCard delay={card2Delay} glowColor="#7b2ff7" width="30%">
            <div
              style={{
                fontSize: 20,
                color: "#b366ff",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              📍 總部
            </div>
            <div
              style={{
                fontSize: 32,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              台灣新北市
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#ffffff88",
                marginTop: 8,
              }}
            >
              全球設有分公司
            </div>
          </NeonCard>

          <NeonCard delay={card3Delay} glowColor="#ff2dce" width="30%">
            <div
              style={{
                fontSize: 20,
                color: "#ff2dce",
                fontWeight: 700,
                marginBottom: 10,
              }}
            >
              📈 股票代碼
            </div>
            <div
              style={{
                fontSize: 36,
                fontWeight: 900,
                color: "#fff",
              }}
            >
              5203.TW
            </div>
            <div
              style={{
                fontSize: 16,
                color: "#ffffff88",
                marginTop: 8,
              }}
            >
              台灣證券交易所
            </div>
          </NeonCard>
        </div>

        {/* Bottom description */}
        <div
          style={{
            marginTop: 40,
            fontSize: 22,
            color: "#ffffffcc",
            textAlign: "center",
            maxWidth: "80%",
            lineHeight: 1.6,
            opacity: interpolate(frame, [50, 70], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          全球首屈一指的<span style={{ color: "#00d4ff" }}>多媒體影音</span>及
          <span style={{ color: "#ff2dce" }}> AI 臉部辨識</span>技術開發商
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
