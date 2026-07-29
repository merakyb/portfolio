/**
 * ==========================================================================
 * 기술 역량 섹션 컴포넌트 모듈 (SkillsSection.js)
 * 보유한 기술 스택을 카테고리별로 정돈하여 배지 카드로 렌더링합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

export function renderSkillsSection(data) {
  const container = document.getElementById('skills-container');
  if (!container) return;

  const { skills } = data;

  container.innerHTML = `
    <section id="skills" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span>🛠️</span> 기술 역량 (Skill Set)
          </h2>
          <p class="section-subtitle">서비스 개발에 사용하는 주력 기술 스택과 도구들입니다.</p>
        </div>

        <div class="skills-wrapper">
          ${skills.map(group => `
            <div class="skills-category-card">
              <h3 class="skills-category-title">
                <span class="category-icon">${group.icon}</span>
                <span>${group.category}</span>
              </h3>

              <div class="skills-list">
                ${group.items.map(item => `
                  <div class="skill-item-tag">
                    <span>${item}</span>
                  </div>
                `).join('')}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </section>
  `;
}
