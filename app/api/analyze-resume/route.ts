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
  {
    auth: { persistSession: false },
  }
)

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

    // 2️⃣ STRICT PROMPT
    const prompt = `
Return ONLY valid JSON.
Do NOT add explanations.
Do NOT wrap in markdown.

JSON format ONLY:

{
  "atsScore": number,
  "skillMatchPercentage": number,
  "matchedSkills": string[],
  "missingSkills": string[],
  "strengths": string[],
  "weaknesses": string[],
  "suggestions": string[]
}

JOB ROLE:
${data.job_role}

RESUME:
${data.resume_text}
`

    // 3️⃣ Groq call
    const completion = await groq.chat.completions.create({
      model: 'llama-3.1-8b-instant',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0,
      max_tokens: 700,
    })

    let raw = completion.choices[0]?.message?.content

    if (!raw) {
      return new Response('Empty AI response', { status: 500 })
    }

    // 4️⃣ CLEAN AI OUTPUT (IMPORTANT)
    raw = raw
      .replace(/```json/gi, '')
      .replace(/```/g, '')
      .trim()

    // 5️⃣ SAFE PARSE
    let parsed
    try {
      parsed = JSON.parse(raw)
    } catch (err) {
      console.error('❌ AI JSON PARSE FAILED')
      console.error(raw)
      return new Response(
        JSON.stringify({ error: 'Invalid AI JSON response' }),
        { status: 500 }
      )
    }

    // 6️⃣ SUCCESS
    return new Response(JSON.stringify(parsed), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err: any) {
    console.error('🔥 Analyze Resume Fatal Error:', err)
    return new Response('Server error', { status: 500 })
  }
}
