'use client'

import ChatAgent from '@/components/ChatAgent'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function AgentContent() {
  const searchParams = useSearchParams()
  const goal = searchParams.get('goal')

  return (
    <main className="min-h-screen bg-white relative">
      <ChatAgent initialGoal={goal || undefined} />
    </main>
  )
}

export default function AgentPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-white relative">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <p className="text-[#626474]">로딩 중...</p>
          </div>
        </div>
      </main>
    }>
      <AgentContent />
    </Suspense>
  )
}

