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

const products = [
  {
    name: "PowerDirector",
    desc: "專業影片剪輯",
    icon: "🎬",
    color: "#00d4ff",
  },
  {
    name: "PhotoDirector",
    desc: "AI 相片編修",
    icon: "📸",
    color: "#7b2ff7",
  },
  {
    name: "AudioDirector",
    desc: "音效後製處理",
    icon: "🎵",
    color: "#ff2dce",
  },
  {
    name: "ColorDirector",
    desc: "專業調色分級",
    icon: "🎨",
    color: "#ffaa00",
  },
];

export const CreateScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 70% 30%, #1a0a3e 0%, #0a0a1a 70%)",
        fontFamily,
      }}
    >
      <ParticleBackground count={30} baseHue={280} />

      {/* Section badge */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: 50,
        }}
      >
        {/* CREATE badge */}
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
              background: "linear-gradient(90deg, transparent, #7b2ff7)",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              color: "#7b2ff7",
              fontSize: 18,
              fontWeight: 700,
              letterSpacing: 6,
            }}
          >
            Create
          </span>
          <div
            style={{
              width: 40,
              height: 3,
              background: "linear-gradient(90deg, #7b2ff7, transparent)",
              borderRadius: 2,
            }}
          />
        </div>

        <div style={{ marginTop: 8 }}>
          <GradientText
            text="釋放你的創造力"
            fontSize={48}
            gradient="linear-gradient(90deg, #00d4ff, #7b2ff7, #ff2dce)"
            delay={5}
            fontFamily={fontFamily}
          />
        </div>

        {/* Product cards in a row */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 50,
            justifyContent: "center",
            width: "92%",
          }}
        >
          {products.map((product, i) => {
            const cardDelay = 15 + i * 10;
            const entrance = spring({
              frame: frame - cardDelay,
              fps,
              config: { damping: 12, stiffness: 120 },
            });
            const y = interpolate(entrance, [0, 1], [100, 0]);
            const opacity = interpolate(entrance, [0, 1], [0, 1]);
            const rotation = interpolate(entrance, [0, 1], [10, 0]);

            return (
              <div
                key={product.name}
                style={{
                  flex: 1,
                  padding: "28px 16px",
                  borderRadius: 20,
                  background: `linear-gradient(180deg, ${product.color}11 0%, ${product.color}05 100%)`,
                  border: `1px solid ${product.color}44`,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 12,
                  transform: `translateY(${y}px) rotate(${rotation}deg)`,
                  opacity,
                  boxShadow: `0 0 30px ${product.color}22`,
                }}
              >
                <div style={{ fontSize: 44 }}>{product.icon}</div>
                <div
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: product.color,
                    letterSpacing: 1,
                  }}
                >
                  {product.name}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: "#ffffffbb",
                    textAlign: "center",
                  }}
                >
                  {product.desc}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom tagline */}
        <div
          style={{
            marginTop: 40,
            fontSize: 20,
            color: "#ffffff99",
            textAlign: "center",
            opacity: interpolate(frame, [60, 80], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          屢獲殊榮的創意家族系列軟體，輕鬆上手
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
