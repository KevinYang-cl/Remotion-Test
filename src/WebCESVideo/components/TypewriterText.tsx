import React from "react";
import { useCurrentFrame, interpolate } from "remotion";

export const TypewriterText: React.FC<{
  text: string;
  color?: string;
  fontSize?: number;
  delay?: number;
  speed?: number;
  fontFamily?: string;
  fontWeight?: number;
  glowColor?: string;
}> = ({
  text,
  color = "#ffffff",
  fontSize = 24,
  delay = 0,
  speed = 2,
  fontFamily = "'Courier New', monospace",
  fontWeight = 400,
  glowColor,
}) => {
  const frame = useCurrentFrame();

  const charsToShow = Math.floor(
    interpolate(frame - delay, [0, text.length * speed], [0, text.length], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    })
  );

  const displayText = text.slice(0, charsToShow);
  const cursorOpacity = Math.sin(frame * 0.2) > 0 ? 1 : 0;

  if (frame < delay) return null;

  return (
    <div
      style={{
        fontSize,
        fontFamily,
        fontWeight,
        color,
        textShadow: glowColor
          ? `0 0 10px ${glowColor}, 0 0 20px ${glowColor}40`
          : undefined,
        whiteSpace: "pre",
      }}
    >
      {displayText}
      {charsToShow < text.length && (
        <span style={{ opacity: cursorOpacity, color: glowColor || color }}>
          █
        </span>
      )}
    </div>
  );
};
