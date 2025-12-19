'use client'

import Link from 'next/link'

export default function RewritePreview({
  data,
  resumeId,
}: {
  data: any
  resumeId: string
}) {
  return (
    <div className="bg-white border rounded-xl shadow-sm p-6 space-y-6">

      <Section title="Professional Summary">
        <p>{data.summary}</p>
      </Section>

      <Section title="Experience">
        <ul className="list-disc pl-5 space-y-1">
          {data.experience?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Projects">
        <ul className="list-disc pl-5 space-y-1">
          {data.projects?.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </Section>

      <Section title="Skills">
        <div className="flex flex-wrap gap-2">
          {data.skills?.map((skill: string, i: number) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </Section>

      <Link
        href={`/dashboard/builder?resumeId=${resumeId}`}
        className="inline-block mt-4 bg-indigo-600 text-white px-5 py-2 rounded-lg"
      >
        Edit & Build Resume
      </Link>
    </div>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h3 className="font-semibold text-slate-700 mb-2">
        {title}
      </h3>
      <div className="text-sm text-slate-600">{children}</div>
    </div>
  )
}
