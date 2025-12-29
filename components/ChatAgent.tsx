'use client'

import { useState, useEffect, useRef } from 'react'
import ChatMessage from './ChatMessage'
import ChatComposer from './ChatComposer'
import GoalChips from './GoalChips'
import OfferNoneChip from './OfferNoneChip'
import ResultsCards from './ResultsCards'

type Message = {
  id: string
  role: 'assistant' | 'user'
  content: string
  type?: 'text' | 'chips' | 'loading' | 'results'
  isTyping?: boolean
}

type Answers = {
  goal?: string
  target?: string
  content?: string
  offer?: string
  link?: string
}

type ResultCard = {
  id: string
  title: string
  content: string
  type: 'informative' | 'benefit-focused' | 'problem-solving'
}

type ChatAgentProps = {
  initialGoal?: string
}

export default function ChatAgent({ initialGoal }: ChatAgentProps = {}) {
  const [step, setStep] = useState(0) // 0: 초기 화면, 1+: 채팅 플로우
  const [messages, setMessages] = useState<Message[]>([])
  const [answers, setAnswers] = useState<Answers>({})
  const [results, setResults] = useState<ResultCard[]>([])
  const [isChatStarted, setIsChatStarted] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const resultsTitleRef = useRef<HTMLDivElement>(null)
  const hasInitializedRef = useRef(false)

  // 초기 goal이 있으면 바로 Step2로 진행
  useEffect(() => {
    if (initialGoal && !hasInitializedRef.current && !isChatStarted) {
      hasInitializedRef.current = true
      const decodedGoal = decodeURIComponent(initialGoal)
      
      setIsChatStarted(true)
      setStep(2)

      const newMessages: Message[] = [
        {
          id: '1',
          role: 'assistant',
          content: '어떤 목적으로 문자를 보내시나요? (위에서 선택해주세요)',
          type: 'text',
        },
        {
          id: Date.now().toString(),
          role: 'user',
          content: decodedGoal,
          type: 'text',
        },
      ]

      setMessages(newMessages)
      setAnswers((prev) => ({ ...prev, goal: decodedGoal }))

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: '이 문자는 누구에게 보내시나요? 상세히 설명해주세요',
            type: 'text',
            isTyping: true,
          },
        ])
      }, 300)
    }
  }, [initialGoal, isChatStarted])

  useEffect(() => {
    // 결과 타이틀 스크롤
    if (step === 7 && resultsTitleRef.current) {
      setTimeout(() => {
        resultsTitleRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
      return
    }

    // 일반 메시지는 하단 스크롤 (로딩 제외)
    if (step !== 6 && step !== 7) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, step])

  const generateDummyResults = (answers: Answers): ResultCard[] => {
    const { goal, target, content, offer, link } = answers

    const informative: ResultCard = {
      id: '1',
      type: 'informative',
      title: '(D-1) 예비 고3 "대학 라인 현실 진단"',
      content: `${content || '입시설명회 LIVE'}\n\n내일 입시설명회 LIVE에서 공개!\n\n내일 오전 마감 전까지 신청 완료한 분들만 입장 가능합니다!\n\n입시설명회 LIVE 마감 전, 지금 신청하러 가기:\n${link || 'https://bit.ly/xxxx'}\n\n${target || '예비 고3 학부모'}라면 가장 궁금하실 내용을 내일 입시설명회 LIVE에서 단 하루 만에 정리해드립니다!\n\n[예비 고3 입시설명회 시작 일정]\n12/14(일) 17:30 ~ 20:20`,
    }

    const benefitFocused: ResultCard = {
      id: '2',
      type: 'benefit-focused',
      title: content || '입시설명회 LIVE',
      content: `${offer ? offer + '\n\n' : ''}${content || '입시설명회 LIVE'} 신청 안내\n\n${target || '예비 고3 학부모'}님을 위한 특별한 기회!\n\n${offer || '무료 자료집 제공'}\n\n지금 바로 신청하고 혜택을 받으세요:\n${link || 'https://bit.ly/xxxx'}`,
    }

    const problemSolving: ResultCard = {
      id: '3',
      type: 'problem-solving',
      title: '대학 라인 진단, 이제 확실하게',
      content: `성적 때문에 불안하신가요?\n대학 라인 진단이 필요하신가요?\n\n${content || '입시설명회 LIVE'}에서\n"지금 성적으로 가능한 대학 라인"과\n"성적 상승 시 지원 가능한 대학 라인"을\n한 번에 정리해드립니다.\n\n${target || '예비 고3 학부모'}님을 위한\n실질적인 입시 정보를 제공합니다.\n\n신청하기: ${link || 'https://bit.ly/xxxx'}`,
    }

    return [informative, benefitFocused] // 2개만 반환
  }

  const handleGoalSelect = (goal: string) => {
    // Start chat UI
    setIsChatStarted(true)
    setStep(2)

    // Initialize messages with step1 question and user selection
    const newMessages: Message[] = [
      {
        id: '1',
        role: 'assistant',
        content: '어떤 목적으로 문자를 보내시나요? (위에서 선택해주세요)',
        type: 'text',
      },
      {
        id: Date.now().toString(),
        role: 'user',
        content: goal,
        type: 'text',
      },
    ]

    setMessages(newMessages)
    setAnswers((prev) => ({ ...prev, goal }))

    // Add step2 question with typing animation
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '이 문자는 누구에게 보내시나요? 상세히 설명해주세요',
          type: 'text',
          isTyping: true,
        },
      ])
    }, 300)
  }

  const handleStep2Submit = (value: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        content: value,
        type: 'text',
      },
    ])

    setAnswers((prev) => ({ ...prev, target: value }))
    setStep(3)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '무엇을 안내/홍보하나요?',
          type: 'text',
          isTyping: true,
        },
      ])
    }, 300)
  }

  const handleStep3Submit = (value: string) => {
    // 이미 진행 중이면 무시
    if (step !== 3) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        content: value,
        type: 'text',
      },
    ])

    setAnswers((prev) => ({ ...prev, content: value }))
    setStep(4)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '혜택이나 제안이 있나요?',
          type: 'text',
          isTyping: true,
        },
      ])
    }, 300)
  }

  const handleStep4Submit = (value: string) => {
    // 이미 진행 중이면 무시
    if (step !== 4) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        content: value,
        type: 'text',
      },
    ])

    setAnswers((prev) => ({ ...prev, offer: value }))
    setStep(5)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '문자에 삽입할 상세 페이지 등의 링크를 넣어주세요.',
          type: 'text',
        },
      ])
    }, 300)
  }

  const handleOfferNone = () => {
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        content: '혜택 없음',
        type: 'text',
      },
    ])

    setAnswers((prev) => ({ ...prev, offer: '혜택 없음' }))
    setStep(5)

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '문자에 삽입할 상세 페이지 등의 링크를 넣어주세요.',
          type: 'text',
          isTyping: true,
        },
      ])
    }, 300)
  }

  const validateLink = (value: string): string | null => {
    if (!value.trim()) {
      return '링크를 입력해주세요.'
    }
    if (!value.toLowerCase().includes('http')) {
      return 'https://을 포함한 링크를 입력해주세요.'
    }
    return null
  }

  const handleStep5Submit = (value: string) => {
    // 이미 진행 중이면 무시
    if (step !== 5) return

    setMessages((prev) => [
      ...prev,
      {
        id: Date.now().toString(),
        role: 'user',
        content: value,
        type: 'text',
      },
    ])

    setAnswers((prev) => ({ ...prev, link: value }))
    setStep(6)

    // Show loading message
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: '✨문자 내용을 구성하고 있어요',
          type: 'loading',
        },
      ])
    }, 300)

    // Generate results after loading (최소 3초)
    const loadingDuration = 3000 + Math.random() * 1000 // 3~4 seconds
    setTimeout(() => {
      const dummyResults = generateDummyResults({ ...answers, link: value })
      setResults(dummyResults)

      setMessages((prev) => {
        const filtered = prev.filter((msg) => msg.type !== 'loading')
        return [
          ...filtered,
          {
            id: (Date.now() + 1).toString(),
            role: 'assistant',
            content: '다음과 같이 문자 광고 내용을 구성했어요',
            type: 'results',
          },
        ]
      })
      setStep(7)
    }, loadingDuration)
  }

  const handleSave = (resultId: string) => {
    const result = results.find((r) => r.id === resultId)
    if (result) {
      const saved = localStorage.getItem('copymaker_results')
      const savedResults = saved ? JSON.parse(saved) : []
      savedResults.push({
        ...result,
        savedAt: new Date().toISOString(),
      })
      localStorage.setItem('copymaker_results', JSON.stringify(savedResults))
      alert('저장되었습니다!')
    }
  }

  const handleRetry = () => {
    setStep(0)
    setIsChatStarted(false)
    setMessages([])
    setAnswers({})
    setResults([])
  }

  const getPlaceholder = () => {
    switch (step) {
      case 2:
        return '예시) 예비 고3 학부모. 아이가 성적 때문에 불안해하고, 대학 라인 현실 진단이 필요하다고 느끼는 분들. 입시 정보를 카페/지인에게만 의존해서 확신이 부족한 상태.'
      case 3:
        return '예시) 예비 고3 학부모 대상 입시설명회 LIVE 신청 안내'
      case 4:
        return '"오늘 신청 시 10% 할인" "무료 PDF 제공" "선착순 50명 Q&A 채팅방 초대" 등'
      case 5:
        return 'https://을 포함한 링크를 입력해주세요'
      default:
        return ''
    }
  }

  const isDisabled = step === 6 || step === 7

  // 초기 화면 (home과 동일)
  if (!isChatStarted) {
    const purposes = [
      '신청/예약 받기(설명회·상담·신청서)',
      '구매/결제 유도하기',
      '다시 오게 만들기(재방문/복귀)',
    ]

    return (
      <main className="min-h-screen bg-white relative">
        <div className="max-w-[1440px] mx-auto px-4 md:px-[276px] pt-12 md:pt-[164px] pb-20">
          <div className="flex flex-col gap-8 md:gap-[60px] items-center mb-12 md:mb-[164px]">
            <h1 className="text-xl md:text-[32px] leading-[1.5] font-bold text-[#353644] text-center">
              <p className="mb-0">전환율 높은 광고 문자 내용을</p>
              <p>정말 쉽게 만들어보세요</p>
            </h1>

            <div className="flex flex-col gap-4 items-start w-full max-w-[888px]">
              {/* Purpose Selection Buttons */}
              <div className="flex flex-wrap gap-3 items-center w-full">
                {purposes.map((purpose, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleGoalSelect(purpose)}
                    className="flex items-center justify-center px-4 py-3 relative rounded-[32px] shrink-0 transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer group"
                  >
                    <div
                      aria-hidden="true"
                      className="absolute border border-[#b7b9c9] border-solid inset-0 pointer-events-none rounded-[32px] transition-colors duration-200 group-hover:border-[#ff5c00] group-hover:bg-[#fff5f0]"
                    />
                    <p className="font-normal leading-[1.4] relative shrink-0 text-[#626474] text-base whitespace-nowrap transition-colors duration-200 group-hover:text-[#ff5c00]">
                      {purpose}
                    </p>
                  </button>
                ))}
              </div>

              {/* Text Input Area (disabled) */}
              <div className="h-[120px] relative rounded-[16px] w-full bg-gray-100">
                <div
                  aria-hidden="true"
                  className="absolute border border-[#b7b9c9] border-solid inset-0 pointer-events-none rounded-[16px] shadow-[0px_0px_16px_0px_rgba(0,0,0,0.1)]"
                />
                <div className="w-full h-full relative">
                  <div className="flex gap-2.5 items-start p-4 h-full">
                    <p className="block font-normal leading-[1.4] grow min-h-px min-w-0 relative shrink text-[#9395a6] text-base md:text-[20px] mb-0 break-words pr-14">
                      어떤 목적으로 문자를 보내시나요? (위에서 선택해주세요)
                    </p>
                    {/* Send Button (disabled) */}
                    <div className="absolute bg-gray-200 flex items-center justify-center p-2 rounded-[99px] top-[72px] right-4 w-8 h-8 opacity-50 pointer-events-none">
                      <svg
                        className="block w-4 h-4"
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // 채팅 UI
  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto w-full relative">
      {/* 채팅 영역 (스크롤 가능) */}
      <div className="flex-1 overflow-y-auto px-4 md:px-12 pt-6 pb-40 md:pb-24">
        {messages.map((message) => {
          if (message.type === 'loading') {
            return (
              <ChatMessage
                key={message.id}
                role={message.role}
                content={message.content}
                type="loading"
              />
            )
          }

          if (message.type === 'results') {
            return (
              <div key={message.id} ref={resultsTitleRef}>
                <ChatMessage role={message.role} content={message.content} />
                <ResultsCards
                  results={results}
                  onSave={handleSave}
                  onRetry={handleRetry}
                />
              </div>
            )
          }

          return (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
              isTyping={message.isTyping}
            />
          )
        })}

        <div ref={messagesEndRef} />
      </div>

      {/* Input composer (하단 고정) */}
      {step >= 2 && step <= 5 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white pt-4 pb-6 border-gray-100 z-10 shadow-lg">
          <div className="max-w-4xl mx-auto px-4 md:px-12">
            {/* Step4 offer none chip */}
            {step === 4 && (
              <div className="mb-3">
                <OfferNoneChip onClick={handleOfferNone} disabled={isDisabled} />
              </div>
            )}
            <ChatComposer
              placeholder={getPlaceholder()}
              onSubmit={
                step === 2
                  ? handleStep2Submit
                  : step === 3
                  ? handleStep3Submit
                  : step === 4
                  ? handleStep4Submit
                  : handleStep5Submit
              }
              disabled={isDisabled}
              onValidate={step === 5 ? validateLink : undefined}
              isDisabledArea={false}
            />
          </div>
        </div>
      )}
    </div>
  )
}

