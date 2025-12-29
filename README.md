# 카피메이커

Next.js App Router + Tailwind CSS 기반의 마케팅 메시지 생성 도구입니다.

## 기술 스택

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Pretendard 폰트

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

## 프로젝트 구조

```
copymaker/
├── app/
│   ├── agent/
│   │   └── page.tsx      # AI 에이전트 페이지
│   ├── globals.css       # 전역 스타일
│   ├── layout.tsx        # 루트 레이아웃
│   └── page.tsx          # 홈 페이지
├── components/
│   └── TopNav.tsx        # 상단 네비게이션 바
└── ...
```

