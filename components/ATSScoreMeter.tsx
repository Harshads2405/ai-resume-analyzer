'use client'

type ATSScoreMeterProps = {
  score: number
  label?: string
  color?: 'indigo' | 'emerald' | 'green'
}

export default function ATSScoreMeter({
  score,
  label = 'Score',
  color = 'indigo',
}: ATSScoreMeterProps) {
  // ✅ Tailwind-safe color handling
  const barColor =
    score >= 75
      ? color === 'emerald'
        ? 'bg-emerald-500'
        : color === 'green'
        ? 'bg-green-500'
        : 'bg-indigo-500'
      : score >= 50
      ? 'bg-yellow-400'
      : 'bg-red-500'

  const statusText =
    score >= 75
      ? 'Excellent Match'
      : score >= 50
      ? 'Average Match'
      : 'Poor Match'

  return (
    <div className="rounded-xl bg-white border border-slate-200 p-5 shadow-sm">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold text-slate-700">
          {label}
        </h3>
        <span className="font-bold text-slate-800">
          {score}%
        </span>
      </div>

      <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
        <div
          className={`h-full ${barColor} transition-all duration-700`}
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="mt-2 text-sm text-slate-600">
        {statusText}
      </p>
    </div>
  )
}
