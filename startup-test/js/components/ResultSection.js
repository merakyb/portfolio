/**
 * ==========================================================================
 * 4. 결과 화면 (Result Screen) 컴포넌트 모듈 (js/components/ResultSection.js)
 * 동기적 클릭 제스처 처리 기반 카카오톡 공유 기능 (팝업 블록 원천 차단)
 * ==========================================================================
 */

import { calculateResult, getResultByTypeId } from '../data.js';

let cachedKakaoKey = '23dc99b3bfb66263502e0613cb1424a3';

// 백그라운드 키 사전 로드 (클릭 제스처 지연 방지)
try {
  fetch('/api/config')
    .then(res => res.ok ? res.json() : null)
    .then(data => {
      if (data && data.kakaoKey) {
        cachedKakaoKey = data.kakaoKey;
      }
    })
    .catch(() => {});
} catch (e) {}

export function renderResultSection(userAnswers, onRestartClick, sharedTypeId, sharedSubId) {
  const container = document.getElementById('main-content');
  if (!container) return;

  const resultData = (userAnswers && userAnswers.length > 0)
    ? calculateResult(userAnswers)
    : getResultByTypeId(sharedTypeId, sharedSubId);

  const { mainType, subType, scorePercentages } = resultData;

  container.innerHTML = `
    <section class="result-section page-enter">
      <!-- 1. 대표 메인 유형 헤더 카드 -->
      <div class="result-header-card reveal-1">
        <div class="result-badge-row">
          <span class="result-subtitle-tag">나의 창업가 페르소나</span>
          <span class="sub-type-badge">부성향: ${subType.title.split(' ')[1]} ${subType.icon}</span>
        </div>
        <div class="result-type-icon">${mainType.icon}</div>
        <h1 class="result-type-title">${mainType.title}</h1>
        <p class="result-type-tagline">"${mainType.tagline}"</p>
        <p class="result-summary-text">${mainType.summary}</p>
      </div>

      <!-- 2. 6축 성향 레이더 차트 컨테이너 -->
      <div class="chart-container-box reveal-2">
        <div class="chart-header">
          <h3 class="chart-title">📊 6대 창업 역량 수치 분포</h3>
          <span class="chart-subtext">100% 정규화 점수 기준</span>
        </div>
        <div class="radar-chart-wrapper">
          <canvas id="radar-canvas" width="320" height="280"></canvas>
        </div>
      </div>

      <!-- 3. 핵심 강점, 주의점 및 추천 역할 카테고리 -->
      <div class="details-grid reveal-3">
        <!-- 강점 카드 -->
        <div class="detail-card strengths">
          <div class="detail-card-title">
            <span>✨ 나의 핵심 강점 (Top Strengths)</span>
          </div>
          <ul class="detail-list">
            ${mainType.strengths.map(s => `<li class="detail-item">${s}</li>`).join('')}
          </ul>
        </div>

        <!-- 주의할 점 카드 -->
        <div class="detail-card blindspots">
          <div class="detail-card-title">
            <span>⚠️ 주의할 점 & 리스크 (Blind Spots)</span>
          </div>
          <ul class="detail-list">
            ${mainType.blindspots.map(b => `<li class="detail-item">${b}</li>`).join('')}
          </ul>
        </div>

        <!-- 추천 역할 카드 -->
        <div class="detail-card roles">
          <div class="detail-card-title">
            <span>🎯 캠프 추천 C-Level 역할</span>
          </div>
          <p class="best-role-title">
            ${mainType.bestRole}
          </p>
        </div>
      </div>

      <!-- 4. 찰떡궁합 팀원 조합 가이드 박스 -->
      <div class="synergy-box reveal-4">
        <div class="synergy-title">
          <span>🤝 대학생 창업 캠프 팀원 궁합 가이드</span>
        </div>

        <div class="synergy-pair synergy-best">
          <div>
            <div class="synergy-label">환상의 짝꿍 시너지 🟢</div>
            <div class="synergy-target">${mainType.synergy.bestPartner}</div>
          </div>
        </div>
        <p class="synergy-desc">${mainType.synergy.bestPartnerDesc}</p>

        <div class="synergy-pair synergy-caution" style="margin-top: 14px;">
          <div>
            <div class="synergy-label">조율이 필요한 상극 🔴</div>
            <div class="synergy-target">${mainType.synergy.cautionPartner}</div>
          </div>
        </div>
        <p class="synergy-desc">${mainType.synergy.cautionPartnerDesc}</p>
      </div>

      <!-- 5. 카카오톡 공유하기 및 액션 버튼 바 -->
      <div class="share-action-bar reveal-5">
        <button id="kakao-share-btn" class="btn btn-kakao">
          <span>💬 카카오톡 공유하기</span>
        </button>

        <div class="share-buttons-row">
          <button id="copy-link-btn" class="btn btn-secondary">
            <span>🔗 링크 복사</span>
          </button>
          <button id="download-card-btn" class="btn btn-secondary">
            <span>📸 이미지 저장</span>
          </button>
          <button id="restart-btn" class="btn btn-secondary">
            <span>🔄 다시하기</span>
          </button>
        </div>
      </div>
    </section>
  `;

  // 레이더 차트 Canvas 그리기 실행
  drawRadarChart(scorePercentages);

  // 이벤트 핸들러 등록 (동기식 직접 실행으로 팝업 차단 방지)
  const kakaoBtn = document.getElementById('kakao-share-btn');
  if (kakaoBtn) {
    kakaoBtn.addEventListener('click', () => {
      handleKakaoShare(mainType, subType);
    });
  }

  const copyBtn = document.getElementById('copy-link-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      const shareUrl = `${window.location.origin}${window.location.pathname}?type=${mainType.id}&sub=${subType.id}`;
      navigator.clipboard.writeText(shareUrl).then(() => {
        alert('결과 페이지 링크가 클립보드에 복사되었습니다!\n창업 캠프 팀원들과 공유해 보세요 🚀');
      }).catch(() => {
        alert(`공유 링크: ${shareUrl}`);
      });
    });
  }

  const downloadBtn = document.getElementById('download-card-btn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      downloadResultImage(mainType);
    });
  }

  const restartBtn = document.getElementById('restart-btn');
  if (restartBtn && onRestartClick) {
    restartBtn.addEventListener('click', () => {
      onRestartClick();
    });
  }
}

