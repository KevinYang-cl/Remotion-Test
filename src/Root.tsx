import "./index.css";
import { Composition, Folder } from "remotion";
import { WebCESVideo } from "./WebCESVideo/WebCESVideo";
import { CyberLinkVideo } from "./CyberLinkVideo/CyberLinkVideo";
import { TravelSpotlightVideo } from "./TravelSpotlight/TravelSpotlightVideo";

export const RemotionRoot: React.FC = () => {
  return (
    <>
<Composition
        id="WebCES-Architecture"
        component={WebCESVideo}
        durationInFrames={930}
        fps={30}
        width={1280}
        height={720}
      />
      <Composition
        id="CyberLink-Intro"
        component={CyberLinkVideo}
        durationInFrames={900}
        fps={30}
        width={1280}
        height={720}
      />
      <Folder name="Travel">
        <Composition
          id="Travel-Spotlight-OsakaKyoto"
          component={TravelSpotlightVideo}
          durationInFrames={3993}
          fps={30}
          width={1080}
          height={1920}
        />
      </Folder>
    </>
  );
};
