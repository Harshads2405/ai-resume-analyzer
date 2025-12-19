'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import RewritePreview from '@/components/RewritePreview'
import ProgressTracker from '@/components/ProgressTracker'


export default function RewritePage() {
  const searchParams = useSearchParams()
  const resumeId = searchParams.get('resumeId')

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!resumeId) return

    const rewrite = async () => {
      try {
        const res = await fetch('/api/rewrite-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeId }),
        })

        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    rewrite()
  }, [resumeId])

  if (loading) {
    return <p className="text-slate-500">Rewriting resume with AI…</p>
  }

  if (!data || !resumeId) {
    return <p className="text-red-500">Failed to rewrite resume.</p>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-slate-800">
        AI Resume Rewrite
      </h1>

      <RewritePreview data={data} resumeId={resumeId} />
    </div>
  )
}
