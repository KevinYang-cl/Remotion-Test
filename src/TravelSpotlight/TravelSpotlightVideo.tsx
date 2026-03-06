import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import {
  TransitionSeries,
  linearTiming,
  springTiming,
} from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { loadFont } from "@remotion/google-fonts/NotoSansTC";

import { HookScene } from "./scenes/HookScene";
import { MarioScene } from "./scenes/MarioScene";
import { PokemonScene } from "./scenes/PokemonScene";
import { TrainScene } from "./scenes/TrainScene";
import { InariScene } from "./scenes/InariScene";
import { KamogawaScene } from "./scenes/KamogawaScene";
import { FoodScene } from "./scenes/FoodScene";
import { KlookScene } from "./scenes/KlookScene";
import { CTAScene } from "./scenes/CTAScene";
import { SubtitleOverlay } from "./components/SubtitleOverlay";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

/*
 * Travel Spotlight - 大阪京都旅遊推廣影片
 * Format: Instagram Reels (1080×1920, vertical)
 * Duration: 180 seconds (3 min) @ 30fps = 5400 frames
 *
 * Scene breakdown (raw durations):
 * 1. Hook Scene        - 330f  (11.0s)  大阪京都要怎麼玩呢？
 * 2. Mario Scene       - 750f  (25.0s)  超級任天堂世界
 * 3. Pokemon Scene     - 510f  (17.0s)  寶可夢表演秀
 * 4. Train Scene       - 660f  (22.0s)  嵐山觀光小火車
 * 5. Inari Scene       - 510f  (17.0s)  伏見稻荷大社
 * 6. Kamogawa Scene    - 480f  (16.0s)  鴨川河畔散步
 * 7. Food Scene        - 840f  (28.0s)  A5和牛美食
 * 8. Klook Scene       - 780f  (26.0s)  Klook推廣
 * 9. CTA Scene         - 660f  (22.0s)  結尾CTA
 *
 * 8 transitions × 15 frames = 120 frames overlap
 * Total: 5520 - 120 = 5400 frames ✓
 */

const TRANSITION_FRAMES = 15;

export const TravelSpotlightVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#000" }}>
      {/* Background Music */}
      <Audio src={staticFile("travel_bgm.wav")} volume={0.35} loop />

      {/* Voiceover (if generated) */}
      {/* <Audio src={staticFile("travel_voiceover.mp3")} volume={1.0} /> */}

      {/* Scene transitions */}
      <TransitionSeries>
        {/* Scene 1: Hook - Opening question */}
        <TransitionSeries.Sequence durationInFrames={330}>
          <HookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 2: Super Nintendo World */}
        <TransitionSeries.Sequence durationInFrames={750}>
          <MarioScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: TRANSITION_FRAMES,
          })}
        />

        {/* Scene 3: Pokemon Show */}
        <TransitionSeries.Sequence durationInFrames={510}>
          <PokemonScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 4: Arashiyama Train */}
        <TransitionSeries.Sequence durationInFrames={660}>
          <TrainScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 5: Fushimi Inari */}
        <TransitionSeries.Sequence durationInFrames={510}>
          <InariScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: TRANSITION_FRAMES,
          })}
        />

        {/* Scene 6: Kamogawa River */}
        <TransitionSeries.Sequence durationInFrames={480}>
          <KamogawaScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 7: A5 Wagyu Food */}
        <TransitionSeries.Sequence durationInFrames={840}>
          <FoodScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 8: Klook Promotion */}
        <TransitionSeries.Sequence durationInFrames={780}>
          <KlookScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        {/* Scene 9: CTA - Call to Action */}
        <TransitionSeries.Sequence durationInFrames={660}>
          <CTAScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>

      {/* Subtitle overlay - always on top */}
      <SubtitleOverlay />
    </AbsoluteFill>
  );
};
