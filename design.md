# 🎨 개인 포트폴리오 웹사이트 디자인 가이드 (Design System Guide)

> **문서 버전**: 1.0.0  
> **기반 문서**: [prd.md](file:///C:/Users/hun95/.gemini/antigravity-ide/scratch/portfolio/prd.md)  
> **디자인 컨셉**: **Modern Tech Dark & Glassmorphism** (고급스러운 다크 슬레이트 무드 + 빛나는 인디고/바이올렛 그라데이션 + 유리 질감 카드)

---

## 📌 1. 디자인 원칙 & 톤 앤 매너 (Design Principles)

1. **시각적 몰입감 (Visual Depth)**
   - 깊이감 있는 딥 다크 슬레이트 배경 위에 세련된 광원(Glow) 효과와 반투명 글래스(Glassmorphism) 레이어를 사용하여 직관적이면서도 트렌디한 인상을 전달합니다.
2. **명확한 계층 구조 (Clear Hierarchy)**
   - 서체 크기, 굵기, 명도 대비를 통해 방문자가 3초 이내에 핵심 직무, 주요 스택, 프로젝트를 자연스럽게 시선 이동하며 읽을 수 있도록 설계합니다.
3. **일관된 마이크로 인터랙션 (Micro Interactions)**
   - 버튼 호버(Hover), 카드 부유(Float), 모달 팝업 등에 매끄러운 트랜지션 애니메이션을 적용하여 살아있는 웹 애플리케이션 느낌을 부여합니다.

---

## 🎨 2. 컬러 시스템 (Color Palette & Tokens)

### 2.1 브랜드 & 포인트 컬러 (Brand & Accent Colors)
포트폴리오의 아이덴티티를 결정짓는 메인 컬러 팔레트입니다.

| 역할 | 명칭 | Hex Code | RGB / HSL | 사용처 |
|---|---|---|---|---|
| **Primary (Main)** | Electric Indigo | `#6366F1` | `rgb(99, 102, 241)` | 메인 버튼, 대표 스킬 태그, 메인 포인트 |
| **Secondary** | Violet Glow | `#8B5CF6` | `rgb(139, 92, 246)` | 그라데이션 조합, 어드민 편집 강조 |
| **Accent Glow** | Cyan Spark | `#06B6D4` | `rgb(6, 182, 212)` | 링크 호버, 아이콘 하이라이트, 뱃지 포인트 |

---

### 2.2 중립 컬러 (Neutral Colors - Dark Theme Base)
다크 모드에 최적화된 눈이 편안한 슬레이트 톤의 다단계 배경 및 텍스트 컬러입니다.

| 구분 | 토큰명 | Hex Code | 알파/투명도 응용 | 사용처 |
|---|---|---|---|---|
| **Background Base** | `--bg-base` | `#0F172A` | - | 웹사이트 전체 최하단 배경 (Deep Slate) |
| **Surface Card** | `--bg-surface` | `#1E293B` | `rgba(30, 41, 59, 0.7)` | 프로젝트 카드, 자기소개 섹션 배경 |
| **Surface Glass** | `--bg-glass` | - | `rgba(255, 255, 255, 0.05)` | 글래스모피즘 요소, 태그 배경 |
| **Border Glass** | `--border-glass` | - | `rgba(255, 255, 255, 0.1)` | 카드 및 버튼 테두리 선 |
| **Text Primary** | `--text-primary` | `#F8FAFC` | - | 제목, 메인 헤드라인 (밝은 화이트) |
| **Text Secondary** | `--text-secondary` | `#94A3B8` | - | 본문 설명, 서브 텍스트, 날짜 |
| **Text Muted** | `--text-muted` | `#64748B` | - | 캡션, 미활용 태그, 저작권 문구 |

---

### 2.3 피드백 및 상태 컬러 (Functional Colors)

| 상태 | 명칭 | Hex Code | 사용처 |
|---|---|---|---|
| **Success** | Emerald Green | `#10B981` | 어드민 저장 완료 알림, 라이브 데모 온라인 상태 |
| **Warning** | Amber Yellow | `#F59E0B` | 어드민 수정 중 경고 |
| **Danger/Error** | Coral Red | `#EF4444` | 비밀번호 오류, 삭제 버튼 |

---

## 🔤 3. 타이포그래피 시스템 (Typography System)

### 3.1 서체 지정 (Font Family)
- **Primary Font**: `'Inter'`, `'Pretendard'`, `-apple-system`, `BlinkMacSystemFont`, `sans-serif`
- **Code Font**: `'Fira Code'`, `'JetBrains Mono'`, `monospace` (기술 태그, 코드 예시)

### 3.2 폰트 스케일 및 스타일 스펙

| 스타일상 | Font Size | Line Height | Font Weight | Letter Spacing | 사용 위치 |
|---|---|---|---|---|---|
| **Display Title** | `48px` (3rem) | `1.2` | `700 (Bold)` | `-0.02em` | 히로 섹션 메인 한 줄 타이틀 |
| **Heading 1 (H1)**| `36px` (2.25rem)| `1.3` | `700 (Bold)` | `-0.01em` | 각 주요 섹션 제목 (About, Projects) |
| **Heading 2 (H2)**| `24px` (1.5rem) | `1.4` | `600 (SemiBold)` | `0` | 프로젝트 카드 제목, 모달 제목 |
| **Heading 3 (H3)**| `20px` (1.25rem)| `1.4` | `600 (SemiBold)` | `0` | 세부 그룹 제목 |
| **Body Large** | `18px` (1.125rem)|`1.6` | `400 (Regular)` | `0` | 히로 서브 설명, 자기소개 요약 |
| **Body Medium** | `16px` (1rem) | `1.6` | `400 (Regular)` | `0` | 프로젝트 상세 본문 |
| **Body Small** | `14px` (0.875rem)|`1.5` | `400 (Regular)` | `0` | 툴팁, 서브 정보 |
| **Caption / Tag** | `12px` (0.75rem)| `1.4` | `500 (Medium)` | `0.05em` | 기술 스택 배지, 날짜, 태그 |

---

## 🔘 4. 버튼 디자인 시스템 (Button Specifications)

웹사이트 내 인터랙션을 담당하는 버튼들의 구체적인 사이즈 및 스타일 스펙입니다.

### 4.1 버튼 규격 (Button Sizes)

| Size | Height | Padding (Top/Bottom Left/Right) | Font Size | Border Radius | 주요 적용 위치 |
|---|---|---|---|---|---|
| **Large (L)** | `52px` | `14px 28px` | `16px` | `12px` | 히로 섹션 메인 CTA (`[작업물 구경하기]`) |
| **Medium (M)**| `42px` | `10px 20px` | `14px` | `10px` | 프로젝트 모달 링크, 어드민 `[저장]` 버튼 |
| **Small (S)** | `34px` | `6px 14px` | `13px` | `8px` | 카드 내 바로가기 태그 버튼, 어드민 `[Admin]` 버튼 |

---

### 4.2 버튼 변형 (Button Variants)

#### 1. Primary Button (메인 강조 버튼)
- **Background**: `linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)`
- **Text Color**: `#FFFFFF` (Bold)
- **Shadow**: `0 4px 14px rgba(99, 102, 241, 0.4)`
- **Hover State**: `transform: translateY(-2px)`, `shadow: 0 6px 20px rgba(99, 102, 241, 0.6)`
- **Active State**: `transform: translateY(0px)`

#### 2. Secondary Button (유리 질감 보조 버튼)
- **Background**: `rgba(255, 255, 255, 0.08)`
- **Border**: `1px solid rgba(255, 255, 255, 0.15)`
- **Backdrop Filter**: `blur(8px)`
- **Text Color**: `#F8FAFC`
- **Hover State**: `background: rgba(255, 255, 255, 0.15)`, `border-color: rgba(255, 255, 255, 0.3)`

#### 3. Ghost / Outline Button (경계선 투명 버튼)
- **Background**: `transparent`
- **Text Color**: `#94A3B8`
- **Hover State**: `color: #6366F1`, `background: rgba(99, 102, 241, 0.1)`

---

## 📦 5. 컴포넌트 상세 스펙 (Component Specs)

### 5.1 프로젝트 카드 (Project Card)
- **Dimensions**: 가로 자율(그리드 세분화), 최소 높이 `380px`
- **Background**: `rgba(30, 41, 59, 0.6)` (Glassmorphism)
- **Backdrop Filter**: `blur(12px)`
- **Border**: `1px solid rgba(255, 255, 255, 0.08)`
- **Border Radius**: `16px`
- **Padding**: 이미지 영역 (Padding 0), 텍스트 콘텐츠 영역 (`24px`)
- **Hover Effect**:
  - `transform: translateY(-6px)`
  - `box-shadow: 0 20px 30px -10px rgba(0, 0, 0, 0.5), 0 0 15px rgba(99, 102, 241, 0.2)`
  - `border-color: rgba(99, 102, 241, 0.4)`

### 5.2 기술 스택 배지 (Skill Badge / Tag)
- **Height**: `28px`
- **Padding**: `4px 12px`
- **Border Radius**: `9999px` (Pill shape)
- **Background**: `rgba(99, 102, 241, 0.12)`
- **Text**: `color: #818CF8`, `font-size: 12px`, `font-weight: 500`
- **Border**: `1px solid rgba(99, 102, 241, 0.2)`

### 5.3 어드민 편집 폼 & 모달 (Admin Modal & Form)
- **Overlay Background**: `rgba(15, 23, 42, 0.8)` + `backdrop-filter: blur(6px)`
- **Modal Box**: `width: 100%`, `max-width: 500px`, `background: #1E293B`, `border-radius: 20px`, `padding: 32px`
- **Input / Textarea**:
  - `background: #0F172A`
  - `border: 1px solid rgba(255, 255, 255, 0.15)`
  - `border-radius: 8px`
  - `color: #F8FAFC`
  - `focus state`: `border-color: #6366F1`, `box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.25)`

---

## 📐 6. 그리드, 스페이싱 및 반응형 브레이크포인트 (Layout & Spacing)

### 6.1 8px 스페이싱 시스템 (Spacing Scale)

```css
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-6: 24px;
--space-8: 32px;
--space-12: 48px;
--space-16: 64px;
```

### 6.2 반응형 브레이크포인트 (Responsive Breakpoints)

| 디바이스 유형 | Breakpoint | 컨테이너 최대 너비 (`max-width`) | 좌우 여백 (`padding`) | 카드 그리드 컬럼 수 |
|---|---|---|---|---|
| **Mobile** | `< 768px` | `100%` | `16px` | 1 Column |
| **Tablet** | `768px ~ 1024px` | `720px` | `24px` | 2 Columns |
| **Desktop** | `> 1024px` | `1200px` | `32px` | 3 Columns |

---

## ⚡ 7. 애니메이션 & 인터랙션 (Animations)

- **Timing Function**: `cubic-bezier(0.16, 1, 0.3, 1)` (부드럽고 자연스러운 탄성 트랜지션)
- **Duration**:
  - Fast (호버/클릭): `150ms`
  - Normal (모달/카드 열림): `250ms`
  - Slow (화면 전환): `400ms`

---

## 💻 8. 실전 CSS 변수 가이드 (`:root` CSS Tokens)

개발 시 `style.css` 상단에 그대로 가져다 사용할 수 있는 CSS Custom Properties 코드입니다.

```css
:root {
  /* Color Tokens - Brand */
  --color-primary: #6366f1;
  --color-primary-hover: #4f46e5;
  --color-secondary: #8b5cf6;
  --color-accent: #06b6d4;

  /* Color Tokens - Neutrals */
  --bg-base: #0f172a;
  --bg-surface: #1e293b;
  --bg-glass: rgba(255, 255, 255, 0.05);
  --border-glass: rgba(255, 255, 255, 0.1);

  /* Text Tokens */
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;

  /* Status Tokens */
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-danger: #ef4444;

  /* Typography */
  --font-family: 'Inter', 'Pretendard', -apple-system, sans-serif;
  
  /* Spacing Scale */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;

  /* Border Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-full: 9999px;

  /* Shadows & Glass Filter */
  --shadow-glass: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
  --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.35);
  --backdrop-blur: blur(12px);

  /* Transition */
  --transition-fast: all 0.15s cubic-bezier(0.16, 1, 0.3, 1);
  --transition-normal: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}
```
