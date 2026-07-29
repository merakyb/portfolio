/**
 * ==========================================================================
 * 상단 헤더 컴포넌트 모듈 (js/components/Header.js)
 * ==========================================================================
 */

export function renderHeader(onResetClick) {
  const container = document.getElementById('header-container');
  if (!container) return;

  container.innerHTML = `
    <header class="app-header">
      <a href="#" class="header-brand" id="header-logo-btn">
        <span>🚀 스타트업 성향 진단</span>
      </a>
      <span class="header-badge">대학생 창업캠프</span>
    </header>
  `;

  const logoBtn = document.getElementById('header-logo-btn');
  if (logoBtn && onResetClick) {
    logoBtn.addEventListener('click', (e) => {
      e.preventDefault();
      onResetClick();
    });
  }
}
