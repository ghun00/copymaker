'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export default function TopNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/agent', label: '카피 에이전트' },
    { href: '/templates', label: '문자 템플릿' },
    { href: '/storage', label: '내 저장소' },
  ]

  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname?.startsWith(href)
  }

  return (
    <nav className="sticky top-0 z-50 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 md:px-20 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 transition-transform duration-200 hover:scale-105 active:scale-95">
            <div className="h-[48px] w-[140px] md:w-[200px] relative shrink-0">
              <Image
                src="/images/copymakerLogo.png"
                alt="카피메이커 로고"
                fill
                className="object-contain"
                priority
              />
            </div>
            
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            {navItems.map((item) => (
              <div
                key={item.href}
                className="flex flex-col items-center justify-center px-6 py-3"
              >
                <Link
                  href={item.href}
                  className={`text-[20px] leading-[1.4] transition-all duration-200 no-underline ${
                    isActive(item.href)
                      ? 'text-[#ff5c00] font-bold'
                      : 'text-[#626474] font-medium hover:text-[#ff5c00] hover:scale-105'
                  }`}
                  aria-label={item.label}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Login Button & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden md:flex flex-col items-center justify-center bg-[#ff5c00] px-6 py-2 rounded-[12px] transition-all duration-200 hover:bg-[#E54D00] hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
              aria-label="로그인"
            >
              <span className="text-[20px] leading-[1.4] text-white font-normal">
                로그인
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-[#626474] hover:text-[#ff5c00] focus:outline-none"
              aria-label="메뉴 열기"
              aria-expanded={isMobileMenuOpen}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 mt-4">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-[20px] leading-[1.4] px-2 py-1 transition-all duration-200 ${
                    isActive(item.href)
                      ? 'text-[#ff5c00] font-bold'
                      : 'text-[#626474] font-normal hover:text-[#ff5c00]'
                  }`}
                  aria-label={item.label}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/login"
                className="bg-[#ff5c00] text-white px-6 py-3 rounded-[12px] font-normal text-center mt-2 transition-all duration-200 hover:bg-[#E54D00] active:scale-95 shadow-sm hover:shadow-md"
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="로그인"
              >
                <span className="text-[20px] leading-[1.4]">로그인</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

