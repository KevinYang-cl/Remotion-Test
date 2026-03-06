import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/NotoSansTC";
import { GradientOverlay } from "../components/GradientOverlay";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

/**
 * Hook Scene - Opening with "大阪京都要怎麼玩呢？"
 * Background: Kamogawa river footage
 */
export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Main question text animation
  const textEntrance = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 60 },
    delay: 10,
  });

  const textScale = interpolate(textEntrance, [0, 1], [0.3, 1]);
  const textOpacity = interpolate(textEntrance, [0, 1], [0, 1]);

  // Subtext entrance
  const subEntrance = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 80 },
    delay: 50,
  });
  const subOpacity = interpolate(subEntrance, [0, 1], [0, 1]);
  const subY = interpolate(subEntrance, [0, 1], [40, 0]);

  // Subtle zoom on background
  const bgScale = interpolate(frame, [0, 180], [1.05, 1.15], {
    extrapolateRight: "clamp",
  });

  // Decorative sparkles
  const sparkle1 = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.3, 1]);
  const sparkle2 = interpolate(Math.sin(frame * 0.15 + 1), [-1, 1], [0.3, 1]);

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#000" }}>
      {/* Background video */}
      <AbsoluteFill style={{ transform: `scale(${bgScale})` }}>
        <Video
          src={staticFile("storytelling/10_kamogawa.mov")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted
          loop
        />
      </AbsoluteFill>

      <GradientOverlay topOpacity={0.5} bottomOpacity={0.7} />

      {/* Center content */}
      <AbsoluteFill
        style={{
          justifyContent: "center",
          alignItems: "center",
          zIndex: 20,
        }}
      >
        {/* Decorative top sparkle */}
        <div
          style={{
            position: "absolute",
            top: "28%",
            fontSize: 50,
            opacity: sparkle1,
          }}
        >
          ✈️
        </div>

        {/* Main question */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 900,
            color: "#FFFFFF",
            textAlign: "center",
            transform: `scale(${textScale})`,
            opacity: textOpacity,
            textShadow:
              "0 6px 30px rgba(0,0,0,0.8), 0 2px 10px rgba(0,0,0,0.5)",
            lineHeight: 1.4,
            padding: "0 40px",
          }}
        >
          大阪京都
          <br />
          要怎麼玩呢？
        </div>

        {/* Sub text */}
        <div
          style={{
            marginTop: 40,
            fontSize: 34,
            fontWeight: 500,
            color: "rgba(255,255,255,0.9)",
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textShadow: "0 2px 10px rgba(0,0,0,0.7)",
          }}
        >
          跟著我一起來看看吧！
        </div>

        {/* Decorative bottom sparkle */}
        <div
          style={{
            position: "absolute",
            bottom: "28%",
            fontSize: 40,
            opacity: sparkle2,
          }}
        >
          🗾
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
