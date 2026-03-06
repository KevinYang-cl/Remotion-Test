import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { TechBackground } from "../components/TechBackground";

export const IntroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // "WebCES" title entrance with spring
  const titleSpring = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 80 },
    delay: 10,
  });
  const titleScale = interpolate(titleSpring, [0, 1], [0.3, 1]);
  const titleOpacity = interpolate(titleSpring, [0, 1], [0, 1]);

  // Subtitle entrance
  const subtitleSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 25,
  });
  const subtitleY = interpolate(subtitleSpring, [0, 1], [30, 0]);

  // Tagline
  const tagSpring = spring({
    frame,
    fps,
    config: { damping: 200 },
    delay: 45,
  });

  // Glitch effect for title
  const glitchActive = frame % 60 > 55 && frame > 20;
  const glitchX = glitchActive ? Math.sin(frame * 50) * 5 : 0;
  const glitchY = glitchActive ? Math.cos(frame * 30) * 3 : 0;

  // Rotating ring
  const ringRotation = interpolate(frame, [0, 300], [0, 360], {
    extrapolateRight: "extend",
  });

  const letters = "WebCES".split("");

  return (
    <AbsoluteFill>
      <TechBackground color="#00f0ff" />
      <AbsoluteFill
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Rotating outer ring */}
        <div
          style={{
            position: "absolute",
            width: 400,
            height: 400,
            border: "1px solid #00f0ff30",
            borderRadius: "50%",
            transform: `rotate(${ringRotation}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -4,
              left: "50%",
              width: 8,
              height: 8,
              background: "#00f0ff",
              borderRadius: "50%",
              boxShadow: "0 0 15px #00f0ff",
            }}
          />
        </div>
        <div
          style={{
            position: "absolute",
            width: 340,
            height: 340,
            border: "1px solid #ff00ff20",
            borderRadius: "50%",
            transform: `rotate(${-ringRotation * 0.7}deg)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: -3,
              left: "50%",
              width: 6,
              height: 6,
              background: "#ff00ff",
              borderRadius: "50%",
              boxShadow: "0 0 10px #ff00ff",
            }}
          />
        </div>

        {/* Main title */}
        <div
          style={{
            transform: `scale(${titleScale}) translate(${glitchX}px, ${glitchY}px)`,
            opacity: titleOpacity,
            display: "flex",
            gap: 4,
          }}
        >
          {letters.map((letter, i) => {
            const letterSpring = spring({
              frame,
              fps,
              config: { damping: 10, stiffness: 100 },
              delay: 10 + i * 4,
            });
            const letterY = interpolate(letterSpring, [0, 1], [-40, 0]);
            return (
              <span
                key={i}
                style={{
                  fontSize: 90,
                  fontFamily: "'Courier New', monospace",
                  fontWeight: 900,
                  color: i < 3 ? "#ffffff" : "#00f0ff",
                  textShadow:
                    "0 0 20px #00f0ff, 0 0 40px #00f0ff40, 0 0 80px #00f0ff20",
                  transform: `translateY(${letterY}px)`,
                  display: "inline-block",
                }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* Glitch color split */}
        {glitchActive && (
          <>
            <div
              style={{
                position: "absolute",
                fontSize: 90,
                fontFamily: "'Courier New', monospace",
                fontWeight: 900,
                color: "#ff000050",
                transform: `translate(${glitchX + 3}px, ${glitchY - 2}px) scale(${titleScale})`,
              }}
            >
              WebCES
            </div>
            <div
              style={{
                position: "absolute",
                fontSize: 90,
                fontFamily: "'Courier New', monospace",
                fontWeight: 900,
                color: "#0000ff50",
                transform: `translate(${glitchX - 3}px, ${glitchY + 2}px) scale(${titleScale})`,
              }}
            >
              WebCES
            </div>
          </>
        )}

        {/* Subtitle */}
        <div
          style={{
            opacity: subtitleSpring,
            transform: `translateY(${subtitleY}px)`,
            marginTop: 16,
          }}
        >
          <div
            style={{
              fontSize: 22,
              fontFamily: "'Courier New', monospace",
              color: "#00f0ffcc",
              letterSpacing: 8,
              textTransform: "uppercase",
            }}
          >
            Web Creative Editing Service
          </div>
        </div>

        {/* Tagline */}
        <div
          style={{
            opacity: tagSpring,
            marginTop: 24,
          }}
        >
          <div
            style={{
              fontSize: 16,
              fontFamily: "'Courier New', monospace",
              color: "#ffffff80",
              letterSpacing: 3,
              padding: "8px 24px",
              border: "1px solid #ffffff30",
              borderRadius: 4,
            }}
          >
            Browser-Based Video Editing Engine
          </div>
        </div>

        {/* Version badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            opacity: interpolate(frame, [50, 70], [0, 0.6], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            fontSize: 12,
            fontFamily: "'Courier New', monospace",
            color: "#00f0ff80",
            letterSpacing: 2,
          }}
        >
          TypeScript • WebGL2 • Web Workers • OffscreenCanvas
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