/**
 * 카카오톡 공유하기 처리 함수 (동기식 직접 호출 기반 - 브라우저 팝업 블록 원천 차단)
 */
function handleKakaoShare(mainType, subType) {
  try {
    const KakaoSDK = window.Kakao;
    const currentUrl = `${window.location.origin}${window.location.pathname}?type=${mainType.id}&sub=${subType.id}`;
    const startUrl = `${window.location.origin}${window.location.pathname}`;

    if (KakaoSDK) {
      if (!KakaoSDK.isInitialized()) {
        KakaoSDK.init(cachedKakaoKey);
      }

      const sharePayload = {
        objectType: 'feed',
        content: {
          title: `나는 어떤 창업가일까? | ${mainType.title}`,
          description: `"${mainType.tagline}" - 나의 창업가 페르소나와 찰떡궁합 팀원 조합을 확인해보세요!`,
          imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop',
          link: {
            mobileWebUrl: currentUrl,
            webUrl: currentUrl
          }
        },
        social: {
          likeCount: 1280,
          sharedCount: 340
        },
        buttons: [
          {
            title: '결과 자세히 보기',
            link: {
              mobileWebUrl: currentUrl,
              webUrl: currentUrl
            }
          },
          {
            title: '나도 진단하기',
            link: {
              mobileWebUrl: startUrl,
              webUrl: startUrl
            }
          }
        ]
      };

      if (KakaoSDK.Share && typeof KakaoSDK.Share.sendDefault === 'function') {
        KakaoSDK.Share.sendDefault(sharePayload);
        return;
      } else if (KakaoSDK.Link && typeof KakaoSDK.Link.sendDefault === 'function') {
        KakaoSDK.Link.sendDefault(sharePayload);
        return;
      }
    }

    // 2. 모바일 네이티브 Web Share API 폴백 (카카오톡 포함 스마트폰 공유 모달 실행)
    if (navigator.share) {
      navigator.share({
        title: `나는 어떤 창업가일까? | ${mainType.title}`,
        text: `"${mainType.tagline}" - 나의 창업가 페르소나와 찰떡궁합 팀원 조합을 확인해보세요!`,
        url: currentUrl
      }).catch(() => {});
      return;
    }

    // 3. 클립보드 복사 폴백
    navigator.clipboard.writeText(currentUrl);
    alert(`[결과 링크 복사 완료]\n결과 주소가 클립보드에 복사되었습니다.\n\n공유 주소: ${currentUrl}`);

  } catch (err) {
    console.error('Kakao share error:', err);
    alert(`결과 공유 주소: ${window.location.href}`);
  }
}

