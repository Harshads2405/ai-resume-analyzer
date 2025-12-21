'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import RewritePreview from '@/components/RewritePreview'

export default function RewriteClient() {
  const searchParams = useSearchParams()
  const resumeId = searchParams.get('resumeId')

  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!resumeId) {
      setError('Resume ID missing.')
      setLoading(false)
      return
    }

    const rewrite = async () => {
      try {
        const res = await fetch('/api/rewrite-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeId }),
        })

        if (!res.ok) {
          const text = await res.text()
          console.error('Rewrite API error:', text)
          setError('Failed to rewrite resume.')
          return
        }

        const json = await res.json()
        setData(json)
      } catch (err) {
        console.error(err)
        setError('Something went wrong.')
      } finally {
        setLoading(false)
      }
    }

    rewrite()
  }, [resumeId])

  /* ---------------- UI STATES ---------------- */

  if (loading) {
    return (
      <p className="text-slate-500">
        Rewriting resume with AI…
      </p>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700 text-sm">
        ❌ {error}
      </div>
    )
  }

  if (!data || !resumeId) {
    return (
      <p className="text-red-500">
        Failed to rewrite resume.
      </p>
    )
  }

  /* ---------------- MAIN UI ---------------- */

  return <RewritePreview data={data} resumeId={resumeId} />
}
