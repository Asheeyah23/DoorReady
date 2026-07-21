import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/** GET /api/citations?applicationId=... — every cited rule explanation for an application. */
export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const applicationId = request.nextUrl.searchParams.get("applicationId");

  if (!applicationId) {
    return NextResponse.json({ error: "applicationId is required." }, { status: 400 });
  }

  const { data, error } = await supabase
    .from("rule_citations")
    .select("*")
    .eq("application_id", applicationId)
    .order("created_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ citations: data });
}
