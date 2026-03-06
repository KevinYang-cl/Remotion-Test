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
 * Mario Scene - Super Nintendo World at Universal Studios
 * Videos: 1_mario.mov + 2_mario.mov
 */
export const MarioScene: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#000" }}>
      {/* First mario clip - first half */}
      <Sequence durationInFrames={375} premountFor={fps}>
        <Video
          src={staticFile("storytelling/1_mario.mov")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted
        />
      </Sequence>

      {/* Second mario clip - second half */}
      <Sequence from={375} premountFor={fps}>
        <Video
          src={staticFile("storytelling/2_mario.mov")}
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
        emoji="🏰"
        title="超級任天堂世界"
        subtitle="Universal Studios Japan"
      />

      <LocationTag label="大阪" />
    </AbsoluteFill>
  );
};
