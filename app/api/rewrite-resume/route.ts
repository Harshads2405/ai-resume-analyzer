import Groq from 'groq-sdk'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

// ---------- Groq Client ----------
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
})

// ---------- Supabase (Service Role) ----------
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { auth: { persistSession: false } }
)

// ---------- POST ----------
export async function POST(req: Request) {
  try {
    const { resumeId } = await req.json()

    if (!resumeId) {
      return new Response('Missing resumeId', { status: 400 })
    }

    // 1️⃣ Fetch resume
    const { data, error } = await supabase
      .from('resumes')
      .select('resume_text, job_role')
      .eq('id', resumeId)
      .single()

    if (error || !data?.resume_text) {
      return new Response('Resume text not found', { status: 404 })
    }

    // 2️⃣ STRICT ATS Rewrite Prompt
    const prompt = `
You are a professional ATS resume writer.

Rewrite the resume for the given job role.

Return ONLY valid JSON in this exact format:

{
  "summary": string,
  "experience": string[],
  "projects": string[],
  "skills": string[]
}

Rules:
- Use strong action verbs
- Optimize for ATS keywords
- Be concise and professional
- Quantify impact where possible
- No explanations
- No markdown
- No extra fields

JOB ROLE:
${data.job_role}

RESUME:
${data.resume_text}
`

    // 3️⃣ AI Call
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
      max_tokens: 900,
    })

    const raw = completion.choices[0]?.message?.content
    if (!raw) {
      return new Response('Empty AI response', { status: 500 })
    }

    // 4️⃣ Parse JSON safely
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch {
      console.error('Invalid JSON from AI:', raw)
      return new Response('Invalid AI JSON response', { status: 500 })
    }

    // 5️⃣ Return rewritten resume

    return new Response(
      JSON.stringify({
        resumeId,
        ...parsed,
      }),
      { headers: { 'Content-Type': 'application/json' } }
    )


  } catch (err: any) {
    console.error('Rewrite Resume Error:', err)
    return new Response('Groq error: ' + err.message, { status: 500 })
  }
}
