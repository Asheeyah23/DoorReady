import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { synthesizeSpeech } from "@/lib/elevenlabs";

/**
 * POST /api/voice
 * Reads back text DoorReady already generated and showed on screen —
 * a rule explanation or packet summary. No new content is created here;
 * this route only converts existing cited text to speech.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { applicationId, text } = await request.json();

  if (!applicationId || !text) {
    return NextResponse.json({ error: "applicationId and text are required." }, { status: 400 });
  }

  const { data: voiceRequest } = await supabase
    .from("voice_requests")
    .insert({ application_id: applicationId, source_text: text, status: "queued" })
    .select()
    .single();

  try {
    const audioBuffer = await synthesizeSpeech({ text });
    const storagePath = `voice/${applicationId}/${voiceRequest.id}.mp3`;

    await supabase.storage
      .from("household-documents")
      .upload(storagePath, Buffer.from(audioBuffer), { contentType: "audio/mpeg" });

    const { data: signed } = await supabase.storage
      .from("household-documents")
      .createSignedUrl(storagePath, 3600);

    await supabase
      .from("voice_requests")
      .update({ status: "ready", audio_url: signed?.signedUrl })
      .eq("id", voiceRequest.id);

    return NextResponse.json({ audioUrl: signed?.signedUrl });
  } catch (err) {
    await supabase.from("voice_requests").update({ status: "failed" }).eq("id", voiceRequest.id);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Voice synthesis failed." },
      { status: 502 }
    );
  }
}
