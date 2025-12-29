'use client'

import { useEffect, useState, useRef } from 'react'

type ChatMessageProps = {
  role: 'assistant' | 'user'
  content: string
  type?: 'text' | 'loading'
  isTyping?: boolean
}

export default function ChatMessage({
  role,
  content,
  type = 'text',
  isTyping = false,
}: ChatMessageProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [showCursor, setShowCursor] = useState(false)
  const typingRef = useRef<NodeJS.Timeout | null>(null)
  const cursorRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Cleanup previous intervals
    if (typingRef.current) {
      clearInterval(typingRef.current)
      typingRef.current = null
    }
    if (cursorRef.current) {
      clearInterval(cursorRef.current)
      cursorRef.current = null
    }

    if (!isTyping || role !== 'assistant' || type === 'loading') {
      setDisplayedText(content)
      setShowCursor(false)
      return
    }

    // Start typing animation
    setDisplayedText('')
    setShowCursor(true)
    let index = 0

    typingRef.current = setInterval(() => {
      if (index < content.length) {
        setDisplayedText(content.slice(0, index + 1))
        index++
      } else {
        setShowCursor(false)
        if (typingRef.current) {
          clearInterval(typingRef.current)
          typingRef.current = null
        }
        if (cursorRef.current) {
          clearInterval(cursorRef.current)
          cursorRef.current = null
        }
      }
    }, 20)

    // Cursor blinking
    cursorRef.current = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 530)

    return () => {
      if (typingRef.current) {
        clearInterval(typingRef.current)
        typingRef.current = null
      }
      if (cursorRef.current) {
        clearInterval(cursorRef.current)
        cursorRef.current = null
      }
    }
  }, [content, isTyping, role, type])
  if (type === 'loading') {
    return (
      <div className="flex items-start gap-3 mb-6">
        <div className="flex-1 max-w-[80%] md:max-w-[70%]">
          <div className="bg-gradient-to-r from-[#fff5f0] to-[#fff9f5] rounded-[20px] p-6 border-2 border-[#ff5c00] border-opacity-30 shadow-lg">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-[#ff5c00] to-[#ffac7e] flex items-center justify-center animate-pulse">
                  <span className="text-white text-lg">✨</span>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#ff5c00] rounded-full animate-ping" />
              </div>
              <div className="flex-1">
                <p className="text-[#353644] text-base leading-[1.5] font-medium">
                  {content}
                </p>
                <div className="flex gap-1 mt-2">
                  <span className="w-2 h-2 bg-[#ff5c00] rounded-full animate-bounce" />
                  <span
                    className="w-2 h-2 bg-[#ff5c00] rounded-full animate-bounce"
                    style={{ animationDelay: '0.1s' }}
                  />
                  <span
                    className="w-2 h-2 bg-[#ff5c00] rounded-full animate-bounce"
                    style={{ animationDelay: '0.2s' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (role === 'user') {
    return (
      <div className="flex justify-end mb-6">
        <div className="max-w-[80%] md:max-w-[70%]">
          <div className="bg-[#f5f5f5] rounded-[16px] p-4">
            <p className="text-[#353644] text-base leading-[1.4] font-normal whitespace-pre-wrap">
              {content}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // assistant
  const finalContent = isTyping ? displayedText : content
  const shouldShowCursor = isTyping && showCursor && displayedText.length < content.length
  
  return (
    <div className="flex items-start gap-3 mb-6">
      <div className="flex-1 max-w-[80%] md:max-w-[70%]">
        <div className="p-4">
          <p className="text-[#353644] text-base leading-[1.4] font-normal whitespace-pre-wrap">
            {finalContent}
            {shouldShowCursor && (
              <span className="inline-block w-0.5 h-4 bg-[#ff5c00] ml-1 animate-pulse" />
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
