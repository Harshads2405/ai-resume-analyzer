// 'use client'

// import { useEffect, useState } from 'react'
// import { useSearchParams } from 'next/navigation'
// import { supabase } from '@/lib/supabaseClient'
// import EditableResume from '@/components/EditableResume'
// import ResumeTemplateClassic from '@/components/ResumeTemplateClassic'
// import ResumeTemplateModern from '@/components/ResumeTemplateModern'
// import ProgressTracker from '@/components/ProgressTracker'


// type ResumeData = {
//   summary: string
//   experience: string[]
//   projects: string[]
//   skills: string[]
// }

// export default function BuilderPage() {
//   const searchParams = useSearchParams()
//   const resumeId = searchParams.get('resumeId')

//   const [template, setTemplate] = useState<'classic' | 'modern'>('modern')
//   const [data, setData] = useState<ResumeData | null>(null)
//   const [userName, setUserName] = useState('Your Name')
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const loadAll = async () => {
//       // 🔹 user
//       const { data: auth } = await supabase.auth.getUser()
//       const user = auth.user
//       setUserName(
//         user?.user_metadata?.full_name ||
//         user?.email?.split('@')[0] ||
//         'Your Name'
//       )

//       // 🔹 resume
//       if (!resumeId) return
//       const res = await fetch('/api/rewrite-resume', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ resumeId }),
//       })
//       const json = await res.json()
//       setData(json)
//       setLoading(false)
//     }

//     loadAll()
//   }, [resumeId])

//   if (loading) {
//     return <p className="text-slate-500">Loading resume builder…</p>
//   }

//   if (!data) return <p>Failed to load resume data.</p>

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-semibold text-black">
//         Resume Builder
//       </h1>

//       <div className="flex gap-4 text-black">
//         <button onClick={() => setTemplate('classic')}>Classic</button>
//         <button onClick={() => setTemplate('modern')}>Modern</button>
//       </div>

//       {/* Resume Preview */}
//       <EditableResume>
//         {template === 'classic' ? (
//           <ResumeTemplateClassic data={data} name={userName} />
//         ) : (
//           <ResumeTemplateModern data={data} name={userName} />
//         )}
//       </EditableResume>

//       {/* Action Bar */}
//       <div className="flex justify-end gap-4 pt-4 border-t">
//         <button
//           onClick={async () => {
//             const res = await fetch('/api/download-resume', {
//               method: 'POST',
//               headers: { 'Content-Type': 'application/json' },
//               body: JSON.stringify({
//                 name: userName,
//                 data,
//               }),
//             })

//             const blob = await res.blob()
//             const url = window.URL.createObjectURL(blob)

//             const a = document.createElement('a')
//             a.href = url
//             a.download = 'AI_Resume.pdf'
//             a.click()

//             window.URL.revokeObjectURL(url)
//           }}
          
//           className="bg-Forest Green-600 hover:bg-emerald-700 text-black px-6 py-2 rounded-lg font-medium shadow-sm "
//         >
//           ⬇ Download Resume (PDF)
//         </button>
//       </div>

//     </div>

//   )
// }


import { Suspense } from 'react'
import BuilderClient from './BuilderClient'

export default function BuilderPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-black">
        Resume Builder
      </h1>

      <Suspense
        fallback={
          <p className="text-slate-500">
            Loading resume builder…
          </p>
        }
      >
        <BuilderClient />
      </Suspense>
    </div>
  )
}
