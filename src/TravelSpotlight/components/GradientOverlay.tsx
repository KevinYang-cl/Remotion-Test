import React from "react";
import { AbsoluteFill } from "remotion";

/**
 * A gradient overlay that darkens the top and bottom of the video
 * to improve text readability over video footage.
 */
export const GradientOverlay: React.FC<{
  topOpacity?: number;
  bottomOpacity?: number;
}> = ({ topOpacity = 0.4, bottomOpacity = 0.6 }) => {
  return (
    <AbsoluteFill style={{ zIndex: 5 }}>
      {/* Top gradient */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "35%",
          background: `linear-gradient(to bottom, rgba(0,0,0,${topOpacity}), transparent)`,
        }}
      />
      {/* Bottom gradient */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "40%",
          background: `linear-gradient(to top, rgba(0,0,0,${bottomOpacity}), transparent)`,
        }}
      />
    </AbsoluteFill>
  );
};
