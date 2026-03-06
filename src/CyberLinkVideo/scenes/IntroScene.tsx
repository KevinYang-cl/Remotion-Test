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
import { GeometricGrid } from "../components/GeometricGrid";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Glowing ring animation
  const ringScale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
    delay: 5,
  });

  const ringOpacity = interpolate(ringScale, [0, 0.5, 1], [0, 0.8, 0.3]);

  // Company name entrance
  const nameEntrance = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 100 },
    delay: 10,
  });

  const nameY = interpolate(nameEntrance, [0, 1], [80, 0]);
  const nameOpacity = interpolate(nameEntrance, [0, 1], [0, 1]);

  // English name
  const engEntrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 100 },
    delay: 20,
  });

  const engY = interpolate(engEntrance, [0, 1], [40, 0]);
  const engOpacity = interpolate(engEntrance, [0, 1], [0, 1]);

  // Tagline entrance
  const tagEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 40,
    durationInFrames: 30,
  });

  const tagOpacity = interpolate(tagEntrance, [0, 1], [0, 1]);

  // Subtle pulse on the background
  const bgPulse = interpolate(
    Math.sin(frame * 0.04),
    [-1, 1],
    [0.85, 1]
  );

  return (
    <AbsoluteFill
      style={{
        background: `radial-gradient(ellipse at 50% 50%, #1a0a3e ${bgPulse * 10}%, #0a0a1a 70%)`,
        fontFamily,
      }}
    >
      <GeometricGrid color="#7b2ff7" />
      <ParticleBackground count={50} baseHue={270} />

      {/* Central glowing ring */}
      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 300,
            height: 300,
            borderRadius: "50%",
            border: "2px solid rgba(123, 47, 247, 0.4)",
            transform: `scale(${ringScale * 1.5})`,
            opacity: ringOpacity,
            boxShadow:
              "0 0 60px rgba(123, 47, 247, 0.3), inset 0 0 60px rgba(123, 47, 247, 0.1)",
          }}
        />
      </AbsoluteFill>

      <AbsoluteFill
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: 180,
            height: 180,
            borderRadius: "50%",
            border: "1.5px solid rgba(0, 212, 255, 0.3)",
            transform: `scale(${ringScale * 1.2})`,
            opacity: ringOpacity * 0.7,
            boxShadow:
              "0 0 40px rgba(0, 212, 255, 0.2), inset 0 0 40px rgba(0, 212, 255, 0.05)",
          }}
        />
      </AbsoluteFill>

      {/* Company name */}
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
        }}
      >
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            background:
              "linear-gradient(135deg, #00d4ff 0%, #7b2ff7 50%, #ff2dce 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: `translateY(${nameY}px)`,
            opacity: nameOpacity,
            letterSpacing: 6,
            textShadow: "none",
            filter: `drop-shadow(0 0 30px rgba(123, 47, 247, 0.5))`,
          }}
        >
          訊連科技
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 700,
            color: "#ffffff",
            transform: `translateY(${engY}px)`,
            opacity: engOpacity,
            letterSpacing: 8,
          }}
        >
          CyberLink
        </div>

        <div
          style={{
            fontSize: 20,
            fontWeight: 400,
            color: "#00d4ff",
            opacity: tagOpacity,
            marginTop: 16,
            letterSpacing: 6,
          }}
        >
          Create · Play · Connect
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
