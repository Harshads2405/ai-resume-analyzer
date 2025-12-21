'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import EditableResume from '@/components/EditableResume'
import ResumeTemplateClassic from '@/components/ResumeTemplateClassic'
import ResumeTemplateModern from '@/components/ResumeTemplateModern'

type ResumeData = {
  summary: string
  experience: string[]
  projects: string[]
  skills: string[]
}

export default function BuilderClient() {
  const searchParams = useSearchParams()
  const resumeId = searchParams.get('resumeId')

  const [template, setTemplate] = useState<'classic' | 'modern'>('modern')
  const [data, setData] = useState<ResumeData | null>(null)
  const [userName, setUserName] = useState('Your Name')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadAll = async () => {
      // 🔹 User
      const { data: auth } = await supabase.auth.getUser()
      const user = auth.user

      setUserName(
        user?.user_metadata?.full_name ||
          user?.email?.split('@')[0] ||
          'Your Name'
      )

      if (!resumeId) {
        setLoading(false)
        return
      }

      // 🔹 Resume rewrite
      const res = await fetch('/api/rewrite-resume', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId }),
      })

      const json = await res.json()
      setData(json)
      setLoading(false)
    }

    loadAll()
  }, [resumeId])

  if (loading) {
    return <p className="text-slate-500">Loading resume builder…</p>
  }

  if (!data) {
    return <p className="text-red-500">Failed to load resume data.</p>
  }

  return (
    <div className="space-y-6">

      {/* Template Switch */}
      <div className="flex gap-4">
        <button
          onClick={() => setTemplate('classic')}
          className={`px-4 py-2 rounded text-black ${
            template === 'classic'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-200'
          }`}
        >
          Classic
        </button>

        <button
          onClick={() => setTemplate('modern')}
          className={`px-4 py-2 rounded text-black ${
            template === 'modern'
              ? 'bg-indigo-600 text-white'
              : 'bg-slate-200'
          }`}
        >
          Modern
        </button>
      </div>

      {/* Resume Preview */}
      <EditableResume>
        {template === 'classic' ? (
          <ResumeTemplateClassic data={data} name={userName} />
        ) : (
          <ResumeTemplateModern data={data} name={userName} />
        )}
      </EditableResume>

      {/* Download Button */}
      <div className="flex justify-end pt-4 border-t">
        <button
          onClick={async () => {
            const res = await fetch('/api/download-resume', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ name: userName, data }),
            })

            const blob = await res.blob()
            const url = window.URL.createObjectURL(blob)

            const a = document.createElement('a')
            a.href = url
            a.download = 'AI_Resume.pdf'
            a.click()
            window.URL.revokeObjectURL(url)
          }}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg font-medium shadow-sm"
        >
          ⬇ Download Resume (PDF)
        </button>
      </div>
    </div>
  )
}
