import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

// ✅ IMPORTANT: use internal parser, NOT main entry
const pdfParse = require('pdf-parse/lib/pdf-parse.js')

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: { persistSession: false }
  }
)

export async function POST(req: Request) {
  try {
    const { resumeId, filePath } = await req.json()

    if (!resumeId || !filePath) {
      return new Response('Missing resumeId or filePath', { status: 400 })
    }

    // 1️⃣ Download PDF
    const { data, error } = await supabase
      .storage
      .from('resumes')
      .download(filePath)

    if (error || !data) {
      console.error(error)
      return new Response('PDF download failed', { status: 500 })
    }

    const buffer = Buffer.from(await data.arrayBuffer())

    // 2️⃣ Extract text (SAFE)
    const parsed = await pdfParse(buffer)
    const text = parsed.text?.replace(/\s+/g, ' ').trim()

    if (!text || text.length < 50) {
      return new Response('No readable text extracted', { status: 400 })
    }

    // 3️⃣ Save to DB
    const { data: updated, error: updateError } = await supabase
      .from('resumes')
      .update({ resume_text: text })
      .eq('id', resumeId)
      .select()

    if (updateError) {
      console.error(updateError)
      return new Response('DB update failed', { status: 500 })
    }

    if (!updated || updated.length === 0) {
      return new Response('No rows updated (RLS)', { status: 500 })
    }

    return new Response('Resume text extracted successfully')
  } catch (err: any) {
    console.error(err)
    return new Response(err.message, { status: 500 })
  }
}
