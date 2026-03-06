import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/NotoSansTC";
import { GradientOverlay } from "../components/GradientOverlay";
import { SceneTitle } from "../components/SceneTitle";
import { LocationTag } from "../components/LocationTag";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

/**
 * Kamogawa Scene - Kamo River stroll
 * Video: 10_kamogawa.mov
 */
export const KamogawaScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow pan simulation
  const scale = interpolate(frame, [0, 480], [1.02, 1.1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Video
          src={staticFile("storytelling/10_kamogawa.mov")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted
        />
      </AbsoluteFill>

      <GradientOverlay topOpacity={0.35} bottomOpacity={0.5} />

      <SceneTitle
        emoji="🌊"
        title="鴨川河畔散步"
        subtitle="Kamogawa River"
      />

      <LocationTag label="京都" />
    </AbsoluteFill>
  );
};
