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

const FadeBothClip: React.FC<{ src: string; totalFrames: number }> = ({ src, totalFrames }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [0, CROSSFADE, totalFrames - CROSSFADE, totalFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );
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
 * Food Scene - A5 Wagyu beef + Nikutome
 * Videos: 7_A5beef1.mov, 8_A5beef2.mov, 9_nikutome.mov
 */
export const FoodScene: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#000" }}>
      {/* A5 beef clip 1 - fade out in last CROSSFADE frames */}
      <Sequence durationInFrames={300} premountFor={fps}>
        <FadeOutClip src={staticFile("storytelling/7_A5beef1.mov")} totalFrames={300} />
      </Sequence>

      {/* A5 beef clip 2 - 127 actual frames, starts CROSSFADE frames early, fades in and out */}
      <Sequence from={300 - CROSSFADE} durationInFrames={127 + CROSSFADE} premountFor={fps}>
        <FadeBothClip src={staticFile("storytelling/8_A5beef2.mov")} totalFrames={127 + CROSSFADE} />
      </Sequence>

      {/* Nikutome restaurant - 640 actual frames, starts CROSSFADE frames early, fades in */}
      {/* clip2 ends at: (300 - CROSSFADE) + (127 + CROSSFADE) = 427; clip3 starts at 427 - CROSSFADE = 412 */}
      <Sequence from={412} premountFor={fps}>
        <FadeInClip src={staticFile("storytelling/9_nikutome.mov")} />
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
