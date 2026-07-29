/**
 * ==========================================================================
 * 작업물(프로젝트) 페이지 컴포넌트 모듈 (ProjectsSection.js) - ⭐ 핵심 기능
 * 대표 작업물 카드 목록 나열 및 Live Demo / GitHub 링크, 상세 모달 이벤트를 처리합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

export function renderProjectsSection(data, onProjectClick) {
  const container = document.getElementById('projects-container');
  if (!container) return;

  const { projects } = data;

  container.innerHTML = `
    <section id="projects" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span>📂</span> 작업물 목록 (Projects Showcase)
          </h2>
          <p class="section-subtitle">직접 기획하고 제작한 대표 프로젝트들을 선보입니다.</p>
        </div>

        <div class="projects-grid">
          ${projects.map(project => `
            <div class="project-card" data-id="${project.id}">
              <!-- 프로젝트 썸네일 이미지 영역 -->
              <div class="project-thumbnail">
                <span>${project.icon || '🚀'}</span>
              </div>

              <!-- 프로젝트 카드 정보 본문 -->
              <div class="project-body">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-summary">${project.summary}</p>

                <!-- 사용 기술 스택 배지 -->
                <div class="project-tags">
                  ${project.tags.map(tag => `<span class="skill-badge">${tag}</span>`).join('')}
                </div>

                <!-- 푸터 링크 액션 버튼 (Live Demo, GitHub) -->
                <div class="project-actions">
                  ${project.demoUrl ? `
                    <a href="${project.demoUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn link-demo" onclick="event.stopPropagation();">
                      <span>🔗 Live Demo</span>
                    </a>
                  ` : ''}
                  ${project.githubUrl ? `
                    <a href="${project.githubUrl}" target="_blank" rel="noopener noreferrer" class="project-link-btn link-github" onclick="event.stopPropagation();">
                      <span>💻 Code</span>
                    </a>
                  ` : ''}
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;

  // 카드 클릭 시 상세 모달 팝업 오픈 이벤트 등록
  const cards = container.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-id');
      const targetProject = projects.find(p => p.id === id);
      if (targetProject && onProjectClick) {
        onProjectClick(targetProject);
      }
    });
  });
}
