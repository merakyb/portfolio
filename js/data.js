/**
 * ==========================================================================
 * 포트폴리오 메인 데이터 헬퍼 모듈 (data.js)
 * 초기 프로필 및 작업물 목록 스키마를 정의하고 LocalStorage & Supabase DB 동적 관리를 담당합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

// 1. 기본 초기 포트폴리오 데이터 스키마
export const INITIAL_PORTFOLIO_DATA = {
  profile: {
    name: "이터븀 / 윤여빈",
    role: "크리에이티브 백엔드 개발자",
    tagline: "안정적인 백엔드 시스템과 견고한 서버 아키텍처를 설계하는 크리에이티브 백엔드 개발자입니다.",
    bio: `안녕하세요! 서비스의 안정성과 확장성을 아우르는 백엔드 개발자 이터븀(윤여빈)입니다.
Spring Boot와 Java 환경에서 효율적인 데이터 모델링과 최적화된 RESTful API를 구축하는 것을 즐기며, 
대용량 트래픽 처리와 고가용성 시스템 서버 설계에 깊은 열정을 가지고 있습니다.
코드의 가독성 및 유지보수성을 중시하며, 문제의 원인을 끝까지 파헤치는 집요함으로 지속 가능한 서버 생태계를 만들어 갑니다.`,
    tags: ["Spring Boot", "Java", "MySQL", "JPA", "REST API", "Docker"]
  },
  skills: [
    {
      category: "Backend Core",
      icon: "☕",
      items: ["Java 17+", "Spring Boot", "Spring Security", "Spring Data JPA", "RESTful API Design"]
    },
    {
      category: "Database & Persistence",
      icon: "🗄️",
      items: ["MySQL", "PostgreSQL", "Redis Caching", "Database Indexing", "Query Optimization"]
    },
    {
      category: "Tools & Infrastructure",
      icon: "🛠️",
      items: ["Git & GitHub", "IntelliJ IDEA", "Docker", "AWS (EC2 / S3)", "Gradle", "JUnit5 / Mockito"]
    }
  ],
  projects: [
    {
      id: "project-1",
      title: "Spring Boot 기반 실시간 트래픽 분산 백엔드 시스템",
      summary: "Spring Boot, Redis 캐싱 및 MySQL 인덱싱 최적화를 적용하여 대용량 요청을 안정적으로 처리하는 API 서버 프로젝트.",
      detail: `대용량 트래픽 상황에서도 99.9% 서비스 안정성을 보장하기 위해 설계된 백엔드 프로젝트입니다.
Redis를 활용한 분산 락 및 토큰 저장소 구성, Spring Security 기반 JWT 인증/인가 체계 구축 경험이 포함되어 있습니다.`,
      tags: ["Java 17", "Spring Boot", "Redis", "MySQL", "JPA"],
      demoUrl: "#",
      githubUrl: "https://github.com/merakyb",
      icon: "🚀"
    },
    {
      id: "project-2",
      title: "개인 포트폴리오 웹사이트 & Admin 관리자",
      summary: "어드민 모드를 통해 실시간으로 자기소개를 수정하고 로컬 스토리지 및 Supabase DB에 동적 저장하는 다크 슬레이트 테마 포트폴리오.",
      detail: `Glassmorphic 디자인 시스템을 적용하여 제작한 개인 포트폴리오 웹사이트입니다.
관리자 인증(비밀번호: 0922)을 통해 웹 브라우저 상에서 자기소개를 직접 편집하고 저장할 수 있습니다.`,
      tags: ["JavaScript ES6", "Glassmorphism", "LocalStorage", "Supabase DB"],
      demoUrl: "#",
      githubUrl: "https://github.com/merakyb/portfolio",
      icon: "⚡"
    },
    {
      id: "project-3",
      title: "마이크로서비스 MSA 도메인 이벤트 핸들러",
      summary: "도메인 Event 기반 비동기 메시징 처리를 위한 Java/Spring 백엔드 아키텍처 라이브러리.",
      detail: `서비스 간 결합도를 낮추고 도메인 이벤트를 분산 환경에서 안전하게 발행/수신할 수 있도록 제작한 백엔드 모듈입니다.
Spring Event 및 비동기 처리(Async)를 활용하여 응답 시간을 혁신적으로 단축하였습니다.`,
      tags: ["Java", "Spring Event", "Async", "JUnit5"],
      demoUrl: "#",
      githubUrl: "https://github.com/merakyb",
      icon: "🛠️"
    }
  ]
};

const STORAGE_KEY = "MY_PORTFOLIO_DATA_V1";
const ADMIN_AUTH_KEY = "IS_ADMIN_AUTHENTICATED";

/**
 * LocalStorage 데이터 동기 조회 (즉시 렌더링용)
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
 * 서버리스 API (/api/portfolio)를 통해 DB 데이터 비동기 조회
 */
export async function fetchPortfolioDataFromSupabase() {
  try {
    const response = await fetch('/api/portfolio', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) return null;

    const result = await response.json();
    if (result && result.success && result.data) {
      return result.data;
    }
  } catch (e) {
    console.warn("서버리스 API 연동 오류, LocalStorage를 사용합니다.", e);
  }
  return null;
}

/**
 * 포트폴리오 데이터 저장 함수 (LocalStorage 및 서버리스 /api/portfolio API 동기화)
 */
export async function savePortfolioData(newData) {
  // 1. LocalStorage 저장
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));

  // 2. 서버리스 API 동기화
  try {
    const response = await fetch('/api/portfolio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newData)
    });

    const result = await response.json();
    if (result && result.success) {
      console.log("서버 DB 데이터가 성공적으로 업데이트되었습니다.");
    } else {
      console.warn("서버 DB 저장 경고:", result ? result.error : '오류 발생');
    }
  } catch (e) {
    console.error("서버 API 연동 오류:", e);
  }
}

export function isAdminLoggedIn() {
  return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
}

export function setAdminLoggedIn(status) {
  if (status) {
    sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
  } else {
    sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }
}
