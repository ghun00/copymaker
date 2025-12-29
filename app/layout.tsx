import type { Metadata } from 'next'
import './globals.css'
import TopNav from '@/components/TopNav'

export const metadata: Metadata = {
  title: '카피메이커 | 전환율 높은 문자 내용을 간편하게 만들어보세요',
  description: '클릭과 반응을 만드는 문자 광고, 아직도 직접 고민하시나요? 카피메이커가 전환율 높은 문자 카피를 빠르게 만들어드려요!',
  icons: {
    icon: '/logoSymbol.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          rel="stylesheet"
        />
      </head>
      <body>
        <TopNav />
        {children}
      </body>
    </html>
  )
}

