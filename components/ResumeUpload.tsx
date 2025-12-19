'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function ResumeUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [jobRole, setJobRole] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpload = async () => {
    if (!file || !jobRole) {
      alert('Please upload resume and enter job role')
      return
    }

    setLoading(true)

    // ✅ Get logged-in user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('You must be logged in')
      setLoading(false)
      return
    }

    // ✅ Upload PDF to Supabase Storage
    const filePath = `${user.id}/${Date.now()}-${file.name}`

    const { error: uploadError } = await supabase.storage
      .from('resumes')
      .upload(filePath, file, {
        contentType: 'application/pdf',
      })

    if (uploadError) {
      alert(uploadError.message)
      setLoading(false)
      return
    }

    // ✅ Save DB record
    const { data: resume, error: dbError } = await supabase
      .from('resumes')
      .insert({
        user_id: user.id,
        file_url: filePath,
        job_role: jobRole,
      })
      .select()
      .single()

    if (dbError) {
      alert(dbError.message)
      setLoading(false)
      return
    }

    setLoading(false)

    // ✅ Redirect to analysis
    router.push(`/dashboard/analysis?resumeId=${resume.id}`)
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />

      <input
        className="border p-2 w-full"
        placeholder="Target Job Role (e.g. Backend Developer)"
        value={jobRole}
        onChange={(e) => setJobRole(e.target.value)}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="bg-black text-white px-4 py-2"
      >
        {loading ? 'Uploading...' : 'Upload Resume'}
      </button>
    </div>
  )
}
