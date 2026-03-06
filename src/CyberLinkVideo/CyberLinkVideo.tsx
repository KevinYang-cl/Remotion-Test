import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Audio } from "@remotion/media";
import { TransitionSeries, linearTiming, springTiming } from "@remotion/transitions";
import { fade } from "@remotion/transitions/fade";
import { slide } from "@remotion/transitions/slide";
import { wipe } from "@remotion/transitions/wipe";
import { flip } from "@remotion/transitions/flip";
import { clockWipe } from "@remotion/transitions/clock-wipe";

import { IntroScene } from "./scenes/IntroScene";
import { OverviewScene } from "./scenes/CL_OverviewScene";
import { CreateScene } from "./scenes/CreateScene";
import { PlayScene } from "./scenes/PlayScene";
import { AIScene } from "./scenes/AIScene";
import { StatsScene } from "./scenes/StatsScene";
import { OutroScene } from "./scenes/CL_OutroScene";

/*
 * CyberLink 訊連科技 Company Introduction Video
 * Target: ~30 seconds @ 30fps = 900 frames
 *
 * Scene breakdown:
 * 1. Intro (Logo reveal)          - 150 frames (5.0s)
 * 2. Overview (Company info)      - 150 frames (5.0s)
 * 3. CREATE (Products)            - 150 frames (5.0s)
 * 4. PLAY (PowerDVD)              - 140 frames (4.7s)
 * 5. AI (FaceMe)                  - 150 frames (5.0s)
 * 6. Stats (Achievements)         - 140 frames (4.7s)
 * 7. Outro (Website/CTA)          - 140 frames (4.7s)
 *
 * 6 transitions x 20 frames = 120 frames overlap
 * Total: 1020 - 120 = 900 frames = 30s
 */

const TRANSITION_DURATION = 20;

export const CyberLinkVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0a0a1a" }}>
      <Audio src={staticFile("BGM.mp4")} volume={0.5} />
      <TransitionSeries>
        {/* Scene 1: Intro - Logo Reveal */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <IntroScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 2: Company Overview */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <OverviewScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: TRANSITION_DURATION,
          })}
        />

        {/* Scene 3: CREATE - Products */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <CreateScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-left" })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 4: PLAY - PowerDVD */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <PlayScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={flip({ direction: "from-right" })}
          timing={springTiming({
            config: { damping: 200 },
            durationInFrames: TRANSITION_DURATION,
          })}
        />

        {/* Scene 5: AI - FaceMe */}
        <TransitionSeries.Sequence durationInFrames={150}>
          <AIScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={clockWipe({ width: 1280, height: 720 })}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 6: Stats - Achievements */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <StatsScene />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_DURATION })}
        />

        {/* Scene 7: Outro */}
        <TransitionSeries.Sequence durationInFrames={140}>
          <OutroScene />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </AbsoluteFill>
  );
};
