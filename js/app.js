/**
 * ==========================================================================
 * 포트폴리오 메인 애플리케이션 진입점 (app.js)
 * 전체 데이터 불러오기 및 각 모듈별 컴포넌트 렌더링, 이벤트를 초기화합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

import { getPortfolioData } from './data.js';
import { renderHeader } from './components/Header.js';
import { renderHero } from './components/Hero.js';
import { renderAboutSection } from './components/AboutSection.js';
import { renderProjectsSection } from './components/ProjectsSection.js';
import { renderSkillsSection } from './components/SkillsSection.js';
import { renderContactSection } from './components/ContactSection.js';
import { renderModal } from './components/Modal.js';

// DOM 콘텐츠 로드 완료 시 애플리케이션 시작
document.addEventListener('DOMContentLoaded', () => {
  // 1. 저장소 또는 기본 스키마에서 데이터 로드
  const data = getPortfolioData();

  // 2. 모달 컴포넌트 초기화 및 핸들러 받아오기
  const modalControls = renderModal(() => {
    // 관리자 인증 성공 시 화면 갱신
    initApp();
  });

  // 3. 메인 앱 렌더링 함수
  function initApp() {
    // 헤더 컴포넌트 렌더링
    renderHeader(() => {
      // 관리자 버튼 클릭 시 인증 모달 열기
      modalControls.openAdminModal();
    });

    // 히로 섹션 렌더링
    renderHero(data);

    // 나만 편집 가능한 자기소개란 렌더링 (수정 시 재렌더링 처리)
    renderAboutSection(data, () => {
      // 자기소개 수정 성공 후 히로 카피 등 필요 시 갱신
      renderHero(data);
    });

    // 작업물 목록 섹션 렌더링 (카드 클릭 시 상세 모달 오픈)
    renderProjectsSection(data, (selectedProject) => {
      modalControls.openProjectModal(selectedProject);
    });

    // 기술 역량 섹션 렌더링
    renderSkillsSection(data);

    // 연락처 및 푸터 섹션 렌더링
    renderContactSection();
  }

  // 앱 렌더링 실행
  initApp();
});
