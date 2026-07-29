/**
 * ==========================================================================
 * 2. 테스트 진행 화면 (Test Progress Screen) 컴포넌트 모듈 (js/components/QuestionSection.js)
 * prd.md 4.2절 및 design.md 디자인 가이드라인 준수
 * ==========================================================================
 */

import { QUESTIONS_DATA } from '../data.js';

export function renderQuestionSection(currentIndex, userAnswers, onSelectOption, onPrevClick) {
  const container = document.getElementById('main-content');
  if (!container) return;

  const currentQ = QUESTIONS_DATA[currentIndex];
  if (!currentQ) return;

  const totalQuestions = QUESTIONS_DATA.length;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);
  const selectedOptionIndex = userAnswers[currentIndex] ? userAnswers[currentIndex].optionIndex : null;

  container.innerHTML = `
    <section class="question-section page-enter">
      <!-- 1. 프로그레스 바 상단 레이아웃 -->
      <div class="progress-container">
        <div class="progress-info">
          <span class="progress-label">✨ 창업 성향 진단 진행 중</span>
          <span class="progress-count"><strong class="highlight-count">${currentIndex + 1}</strong> / ${totalQuestions}</span>
        </div>
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width: ${progressPercent}%;"></div>
        </div>
      </div>

      <!-- 2. 질문 문항 헤더 카드 -->
      <div class="question-card">
        <div class="question-number-badge">Question ${currentQ.number}</div>
        <h2 class="question-title">${currentQ.title}</h2>
      </div>

      <!-- 3. 2개 선택지 카드 리스트 (Option A & B) -->
      <div class="options-list">
        ${currentQ.options.map((opt, idx) => {
          const isSelected = selectedOptionIndex === idx;
          return `
            <div class="option-card ${isSelected ? 'selected' : ''}" data-index="${idx}" tabindex="0">
              <div class="option-badge">${idx === 0 ? 'A' : 'B'}</div>
              <div class="option-text">${opt.text}</div>
              <div class="option-check-icon">
                <span>${isSelected ? '✓' : ''}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 4. 하단 네비게이션 액션 바 -->
      <div class="question-nav">
        <button id="prev-question-btn" class="btn btn-secondary btn-prev">
          <span>← ${currentIndex === 0 ? '시작 화면으로' : '이전 질문'}</span>
        </button>
        <span class="question-step-hint">선택지를 누르면 다음 문항으로 이동합니다.</span>
      </div>
    </section>
  `;

  // 선택지 카드 클릭 이벤트 등록 (시각적 선택 피드백 후 220ms 자동 이동)
  const optionCards = container.querySelectorAll('.option-card');
  optionCards.forEach(card => {
    card.addEventListener('click', () => {
      optionCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');

      const checkIcon = card.querySelector('.option-check-icon span');
      if (checkIcon) checkIcon.textContent = '✓';

      const idx = parseInt(card.getAttribute('data-index'), 10);

      setTimeout(() => {
        onSelectOption(idx);
      }, 220);
    });

    // 키보드 엔터/스페이스바 대응
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        card.click();
      }
    });
  });

  // 이전 질문/시작 화면으로 돌아가기 버튼 이벤트 등록
  const prevBtn = document.getElementById('prev-question-btn');
  if (prevBtn && onPrevClick) {
    prevBtn.addEventListener('click', () => {
      onPrevClick();
    });
  }
}
