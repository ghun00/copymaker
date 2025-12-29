'use client'

import ChatAgent from '@/components/ChatAgent'
import { useSearchParams } from 'next/navigation'

export default function AgentPage() {
  const searchParams = useSearchParams()
  const goal = searchParams.get('goal')

  return (
    <main className="min-h-screen bg-white relative">
      <ChatAgent initialGoal={goal || undefined} />
    </main>
  )
}

