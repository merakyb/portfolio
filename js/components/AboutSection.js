/**
 * ==========================================================================
 * 자기소개 섹션 컴포넌트 모듈 (AboutSection.js) - ⭐ 핵심 기능
 * '나만 편집 가능한 자기소개란'을 담당합니다.
 * 일반 뷰어 모드와 관리자 전용 폼 편집 모드(저장 시 LocalStorage 연동)를 제공합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

import { isAdminLoggedIn, savePortfolioData } from '../data.js';

export function renderAboutSection(data, onUpdateSuccess) {
  const container = document.getElementById('about-container');
  if (!container) return;

  const { profile } = data;
  const loggedIn = isAdminLoggedIn();

  // 편집 모드 내부 상태
  let isEditing = false;

  function updateDOM() {
    container.innerHTML = `
      <section id="about" class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title">
              <span>👤</span> 자기소개 (About Me)
            </h2>
            <p class="section-subtitle">저의 가치관과 걸어온 경험을 소개해 드립니다.</p>
          </div>

          <div class="about-card">
            <!-- 관리자 모드인 경우 우측 상단 편집 버튼 표시 -->
            ${loggedIn && !isEditing ? `
              <div class="about-admin-controls">
                <button id="edit-about-btn" class="edit-btn">
                  <span>✏️</span> 자기소개 수정
                </button>
              </div>
            ` : ''}

            ${isEditing ? `
              <!-- 관리자 폼 편집 모드 (Textarea / Input) -->
              <form id="about-edit-form" class="about-edit-form">
                <div class="form-group">
                  <label class="form-label">이름</label>
                  <input type="text" id="input-name" class="form-input" value="${escapeHtml(profile.name)}" required />
                </div>
                <div class="form-group">
                  <label class="form-label">직무 / 타이틀</label>
                  <input type="text" id="input-role" class="form-input" value="${escapeHtml(profile.role)}" required />
                </div>
                <div class="form-group">
                  <label class="form-label">한 줄 한 줄 슬로건 (Tagline)</label>
                  <input type="text" id="input-tagline" class="form-input" value="${escapeHtml(profile.tagline)}" required />
                </div>
                <div class="form-group">
                  <label class="form-label">상세 자기소개 문구 (Bio)</label>
                  <textarea id="input-bio" class="form-textarea" required>${escapeHtml(profile.bio)}</textarea>
                </div>

                <div class="form-actions">
                  <button type="button" id="cancel-about-btn" class="btn-cancel">취소</button>
                  <button type="submit" class="btn-save">저장하기</button>
                </div>
              </form>
            ` : `
              <!-- 일반 뷰어 읽기 모드 -->
              <div class="about-content-view">
                <div class="about-header-info">
                  <div class="about-avatar">
                    ${profile.name.charAt(0)}
                  </div>
                  <div class="about-user-meta">
                    <h3 class="user-name">${escapeHtml(profile.name)}</h3>
                    <p class="user-role">${escapeHtml(profile.role)}</p>
                  </div>
                </div>

                <p class="about-bio-text">${escapeHtml(profile.bio)}</p>
              </div>
            `}
          </div>
        </div>
      </section>
    `;

    // 이벤트 리스너 바인딩
    if (loggedIn && !isEditing) {
      const editBtn = document.getElementById('edit-about-btn');
      if (editBtn) {
        editBtn.addEventListener('click', () => {
          isEditing = true;
          updateDOM();
        });
      }
    }

    if (isEditing) {
      const cancelBtn = document.getElementById('cancel-about-btn');
      if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
          isEditing = false;
          updateDOM();
        });
      }

      const editForm = document.getElementById('about-edit-form');
      if (editForm) {
        editForm.addEventListener('submit', (e) => {
          e.preventDefault();

          // 새로 입력된 값으로 프로필 데이터 갱신
          profile.name = document.getElementById('input-name').value.trim();
          profile.role = document.getElementById('input-role').value.trim();
          profile.tagline = document.getElementById('input-tagline').value.trim();
          profile.bio = document.getElementById('input-bio').value.trim();

          // LocalStorage에 즉시 저장
          savePortfolioData(data);

          alert('자기소개 내용이 성공적으로 수정 및 저장되었습니다!');
          isEditing = false;
          updateDOM();

          if (onUpdateSuccess) onUpdateSuccess();
        });
      }
    }
  }

  updateDOM();
}

/**
 * XSS 방지를 위한 HTML 특수문자 이스케이프 헬퍼 함수
 */
function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
