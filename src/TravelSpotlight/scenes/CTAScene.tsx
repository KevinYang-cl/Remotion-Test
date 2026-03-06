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
 * CTA Scene - Call to Action / Ending
 * "現在就上 Klook 訂起來！🎉"
 */
export const CTAScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Background gradient animation
  const gradientAngle = interpolate(frame, [0, 360], [135, 225], {
    extrapolateRight: "clamp",
  });

  // Main CTA text entrance
  const ctaEntrance = spring({
    frame,
    fps,
    config: { damping: 8, stiffness: 60 },
    delay: 5,
  });
  const ctaScale = interpolate(ctaEntrance, [0, 1], [0.5, 1]);
  const ctaOpacity = interpolate(ctaEntrance, [0, 1], [0, 1]);

  // Sub text
  const subEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: 30,
  });
  const subY = interpolate(subEntrance, [0, 1], [50, 0]);
  const subOpacity = interpolate(subEntrance, [0, 1], [0, 1]);

  // Button entrance
  const btnEntrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100 },
    delay: 55,
  });
  const btnScale = interpolate(btnEntrance, [0, 1], [0, 1]);

  // Pulsing effect on button
  const pulse = interpolate(
    Math.sin((frame - 70) * 0.08),
    [-1, 1],
    [1.0, 1.06]
  );

  // Confetti particles
  const confettiItems = Array.from({ length: 20 }, (_, i) => ({
    x: (i * 137.5) % 100,
    speed: 0.5 + (i % 5) * 0.3,
    size: 8 + (i % 3) * 6,
    hue: (i * 47) % 360,
    delay: i * 3,
  }));

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        background: `linear-gradient(${gradientAngle}deg, #FF5722, #E91E63, #9C27B0)`,
      }}
    >
      {/* Confetti */}
      {confettiItems.map((c, i) => {
        const confettiEntrance = spring({
          frame,
          fps,
          config: { damping: 200 },
          delay: 50 + c.delay,
          durationInFrames: 60,
        });
        const yPos = interpolate(confettiEntrance, [0, 1], [-10, 110]);
        const rotation = frame * c.speed * 5;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${c.x}%`,
              top: `${yPos}%`,
              width: c.size,
              height: c.size,
              background: `hsl(${c.hue}, 80%, 60%)`,
              borderRadius: c.size > 12 ? "50%" : 2,
              transform: `rotate(${rotation}deg)`,
              opacity: confettiEntrance * 0.8,
              zIndex: 5,
            }}
          />
        );
      })}

      {/* Main content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        {/* Emoji burst */}
        <div
          style={{
            fontSize: 80,
            marginBottom: 30,
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
          }}
        >
          🎉
        </div>

        {/* CTA text */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: "#FFFFFF",
            textAlign: "center",
            opacity: ctaOpacity,
            transform: `scale(${ctaScale})`,
            textShadow: "0 4px 20px rgba(0,0,0,0.4)",
            lineHeight: 1.4,
            padding: "0 40px",
          }}
        >
          現在就上
          <br />
          Klook 訂起來！
        </div>

        {/* Sub text */}
        <div
          style={{
            marginTop: 30,
            fontSize: 30,
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
            textAlign: "center",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textShadow: "0 2px 8px rgba(0,0,0,0.3)",
            padding: "0 50px",
            lineHeight: 1.5,
          }}
        >
          大阪京都的精彩旅程
          <br />
          等你出發！
        </div>

        {/* Fake button CTA */}
        <div
          style={{
            marginTop: 50,
            padding: "20px 60px",
            borderRadius: 50,
            background: "#FFFFFF",
            transform: `scale(${btnScale * (frame > 70 ? pulse : 1)})`,
            boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
          }}
        >
          <span
            style={{
              fontSize: 30,
              fontWeight: 900,
              color: "#FF5722",
              letterSpacing: 2,
            }}
          >
            立即預訂 →
          </span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
