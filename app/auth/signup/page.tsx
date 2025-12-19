'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function SignupPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleSignup = async () => {
    setLoading(true)
    setError('')
    setMessage('')

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      setMessage(
        'Account created! Please check your email to confirm.'
      )
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-indigo-600">
          Create Account
        </h1>

        <p className="text-sm text-slate-500 text-center mt-2">
          Start analyzing resumes with AI
        </p>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {error}
          </p>
        )}

        {message && (
          <p className="text-green-600 text-sm mt-4 text-center">
            {message}
          </p>
        )}

        <div className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Email address"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password (min 6 chars)"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </div>

        <p className="text-sm text-center text-slate-500 mt-6">
          Already have an account?{' '}
          <Link
            href="/auth/login"
            className="text-indigo-600 font-medium hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
