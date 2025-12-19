'use client'

type ResumeData = {
  summary: string
  experience: string[]
  projects: string[]
  skills: string[]
}

export default function ResumeTemplateClassic({
  data,
  name,
}: {
  data: ResumeData
  name: string
}) {
  return (
    <div className="space-y-4 text-slate-800">

      {/* Header */}
      <div className="border-b pb-2">
        <h2 className="text-xl font-bold uppercase">
          {name}
        </h2>
        <p className="mt-1 text-sm text-slate-600">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-1">
          Work Experience
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {data.experience.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-1">
          Projects
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {data.projects.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Skills */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-1">
          Skills
        </h3>
        <p className="text-sm">
          {data.skills.join(', ')}
        </p>
      </section>

    </div>
  )
}
