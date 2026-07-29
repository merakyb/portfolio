/**
 * ==========================================================================
 * 히로 섹션 컴포넌트 모듈 (Hero.js)
 * 상단 메인 브랜드 비주얼, 한 줄 가치관 카피 및 CTA 실행 버튼을 렌더링합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

export function renderHero(data) {
  const container = document.getElementById('hero-container');
  if (!container) return;

  const { profile } = data;

  container.innerHTML = `
    <section class="hero">
      <div class="container">
        <!-- 상단 가동 중 상태 알약 배지 -->
        <div class="hero-badge">
          <span class="status-dot"></span>
          <span>새로운 프로젝트 및 협업 가능</span>
        </div>

        <!-- 메인 헤드라인 타임라인 -->
        <h1 class="hero-title">
          안녕하세요, <span class="gradient-text">${profile.name}</span>입니다.<br>
          ${profile.role}
        </h1>

        <!-- 서브 한 줄 카피 문구 -->
        <p class="hero-description">
          ${profile.tagline}
        </p>

        <!-- 핵심 스킬 키워드 알약 리스트 -->
        <div class="hero-tags">
          ${profile.tags.map(tag => `<span class="tag-pill">#${tag}</span>`).join('')}
        </div>

        <!-- CTA 주요 실행 버튼 그룹 -->
        <div class="hero-cta">
          <a href="#projects" class="btn btn-primary">
            <span>작업물 구경하기</span>
            <span>➔</span>
          </a>
          <a href="#contact" class="btn btn-secondary">
            <span>연락하기</span>
          </a>
        </div>
      </div>
    </section>
  `;
}
