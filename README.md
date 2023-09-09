# Discord Clone Project

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## Key Features

-   **실시간 채팅**: Socket.io를 활용한 실시간 채팅 구현.
-   **파일 업로드**: UploadThing을 통해 파일 업로드 기능을 구현.
-   **메시지 업데이트 및 삭제**: 메시지 내용을 업데이트 및 삭제할 수 있는 기능.
-   **다중 서버 채널**: 각 서버마다 텍스트, 오디오, 비디오 채널을 제공.
-   **1:1 채팅 및 화상 채팅**: 모든 유저 간 1:1 채팅 및 화상 채팅 가능.
-   **서버 초대**: 초대 코드를 통해 사용자를 서버에 초대할 수 있습니다.
-   **메시지 무한 로딩**: 메시지를 10개씩 일괄적으로 로딩하는 무한 로딩 구현.
-   **UI 디자인**: Tailwind CSS와 shadcn/ui를 사용하여 멋진 사용자 인터페이스 디자인.
-   **반응형 UI**: 다양한 화면 크기와 장치에 대응하는 반응형 디자인 구현.
-   **ORM 사용**: Prisma를 사용하여 데이터베이스와의 상호작용을 간소화.
-   **사용자 인증**: Clerk를 통한 안전하고 신뢰성 있는 사용자 인증 구현.

## Technologies Used

-   **Next.js**: 서버 렌더링 애플리케이션을 구축하기 위한 React 프레임워크.
-   **Prisma**: Node.js용 데이터베이스 툴킷 및 ORM(Object-Relational Mapping).
-   **Clerk**: 인증 및 사용자 관리를 위한 라이브러리.
-   **Zustand**: 상태 관리 라이브러리.
-   **Socket.io**: 실시간 통신을 위한 라이브러리.
-   **Livekit**: 비디오 및 오디오 통신을 위한 라이브러리.
-   **Tailwind CSS**: 스타일링을 위한 유틸리티 중심의 CSS 프레임워크.
-   **TypeScript**: 정적 타입 지원을 갖춘 JavaScript의 확장 버전.
-   **shadcn/ui**: Radix UI와 Tailwind CSS를 사용하여 만든 재사용 가능한 컴포넌트.

## Deployment

Our project is deployed on Railway, and you can access it at https://wiscord.up.railway.app/.
