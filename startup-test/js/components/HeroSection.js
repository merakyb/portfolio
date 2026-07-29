/**
 * ==========================================================================
 * 1. 시작 화면 (Start/Landing Screen) 컴포넌트 모듈 (js/components/HeroSection.js)
 * prd.md 4.1절 및 design.md 디자인 가이드라인 준수
 * ==========================================================================
 */

import { PERSONALITY_RESULTS } from '../data.js';

export function renderHeroSection(onStartClick) {
  const container = document.getElementById('main-content');
  if (!container) return;

  const typesList = [
    { id: 'visionary', name: '아이디어형', icon: '💡', desc: '창의적인 비전 제시' },
    { id: 'maker', name: '제작형', icon: '🛠️', desc: '손 끝에서 탄생하는 MVP' },
    { id: 'strategist', name: '전략형', icon: '📊', desc: '치밀한 BM & 로드맵' },
    { id: 'connector', name: '협업형', icon: '🤝', desc: '팀워크 & 네트워킹' },
    { id: 'analyst', name: '분석형', icon: '🔍', desc: '데이터 & 리스크 파수꾼' },
    { id: 'driver', name: '실행형', icon: '🚀', desc: '폭발적인 현장 추진력' }
  ];

  container.innerHTML = `
    <section class="hero-section page-enter">
      <!-- Top Tag Badge -->
      <div class="hero-tag">
        <span class="hero-tag-pulse"></span>
        <span>✨ 2026 대학생 창업가 역량 진단</span>
      </div>

      <!-- Main Headline -->
      <h1 class="hero-title">
        나는 어떤 창업가일까?<br>
        <span class="highlight">3초 만에 알아보는</span> 나의 성향
      </h1>

      <p class="hero-description">
        창업 상황 질문 12개에 답하고,<br>
        <strong>나의 창업가 페르소나</strong>와 <strong>찰떡궁합 팀원 조합</strong>을 확인해보세요!
      </p>

      <!-- 캠프 특화 요약 기능 3대 포인트 -->
      <div class="hero-feature-pills">
        <div class="feature-pill">
          <span class="pill-icon">⏱️</span>
          <span>소요시간 <strong>2분</strong></span>
        </div>
        <div class="feature-pill">
          <span class="pill-icon">📊</span>
          <span><strong>6축</strong> 역량 그래프</span>
        </div>
        <div class="feature-pill">
          <span class="pill-icon">🤝</span>
          <span><strong>팀원 궁합</strong> 제공</span>
        </div>
      </div>

      <!-- 6대 창업 성향 인터랙티브 카드 그리드 -->
      <div class="hero-grid-header">
        <span>6가지 창업 성향 유형</span>
      </div>

      <div class="personality-types-grid">
        ${typesList.map(t => `
          <div class="type-card-mini" data-type-id="${t.id}" title="${t.desc}">
            <span class="type-icon">${t.icon}</span>
            <span class="type-label">${t.name}</span>
            <span class="type-subtext">${t.desc}</span>
          </div>
        `).join('')}
      </div>

      <!-- 유형 미리보기 모달/설명 토스트 박스 -->
      <div id="type-preview-box" class="type-preview-box" style="display: none;">
        <span id="preview-icon">💡</span>
        <div class="preview-text">
          <div id="preview-title" class="preview-title">아이디어형 (Visionary)</div>
          <div id="preview-desc" class="preview-desc">남들이 보지 못하는 새로운 아이디어를 제시합니다.</div>
        </div>
      </div>

      <!-- 메인 시작하기 CTA 버튼 -->
      <div class="hero-cta-wrapper">
        <button id="start-test-btn" class="btn btn-primary btn-hero-cta">
          <span>내 창업 성향 테스트 시작하기 🚀</span>
        </button>
        <span class="cta-sub-badge">⚡ 100% 무료 / 회원가입 없이 바로 확인</span>
      </div>

      <!-- 소셜 프로프 푸터 노트 -->
      <div class="hero-footer-note">
        <span class="fire-icon">🔥</span>
        <span>현재까지 <strong>1,280+명</strong>의 대학생 창업가가 진단했습니다!</span>
      </div>
    </section>
  `;

  // 시작 버튼 클릭 이벤트
  const startBtn = document.getElementById('start-test-btn');
  if (startBtn && onStartClick) {
    startBtn.addEventListener('click', () => {
      onStartClick();
    });
  }

  // 6대 성향 미니 카드 클릭 시 미니 설명 미리보기 토글
  const typeCards = container.querySelectorAll('.type-card-mini');
  const previewBox = document.getElementById('type-preview-box');
  const previewIcon = document.getElementById('preview-icon');
  const previewTitle = document.getElementById('preview-title');
  const previewDesc = document.getElementById('preview-desc');

  typeCards.forEach(card => {
    card.addEventListener('click', () => {
      typeCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      const typeId = card.getAttribute('data-type-id');
      const data = PERSONALITY_RESULTS[typeId];
      if (data && previewBox) {
        previewIcon.textContent = data.icon;
        previewTitle.textContent = data.title;
        previewDesc.textContent = data.tagline;
        previewBox.style.display = 'flex';
        previewBox.classList.remove('fadeInUp');
        void previewBox.offsetWidth; // trigger reflow
        previewBox.classList.add('fadeInUp');
      }
    });
  });
}
