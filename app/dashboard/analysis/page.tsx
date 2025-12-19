'use client'

import { useSearchParams } from 'next/navigation'
import AnalysisStream from '@/components/AnalysisStream'
import Link from 'next/link'

export default function AnalysisPage() {
  const searchParams = useSearchParams()
  const resumeId = searchParams.get('resumeId')

  if (!resumeId) {
    return (
      <p className="text-red-500">
        Resume ID missing. Please upload resume again.
      </p>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold">Resume Analysis</h1>

      {/* ✅ PASS resumeId */}
      <AnalysisStream resumeId={resumeId} />

      <Link
        href={`/dashboard/rewrite?resumeId=${resumeId}`}
        className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg"
      >
        Rewrite Resume with AI
      </Link>
    </div>
  )
}
