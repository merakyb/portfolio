/**
 * ==========================================================================
 * 메인 애플리케이션 진입점 (js/app.js)
 * 상태 관리 및 랜딩/질문/로딩/결과 페이지 전환을 총괄합니다.
 * ==========================================================================
 */

import { QUESTIONS_DATA, PERSONALITY_RESULTS } from './data.js';
import { renderHeader } from './components/Header.js';
import { renderHeroSection } from './components/HeroSection.js';
import { renderQuestionSection } from './components/QuestionSection.js';
import { renderLoadingSection } from './components/LoadingSection.js';
import { renderResultSection } from './components/ResultSection.js';

// 애플리케이션 상태 (State)
const STATE = {
  view: 'LANDING',       // 'LANDING' | 'TEST' | 'LOADING' | 'RESULT' | 'SHARED_RESULT'
  currentQuestionIndex: 0,
  userAnswers: [],       // [{ questionId, optionIndex, scores }]
  sharedTypeId: null,
  sharedSubId: null
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  // 상단 헤더 렌더링 (로고 클릭 시 메인 초기화)
  renderHeader(() => resetTest());

  // URL 쿼리 파라미터 공유 링크 체크 (?type=visionary&sub=maker)
  const urlParams = new URLSearchParams(window.location.search);
  const typeParam = urlParams.get('type');
  const subParam = urlParams.get('sub');

  if (typeParam && PERSONALITY_RESULTS[typeParam]) {
    STATE.view = 'SHARED_RESULT';
    STATE.sharedTypeId = typeParam;
    STATE.sharedSubId = subParam || 'maker';
  }

  // 현재 뷰 상태에 따른 렌더링 라우팅
  renderView();
}

function renderView() {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  switch (STATE.view) {
    case 'LANDING':
      renderHeroSection(() => startTest());
      break;

    case 'TEST':
      renderQuestionSection(
        STATE.currentQuestionIndex,
        STATE.userAnswers,
        (optionIndex) => handleSelectOption(optionIndex),
        () => handlePrevQuestion()
      );
      break;

    case 'LOADING':
      renderLoadingSection(() => {
        STATE.view = 'RESULT';
        renderView();
      });
      break;

    case 'SHARED_RESULT':
      renderResultSection(
        null,
        () => resetTest(),
        STATE.sharedTypeId,
        STATE.sharedSubId
      );
      break;

    case 'RESULT':
      renderResultSection(
        STATE.userAnswers,
        () => resetTest()
      );
      break;

    default:
      renderHeroSection(() => startTest());
  }
}

/**
 * 테스트 시작
 */
function startTest() {
  STATE.view = 'TEST';
  STATE.currentQuestionIndex = 0;
  STATE.userAnswers = [];
  renderView();
}

/**
 * 선택지 클릭 핸들러
 */
function handleSelectOption(optionIndex) {
  const currentQ = QUESTIONS_DATA[STATE.currentQuestionIndex];
  const selectedOpt = currentQ.options[optionIndex];

  // 사용자 선택값 저장
  STATE.userAnswers[STATE.currentQuestionIndex] = {
    questionId: currentQ.id,
    optionIndex: optionIndex,
    scores: selectedOpt.scores
  };

  // 다음 질문으로 이동 or 로딩 화면으로 전환
  if (STATE.currentQuestionIndex < QUESTIONS_DATA.length - 1) {
    STATE.currentQuestionIndex++;
    renderView();
  } else {
    // 모든 12개 질문 답변 완료 시 로딩 화면 전환 ➔ 결과 페이지 연동
    STATE.view = 'LOADING';
    renderView();
  }
}

/**
 * 이전 질문으로 이동
 */
function handlePrevQuestion() {
  if (STATE.currentQuestionIndex > 0) {
    STATE.currentQuestionIndex--;
    renderView();
  } else {
    STATE.view = 'LANDING';
    renderView();
  }
}

/**
 * 테스트 메인으로 초기화
 */
function resetTest() {
  if (window.history && window.history.pushState) {
    const cleanUrl = `${window.location.origin}${window.location.pathname}`;
    window.history.pushState({}, '', cleanUrl);
  }
  STATE.view = 'LANDING';
  STATE.currentQuestionIndex = 0;
  STATE.userAnswers = [];
  STATE.sharedTypeId = null;
  STATE.sharedSubId = null;
  renderView();
}
