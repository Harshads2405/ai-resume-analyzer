'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import Link from 'next/link'
import ProgressTracker from '@/components/ProgressTracker'


type Resume = {
  id: string
  job_role: string
  uploaded_at: string
}

export default function ResumeHistoryPage() {
  const [resumes, setResumes] = useState<Resume[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) return

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

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">
        Resume History
      </h1>

      <p className="text-slate-500">
        View all your previously uploaded resumes and analysis.
      </p>

      {loading && (
        <p className="text-slate-400">Loading history...</p>
      )}

      {!loading && resumes.length === 0 && (
        <div className="border rounded-xl p-6 text-center text-slate-500 bg-white">
          No resumes uploaded yet.
        </div>
      )}

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
    </div>
  )
}
