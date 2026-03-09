import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useVideoConfig,
  useCurrentFrame,
  interpolate,
  staticFile,
} from "remotion";
import { Video } from "@remotion/media";

const CROSSFADE = 15;

const FadeOutClip: React.FC<{ src: string; totalFrames: number }> = ({ src, totalFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [totalFrames - CROSSFADE, totalFrames], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <Video src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
    </AbsoluteFill>
  );
};

const FadeInClip: React.FC<{ src: string; loop?: boolean }> = ({ src, loop }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, CROSSFADE], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <Video src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted loop={loop} />
    </AbsoluteFill>
  );
};
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
      {/* Train arriving - 274 actual frames, fade out in last CROSSFADE frames */}
      <Sequence durationInFrames={274} premountFor={fps}>
        <FadeOutClip src={staticFile("storytelling/4_train_come.mov")} totalFrames={274} />
      </Sequence>

      {/* Arashiyama train ride - 265 actual frames, loop to fill scene, fades in */}
      <Sequence from={274 - CROSSFADE} premountFor={fps}>
        <FadeInClip src={staticFile("storytelling/5_arashi_train.mov")} loop />
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
