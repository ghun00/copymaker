'use client'

type GoalChipsProps = {
  onSelect: (goal: string) => void
  disabled?: boolean
}

const goals = [
  '신청/예약 받기(설명회·상담·신청서)',
  '구매/결제 유도하기',
  '다시 오게 만들기(재방문/복귀)',
]

export default function GoalChips({ onSelect, disabled = false }: GoalChipsProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center mb-6">
      {goals.map((goal, index) => (
        <button
          key={index}
          type="button"
          disabled={disabled}
          onClick={() => onSelect(goal)}
          className="flex items-center justify-center px-4 py-3 relative rounded-[32px] shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div
            aria-hidden="true"
            className="absolute border border-[#b7b9c9] border-solid inset-0 pointer-events-none rounded-[32px] transition-colors duration-200 group-hover:border-[#ff5c00] group-hover:bg-[#fff5f0]"
          />
          <p className="font-normal leading-[1.4] relative shrink-0 text-[#626474] text-base whitespace-nowrap transition-colors duration-200 group-hover:text-[#ff5c00]">
            {goal}
          </p>
        </button>
      ))}
    </div>
  )
}

