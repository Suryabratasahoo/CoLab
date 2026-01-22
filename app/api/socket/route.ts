import { NextResponse } from "next/server"
import { initSocket } from "@/lib/initSocket"

export async function GET(req: Request) {
  // @ts-ignore
  initSocket((req as any).res)

  return NextResponse.json({ success: true })
}
