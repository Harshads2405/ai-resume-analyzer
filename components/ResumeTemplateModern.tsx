'use client'

type ResumeData = {
  summary: string
  experience: string[]
  projects: string[]
  skills: string[]
}

export default function ResumeTemplateModern({
  data,
  name,
}: {
  data: ResumeData
  name: string
}) {
  return (
    <div className="space-y-6 text-slate-800">

      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-indigo-700 capitalize">
          {name}
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          {data.summary}
        </p>
      </div>

      {/* Experience */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-2">
          Experience
        </h3>
        <ul className="list-disc pl-5 space-y-1 text-sm">
          {data.experience.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      {/* Projects */}
      <section>
        <h3 className="font-semibold text-slate-700 mb-2">
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
        <h3 className="font-semibold text-slate-700 mb-2">
          Skills
        </h3>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

    </div>
  )
}
