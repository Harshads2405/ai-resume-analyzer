'use client'

import { useEffect, useState } from 'react'
import ATSScoreMeter from './ATSScoreMeter'

type AnalysisData = {
  atsScore: number
  skillMatchPercentage: number
  matchedSkills: string[]
  missingSkills: string[]
  strengths: string[]
  weaknesses: string[]
  suggestions: string[]
}

export default function AnalysisStream({
  resumeId,
}: {
  resumeId: string | null
}) {
  const [data, setData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!resumeId) {
      setLoading(false)
      setError('Resume ID not found.')
      return
    }

    const analyze = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch('/api/analyze-resume', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ resumeId }),
        })

        // ❌ Backend error
        if (!res.ok) {
          const text = await res.text()
          setError(text || 'Failed to analyze resume.')
          setLoading(false)
          return
        }

        // ✅ Parse JSON safely
        const json = (await res.json()) as AnalysisData
        setData(json)
      } catch (err) {
        console.error('Analyze fetch error:', err)
        setError('Something went wrong while analyzing your resume.')
      } finally {
        setLoading(false)
      }
    }

    analyze()
  }, [resumeId])

  /* ---------------- LOADING ---------------- */
  if (loading) {
    return (
      <div className="flex items-center gap-3 text-indigo-600 animate-pulse">
        <div className="w-3 h-3 bg-indigo-500 rounded-full" />
        <p className="text-sm font-medium">
          Analyzing your resume using AI…
        </p>
      </div>
    )
  }

  /* ---------------- ERROR ---------------- */
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-xl p-5 text-red-700 text-sm">
        ❌ {error}
      </div>
    )
  }

  /* ---------------- EMPTY ---------------- */
  if (!data) {
    return (
      <p className="text-slate-400 text-sm">
        No analysis available.
      </p>
    )
  }

  /* ---------------- MAIN UI ---------------- */
  return (
    <div className="space-y-8">

      {/* Scores */}
      <div className="grid md:grid-cols-2 gap-6">
        <ATSScoreMeter
          label="ATS Score"
          score={data.atsScore}
          color="indigo"
        />
        <ATSScoreMeter
          label="Skill Match"
          score={data.skillMatchPercentage}
          color="emerald"
        />
      </div>

      {/* Skills */}
      <div className="grid md:grid-cols-2 gap-6">
        <SkillBox
          title="Matched Skills"
          skills={data.matchedSkills}
          type="success"
        />
        <SkillBox
          title="Missing Skills"
          skills={data.missingSkills}
          type="danger"
        />
      </div>

      {/* Strengths & Weaknesses */}
      <div className="grid md:grid-cols-2 gap-6">
        <ListBox title="Strengths" items={data.strengths} />
        <ListBox title="Weaknesses" items={data.weaknesses} />
      </div>

      {/* Suggestions */}
      {data.suggestions?.length > 0 && (
        <SuggestionBox items={data.suggestions} />
      )}
    </div>
  )
}

/* ---------- UI Components ---------- */

function SkillBox({
  title,
  skills,
  type,
}: {
  title: string
  skills: string[]
  type: 'success' | 'danger'
}) {
  const color =
    type === 'success'
      ? 'bg-green-100 text-green-700'
      : 'bg-red-100 text-red-700'

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-slate-700 mb-3">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, i) => (
          <span
            key={i}
            className={`px-3 py-1 text-xs rounded-full font-medium ${color}`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

function ListBox({
  title,
  items,
}: {
  title: string
  items: string[]
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
      <h3 className="font-semibold text-slate-700 mb-3">
        {title}
      </h3>
      <ul className="space-y-2 text-sm text-slate-600">
        {items.map((item, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-indigo-500">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SuggestionBox({ items }: { items: string[] }) {
  return (
    <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 shadow-sm">
      <h3 className="font-semibold text-indigo-700 mb-4">
        💡 AI Suggestions to Improve Your Resume
      </h3>

      <ul className="space-y-3 text-sm text-indigo-900">
        {items.map((item, i) => (
          <li key={i} className="flex gap-3">
            <span className="text-indigo-500">✔</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
