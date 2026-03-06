import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/NotoSansTC";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

/**
 * Klook Promotion Scene - Text-based promotion
 * Animated text overlay promoting Klook for ticket & restaurant bookings
 */
export const KlookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation
  const gradientShift = interpolate(frame, [0, 420], [0, 360], {
    extrapolateRight: "clamp",
  });

  // Klook logo entrance
  const logoEntrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
    delay: 5,
  });
  const logoScale = interpolate(logoEntrance, [0, 1], [0, 1]);
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, 1]);

  // Headline entrance
  const headEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay: 20,
  });
  const headY = interpolate(headEntrance, [0, 1], [60, 0]);
  const headOpacity = interpolate(headEntrance, [0, 1], [0, 1]);

  // Feature cards staggered entrance
  const features = [
    { icon: "🎫", text: "門票預訂", delay: 40 },
    { icon: "🍽️", text: "餐廳預約", delay: 55 },
    { icon: "💰", text: "超值優惠", delay: 70 },
    { icon: "⚡", text: "免排隊", delay: 85 },
  ];

  // Floating particles
  const particle1Y = interpolate(
    Math.sin(frame * 0.03),
    [-1, 1],
    [-20, 20]
  );
  const particle2Y = interpolate(
    Math.sin(frame * 0.04 + 2),
    [-1, 1],
    [-15, 15]
  );

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        background: `linear-gradient(${135 + gradientShift * 0.1}deg, #FF5722 0%, #FF6F00 30%, #FF9800 60%, #FFB74D 100%)`,
      }}
    >
      {/* Decorative circles */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: 300,
          height: 300,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.1)",
          transform: `translateY(${particle1Y}px)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: "15%",
          left: "-8%",
          width: 250,
          height: 250,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.08)",
          transform: `translateY(${particle2Y}px)`,
        }}
      />

      {/* Main content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          padding: "0 50px",
          zIndex: 10,
        }}
      >
        {/* Klook branding */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            color: "#FFFFFF",
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
            textShadow: "0 4px 20px rgba(0,0,0,0.3)",
            marginBottom: 20,
            letterSpacing: 6,
          }}
        >
          Klook
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 38,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            opacity: headOpacity,
            transform: `translateY(${headY}px)`,
            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
            lineHeight: 1.5,
            marginBottom: 50,
          }}
        >
          輕鬆預訂大阪京都
          <br />
          門票和餐廳！
        </div>

        {/* Feature cards */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 18,
            width: "100%",
          }}
        >
          {features.map((feat) => {
            const cardEntrance = spring({
              frame,
              fps,
              config: { damping: 14, stiffness: 100 },
              delay: feat.delay,
            });
            const cardX = interpolate(cardEntrance, [0, 1], [100, 0]);
            const cardOpacity = interpolate(cardEntrance, [0, 1], [0, 1]);

            return (
              <div
                key={feat.text}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 28px",
                  borderRadius: 20,
                  background: "rgba(255,255,255,0.25)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  opacity: cardOpacity,
                  transform: `translateX(${cardX}px)`,
                }}
              >
                <span style={{ fontSize: 38 }}>{feat.icon}</span>
                <span
                  style={{
                    fontSize: 32,
                    fontWeight: 700,
                    color: "#FFFFFF",
                  }}
                >
                  {feat.text}
                </span>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
