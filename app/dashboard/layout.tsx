'use client'

import { ReactNode, useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabaseClient'
import ProgressTracker from '@/components/ProgressTracker'

export default function DashboardLayout({
  children,
}: {
  children: ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  const [userName, setUserName] = useState('')

  // 🔐 Auth check + user name
  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession()

      if (!data.session) {
        router.push('/auth/login')
        return
      }

      const user = data.session.user

      const name =
        user.user_metadata?.full_name ||
        user.email?.split('@')[0] ||
        'User'

      setUserName(name)
    }

    checkAuth()
  }, [router])

  // 🪜 Progress step based on route
  const getCurrentStep = () => {
    if (pathname.includes('/upload')) return 1
    if (pathname.includes('/analysis')) return 2
    if (pathname.includes('/rewrite')) return 3
    if (pathname.includes('/builder')) return 4
    if (pathname.includes('/history')) return 5
    return 1
  }

  const currentStep = getCurrentStep()

  // 🔗 Sidebar nav item
  const navItem = (href: string, label: string) => (
    <Link
      href={href}
      className={`block px-4 py-2 rounded-lg transition ${
        pathname === href
          ? 'bg-indigo-100 text-indigo-700 font-medium'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      {label}
    </Link>
  )

  const pageTitle =
    pathname.replace('/dashboard', '').replace('/', '') || 'Dashboard'

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* 📌 Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 p-6 hidden md:block">
        <h1 className="text-xl font-semibold text-indigo-600 mb-8">
          AI Resume Coach
        </h1>

        <nav className="space-y-2">
          {navItem('/dashboard', 'Dashboard')}
          {navItem('/dashboard/upload', 'Upload Resume')}
          {navItem('/dashboard/analysis', 'Resume Analysis')}
          {navItem('/dashboard/rewrite', 'AI Rewrite')}
          {navItem('/dashboard/builder', 'Resume Builder')}
          {navItem('/dashboard/history', 'Resume History')}
        </nav>
      </aside>

      {/* 📄 Main Section */}
      <div className="flex-1 flex flex-col">

        {/* 🔝 Top Bar */}
        <header className="bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <div>
            <p className="text-xs text-slate-500">Welcome back,</p>
            <h2 className="text-lg font-semibold text-slate-800 capitalize">
              {userName}
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-500 capitalize">
              {pageTitle}
            </span>

            <button
              onClick={async () => {
                await supabase.auth.signOut()
                router.push('/auth/login')
              }}
              className="text-sm text-red-500 hover:text-red-600"
            >
              Logout
            </button>
          </div>
        </header>

        {/* 🧩 Page Content */}
        <main className="p-6 space-y-6">

          {/* 🪜 Progress Tracker */}
          <ProgressTracker currentStep={currentStep} />

          {children}

        </main>
      </div>
    </div>
  )
}
