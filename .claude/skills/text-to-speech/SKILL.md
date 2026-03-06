---
name: text-to-speech
description: Generate TTS audio for Remotion videos using msedge-tts (free, no API key)
metadata:
  tags: tts, audio, voiceover, chinese, zh-TW
---

## Overview

This project uses `msedge-tts` for free TTS generation. It uses Microsoft Edge's neural TTS API — no API key or account needed.

## Running the TTS script

Edit `scripts/tts.ts` to define your segments, then run:

```bash
node --experimental-strip-types scripts/tts.ts
```

Output MP3 files are saved to `public/voiceover/`.

## Key config in scripts/tts.ts

| Variable | Default | Description |
|----------|---------|-------------|
| `VOICE` | `zh-TW-HsiaoChenNeural` | TTS voice |
| `OUTPUT_DIR` | `public/voiceover` | Output directory |
| `RATE` | `+0%` | Speed adjustment |
| `PITCH` | `+0Hz` | Pitch adjustment |
| `SEGMENTS` | array | Text segments to generate |

## Traditional Chinese voices

| Voice | Gender | Style |
|-------|--------|-------|
| `zh-TW-HsiaoChenNeural` | Female | Friendly, natural |
| `zh-TW-HsiaoYuNeural` | Female | Bright, energetic |
| `zh-TW-YunJheNeural` | Male | Warm, calm |

## Using audio in Remotion

After generating, use `<Audio>` in your composition:

```tsx
import { Audio, staticFile } from "remotion";

// Single file
<Audio src={staticFile("voiceover/01-intro.mp3")} />

// Offset per scene (startFrom in frames)
<Audio src={staticFile("voiceover/02-main.mp3")} startFrom={0} />
```

## Rate and pitch examples

```ts
// Faster speech
const RATE = "+20%";

// Slower, more deliberate
const RATE = "-15%";

// Higher pitch
const PITCH = "+50Hz";
```

## Adding a new project's voiceover

1. Open `scripts/tts.ts`
2. Update `OUTPUT_DIR` to match the video (e.g. `public/voiceover/travel`)
3. Replace the `SEGMENTS` array with your script
4. Run: `node --experimental-strip-types scripts/tts.ts`
