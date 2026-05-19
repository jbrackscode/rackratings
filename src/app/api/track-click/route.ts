import { NextRequest, NextResponse } from "next/server"
import { appendFileSync, mkdirSync } from "fs"
import { join } from "path"

export async function POST(request: NextRequest) {
  try {
    const { url, product, category, source } = await request.json()

    if (!url) {
      return NextResponse.json({ ok: false }, { status: 400 })
    }

    const click = {
      timestamp: new Date().toISOString(),
      url,
      product: product ?? null,
      category: category ?? null,
      source: source ?? null,
      referrer: request.headers.get("referer") ?? null,
    }

    const dataDir = join(process.cwd(), "data")
    mkdirSync(dataDir, { recursive: true })
    appendFileSync(join(dataDir, "clicks.ndjson"), JSON.stringify(click) + "\n", "utf8")

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
