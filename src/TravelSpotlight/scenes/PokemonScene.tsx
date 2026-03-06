import React from "react";
import { AbsoluteFill, staticFile } from "remotion";
import { Video } from "@remotion/media";
import { loadFont } from "@remotion/google-fonts/NotoSansTC";
import { GradientOverlay } from "../components/GradientOverlay";
import { SceneTitle } from "../components/SceneTitle";
import { LocationTag } from "../components/LocationTag";

const { fontFamily } = loadFont("normal", {
  weights: ["400", "700", "900"],
  subsets: ["latin"],
});

/**
 * Pokemon Scene - Pokemon show
 * Video: 3_pokemon_show.mov
 */
export const PokemonScene: React.FC = () => {
  return (
    <AbsoluteFill style={{ fontFamily, backgroundColor: "#000" }}>
      <Video
        src={staticFile("storytelling/3_pokemon_show.mov")}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
        muted
      />

      <GradientOverlay topOpacity={0.35} bottomOpacity={0.5} />

      <SceneTitle
        emoji="⚡"
        title="寶可夢表演秀"
        subtitle="Pokémon Live Show"
      />

      <LocationTag label="大阪" />
    </AbsoluteFill>
  );
};
