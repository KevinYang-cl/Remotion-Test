import React from "react";
import { AbsoluteFill, Audio, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";

import { IntroScene } from "./scenes/IntroScene";
import { ArchitectureScene } from "./scenes/ArchitectureScene";
import { CoreEngineScene } from "./scenes/CoreEngineScene";
import { RenderingScene } from "./scenes/RenderingScene";
import { EffectsScene } from "./scenes/EffectsScene";
import { ProductionScene } from "./scenes/ProductionScene";
import { TechStackScene } from "./scenes/TechStackScene";
import { OutroScene } from "./scenes/OutroScene";

/*
 * WebCES Architecture Introduction Video
 * Total: ~30 seconds @ 30fps = 900 frames
 *
 * Scene breakdown (with transitions eating into duration):
 * 1. Intro          - 140 frames (~4.7s)
 * 2. Architecture   - 150 frames (~5.0s)
 * 3. Core Engine    - 140 frames (~4.7s)
 * 4. Rendering      - 140 frames (~4.7s)
 * 5. Effects        - 130 frames (~4.3s)
 * 6. Production     - 130 frames (~4.3s)
 * 7. Tech Stack     - 120 frames (~4.0s)
 * 8. Outro          - 120 frames (~4.0s)
 *
 * 7 transitions x 20 frames = 140 frames overlap
 * Total: 1070 - 140 = 930 frames ≈ 31s
 */

const TRANSITION_DURATION = 20;

export const WebCESVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <Audio src={staticFile("GeneratedBGM.mp3")} volume={1.0} />
      <TransitionSeries>
        {/* Scene 1: Intro */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: System Architecture */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <ArchitectureScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 3: Core Data Model */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <CoreEngineScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: Rendering Pipeline */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <RenderingScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 5: Effects System */}
        <TransitionSeries.Sequence durationInFrames={130}>
          <EffectsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 6: Production Pipeline */}
        <TransitionSeries.Sequence durationInFrames={130}>
          <ProductionScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 7: Tech Stack */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <TechStackScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 8: Outro */}
        <TransitionSeries.Sequence durationInFrames={120}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
