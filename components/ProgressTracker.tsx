'use client'

type Step = {
  id: number
  label: string
}

const steps: Step[] = [
  { id: 1, label: 'Upload' },
  { id: 2, label: 'Analysis' },
  { id: 3, label: 'Skill Match' },
  { id: 4, label: 'Builder' },
  { id: 5, label: 'Download' },
]

export default function ProgressTracker({
  currentStep,
}: {
  currentStep: number
}) {
  return (
    <div className="flex items-center justify-between mb-8">

      {steps.map((step, index) => {
        const isCompleted = step.id < currentStep
        const isActive = step.id === currentStep

        return (
          <div key={step.id} className="flex items-center w-full">

            {/* Circle */}
            <div className="relative z-10">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center
                text-sm font-semibold transition-all duration-300
                ${
                  isCompleted
                    ? 'bg-emerald-500 text-white'
                    : isActive
                    ? 'bg-indigo-600 text-white scale-110 shadow-md'
                    : 'bg-slate-200 text-slate-500'
                }`}
              >
                {isCompleted ? '✓' : step.id}
              </div>

              <p
                className={`mt-2 text-xs text-center whitespace-nowrap
                ${
                  isActive
                    ? 'text-indigo-600 font-medium'
                    : 'text-slate-500'
                }`}
              >
                {step.label}
              </p>
            </div>

            {/* Line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-1 h-1 mx-2 rounded transition-all duration-500
                ${
                  isCompleted
                    ? 'bg-emerald-400'
                    : 'bg-slate-200'
                }`}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
