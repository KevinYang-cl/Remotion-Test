/**
 * Text-to-Speech Script using msedge-tts (Free, no API key required)
 *
 * Supports Traditional Chinese via Microsoft Edge neural voices.
 *
 * Usage:
 *   node --experimental-strip-types scripts/tts.ts
 *
 * Available zh-TW voices:
 *   zh-TW-HsiaoChenNeural  (female, friendly)
 *   zh-TW-HsiaoYuNeural    (female, bright)
 *   zh-TW-YunJheNeural     (male, warm)
 */

import { MsEdgeTTS, OUTPUT_FORMAT } from "msedge-tts";
import { mkdirSync, existsSync, renameSync } from "fs";
import { join, dirname } from "path";

// ── Config ────────────────────────────────────────────────────────────────────

const VOICE = "zh-TW-HsiaoChenNeural";
const OUTPUT_DIR = "public/voiceover";
const RATE = "+0%";    // speed: e.g. "+20%" faster, "-10%" slower
const PITCH = "+0Hz";  // pitch: e.g. "+50Hz" higher

// ── Script segments ───────────────────────────────────────────────────────────
// Edit this array to define your TTS content.
// id    -> output filename: {OUTPUT_DIR}/{id}.mp3
// text  -> the text to speak

const SEGMENTS: { id: string; text: string }[] = [
  {
    id: "01-intro",
    text: "這裡是範例文字，請替換成你需要的內容。",
  },
  {
    id: "02-main",
    text: "msedge-tts 支援繁體中文，完全免費不需要 API 金鑰。",
  },
];

// ── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  if (!existsSync(OUTPUT_DIR)) {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const tts = new MsEdgeTTS();
  await tts.setMetadata(VOICE, OUTPUT_FORMAT.AUDIO_24KHZ_96KBITRATE_MONO_MP3);

  console.log(`Voice: ${VOICE}`);
  console.log(`Output: ${OUTPUT_DIR}/\n`);

  for (const segment of SEGMENTS) {
    const finalPath = join(OUTPUT_DIR, `${segment.id}.mp3`);
    console.log(`Generating: ${finalPath}`);

    const { audioFilePath } = await tts.toFile(OUTPUT_DIR, segment.text, {
      rate: RATE,
      pitch: PITCH,
    });

    // msedge-tts generates a random filename; rename to our desired name
    renameSync(audioFilePath, finalPath);
    console.log(`  Saved: ${finalPath}`);
  }

  console.log("\nDone!");
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
