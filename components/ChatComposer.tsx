'use client'

import { useState, KeyboardEvent, useEffect, useRef } from 'react'

type ChatComposerProps = {
  placeholder: string
  onSubmit: (value: string) => void
  disabled?: boolean
  onValidate?: (value: string) => string | null
  isDisabledArea?: boolean
}

export default function ChatComposer({
  placeholder,
  onSubmit,
  disabled = false,
  onValidate,
  isDisabledArea = false,
}: ChatComposerProps) {
  const [value, setValue] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const previousPlaceholderRef = useRef(placeholder)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // placeholder가 변경되면 value 초기화 (step 변경 시)
  useEffect(() => {
    if (previousPlaceholderRef.current !== placeholder) {
      setValue('')
      setError(null)
      setIsSubmitting(false)
      previousPlaceholderRef.current = placeholder
    }
  }, [placeholder])

  // disabled가 true로 변경되면 isSubmitting 초기화
  useEffect(() => {
    if (disabled) {
      setIsSubmitting(false)
    }
  }, [disabled])

  const handleSubmit = () => {
    if (disabled || isSubmitting || !value.trim()) return

    const trimmedValue = value.trim()

    if (onValidate) {
      const validationError = onValidate(trimmedValue)
      if (validationError) {
        setError(validationError)
        return
      }
    }

    // 전송 시작: 입력 비활성화 및 값 저장
    setIsSubmitting(true)
    setError(null)
    const valueToSubmit = trimmedValue
    
    // 즉시 입력창 비우기 (Enter 키 입력이 전달되지 않도록)
    setValue('')
    
    // 포커스 제거하여 추가 입력 방지
    if (textareaRef.current) {
      textareaRef.current.blur()
    }

    // 전송 처리 (다음 이벤트 루프에서 실행하여 상태 업데이트 완료 보장)
    requestAnimationFrame(() => {
      onSubmit(valueToSubmit)
    })
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!isSubmitting) {
        handleSubmit()
      }
    }
  }

  return (
    <div className="w-full">
      {error && (
        <div className="mb-2 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      <div
        className={`relative rounded-[16px] border border-[#b7b9c9] shadow-sm ${
          isDisabledArea ? 'bg-gray-100' : 'bg-white'
        }`}
      >
        <div className="flex gap-2.5 items-end p-4">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => {
              if (!isSubmitting) {
                setValue(e.target.value)
                setError(null)
              }
            }}
            onKeyDown={handleKeyDown}
            disabled={disabled || isSubmitting}
            placeholder={placeholder}
            rows={3}
            className="flex-1 resize-none border-none outline-none text-[#353644] text-base leading-[1.4] font-normal placeholder:text-[#9395a6] disabled:bg-gray-50 disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={handleSubmit}
            disabled={disabled || isSubmitting || !value.trim()}
            className={`${
              value.trim() && !disabled && !isSubmitting
                ? 'bg-[#ff5c00] hover:bg-[#E54D00]'
                : 'bg-[#e4e6f0] hover:bg-[#d0d2e0]'
            } disabled:bg-gray-200 disabled:cursor-not-allowed flex items-center justify-center p-2 rounded-[99px] w-8 h-8 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm hover:shadow-md`}
            aria-label="전송"
          >
            <svg
              className="block w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
      <p className="text-[14px] text-gray-500 mt-2 text-center">
        Enter 시 채팅 전송, Shift+Enter 시 줄바꿈
      </p>
    </div>
  )
}

