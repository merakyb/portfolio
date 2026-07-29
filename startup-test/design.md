# 🎨 대학생 창업 성향 테스트 웹사이트 디자인 가이드 (Design System Guide)

> **문서 버전**: 1.0.0  
> **기반 문서**: [prd.md](file:///C:/Users/hun95/.gemini/antigravity-ide/scratch/startup-personality-test/prd.md)  
> **디자인 컨셉**: **Clean & Vibrant Light Theme** (깔끔한 화이트/슬레이트 배경 + 생동감 있는 인디고/바이올렛 그라데이션 포인트 + 통합 시그니처 브랜드 컬러)

---

## 📌 1. 디자인 원칙 & 톤 앤 매너 (Design Principles)

1. **화사하고 직관적인 인상 (Clean & Vibrant Aesthetic)**
   - 군더더기 없는 화이트/슬레이트 톤의 깔끔한 리프트 배경 위로 에너지 넘치는 비브런트 인디고 그라데이션 포인트를 사용하여, 대학생 참가자들에게 신뢰감과 동기를 부여합니다.
2. **모바일 퍼스트 앱 느낌 (Mobile-First Experience)**
   - 모바일 스마트폰 환경(360px ~ 430px)을 기본으로 설계하여 탭 터치 영역을 최소 48px 이상 확보하고, 데스크톱에서도 중앙 집중형 앱(App Container) 레이아웃으로 높은 몰입감을 선사합니다.
3. **매끄러운 마이크로 인터랙션 (Smooth Micro Interactions)**
   - 진행 바(Progress Bar)의 부드러운 채움, 선택지 카드의 스프링 반응, 결과 페이지 요소들의 단계적 등장(Staggered Fade-in)으로 생동감 있는 경험을 제공합니다.

---

## 🎨 2. 컬러 시스템 (Color Palette & Tokens)

### 2.1 통합 시그니처 브랜드 컬러 (Brand Signature Palette)
6가지 성향 진단 전체에 일관된 브랜드 정체성을 부여하는 대표 컬러 팔레트입니다.

| 역할 | 명칭 | Hex Code | 사용처 |
|---|---|---|---|
| **Primary Main** | Vibrant Indigo | `#4F46E5` | 메인 CTA 버튼, 선택된 카드 테두리, 진행률 바 |
| **Primary Light** | Soft Indigo Tint | `#EEF2FF` | 선택된 카드 배경, 배지 투명 배경 |
| **Secondary Main**| Electric Violet | `#7C3AED` | 그라데이션 조합, 타이틀 하이라이트 |
| **Accent Glow** | Active Coral | `#FF6B6B` | 핵심 강점 포인트, 강조 뱃지 |

### 2.2 브랜드 통합 수식 그라데이션 (Brand Gradients)
```css
/* 메인 CTA 버튼 및 진행률 바 전용 그라데이션 */
--gradient-primary: linear-gradient(135deg, #4F46E5 0%, #7C3AED 100%);
--gradient-hover: linear-gradient(135deg, #4338CA 0%, #6D28D9 100%);
--gradient-subtle: linear-gradient(180deg, #F8FAFC 0%, #EEF2FF 100%);
```

---

### 2.3 배경 및 텍스트 중립 컬러 (Neutral Light Theme Tokens)

| 구분 | 토큰명 | Hex Code | 사용처 |
|---|---|---|---|
| **Background Base** | `--bg-base` | `#F8FAFC` | 전체 웹사이트 배경 (Cool Slate) |
| **Surface Card** | `--bg-surface` | `#FFFFFF` | 메인 콘텐츠, 질문 카드, 결과 박스 배경 |
| **Surface Sub** | `--bg-subtle` | `#F1F5F9` | 미선택 카드, 폼 입력창 배경 |
| **Border Soft** | `--border-soft` | `#E2E8F0` | 카드 테두리, 구획 구분선 |
| **Text Primary** | `--text-primary` | `#0F172A` | 메인 헤드라인, 질문 타이틀 (Deep Slate) |
| **Text Secondary**| `--text-secondary`| `#475569` | 서브 설명, 본문 텍스트 |
| **Text Muted** | `--text-muted` | `#94A3B8` | 진행 단계 (1/12), 저작권 문구 |

---

### 2.4 상태 및 피드백 컬러 (Functional Colors)

| 상태 | 명칭 | Hex Code | 사용처 |
|---|---|---|---|
| **Success** | Emerald Green | `#10B981` | 찰떡궁합 유형 뱃지, 링크 복사 완료 알림 |
| **Warning** | Amber Gold | `#F59E0B` | 주의할 점(보완점) 안내 배지 |
| **Danger** | Coral Red | `#EF4444` | 오류 알림, 선택 해제 |

---

## 🔤 3. 타이포그래피 시스템 (Typography System)

### 3.1 서체 지정 (Font Family)
- **Primary Font**: `'Pretendard'`, `'Inter'`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
- **Display Font**: `'Pretendard'`, `sans-serif` (Bold 700 / 800)

### 3.2 폰트 스케일 및 스타일 스펙

| 스타일상 | Font Size | Line Height | Font Weight | Letter Spacing | 사용 위치 |
|---|---|---|---|---|---|
| **Display Title** | `32px` (2rem) | `1.3` | `800 (ExtraBold)`| `-0.02em` | 랜딩 메인 타이틀, 결과 유형명 |
| **Heading 1 (H1)**| `24px` (1.5rem) | `1.4` | `700 (Bold)` | `-0.01em` | 각 질문 제목, 결과 섹션 타이틀 |
| **Heading 2 (H2)**| `18px` (1.125rem)| `1.4` | `600 (SemiBold)` | `0` | 선택지 문구, 팀원 궁합 제목 |
| **Body Large** | `16px` (1rem) | `1.6` | `500 (Medium)` | `0` | 유형 요약문, 핵심 강점 설명 |
| **Body Medium** | `14px` (0.875rem)|`1.5` | `400 (Regular)` | `0` | 서브 본문, 툴팁 설명 |
| **Caption / Tag** | `12px` (0.75rem)| `1.4` | `600 (SemiBold)` | `0.02em` | 프로그레스 단계 (`1/12`), 스택 태그 |

---

## 🔘 4. 버튼 및 선택지 디자인 가이드 (Interactive Elements)

### 4.1 메인 CTA 버튼 (Primary Button)
- **Style**:
  ```css
  background: var(--gradient-primary);
  color: #FFFFFF;
  font-weight: 700;
  font-size: 16px;
  padding: 16px 32px;
  border-radius: 14px;
  box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.35);
  border: none;
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
  ```
- **Hover State**: `transform: translateY(-2px)`, `box-shadow: 0 14px 28px -5px rgba(79, 70, 229, 0.45)`
- **Active State**: `transform: translateY(0px)`, `box-shadow: 0 6px 14px -3px rgba(79, 70, 229, 0.3)`

---

### 4.2 질문 선택지 카드 (Question Option Cards)
- **Style**:
  ```css
  background: #FFFFFF;
  border: 2px solid #E2E8F0;
  border-radius: 16px;
  padding: 20px 24px;
  min-height: 80px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
  ```
- **Hover State**: `border-color: #A5B4FC`, `background: #FAF5FF`, `transform: translateY(-2px)`
- **Selected / Active State**: `border-color: #4F46E5`, `background: #EEF2FF`, `box-shadow: 0 8px 20px rgba(79, 70, 229, 0.15)`

---

### 4.3 서브 & Outline 버튼 (Secondary Button)
- **Background**: `#FFFFFF`
- **Border**: `1.5px solid #CBD5E1`
- **Text Color**: `#475569`
- **Hover State**: `background: #F8FAFC`, `border-color: #94A3B8`, `color: #0F172A`

---

## ✨ 5. 애니메이션 및 마이크로 인터랙션 (Animations & Motion)

### 5.1 페이지 전환 애니메이션 (Fade & Slide Up)
```css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.page-enter {
  animation: fadeInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}
```

### 5.2 프로그레스 바 충전 애니메이션 (Smooth Fill)
```css
.progress-bar-fill {
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--gradient-primary);
}
```

### 5.3 결과 등장 (Staggered Reveal)
결과 페이지 요소들이 0.1초 간격으로 연속적으로 떠오르는 시각적 연출 적용:
1. 대표 유형 배지 (`delay 0s`)
2. 레이더 차트 (`delay 0.15s`)
3. 강점 & 주의점 카드 (`delay 0.3s`)
4. 찰떡궁합 가이드 (`delay 0.45s`)
5. 공유 버튼 바 (`delay 0.6s`)

---

## 📦 6. 컴포넌트 상세 디자인 스펙 (Component Specs)

### 6.1 모바일 퍼스트 프레임 컨테이너 (App Container Wrapper)
- **Desktop View**: 가로 중앙 정렬 (`margin: 0 auto`), 최대 너비 `500px`, 그림자 `box-shadow: 0 25px 50px -12px rgba(0,0,0,0.1)`
- **Mobile View**: 너비 `100%`, 패딩 `20px`

### 6.2 레이더 차트 컴포넌트 (Radar Chart Container)
- **Background**: `#FFFFFF`
- **Border Radius**: `20px`
- **Border**: `1px solid #E2E8F0`
- **Padding**: `24px`
- **Chart Line Color**: `#4F46E5`, Fill Alpha: `rgba(79, 70, 229, 0.2)`

### 6.3 찰떡궁합 유형 카드 (Synergy Team Match Box)
- **Best Partner Box**: 배경 `#ECFDF5`, 테테두리 `#A7F3D0`, 뱃지 `#10B981` (초록 톤)
- **Caution Partner Box**: 배경 `#FEF2F2`, 테두리 `#FCA5A5`, 뱃지 `#EF4444` (레드 톤)

---

## 📐 7. 반응형 브레이크포인트 (Breakpoints)

- **Mobile Small (< 380px)**: 폰트 스케일 1px 축소, 버튼 패딩 `14px 20px`
- **Mobile Standard (380px ~ 640px)**: 모바일 기본 최적화 레이아웃
- **Desktop (> 640px)**: 가로 `500px` 스마트폰 형태 카드 래퍼로 가운데 정렬 배치

---
*본 디자인 가이드는 대학생 참가자들에게 화사하고 깔끔하며 직관적인 사용자 경험을 선사하도록 설계되었습니다.*
