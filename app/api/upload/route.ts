import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { DocumentCategory } from "@/types";

/**
 * POST /api/upload
 * Accepts a household document, stores it in Supabase Storage, and creates
 * a `documents` row with status "processing". Extraction/analysis happens
 * separately in /api/analyze so upload stays fast and resumable.
 */
export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const applicationId = formData.get("applicationId") as string | null;
  const category = formData.get("category") as DocumentCategory | null;

  if (!file || !applicationId || !category) {
    return NextResponse.json(
      { error: "file, applicationId, and category are required." },
      { status: 400 }
    );
  }

  const storagePath = `${user.id}/${applicationId}/${Date.now()}-${file.name}`;

  const { error: uploadError } = await supabase.storage
    .from("household-documents")
    .upload(storagePath, file);

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  const { data, error: insertError } = await supabase
    .from("documents")
    .insert({
      application_id: applicationId,
      category,
      file_name: file.name,
      storage_path: storagePath,
      status: "processing",
    })
    .select()
    .single();

  if (insertError) {
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  await supabase.from("activity_logs").insert({
    application_id: applicationId,
    actor: user.id,
    action: "document_uploaded",
    detail: file.name,
  });

  return NextResponse.json({ document: data }, { status: 201 });
}
