import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
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
 * Train Scene - Arashiyama Scenic Railway
 * Videos: 4_train_come.mov + 5_arashi_train.mov
 */
export const TrainScene: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#000" }}>
      {/* Train arriving */}
      <Sequence durationInFrames={330} premountFor={fps}>
        <Video
          src={staticFile("storytelling/4_train_come.mov")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted
        />
      </Sequence>

      {/* Arashiyama train ride */}
      <Sequence from={330} premountFor={fps}>
        <Video
          src={staticFile("storytelling/5_arashi_train.mov")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted
        />
      </Sequence>

      <GradientOverlay topOpacity={0.35} bottomOpacity={0.5} />

      <SceneTitle
        emoji="🚂"
        title="嵐山觀光小火車"
        subtitle="Sagano Romantic Train"
      />

      <LocationTag label="京都" />
    </AbsoluteFill>
  );
};
