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
 * Inari Scene - Fushimi Inari Shrine
 * Video: 6_inari_crop.mov
 */
export const InariScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Slow zoom for cinematic effect (333 frames = 11.1s matches video length)
  const scale = interpolate(frame, [0, 333], [1.0, 1.12], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#000" }}>
      <AbsoluteFill style={{ transform: `scale(${scale})` }}>
        <Video
          src={staticFile("storytelling/6_inari_crop.mov")}
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
        emoji="⛩️"
        title="伏見稻荷大社"
        subtitle="千本鳥居 Senbon Torii"
      />

      <LocationTag label="京都" />
    </AbsoluteFill>
  );
};
