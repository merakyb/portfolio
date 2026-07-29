/**
 * ==========================================================================
 * 3. 로딩 화면 (Loading Screen) 컴포넌트 모듈 (js/components/LoadingSection.js)
 * prd.md 4.3절 전송 로딩 사양 및 design.md 준수
 * ==========================================================================
 */

export function renderLoadingSection(onComplete) {
  const container = document.getElementById('main-content');
  if (!container) return;

  const messages = [
    "📊 12개 질문의 창업 성향 답변을 분석하고 있습니다...",
    "💡 나의 핵심 강점과 리스크 파악 중...",
    "🤝 대학생 창업 캠프 찰떡궁합 팀원 조합을 매칭 중...",
    "✨ 나만의 창업가 페르소나 리포트 완성!"
  ];

  container.innerHTML = `
    <section class="loading-section page-enter">
      <div class="loading-card">
        <!-- 중앙 glowing 스피너 & 아이콘 -->
        <div class="loading-spinner-wrapper">
          <div class="loading-spinner-ring"></div>
          <span class="loading-center-icon" id="loading-icon">🚀</span>
        </div>

        <h2 class="loading-title">성향 진단 리포트 생성 중</h2>

        <!-- 동적 순환 메시지 상자 -->
        <div class="loading-status-box">
          <p class="loading-status-message" id="loading-msg">${messages[0]}</p>
        </div>

        <!-- 0~100% 충전 프로그레스 바 -->
        <div class="loading-bar-wrapper">
          <div class="loading-bar-fill" id="loading-fill"></div>
        </div>
      </div>
    </section>
  `;

  const fillBar = document.getElementById('loading-fill');
  const msgEl = document.getElementById('loading-msg');
  const iconEl = document.getElementById('loading-icon');

  const icons = ["🚀", "💡", "🤝", "✨"];
  let step = 0;
  const totalDuration = 2200; // 약 2.2초 소요
  const intervalTime = 50;
  let elapsed = 0;

  const timer = setInterval(() => {
    elapsed += intervalTime;
    const pct = Math.min(Math.round((elapsed / totalDuration) * 100), 100);

    if (fillBar) {
      fillBar.style.width = `${pct}%`;
    }

    // 0.5초마다 메시지 및 아이콘 변경
    if (elapsed % 500 === 0 && step < messages.length - 1) {
      step++;
      if (msgEl) {
        msgEl.style.opacity = 0;
        setTimeout(() => {
          msgEl.textContent = messages[step];
          if (iconEl) iconEl.textContent = icons[step] || "✨";
          msgEl.style.opacity = 1;
        }, 150);
      }
    }

    if (elapsed >= totalDuration) {
      clearInterval(timer);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 200);
    }
  }, intervalTime);
}
