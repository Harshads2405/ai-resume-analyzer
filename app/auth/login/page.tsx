'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async () => {
    setLoading(true)
    setError('')

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
    } else {
      router.push('/dashboard')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-semibold text-center text-indigo-600">
          AI Resume Analyzer
        </h1>

        <p className="text-sm text-slate-500 text-center mt-2">
          Sign in to continue
        </p>

        {error && (
          <p className="text-red-500 text-sm mt-4 text-center">
            {error}
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
            placeholder="Password"
            className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-indigo-500 outline-none text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>
        </div>

        <p className="text-sm text-center text-slate-500 mt-6">
          Don’t have an account?{' '}
          <Link
            href="/auth/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
