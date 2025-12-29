'use client'

import Image from 'next/image'

type ResultCard = {
  id: string
  title: string
  content: string
  type: 'informative' | 'benefit-focused' | 'problem-solving'
}

type ResultsCardsProps = {
  results: ResultCard[]
  onSave: (resultId: string) => void
  onRetry?: () => void
}

export default function ResultsCards({ results, onSave, onRetry }: ResultsCardsProps) {
  const getCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours()
    const minutes = now.getMinutes()
    const period = hours >= 12 ? 'pm' : 'am'
    const displayHours = hours > 12 ? hours - 12 : hours === 0 ? 12 : hours
    return `${displayHours}:${minutes.toString().padStart(2, '0')} ${period}`
  }

  return (
    <div className="w-full mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {results.map((result, index) => (
          <div
            key={result.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 relative shrink-0">
                  <Image
                    src="/logoSymbol.png"
                    alt="Logo"
                    fill
                    className="object-contain"
                    sizes="20px"
                    unoptimized
                  />
                </div>
                <span className="text-sm font-medium text-gray-600">
                  AI 추천 {index + 1}
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
                <span className="text-xs text-gray-500">{getCurrentTime()}</span>
              </div>
            </div>

            {/* 콘텐츠 영역 */}
            <div className="flex-1 px-5 py-5">
              <div className="space-y-5">
                {/* 타이틀 */}
                <div>
                  <h3 className="text-base font-semibold text-gray-900 leading-snug">
                    {result.title}
                  </h3>
                </div>

                {/* 내용 */}
                <div>
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {result.content}
                  </p>
                </div>
              </div>
            </div>

            {/* 저장 버튼 */}
            <div className="px-5 pb-5 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={() => onSave(result.id)}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 rounded-md text-sm font-medium transition-colors duration-200"
              >
                저장하고 사용하기
              </button>
            </div>
          </div>
        ))}
      </div>

      {onRetry && (
        <div className="flex justify-center mt-8">
          <button
            type="button"
            onClick={onRetry}
            className="px-6 py-2.5 border border-gray-300 rounded-md text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-200"
          >
            다시 만들기
          </button>
        </div>
      )}
    </div>
  )
}
