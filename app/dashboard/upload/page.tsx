// 'use client'

// import { useState } from 'react'
// import { useRouter } from 'next/navigation'
// import { supabase } from '@/lib/supabaseClient'

// export default function UploadPage() {
//   const [file, setFile] = useState<File | null>(null)
//   const [jobRole, setJobRole] = useState('')
//   const [loading, setLoading] = useState(false)

//   const router = useRouter()

//   const handleUpload = async () => {
//     if (!file || !jobRole) {
//       alert('Please upload resume and enter job role')
//       return
//     }

//     setLoading(true)

//     const {
//       data: { user },
//       error: userError,
//     } = await supabase.auth.getUser()

//     if (!user || userError) {
//       alert('You must be logged in')
//       setLoading(false)
//       return
//     }

//     const filePath = `${user.id}/${Date.now()}-${file.name}`

//     const { error: uploadError } = await supabase.storage
//       .from('resumes')
//       .upload(filePath, file, {
//         contentType: 'application/pdf',
//       })

//     if (uploadError) {
//       alert(uploadError.message)
//       setLoading(false)
//       return
//     }

//     const { data: resume, error: dbError } = await supabase
//       .from('resumes')
//       .insert({
//         user_id: user.id,
//         job_role: jobRole,
//         file_url: filePath,
//         resume_text: null,
//       })
//       .select()
//       .single()

//     if (dbError) {
//       alert(dbError.message)
//       setLoading(false)
//       return
//     }

//     await fetch('/api/extract-resume-text', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         filePath,
//         resumeId: resume.id,
//       }),
//     })

//     setLoading(false)
//     router.push(`/dashboard/analysis?resumeId=${resume.id}`)
//   }

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-indigo-50 px-4">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 space-y-6">
        
//         <div className="text-center space-y-2">
//           <h1 className="text-2xl font-bold text-slate-900">
//             Upload Your Resume
//           </h1>
//           <p className="text-slate-500 text-sm">
//             Upload your resume and get AI-powered insights instantly
//           </p>
//         </div>

//         {/* File Upload */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-slate-700">
//             Resume (PDF only)
//           </label>
//           <div className="border-2 border-dashed border-indigo-200 rounded-xl p-4 text-center hover:border-indigo-400 transition">
//             <input
//               type="file"
//               accept="application/pdf"
//               className="hidden"
//               id="resume-upload"
//               onChange={(e) => setFile(e.target.files?.[0] || null)}
//             />
//             <label
//               htmlFor="resume-upload"
//               className="cursor-pointer flex flex-col items-center gap-2"
//             >
//               <span className="text-indigo-600 font-medium">
//                 {file ? file.name : 'Click to upload PDF'}
//               </span>
//               <span className="text-xs text-slate-400">
//                 Max size: 5MB
//               </span>
//             </label>
//           </div>
//         </div>

//         {/* Job Role */}
//         <div className="space-y-2">
//           <label className="text-sm font-medium text-slate-700">
//             Target Job Role
//           </label>
//           <input
//             className="w-full rounded-xl border border-slate-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 text-black"
//             placeholder="e.g. Java Developer"
//             value={jobRole}
//             onChange={(e) => setJobRole(e.target.value)}
//           />
//         </div>

//         {/* Button */}
//         <button
//           onClick={handleUpload}
//           disabled={loading}
//           className="w-full rounded-xl bg-indigo-600 text-white py-3 font-medium hover:bg-indigo-700 transition disabled:opacity-60"
//         >
//           {loading ? 'Uploading & Analyzing...' : 'Upload & Analyze Resume'}
//         </button>

//         {/* Footer */}
//         <p className="text-xs text-center text-slate-400">
//           Your resume is securely processed and never shared
//         </p>
//       </div>
//     </div>
//   )
// }

import { Suspense } from 'react'
import UploadClient from './UploadClient'

export default function UploadPage() {
  return (
    <Suspense fallback={<p className="text-slate-500">Loading upload…</p>}>
      <UploadClient />
    </Suspense>
  )
}
