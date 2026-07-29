/**
 * ==========================================================================
 * 포트폴리오 메인 애플리케이션 진입점 (app.js)
 * 전체 데이터 불러오기 및 각 모듈별 컴포넌트 렌더링, 이벤트를 초기화합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

import { getPortfolioData, fetchPortfolioDataFromSupabase } from './data.js';
import { renderHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderAboutSection } from './components/AboutSection.js';
import { renderProjectsSection } from './components/ProjectsSection.js';
import { renderSkillsSection } from './components/SkillsSection.js';
import { renderContactSection } from './components/ContactSection.js';
import { renderModal } from './components/Modal.js';

// DOM 콘텐츠 로드 완료 시 애플리케이션 시작
document.addEventListener('DOMContentLoaded', async () => {
  // 1. 1차 즉시 데이터 로드 (LocalStorage 또는 기본 스키마)
  let data = getPortfolioData();

  // 2. 모달 컴포넌트 초기화 및 핸들러 받아오기
  const modalControls = renderModal(() => {
    initApp();
  });

  // 3. 메인 앱 렌더링 함수
  function initApp() {
    renderHeader(() => {
      modalControls.openAdminModal();
    });

    renderHero(data);

    renderAboutSection(data, () => {
      renderHero(data);
    });

    renderProjectsSection(data, (selectedProject) => {
      modalControls.openProjectModal(selectedProject);
    });

    renderSkillsSection(data);

    renderContactSection();
  }

  // 1차 UI 실행
  initApp();

  // 4. Supabase DB 비동기 로딩 (서버 데이터 존재 시 화면 갱신)
  const remoteData = await fetchPortfolioDataFromSupabase();
  if (remoteData) {
    Object.assign(data, remoteData);
    initApp();
  }
});
