import React, { useState, useEffect, useCallback } from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  staticFile,
} from "remotion";

type CaptionEntry = {
  text: string;
  startMs: number;
  endMs: number;
};

export const SubtitleOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const [captions, setCaptions] = useState<CaptionEntry[]>([]);

  const fetchCaptions = useCallback(async () => {
    const response = await fetch(staticFile("travel_captions.json"));
    const data: CaptionEntry[] = await response.json();
    setCaptions(data);
  }, []);

  useEffect(() => {
    fetchCaptions();
  }, [fetchCaptions]);

  const currentTimeMs = (frame / fps) * 1000;
  const currentCaption = captions.find(
    (c) => currentTimeMs >= c.startMs && currentTimeMs < c.endMs
  );

  if (!currentCaption) return null;

  // Fade in animation for each subtitle
  const captionStartFrame = (currentCaption.startMs / 1000) * fps;
  const localFrame = frame - captionStartFrame;
  const fadeIn = interpolate(localFrame, [0, 6], [0, 1], {
    extrapolateRight: "clamp",
  });
  const slideUp = interpolate(localFrame, [0, 6], [15, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: "flex-end",
        alignItems: "center",
        zIndex: 100,
      }}
    >
      <div
        style={{
          marginBottom: 120,
          padding: "14px 32px",
          borderRadius: 16,
          background: "rgba(0, 0, 0, 0.65)",
          backdropFilter: "blur(8px)",
          opacity: fadeIn,
          transform: `translateY(${slideUp}px)`,
          maxWidth: "90%",
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.4,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)",
            letterSpacing: 1,
          }}
        >
          {currentCaption.text}
        </div>
      </div>
    </AbsoluteFill>
  );
};
