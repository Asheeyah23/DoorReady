/**
 * Voice accessibility layer (stretch goal).
 * Sends already-cited, already-generated text to ElevenLabs text-to-speech.
 * This module never originates new content — it only reads aloud text
 * Claude has already produced and the renter has already seen on screen.
 */

const ELEVENLABS_API_URL = "https://api.elevenlabs.io/v1/text-to-speech";

export interface SynthesizeSpeechInput {
  text: string;
  voiceId?: string;
}

/** Returns raw MP3 audio bytes for the given text. */
export async function synthesizeSpeech({
  text,
  voiceId,
}: SynthesizeSpeechInput): Promise<ArrayBuffer> {
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    throw new Error("ELEVENLABS_API_KEY is not configured.");
  }

  const resolvedVoiceId = voiceId ?? process.env.ELEVENLABS_VOICE_ID;
  if (!resolvedVoiceId) {
    throw new Error("No ElevenLabs voice ID configured.");
  }

  const response = await fetch(`${ELEVENLABS_API_URL}/${resolvedVoiceId}`, {
    method: "POST",
    headers: {
      "xi-api-key": apiKey,
      "Content-Type": "application/json",
      Accept: "audio/mpeg",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_turbo_v2_5",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`ElevenLabs request failed (${response.status}): ${detail}`);
  }

  return response.arrayBuffer();
}
