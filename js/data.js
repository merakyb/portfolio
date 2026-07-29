/**
 * ==========================================================================
 * 포트폴리오 메인 데이터 헬퍼 모듈 (data.js)
 * 초기 프로필 및 작업물 목록 스키마를 정의하고 LocalStorage 동적 관리를 담당합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

// 1. 기본 초기 포트폴리오 데이터 스키마
const INITIAL_PORTFOLIO_DATA = {
  // 프로필 정보 (나만 편집 가능한 자기소개란 연동)
  profile: {
    name: "홍길동",
    role: "크리에이티브 프론트엔드 개발자",
    tagline: "사용자 중심의 웹 경험과 아름다운 인터랙션을 만드는 프론트엔드 개발자입니다.",
    bio: `안녕하세요! 몰입감 높은 웹 경험을 전달하는 프론트엔드 개발자 홍길동입니다.
UI/UX 디자인과 프론트엔드 엔지니어링의 경계를 허물며, 깔끔한 모듈형 코드와 뛰어난 가독성을 지향합니다.
새로운 프론트엔드 기술을 탐구하고 서비스 완성도를 높이는 것에 열정을 느끼며 동료들과 지식을 공유하는 것을 즐깁니다.`,
    tags: ["HTML5/CSS3", "JavaScript (ES6+)", "React", "UI/UX Design", "Responsive Web"]
  },

  // 기술 스택 목록
  skills: [
    {
      category: "Frontend Core",
      icon: "⚡",
      items: ["HTML5", "CSS3 / Modern Standard", "JavaScript (ES6+)", "TypeScript", "React"]
    },
    {
      category: "Styling & UI Systems",
      icon: "🎨",
      items: ["CSS Glassmorphism", "CSS Variables Tokens", "Flexbox / Grid Layout", "Responsive Web Design"]
    },
    {
      category: "Tools & Workflow",
      icon: "🛠️",
      items: ["Git & GitHub", "VS Code", "Vite / Webpack", "Figma", "Vercel / Netlify"]
    }
  ],

  // 대표 작업물(프로젝트) 목록
  projects: [
    {
      id: "project-1",
      title: "포춘 쿠키 오늘의 명언 웹 앱",
      summary: "쿠키를 클릭하면 인터랙티브한 반 쪼개짐 애니메이션과 함께 오늘의 명언 및 운세를 제공하는 모던 웹 앱.",
      detail: `클릭 시 포춘 쿠키가 쪼개지며 애니메이션 효과와 함께 오늘의 명언이 나타나는 웹 프로젝트입니다.
Vanilla JavaScript와 CSS Keyframe 애니메이션을 사용하여 높은 몰입감을 전해줍니다.`,
      tags: ["HTML5", "CSS Animation", "JavaScript"],
      demoUrl: "https://example.com/fortune-cookie",
      githubUrl: "https://github.com/example/fortune-cookie",
      icon: "🥠"
    },
    {
      id: "project-2",
      title: "개인 포트폴리오 웹사이트 & Admin 관리자",
      summary: "어드민 모드를 통해 실시간으로 자기소개를 수정하고 로컬 스토리지에 동적 저장하는 다크 슬레이트 테마 포트폴리오.",
      detail: `Glassmorphic 디자인 시스템을 적용하여 제작한 개인 포트폴리오 웹사이트입니다.
관리자 인증(비밀번호: 1234)을 통해 웹 브라우저 상에서 자기소개를 직접 편집하고 저장할 수 있습니다.`,
      tags: ["JavaScript ES6", "Glassmorphism", "LocalStorage", "CSS Variables"],
      demoUrl: "#",
      githubUrl: "https://github.com/example/portfolio",
      icon: "🚀"
    },
    {
      id: "project-3",
      title: "인터랙티브 웹 대시보드 컴포넌트",
      summary: "실시간 반응형 그래프와 데이터 카드 컴포넌트를 제공하는 크리에이티브 프론트엔드 대시보드 라이브러리.",
      detail: `다양한 차트 및 통계 데이터 카드를 모듈형 컴포넌트로 구성한 UI 프로젝트입니다.
모바일 및 데스크톱 브레이크포인트에 유연하게 대응합니다.`,
      tags: ["React", "CSS Modules", "Chart.js", "UI/UX"],
      demoUrl: "https://example.com/dashboard",
      githubUrl: "https://github.com/example/dashboard",
      icon: "📊"
    }
  ]
};

// 2. LocalStorage 스토리지 키 명칭
const STORAGE_KEY = "MY_PORTFOLIO_DATA_V1";
const ADMIN_AUTH_KEY = "IS_ADMIN_AUTHENTICATED";

/**
 * 포트폴리오 데이터 불러오기 함수
 * (LocalStorage에 저장된 데이터가 존재하면 반환하고, 없으면 초기 기본값 사용)
 */
export function getPortfolioData() {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      return JSON.parse(savedData);
    } catch (e) {
      console.error("데이터 파싱 실패, 기본 데이터를 사용합니다.", e);
    }
  }
  return INITIAL_PORTFOLIO_DATA;
}

/**
 * 포트폴리오 데이터 저장 함수 (자기소개 편집 등 변경사항 발생 시 호출)
 */
export function savePortfolioData(newData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
}

/**
 * 어드민 로그인 상태 확인 함수
 */
export function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

/**
 * 어드민 로그인 성공 처리 함수
 */
export function setAdminLoggedIn(status) {
  if (status) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
  } else {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}
