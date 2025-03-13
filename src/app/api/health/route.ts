import { healthCheck } from "@/backend/db";
import { NextResponse } from "next/server";
export const dynamic = "force-dynamic";

export async function GET(): Promise<NextResponse> {
  const dbStatus = await healthCheck();
  const overallStatus = dbStatus;

  if (overallStatus) {
    return NextResponse.json(
      {
        ts: new Date().toISOString(),
        status: "ok",
        cat: "(^._.^)ﾉ",
      },
      {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      }
    );
  }
  return NextResponse.json(
    {
      ts: new Date().toISOString(),
      status: "error",
      cat: "(=ｘェｘ=)",
    },
    {
      status: 500,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    }
  );
}
