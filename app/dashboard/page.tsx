'use client'

import Link from 'next/link'

const steps = [
  {
    step: '01',
    title: 'Upload Resume',
    desc: 'Upload your PDF resume and select your target job role.',
    icon: '📤',
    color: 'from-indigo-500 to-indigo-600',
    link: '/dashboard/upload',
  },
  {
    step: '02',
    title: 'AI Analysis',
    desc: 'Get ATS score, strengths, weaknesses, and keyword gaps.',
    icon: '🧠',
    color: 'from-violet-500 to-indigo-500',
  },
  {
    step: '03',
    title: 'Skill Match',
    desc: 'See skill match %, missing skills, and role alignment.',
    icon: '📊',
    color: 'from-sky-500 to-violet-500',
  },
  {
    step: '04',
    title: 'Resume Builder',
    desc: 'Rewrite & edit your resume using ATS-friendly templates.',
    icon: '✍️',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    step: '05',
    title: 'Download PDF',
    desc: 'Download a professional, job-ready resume instantly.',
    icon: '⬇️',
    color: 'from-green-500 to-emerald-600',
  },
]

export default function DashboardHome() {
  return (
    <div className="space-y-12">

      {/* 🔹 HERO */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-800 leading-tight">
          Build an ATS-Optimized Resume with AI 🚀
        </h1>

        <p className="text-slate-600 max-w-2xl">
          Upload once. Let AI analyze, rewrite, and generate a
          professional resume tailored to your job role.
        </p>
      </section>

      {/* 🔹 STEP FLOW */}
      <section className="relative">
        <div className="grid md:grid-cols-5 gap-6">

          {steps.map((s, i) => (
            <div
              key={i}
              className="relative group opacity-0 animate-stepFadeUp"
              style={{ animationDelay: `${i * 0.15}s` }}
            >
              {/* Card */}
              <div
                className="h-full bg-white border border-slate-200 rounded-2xl p-6
                           shadow-sm hover:shadow-lg transition-all duration-300
                           hover:-translate-y-1"
              >
                {/* Step badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-slate-500">
                    STEP {s.step}
                  </span>

                  <div
                    className={`w-9 h-9 rounded-full bg-gradient-to-br ${s.color}
                                flex items-center justify-center text-white text-lg`}
                  >
                    {s.icon}
                  </div>
                </div>

                {/* Content */}
                <h3 className="font-semibold text-slate-800 mb-2">
                  {s.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {s.desc}
                </p>

                {/* CTA */}
                {s.link && (
                  <Link
                    href={s.link}
                    className="inline-block mt-4 text-sm font-medium text-indigo-600
                               hover:text-indigo-700"
                  >
                    Start here →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 🔹 PRIMARY CTA */}
      <section className="flex items-center gap-4">
        <Link
          href="/dashboard/upload"
          className="bg-indigo-600 hover:bg-indigo-700 text-white
                     px-7 py-3 rounded-xl font-semibold shadow-md transition"
        >
          Upload Resume
        </Link>

        <span className="text-sm text-slate-500">
          Takes less than 30 seconds
        </span>
      </section>
    </div>
  )
}
