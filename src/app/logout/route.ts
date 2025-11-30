"use server";

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/src/utils/supabase/server";

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  await supabase.auth.signOut();
  return NextResponse.json({ success: true });
}
