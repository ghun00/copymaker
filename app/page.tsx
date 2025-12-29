'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  const purposes = [
    {
      label: '신청/예약 받기(설명회·상담·신청서)',
    },
    {
      label: '구매/결제 유도하기',
    },
    {
      label: '다시 오게 만들기(재방문/복귀)',
    },
  ]

  const handlePurposeClick = (purpose: string) => {
    const encodedGoal = encodeURIComponent(purpose)
    router.push(`/agent?goal=${encodedGoal}`)
  }

  const categories = [
    { label: '전체', active: true },
    { label: '설명회' },
    { label: '클래스 홍보' },
    { label: '이벤트 / 프로모션' },
    { label: '기타' },
  ]

  return (
    <main className="min-h-screen bg-white relative">
      {/* Main Content */}
      <div className="max-w-[1440px] mx-auto px-4 md:px-[276px] pt-12 md:pt-[164px] pb-20">
        {/* Main Title */}
        <div className="flex flex-col gap-8 md:gap-[60px] items-center mb-12 md:mb-[164px]">
          <h1 className="text-xl md:text-[32px] leading-[1.5] font-bold text-[#353644] text-center">
            <p className="mb-0">전환율 높은 광고 문자 내용을</p>
            <p>정말 쉽게 만들어보세요</p>
          </h1>

          {/* Purpose Selection Buttons & Text Area */}
          <div className="flex flex-col gap-4 items-start w-full max-w-[888px]">
            {/* Purpose Selection Buttons */}
            <div className="flex flex-wrap gap-3 items-center w-full">
              {purposes.map((purpose, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handlePurposeClick(purpose.label)}
                  className="flex items-center justify-center px-4 py-3 relative rounded-[32px] shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group"
                >
                  <div
                    aria-hidden="true"
                    className="absolute border border-[#b7b9c9] border-solid inset-0 pointer-events-none rounded-[32px] transition-colors duration-200 group-hover:border-[#ff5c00] group-hover:bg-[#fff5f0]"
                  />
                  <p className="font-normal leading-[1.4] relative shrink-0 text-[#626474] text-base whitespace-nowrap transition-colors duration-200 group-hover:text-[#ff5c00]">
                    {purpose.label}
                  </p>
                </button>
              ))}
            </div>

            {/* Text Input Area */}
            <div className="h-[120px] relative rounded-[16px] w-full">
              <div
                aria-hidden="true"
                className="absolute border border-[#b7b9c9] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.1)]"
              />
              <div className="w-full h-full relative">
                <div className="flex gap-2.5 items-start p-4 h-full">
                  <a
                    href="https://youtu.be/sXRK3KKyKhw?si=WaK__wiaGLAsFHT9"
                    className="block font-normal leading-[1.4] grow min-h-px min-w-0 relative shrink text-[#9395a6] text-base md:text-[20px] break-words"
                  >
                    <p className="cursor-pointer mb-0 break-words">
                      어떤 목적으로 문자를 보내시나요? (위에서 선택해주세요)
                    </p>
                  </a>
                  {/* Send Button */}
                  <button
                    className="absolute bg-[#e4e6f0] flex items-center justify-center p-2 rounded-[99px] top-[72px] right-4 w-8 h-8 transition-all duration-200 hover:bg-[#ff5c00] hover:scale-110 active:scale-95 shadow-sm hover:shadow-md"
                    aria-label="전송"
                  >
                    <svg
                      className="block w-4 h-4 transition-transform duration-200"
                      fill="none"
                      viewBox="0 0 16 16"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <g>
                        <path
                          d="M8 12.6667V3.33333"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                        <path
                          d="M3.33334 8L12.6667 8"
                          stroke="white"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.33333"
                        />
                      </g>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Templates Section */}
        <div className="flex flex-col gap-4 items-center mt-12 md:mt-[164px]">
          <h2 className="text-xl md:text-[28px] leading-[1.5] font-bold text-[#353644] text-center">
            추천 템플릿
          </h2>
          <p className="text-base md:text-[20px] leading-[1.4] font-normal text-[#353644] text-center px-4">
            다양한 템플릿 중 원장님에게 맞는 템플릿을 골라 사용해보세요
          </p>

          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 items-center justify-center mt-4">
            {categories.map((category, index) => (
              <button
                key={index}
                type="button"
                className={`flex items-center justify-center px-4 py-3 relative rounded-lg shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group ${
                  category.active ? '' : 'hover:border-[#ff5c00]'
                }`}
              >
                <div
                  aria-hidden="true"
                  className={`absolute border border-solid inset-0 pointer-events-none rounded-lg transition-all duration-200 ${
                    category.active
                      ? 'border-[#ff5c00] bg-[#fff5f0]'
                      : 'border-[#b7b9c9] group-hover:border-[#ff5c00] group-hover:bg-[#fff5f0]'
                  }`}
                />
                <p
                  className={`font-normal leading-[1.4] relative shrink-0 text-base whitespace-nowrap transition-colors duration-200 ${
                    category.active
                      ? 'text-[#ff5c00] font-semibold'
                      : 'text-[#626474] font-normal group-hover:text-[#ff5c00]'
                  }`}
                >
                  {category.label}
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

