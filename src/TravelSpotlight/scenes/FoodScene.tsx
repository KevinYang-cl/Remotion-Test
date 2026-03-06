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
 * Food Scene - A5 Wagyu beef + Nikutome
 * Videos: 7_A5beef1.mov, 8_A5beef2.mov, 9_nikutome.mov
 */
export const FoodScene: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#000" }}>
      {/* A5 beef clip 1 */}
      <Sequence durationInFrames={300} premountFor={fps}>
        <Video
          src={staticFile("storytelling/7_A5beef1.mov")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted
        />
      </Sequence>

      {/* A5 beef clip 2 */}
      <Sequence from={300} durationInFrames={260} premountFor={fps}>
        <Video
          src={staticFile("storytelling/8_A5beef2.mov")}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          muted
        />
      </Sequence>

      {/* Nikutome restaurant */}
      <Sequence from={560} premountFor={fps}>
        <Video
          src={staticFile("storytelling/9_nikutome.mov")}
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
        emoji="🥩"
        title="A5和牛美食"
        subtitle="入口即化的極致享受"
      />

      <LocationTag label="大阪・京都" />
    </AbsoluteFill>
  );
};
