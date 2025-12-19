import { renderToBuffer } from '@react-pdf/renderer'
import ResumePDF from '@/components/ResumePDF'

export const runtime = 'nodejs'

export async function POST(req: Request) {
  try {
    const { name, data } = await req.json()

    if (!name || !data) {
      return new Response('Missing resume data', { status: 400 })
    }

    const pdfBuffer = await renderToBuffer(
      ResumePDF({ name, data })
    )

    // ✅ FIX IS HERE
    return new Response(new Uint8Array(pdfBuffer), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename=AI_Resume.pdf',
      },
    })
  } catch (err: any) {
    console.error('PDF Generation Error:', err)
    return new Response('Failed to generate PDF', { status: 500 })
  }
}
