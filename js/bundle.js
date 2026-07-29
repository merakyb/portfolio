/**
 * ==========================================================================
 * 포트폴리오 번들 통합 스크립트 (js/bundle.js)
 * 브라우저에서 file:// 프로토콜로 직접 열거나 웹 서버 호스팅 시에도
 * CORS 제약 없이 100% 동작하도록 컴포넌트를 통합 제공합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

(function () {
  'use strict';

  // 1. 기본 데이터 스키마
  const INITIAL_DATA = {
    profile: {
      name: "홍길동",
      role: "크리에이티브 프론트엔드 개발자",
      tagline: "사용자 중심의 웹 경험과 아름다운 인터랙션을 만드는 프론트엔드 개발자입니다.",
      bio: `안녕하세요! 몰입감 높은 웹 경험을 전달하는 프론트엔드 개발자 홍길동입니다.
UI/UX 디자인과 프론트엔드 엔지니어링의 경계를 허물며, 깔끔한 모듈형 코드와 뛰어난 가독성을 지향합니다.
새로운 프론트엔드 기술을 탐구하고 서비스 완성도를 높이는 것에 열정을 느끼며 동료들과 지식을 공유하는 것을 즐깁니다.`,
      tags: ["HTML5/CSS3", "JavaScript (ES6+)", "React", "UI/UX Design", "Responsive Web"]
    },
    skills: [
      {
        category: "Frontend Core",
        icon: "⚡",
        items: ["HTML5", "CSS3 / Modern Standard", "JavaScript (ES6+)", "TypeScript", "React"]
      },
      {
        category: "Styling & UI Systems",
        icon: "🎨",
        items: ["CSS Glassmorphic Tokens", "CSS Variables", "Flexbox / Grid Layout", "Responsive Design"]
      },
      {
        category: "Tools & Workflow",
        icon: "🛠️",
        items: ["Git & GitHub", "VS Code", "Vite / Webpack", "Figma", "Vercel / Netlify"]
      }
    ],
    projects: [
      {
        id: "project-1",
        title: "포춘 쿠키 오늘의 명언 웹 앱",
        summary: "쿠키를 클릭하면 인터랙티브한 반 쪼개짐 애니메이션과 함께 오늘의 명언 및 운세를 제공하는 모던 웹 앱.",
        detail: `클릭 시 포춘 쿠키가 쪼개지며 애니메이션 효과와 함께 오늘의 명언이 나타나는 웹 프로젝트입니다.
Vanilla JavaScript와 CSS Keyframe 애니메이션을 사용하여 높은 몰입감을 전해줍니다.`,
        tags: ["HTML5", "CSS Animation", "JavaScript"],
        demoUrl: "https://example.com/fortune-cookie",
        githubUrl: "https://github.com/example/fortune-cookie",
        icon: "🥠"
      },
      {
        id: "project-2",
        title: "개인 포트폴리오 웹사이트 & Admin 관리자",
        summary: "어드민 모드를 통해 실시간으로 자기소개를 수정하고 로컬 스토리지에 동적 저장하는 다크 슬레이트 테마 포트폴리오.",
        detail: `Glassmorphic 디자인 시스템을 적용하여 제작한 개인 포트폴리오 웹사이트입니다.
관리자 인증(비밀번호: 1234)을 통해 웹 브라우저 상에서 자기소개를 직접 편집하고 저장할 수 있습니다.`,
        tags: ["JavaScript ES6", "Glassmorphism", "LocalStorage", "CSS Variables"],
        demoUrl: "#",
        githubUrl: "https://github.com/example/portfolio",
        icon: "🚀"
      },
      {
        id: "project-3",
        title: "인터랙티브 웹 대시보드 컴포넌트",
        summary: "실시간 반응형 그래프와 데이터 카드 컴포넌트를 제공하는 크리에이티브 프론트엔드 대시보드 라이브러리.",
        detail: `다양한 차트 및 통계 데이터 카드를 모듈형 컴포넌트로 구성한 UI 프로젝트입니다.
모바일 및 데스크톱 브레이크포인트에 유연하게 대응합니다.`,
        tags: ["React", "CSS Modules", "Chart.js", "UI/UX"],
        demoUrl: "https://example.com/dashboard",
        githubUrl: "https://github.com/example/dashboard",
        icon: "📊"
      }
    ]
  };

  const STORAGE_KEY = "MY_PORTFOLIO_DATA_V1";
  const ADMIN_AUTH_KEY = "IS_ADMIN_AUTHENTICATED";

  let supabaseClient = null;

  function getSupabaseClient() {
    if (supabaseClient) return supabaseClient;
    const cfg = window.SUPABASE_CONFIG;
    if (window.supabase && cfg && cfg.url && cfg.anonKey && cfg.url.startsWith('http')) {
      try {
        supabaseClient = window.supabase.createClient(cfg.url, cfg.anonKey);
      } catch (e) {
        console.warn("Supabase Client 초기화 실패:", e);
      }
    }
    return supabaseClient;
  }

  function getPortfolioData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_DATA;
  }

  async function fetchPortfolioDataFromSupabase() {
    const client = getSupabaseClient();
    if (!client) return null;
    try {
      const { data, error } = await client
        .from('portfolio')
        .select('data')
        .eq('id', 'main')
        .maybeSingle();

      if (error) {
        console.warn("Supabase 데이터 조회 경고:", error.message);
        return null;
      }
      if (data && data.data) {
        return data.data;
      }
    } catch (e) {
      console.warn("Supabase 연동 오류:", e);
    }
    return null;
  }

  async function savePortfolioData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    const client = getSupabaseClient();
    if (client) {
      try {
        const { error } = await client
          .from('portfolio')
          .upsert({
            id: 'main',
            data: data,
            updated_at: new Date().toISOString()
          });
        if (error) {
          console.error("Supabase DB 저장 실패:", error.message);
        } else {
          console.log("Supabase DB 데이터 업데이트 완료!");
        }
      } catch (e) {
        console.error("Supabase DB 저장 중 오류:", e);
      }
    }
  }

  function isAdminLoggedIn() {
    return sessionStorage.getItem(ADMIN_AUTH_KEY) === "true";
  }

  function setAdminLoggedIn(status) {
    if (status) sessionStorage.setItem(ADMIN_AUTH_KEY, "true");
    else sessionStorage.removeItem(ADMIN_AUTH_KEY);
  }


  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // 2. 컴포넌트 렌더링 함수들
  function renderHeader(onAdminClick) {
    const container = document.getElementById('header-container');
    if (!container) return;
    const loggedIn = isAdminLoggedIn();
    container.innerHTML = `
      <header class="header">
        <div class="container header-container">
          <a href="#" class="header-logo">
            <span>PORTFOLIO</span>
            <span class="logo-dot"></span>
          </a>
          <nav class="header-nav">
            <a href="#about" class="nav-link">소개 (About)</a>
            <a href="#projects" class="nav-link">작업물 (Projects)</a>
            <a href="#skills" class="nav-link">기술 스택 (Skills)</a>
            <a href="#contact" class="nav-link">연락처 (Contact)</a>
          </nav>
          <div class="header-actions">
            ${loggedIn ? `
              <span class="admin-badge"><span>●</span> 관리자 인증됨</span>
              <button id="admin-toggle-btn" class="admin-btn">로그아웃</button>
            ` : `
              <button id="admin-toggle-btn" class="admin-btn"><span>🔒</span> Admin</button>
            `}
          </div>
        </div>
      </header>
    `;
    const btn = document.getElementById('admin-toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (isAdminLoggedIn()) {
          if (confirm('관리자 모드에서 로그아웃하시겠습니까?')) {
            setAdminLoggedIn(false);
            window.location.reload();
          }
        } else {
          if (onAdminClick) onAdminClick();
        }
      });
    }
  }

  function renderHero(data) {
    const container = document.getElementById('hero-container');
    if (!container) return;
    const { profile } = data;
    container.innerHTML = `
      <section class="hero">
        <div class="container">
          <div class="hero-badge">
            <span class="status-dot"></span>
            <span>새로운 프로젝트 및 협업 가능</span>
          </div>
          <h1 class="hero-title">
            안녕하세요, <span class="gradient-text">${escapeHtml(profile.name)}</span>입니다.<br>
            ${escapeHtml(profile.role)}
          </h1>
          <p class="hero-description">${escapeHtml(profile.tagline)}</p>
          <div class="hero-tags">
            ${profile.tags.map(t => `<span class="tag-pill">#${escapeHtml(t)}</span>`).join('')}
          </div>
          <div class="hero-cta">
            <a href="#projects" class="btn btn-primary"><span>작업물 구경하기</span> <span>➔</span></a>
            <a href="#contact" class="btn btn-secondary"><span>연락하기</span></a>
          </div>
        </div>
      </section>
    `;
  }

  function renderAboutSection(data, onUpdateSuccess) {
    const container = document.getElementById('about-container');
    if (!container) return;
    const { profile } = data;
    const loggedIn = isAdminLoggedIn();
    let isEditing = false;

    function updateDOM() {
      container.innerHTML = `
        <section id="about" class="section">
          <div class="container">
            <div class="section-header">
              <h2 class="section-title"><span>👤</span> 자기소개 (About Me)</h2>
              <p class="section-subtitle">저의 가치관과 걸어온 경험을 소개해 드립니다.</p>
            </div>
            <div class="about-card">
              ${loggedIn && !isEditing ? `
                <div class="about-admin-controls">
                  <button id="edit-about-btn" class="edit-btn"><span>✏️</span> 자기소개 수정</button>
                </div>
              ` : ''}
              ${isEditing ? `
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
                    <label class="form-label">한 줄 슬로건 (Tagline)</label>
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
                <div class="about-content-view">
                  <div class="about-header-info">
                    <div class="about-avatar">${profile.name.charAt(0)}</div>
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

      if (loggedIn && !isEditing) {
        const btn = document.getElementById('edit-about-btn');
        if (btn) btn.addEventListener('click', () => { isEditing = true; updateDOM(); });
      }

      if (isEditing) {
        const cancelBtn = document.getElementById('cancel-about-btn');
        if (cancelBtn) cancelBtn.addEventListener('click', () => { isEditing = false; updateDOM(); });

        const form = document.getElementById('about-edit-form');
        if (form) {
          form.addEventListener('submit', (e) => {
            e.preventDefault();
            profile.name = document.getElementById('input-name').value.trim();
            profile.role = document.getElementById('input-role').value.trim();
            profile.tagline = document.getElementById('input-tagline').value.trim();
            profile.bio = document.getElementById('input-bio').value.trim();
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

  function renderProjectsSection(data, onProjectClick) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    const { projects } = data;
    container.innerHTML = `
      <section id="projects" class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title"><span>📂</span> 작업물 목록 (Projects Showcase)</h2>
            <p class="section-subtitle">직접 기획하고 제작한 대표 프로젝트들을 선보입니다.</p>
          </div>
          <div class="projects-grid">
            ${projects.map(p => `
              <div class="project-card" data-id="${p.id}">
                <div class="project-thumbnail"><span>${p.icon || '🚀'}</span></div>
                <div class="project-body">
                  <h3 class="project-title">${escapeHtml(p.title)}</h3>
                  <p class="project-summary">${escapeHtml(p.summary)}</p>
                  <div class="project-tags">
                    ${p.tags.map(t => `<span class="skill-badge">${escapeHtml(t)}</span>`).join('')}
                  </div>
                  <div class="project-actions">
                    ${p.demoUrl ? `<a href="${p.demoUrl}" target="_blank" class="project-link-btn link-demo" onclick="event.stopPropagation();"><span>🔗 Live Demo</span></a>` : ''}
                    ${p.githubUrl ? `<a href="${p.githubUrl}" target="_blank" class="project-link-btn link-github" onclick="event.stopPropagation();"><span>💻 Code</span></a>` : ''}
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
    const cards = container.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const proj = projects.find(p => p.id === id);
        if (proj && onProjectClick) onProjectClick(proj);
      });
    });
  }

  function renderSkillsSection(data) {
    const container = document.getElementById('skills-container');
    if (!container) return;
    const { skills } = data;
    container.innerHTML = `
      <section id="skills" class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title"><span>🛠️</span> 기술 역량 (Skill Set)</h2>
            <p class="section-subtitle">서비스 개발에 사용하는 주력 기술 스택과 도구들입니다.</p>
          </div>
          <div class="skills-wrapper">
            ${skills.map(g => `
              <div class="skills-category-card">
                <h3 class="skills-category-title">
                  <span class="category-icon">${g.icon}</span>
                  <span>${escapeHtml(g.category)}</span>
                </h3>
                <div class="skills-list">
                  ${g.items.map(item => `<div class="skill-item-tag"><span>${escapeHtml(item)}</span></div>`).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  function renderContactSection() {
    const container = document.getElementById('contact-container');
    if (!container) return;
    const defaultEmail = "example@domain.com";
    container.innerHTML = `
      <section id="contact" class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title"><span>✉️</span> 연락하기 (Contact)</h2>
            <p class="section-subtitle">프로젝트 문의나 협업 제안은 언제든 편하게 연락해 주세요!</p>
          </div>
          <div class="contact-card">
            <div class="contact-email-box">
              <span class="email-address">${defaultEmail}</span>
              <button id="copy-email-btn" class="copy-btn"><span>📋 이메일 복사</span></button>
            </div>
            <form id="contact-form" class="contact-form">
              <div class="form-group">
                <label class="form-label">보내시는 분 이름</label>
                <input type="text" class="form-input" placeholder="홍길동" required />
              </div>
              <div class="form-group">
                <label class="form-label">회신 받으실 이메일 주소</label>
                <input type="email" class="form-input" placeholder="your-email@example.com" required />
              </div>
              <div class="form-group">
                <label class="form-label">문의 내용</label>
                <textarea class="form-textarea" placeholder="프로젝트 문의나 협업에 관한 내용을 작성해 주세요." required></textarea>
              </div>
              <button type="submit" class="btn-send"><span>메시지 전송하기 🚀</span></button>
            </form>
          </div>
          <footer class="footer">
            <div class="footer-socials">
              <a href="https://github.com" target="_blank" class="social-link">💻 GitHub</a>
              <a href="https://linkedin.com" target="_blank" class="social-link">🔗 LinkedIn</a>
              <a href="#" class="social-link">📝 Blog</a>
            </div>
            <p>© 2026 Personal Portfolio. Designed & Built with Modern Web Standard.</p>
          </footer>
        </div>
      </section>
    `;
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', () => {
        navigator.clipboard.writeText(defaultEmail).then(() => {
          alert(`이메일 주소(${defaultEmail})가 클립보드에 복사되었습니다!`);
        });
      });
    }
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('문의 메시지가 성공적으로 전송되었습니다! 빠르게 답변드리겠습니다.');
        form.reset();
      });
    }
  }

  function renderModal(onAdminAuthSuccess) {
    const container = document.getElementById('modal-container');
    if (!container) return;
    container.innerHTML = `
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
              <input type="password" id="admin-password-input" class="form-input" placeholder="비밀번호 입력" required />
            </div>
            <div style="display: flex; justify-content: flex-end; gap: var(--space-sm);">
              <button type="button" id="admin-cancel-btn" class="btn-cancel">취소</button>
              <button type="submit" class="btn-save" style="background: var(--color-primary);">인증하기</button>
            </div>
          </form>
        </div>
      </div>
      <div id="project-detail-overlay" class="modal-overlay">
        <div class="modal-container" style="max-width: 680px;">
          <button id="project-modal-close" class="modal-close-btn">&times;</button>
          <div id="project-detail-content"></div>
        </div>
      </div>
    `;
    const adminOverlay = document.getElementById('admin-modal-overlay');
    const adminForm = document.getElementById('admin-password-form');
    const adminClose = document.getElementById('admin-modal-close');
    const adminCancel = document.getElementById('admin-cancel-btn');
    const passwordInput = document.getElementById('admin-password-input');

    function closeAdminModal() {
      adminOverlay.classList.remove('active');
      adminForm.reset();
    }
    if (adminClose) adminClose.addEventListener('click', closeAdminModal);
    if (adminCancel) adminCancel.addEventListener('click', closeAdminModal);
    if (adminForm) {
      adminForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (passwordInput.value.trim() === '1234') {
          alert('관리자 인증에 성공하였습니다! 자기소개 수정 권한이 부여됩니다.');
          setAdminLoggedIn(true);
          closeAdminModal();
          if (onAdminAuthSuccess) onAdminAuthSuccess();
        } else {
          alert('비밀번호가 올바르지 않습니다. (기본 비밀번호: 1234)');
        }
      });
    }

    const projectOverlay = document.getElementById('project-detail-overlay');
    const projectClose = document.getElementById('project-modal-close');
    if (projectClose) {
      projectClose.addEventListener('click', () => {
        projectOverlay.classList.remove('active');
      });
    }

    return {
      openAdminModal: () => {
        adminOverlay.classList.add('active');
        passwordInput.focus();
      },
      openProjectModal: (project) => {
        const box = document.getElementById('project-detail-content');
        box.innerHTML = `
          <h3 class="modal-title" style="font-size: 1.8rem; margin-bottom: var(--space-xs);">${escapeHtml(project.title)}</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: var(--space-lg);">
            ${project.tags.map(t => `<span class="skill-badge">${escapeHtml(t)}</span>`).join('')}
          </div>
          <p class="modal-description" style="font-size: 1.05rem; white-space: pre-line; margin-bottom: var(--space-xl);">${escapeHtml(project.detail || project.summary)}</p>
          <div style="display: flex; gap: var(--space-md);">
            ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn btn-primary" style="flex: 1;">🔗 Live Demo 방문</a>` : ''}
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary" style="flex: 1;">💻 GitHub 소스코드</a>` : ''}
          </div>
        `;
        projectOverlay.classList.add('active');
      }
    };
  }

  // 3. 메인 초기화 실행
  document.addEventListener('DOMContentLoaded', async () => {
    let data = getPortfolioData();
    let modalControls = renderModal(() => initApp());

    function initApp() {
      renderHeader(() => modalControls.openAdminModal());
      renderHero(data);
      renderAboutSection(data, () => renderHero(data));
      renderProjectsSection(data, (p) => modalControls.openProjectModal(p));
      renderSkillsSection(data);
      renderContactSection();
    }

    // 1차 즉시 렌더링 (LocalStorage / 기본 데이터)
    initApp();

    // 2차 Supabase DB 비동기 로딩 (서버 데이터 존재 시 화면 갱신)
    const remoteData = await fetchPortfolioDataFromSupabase();
    if (remoteData) {
      Object.assign(data, remoteData);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      initApp();
    }
  });
})();

