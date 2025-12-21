'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'

type Resume = {
  id: string
  job_role: string
  uploaded_at: string
}

export default function HistoryClient() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setLoading(false)
        return
      }

      const { data, error } = await supabase
        .from('resumes')
        .select('id, job_role, uploaded_at')
        .eq('user_id', user.id)
        .order('uploaded_at', { ascending: false })

      if (!error && data) {
        setResumes(data)
      }

      setLoading(false)
    }

    fetchHistory()
  }, [])

  if (loading) {
    return <p className="text-slate-400">Loading history…</p>
  }

  if (resumes.length === 0) {
    return (
      <div className="border rounded-xl p-6 text-center text-slate-500 bg-white">
        No resumes uploaded yet.
      </div>
    )
  }

  return (
    <div className="grid gap-4">
      {resumes.map((resume) => (
        <div
          key={resume.id}
          className="bg-white border rounded-xl p-5 flex items-center justify-between hover:shadow-md transition"
        >
          <div>
            <h2 className="font-medium text-slate-800">
              {resume.job_role}
            </h2>

            <p className="text-sm text-slate-500">
              Uploaded on{' '}
              {new Date(resume.uploaded_at).toLocaleDateString()}
            </p>
          </div>

          <Link
            href={`/dashboard/analysis?resumeId=${resume.id}`}
            className="text-indigo-600 text-sm font-medium hover:underline"
          >
            View Analysis →
          </Link>
        </div>
      ))}
    </div>
  )
}
