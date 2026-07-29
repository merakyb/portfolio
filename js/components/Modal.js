/**
 * ==========================================================================
 * 모달 팝업 컴포넌트 모듈 (Modal.js)
 * 관리자 비밀번호 인증 모달 및 프로젝트 상세보기 모달 팝업 제어를 담당합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

import { setAdminLoggedIn } from '../data.js';

export function renderModal(onAdminAuthSuccess) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  container.innerHTML = `
    <!-- 관리자 인증 전용 모달 -->
    <div id="admin-modal-overlay" class="modal-overlay">
      <div class="modal-container">
        <button id="admin-modal-close" class="modal-close-btn">&times;</button>
        <h3 class="modal-title">🔐 관리자(Admin) 비밀번호 인증</h3>
        <p class="modal-description">
          자기소개 텍스트를 직접 수정하고 관리하려면 비밀번호를 입력해 주세요.<br>
          <small style="color: var(--color-accent);">(기본 테스트 비밀번호: <strong>1234</strong>)</small>
        </p>

        <form id="admin-password-form">
          <div class="form-group" style="margin-bottom: var(--space-lg);">
            <input type="password" id="admin-password-input" class="form-input" placeholder="비밀번호 입력" required autofocus />
          </div>
          <div style="display: flex; justify-content: flex-end; gap: var(--space-sm);">
            <button type="button" id="admin-cancel-btn" class="btn-cancel">취소</button>
            <button type="submit" class="btn-save" style="background: var(--color-primary);">인증하기</button>
          </div>
        </form>
      </div>
    </div>

    <!-- 프로젝트 상세보기 모달 -->
    <div id="project-detail-overlay" class="modal-overlay">
      <div class="modal-container" style="max-width: 680px;">
        <button id="project-modal-close" class="modal-close-btn">&times;</button>
        <div id="project-detail-content"></div>
      </div>
    </div>
  `;

  // 관리자 인증 모달 제어 로직
  const adminOverlay = document.getElementById('admin-modal-overlay');
  const adminForm = document.getElementById('admin-password-form');
  const adminClose = document.getElementById('admin-modal-close');
  const adminCancel = document.getElementById('admin-cancel-btn');
  const passwordInput = document.getElementById('admin-password-input');

  function closeAdminModal() {
    adminOverlay.classList.remove('active');
    adminForm.reset();
  }

  adminClose.addEventListener('click', closeAdminModal);
  adminCancel.addEventListener('click', closeAdminModal);

  adminForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputPass = passwordInput.value.trim();

    // 비밀번호 검증 (테스트 기본값: 1234)
    if (inputPass === '1234') {
      alert('관리자 인증에 성공하였습니다! 자기소개 수정 권한이 부여됩니다.');
      setAdminLoggedIn(true);
      closeAdminModal();
      if (onAdminAuthSuccess) onAdminAuthSuccess();
    } else {
      alert('비밀번호가 올바르지 않습니다. 다시 확인해 주세요. (기본 비밀번호: 1234)');
    }
  });

  // 프로젝트 상세보기 모달 제어 로직
  const projectOverlay = document.getElementById('project-detail-overlay');
  const projectClose = document.getElementById('project-modal-close');

  projectClose.addEventListener('click', () => {
    projectOverlay.classList.remove('active');
  });

  return {
    openAdminModal: () => {
      adminOverlay.classList.add('active');
      passwordInput.focus();
    },
    openProjectModal: (project) => {
      const contentBox = document.getElementById('project-detail-content');
      contentBox.innerHTML = `
        <h3 class="modal-title" style="font-size: 1.8rem; margin-bottom: var(--space-xs);">${project.title}</h3>
        <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: var(--space-lg);">
          ${project.tags.map(t => `<span class="skill-badge">${t}</span>`).join('')}
        </div>
        <p class="modal-description" style="font-size: 1.05rem; white-space: pre-line; margin-bottom: var(--space-xl);">${project.detail || project.summary}</p>
        <div style="display: flex; gap: var(--space-md);">
          ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn btn-primary" style="flex: 1;">🔗 Live Demo 방문</a>` : ''}
          ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary" style="flex: 1;">💻 GitHub 소스코드</a>` : ''}
        </div>
      `;
      projectOverlay.classList.add('active');
    }
  };
}
