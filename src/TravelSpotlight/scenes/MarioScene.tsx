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

const FadeInClip: React.FC<{ src: string }> = ({ src }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, CROSSFADE], [0, 1], {
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill style={{ opacity }}>
      <Video src={src} style={{ width: "100%", height: "100%", objectFit: "cover" }} muted />
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
 * Mario Scene - Super Nintendo World at Universal Studios
 * Videos: 1_mario.mov + 2_mario.mov
 */
export const MarioScene: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#000" }}>
      {/* First mario clip - 341 actual frames, fade out in last CROSSFADE frames */}
      <Sequence durationInFrames={341} premountFor={fps}>
        <FadeOutClip src={staticFile("storytelling/1_mario.mov")} totalFrames={341} />
      </Sequence>

      {/* Second mario clip - 446 actual frames, starts CROSSFADE frames early, fades in */}
      <Sequence from={341 - CROSSFADE} premountFor={fps}>
        <FadeInClip src={staticFile("storytelling/2_mario.mov")} />
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
