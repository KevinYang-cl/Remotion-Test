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

export const OutroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Logo entrance
  const logoEntrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 80 },
    delay: 5,
  });

  const logoScale = interpolate(logoEntrance, [0, 1], [0.3, 1]);
  const logoOpacity = interpolate(logoEntrance, [0, 1], [0, 1]);

  // Website entrance
  const webEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 25,
    durationInFrames: 30,
  });

  // CTA entrance
  const ctaEntrance = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 40,
    durationInFrames: 30,
  });

  // Pulsing glow
  const glowIntensity = interpolate(
    Math.sin(frame * 0.06),
    [-1, 1],
    [0.3, 0.7]
  );

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(ellipse at 50% 50%, #1a0a3e 0%, #0a0a1a 70%)",
        fontFamily,
      }}
    >
      <GeometricGrid color="#7b2ff7" lineCount={8} />
      <ParticleBackground count={40} baseHue={270} />

      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        {/* Glow ring behind logo */}
        <div
          style={{
            position: "absolute",
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(123, 47, 247, ${glowIntensity}) 0%, transparent 70%)`,
            filter: "blur(40px)",
            top: "25%",
          }}
        />

        {/* Company name */}
        <div
          style={{
            fontSize: 72,
            fontWeight: 900,
            background:
              "linear-gradient(135deg, #00d4ff 0%, #7b2ff7 50%, #ff2dce 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            transform: `scale(${logoScale})`,
            opacity: logoOpacity,
            filter: "drop-shadow(0 0 30px rgba(123, 47, 247, 0.4))",
            letterSpacing: 6,
          }}
        >
          訊連科技
        </div>

        <div
          style={{
            fontSize: 30,
            fontWeight: 700,
            color: "#fff",
            letterSpacing: 10,
            opacity: logoOpacity,
            transform: `scale(${logoScale})`,
          }}
        >
          CyberLink
        </div>

        {/* Website */}
        <div
          style={{
            marginTop: 24,
            padding: "14px 40px",
            borderRadius: 50,
            border: "1.5px solid rgba(0, 212, 255, 0.5)",
            background: "rgba(0, 212, 255, 0.08)",
            opacity: webEntrance,
            transform: `translateY(${interpolate(webEntrance, [0, 1], [20, 0])}px)`,
          }}
        >
          <span
            style={{
              fontSize: 22,
              color: "#00d4ff",
              fontWeight: 600,
              letterSpacing: 2,
            }}
          >
            tw.cyberlink.com
          </span>
        </div>

        {/* CTA */}
        <div
          style={{
            marginTop: 20,
            fontSize: 20,
            color: "#ffffff88",
            opacity: ctaEntrance,
            letterSpacing: 4,
          }}
        >
          Create · Play · Connect — 恣意揮灑，無所侷限
        </div>

        {/* Social icons row (decorative) */}
        <div
          style={{
            display: "flex",
            gap: 24,
            marginTop: 24,
            opacity: interpolate(frame, [60, 80], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {["Facebook", "YouTube", "LinkedIn"].map((name, i) => (
            <div
              key={name}
              style={{
                padding: "8px 20px",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.15)",
                fontSize: 14,
                color: "#ffffff66",
                fontWeight: 500,
              }}
            >
              {name}
            </div>
          ))}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