/**
 * Native Canvas 6축 레이더 차트 렌더링 함수
 */
function drawRadarChart(scores) {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const width = canvas.width;
  const height = canvas.height;
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 44;

  const labels = ['아이디어', '제작', '전략', '협업', '분석', '실행'];
  const keys = ['visionary', 'maker', 'strategist', 'connector', 'analyst', 'driver'];
  const numAxes = labels.length;
  const angleStep = (Math.PI * 2) / numAxes;

  ctx.clearRect(0, 0, width, height);
  ctx.strokeStyle = '#E2E8F0';
  ctx.lineWidth = 1.5;

  for (let level = 1; level <= 3; level++) {
    const levelRadius = (radius / 3) * level;
    ctx.beginPath();
    for (let i = 0; i < numAxes; i++) {
      const angle = i * angleStep - Math.PI / 2;
      const x = centerX + levelRadius * Math.cos(angle);
      const y = centerY + levelRadius * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.stroke();
  }

  ctx.font = 'bold 12px Pretendard, sans-serif';
  ctx.fillStyle = '#475569';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  for (let i = 0; i < numAxes; i++) {
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + radius * Math.cos(angle);
    const y = centerY + radius * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(x, y);
    ctx.stroke();

    const labelX = centerX + (radius + 24) * Math.cos(angle);
    const labelY = centerY + (radius + 24) * Math.sin(angle);
    ctx.fillText(labels[i], labelX, labelY);
  }

  ctx.beginPath();
  for (let i = 0; i < numAxes; i++) {
    const key = keys[i];
    const scoreVal = scores[key] !== undefined ? scores[key] : 50;
    const valPercent = Math.max(scoreVal / 100, 0.25);
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + radius * valPercent * Math.cos(angle);
    const y = centerY + radius * valPercent * Math.sin(angle);

    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();

  ctx.fillStyle = 'rgba(79, 70, 229, 0.22)';
  ctx.fill();
  ctx.strokeStyle = '#4F46E5';
  ctx.lineWidth = 3;
  ctx.stroke();

  for (let i = 0; i < numAxes; i++) {
    const key = keys[i];
    const scoreVal = scores[key] !== undefined ? scores[key] : 50;
    const valPercent = Math.max(scoreVal / 100, 0.25);
    const angle = i * angleStep - Math.PI / 2;
    const x = centerX + radius * valPercent * Math.cos(angle);
    const y = centerY + radius * valPercent * Math.sin(angle);

    ctx.beginPath();
    ctx.arc(x, y, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#4F46E5';
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

/**
 * 결과 요약 이미지 캔버스 생성 및 다운로드 함수
 */
function downloadResultImage(mainType) {
  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = 600;
  tempCanvas.height = 700;
  const ctx = tempCanvas.getContext('2d');

  const grad = ctx.createLinearGradient(0, 0, 600, 700);
  grad.addColorStop(0, '#4F46E5');
  grad.addColorStop(1, '#7C3AED');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 600, 700);

  ctx.fillStyle = '#FFFFFF';
  ctx.roundRect ? ctx.roundRect(40, 40, 520, 620, 24) : ctx.fillRect(40, 40, 520, 620);
  ctx.fill();

  ctx.fillStyle = '#4F46E5';
  ctx.font = 'bold 22px Pretendard, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText('🚀 대학생 창업 성향 진단 리포트', 300, 100);

  ctx.font = '80px Pretendard, sans-serif';
  ctx.fillText(mainType.icon, 300, 210);

  ctx.fillStyle = '#0F172A';
  ctx.font = 'bold 36px Pretendard, sans-serif';
  ctx.fillText(mainType.title, 300, 280);

  ctx.fillStyle = '#475569';
  ctx.font = '20px Pretendard, sans-serif';
  ctx.fillText(`"${mainType.tagline}"`, 300, 330);

  ctx.fillStyle = '#065F46';
  ctx.font = 'bold 22px Pretendard, sans-serif';
  ctx.fillText(`🤝 환상의 짝꿍: ${mainType.synergy.bestPartner}`, 300, 430);

  ctx.fillStyle = '#94A3B8';
  ctx.font = '16px Pretendard, sans-serif';
  ctx.fillText('대학생 창업 캠프 팀 빌딩 리포트', 300, 600);

  const link = document.createElement('a');
  link.download = `창업성향결과_${mainType.title.replace(/[^a-zA-Z0-9가-힣]/g, '')}.png`;
  link.href = tempCanvas.toDataURL('image/png');
  link.click();
}
