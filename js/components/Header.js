/**
 * ==========================================================================
 * 헤더 컴포넌트 모듈 (Header.js)
 * 상단 네비게이션 바 및 어드민 모드 진입/로그아웃 트리거를 담당합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

import { isAdminLoggedIn, setAdminLoggedIn } from '../data.js';

export function renderHeader(onAdminClick) {
  const container = document.getElementById('header-container');
  if (!container) return;

  const loggedIn = isAdminLoggedIn();

  container.innerHTML = `
    <header class="header">
      <div class="container header-container">
        <!-- 메인 브랜드 로고 -->
        <a href="#" class="header-logo">
          <span>PORTFOLIO</span>
          <span class="logo-dot"></span>
        </a>

        <!-- 네비게이션 서브 메뉴 -->
        <nav class="header-nav">
          <a href="#about" class="nav-link">소개 (About)</a>
          <a href="#projects" class="nav-link">작업물 (Projects)</a>
          <a href="#skills" class="nav-link">기술 스택 (Skills)</a>
          <a href="#contact" class="nav-link">연락처 (Contact)</a>
        </nav>

        <!-- 우측 어드민 조작 버튼 -->
        <div class="header-actions">
          ${loggedIn ? `
            <span class="admin-badge">
              <span>●</span> 관리자 인증됨
            </span>
            <button id="admin-toggle-btn" class="admin-btn">로그아웃</button>
          ` : `
            <button id="admin-toggle-btn" class="admin-btn">
              <span>🔒</span> Admin
            </button>
          `}
        </div>
      </div>
    </header>
  `;

  // 관리자 버튼 클릭 이벤트 리스너 등록
  const adminBtn = document.getElementById('admin-toggle-btn');
  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      if (isAdminLoggedIn()) {
        // 이미 로그인된 상태라면 로그아웃 실행
        if (confirm('관리자 모드에서 로그아웃하시겠습니까?')) {
          setAdminLoggedIn(false);
          window.location.reload();
        }
      } else {
        // 비밀번호 입력 모달 팝업 오픈 요청
        if (onAdminClick) onAdminClick();
      }
    });
  }
}
