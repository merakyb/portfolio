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
      name: "이터븀 / 윤여빈",
      role: "크리에이티브 백엔드 개발자",
      tagline: "안정적인 백엔드 시스템과 견고한 서버 아키텍처를 설계하는 크리에이티브 백엔드 개발자입니다.",
      bio: `안녕하세요! 서비스의 안정성과 확장성을 아우르는 백엔드 개발자 이터븀(윤여빈)입니다.
Spring Boot와 Java 환경에서 효율적인 데이터 모델링과 최적화된 RESTful API를 구축하는 것을 즐기며, 
대용량 트래픽 처리와 고가용성 시스템 서버 설계에 깊은 열정을 가지고 있습니다.
코드의 가독성 및 유지보수성을 중시하며, 문제의 원인을 끝까지 파헤치는 집요함으로 지속 가능한 서버 생태계를 만들어 갑니다.`,
      tags: ["Spring Boot", "Java", "MySQL", "JPA", "REST API", "Docker"]
    },
    skills: [
      {
        category: "Backend Core",
        icon: "☕",
        items: ["Java 17+", "Spring Boot", "Spring Security", "Spring Data JPA", "RESTful API Design"]
      },
      {
        category: "Database & Persistence",
        icon: "🗄️",
        items: ["MySQL", "PostgreSQL", "Redis Caching", "Database Indexing", "Query Optimization"]
      },
      {
        category: "Tools & Infrastructure",
        icon: "🛠️",
        items: ["Git & GitHub", "IntelliJ IDEA", "Docker", "AWS (EC2 / S3)", "Gradle", "JUnit5 / Mockito"]
      }
    ],
    projects: [
      {
        id: "project-1",
        title: "Spring Boot 기반 실시간 트래픽 분산 백엔드 시스템",
        summary: "Spring Boot, Redis 캐싱 및 MySQL 인덱싱 최적화를 적용하여 대용량 요청을 안정적으로 처리하는 API 서버 프로젝트.",
        detail: `대용량 트래픽 상황에서도 99.9% 서비스 안정성을 보장하기 위해 설계된 백엔드 프로젝트입니다.
Redis를 활용한 분산 락 및 토큰 저장소 구성, Spring Security 기반 JWT 인증/인가 체계 구축 경험이 포함되어 있습니다.`,
        tags: ["Java 17", "Spring Boot", "Redis", "MySQL", "JPA"],
        demoUrl: "#",
        githubUrl: "https://github.com/merakyb",
        icon: "🚀"
      },
      {
        id: "project-2",
        title: "개인 포트폴리오 웹사이트 & Admin 관리자",
        summary: "어드민 모드를 통해 실시간으로 자기소개를 수정하고 로컬 스토리지 및 Supabase DB에 동적 저장하는 다크 슬레이트 테마 포트폴리오.",
        detail: `Glassmorphic 디자인 시스템을 적용하여 제작한 개인 포트폴리오 웹사이트입니다.
관리자 인증(비밀번호: 1234)을 통해 웹 브라우저 상에서 자기소개를 직접 편집하고 저장할 수 있습니다.`,
        tags: ["JavaScript ES6", "Glassmorphism", "LocalStorage", "Supabase DB"],
        demoUrl: "#",
        githubUrl: "https://github.com/merakyb/portfolio",
        icon: "⚡"
      },
      {
        id: "project-3",
        title: "마이크로서비스 MSA 도메인 이벤트 핸들러",
        summary: "도메인 Event 기반 비동기 메시징 처리를 위한 Java/Spring 백엔드 아키텍처 라이브러리.",
        detail: `서비스 간 결합도를 낮추고 도메인 이벤트를 분산 환경에서 안전하게 발행/수신할 수 있도록 제작한 백엔드 모듈입니다.
Spring Event 및 비동기 처리(Async)를 활용하여 응답 시간을 혁신적으로 단축하였습니다.`,
        tags: ["Java", "Spring Event", "Async", "JUnit5"],
        demoUrl: "#",
        githubUrl: "https://github.com/merakyb",
        icon: "🛠️"
      },
      {
        id: "project-4",
        title: "대학생 창업 성향 진단 테스트 웹사이트",
        summary: "12개 질문으로 파악하는 6대 창업가 페르소나, 6축 성향 레이더 차트 및 대학생 창업 캠프 찰떡궁합 팀원 추천 서비스.",
        detail: `Clean & Vibrant Light Theme 디자인 시스템과 Vercel Serverless Function(/api/config) 환경변수 구조를 적용한 창업 성향 진단 웹 서비스입니다.
카카오톡 SDK 공유 및 결과 카드 이미지 저장 기능을 지원합니다.`,
        tags: ["JavaScript ES6", "CSS Variables", "Vercel Serverless", "Kakao SDK", "Canvas"],
        demoUrl: "./startup-test/",
        githubUrl: "https://github.com/merakyb/portfolio/tree/main/startup-test",
        icon: "💡"
      }
    ]
  };

  const STORAGE_KEY = "MY_PORTFOLIO_DATA_V1";
  function getPortfolioData() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return INITIAL_DATA;
  }

  async function fetchPortfolioDataFromSupabase() {
    try {
      const response = await fetch('/api/portfolio', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) return null;
      const result = await response.json();
      if (result && result.success && result.data) {
        return result.data;
      }
    } catch (e) {
      console.warn("서버리스 API 연동 오류:", e);
    }
    return null;
  }

  async function savePortfolioData(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    try {
      const response = await fetch('/api/portfolio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result && result.success) {
        console.log("서버 DB 데이터가 성공적으로 업데이트되었습니다.");
      } else {
        console.warn("서버 DB 저장 경고:", result ? result.error : '오류 발생');
      }
    } catch (e) {
      console.error("서버 API 연동 오류:", e);
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

  function renderProjectsSection(data, onProjectClick, onAddClick, onEditClick, onDeleteClick) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    const { projects } = data;
    const loggedIn = isAdminLoggedIn();

    container.innerHTML = `
      <section id="projects" class="section">
        <div class="container">
          <div class="section-header" style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 16px;">
            <div>
              <h2 class="section-title"><span>📂</span> 작업물 목록 (Projects Showcase)</h2>
              <p class="section-subtitle">직접 기획하고 제작한 대표 프로젝트들을 선보입니다.</p>
            </div>
            <button id="add-project-btn" class="add-project-btn">
              <span>➕ 새 작업물 추가</span>
            </button>
          </div>
          <div class="projects-grid">
            ${projects.map(p => `
              <div class="project-card" data-id="${p.id}">
                <div class="project-thumbnail"><span>${p.icon || '🚀'}</span></div>
                <div class="project-body">
                  ${loggedIn ? `
                    <div class="project-admin-actions">
                      <button class="btn-admin-edit" data-id="${p.id}" onclick="event.stopPropagation();">✏️ 수정</button>
                      <button class="btn-admin-delete" data-id="${p.id}" onclick="event.stopPropagation();">🗑️ 삭제</button>
                    </div>
                  ` : ''}
                  <h3 class="project-title">${escapeHtml(p.title || '')}</h3>
                  <p class="project-summary">${escapeHtml(p.summary || '')}</p>
                  <div class="project-tags">
                    ${(p.tags || []).map(t => `<span class="skill-badge">${escapeHtml(t)}</span>`).join('')}
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

    const addBtn = document.getElementById('add-project-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        if (onAddClick) onAddClick();
      });
    }

    const cards = container.querySelectorAll('.project-card');
    cards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-admin-edit') || e.target.closest('.btn-admin-delete')) return;
        const id = card.getAttribute('data-id');
        const proj = projects.find(p => p.id === id);
        if (proj && onProjectClick) onProjectClick(proj);
      });
    });

    const editBtns = container.querySelectorAll('.btn-admin-edit');
    editBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const proj = projects.find(p => p.id === id);
        if (proj && onEditClick) onEditClick(proj);
      });
    });

    const deleteBtns = container.querySelectorAll('.btn-admin-delete');
    deleteBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.getAttribute('data-id');
        const proj = projects.find(p => p.id === id);
        if (proj && onDeleteClick) onDeleteClick(proj);
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
    const defaultEmail = "bin030922@gmail.com";
    const COOLDOWN_MS = 60000;

    container.innerHTML = `
      <section id="contact" class="section">
        <div class="container">
          <div class="section-header">
            <h2 class="section-title"><span>✉️</span> 연락하기 (Contact)</h2>
            <p class="section-subtitle">백엔드 아키텍처 구축, 프로젝트 문의, 협업 제안은 언제든 편하게 연락해 주세요!</p>
          </div>
          <div class="contact-card">
            <div class="contact-email-box">
              <span class="email-address">${defaultEmail}</span>
              <button id="copy-email-btn" class="copy-btn" type="button"><span>📋 이메일 주소 복사</span></button>
            </div>
            <form id="contact-form" class="contact-form">
              <div style="display:none !important; opacity:0; position:absolute; left:-9999px; height:0; width:0; overflow:hidden;" aria-hidden="true">
                <label for="hp-website">웹사이트 (봇 필터용, 작성 금지)</label>
                <input type="text" id="hp-website" name="hp_website" tabindex="-1" autocomplete="off" />
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-name">보내시는 분 이름</label>
                <input type="text" id="contact-name" name="from_name" class="form-input" placeholder="성함 또는 기업/단체명 (최소 2자)" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-email">회신 받으실 이메일 주소</label>
                <input type="email" id="contact-email" name="email" class="form-input" placeholder="your-email@example.com" required />
              </div>
              <div class="form-group">
                <label class="form-label" for="contact-message">문의 내용</label>
                <textarea id="contact-message" name="message" class="form-textarea" placeholder="프로젝트 문의나 협업에 관한 내용을 작성해 주세요. (최소 5자)" required></textarea>
              </div>
              <button type="submit" id="send-email-btn" class="btn-send"><span>이메일 보내기 🚀</span></button>
            </form>
          </div>
          <footer class="footer">
            <div class="footer-socials">
              <a href="https://github.com/merakyb" target="_blank" class="social-link">💻 GitHub</a>
              <a href="mailto:bin030922@gmail.com" class="social-link">✉️ Direct Email</a>
            </div>
            <p>© 2026 이터븀 (윤여빈). All rights reserved. Built with Modern Web Standard & Supabase DB.</p>
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
      const submitBtn = document.getElementById('send-email-btn');
      const originalBtnContent = submitBtn ? submitBtn.innerHTML : '<span>이메일 보내기 🚀</span>';

      form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 🛡️ [스팸 방지 1차] 허니팟 (Honeypot Trap) 검증
        const honeypotVal = document.getElementById('hp-website')?.value;
        if (honeypotVal) {
          console.warn('스팸 봇 제출 감지');
          alert('문의 메시지가 성공적으로 전송되었습니다!');
          form.reset();
          return;
        }

        // 🛡️ [스팸 방지 2차] 연속 전송 제한 (60초 Cooldown Timer)
        const lastSentStr = sessionStorage.getItem('LAST_EMAIL_SENT_TIME');
        if (lastSentStr) {
          const lastSentTime = parseInt(lastSentStr, 10);
          const elapsed = Date.now() - lastSentTime;
          if (elapsed < COOLDOWN_MS) {
            const remainingSec = Math.ceil((COOLDOWN_MS - elapsed) / 1000);
            alert(`🔒 무단 도배 방지를 위해 전송 쿨다운이 적용 중입니다.\n${remainingSec}초 후에 다시 시도해 주세요.`);
            return;
          }
        }

        const from_name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();

        // 🛡️ [스팸 방지 3차] 입력값 유효성 및 최소 길이 검증
        if (!from_name || from_name.length < 2) {
          alert('보내시는 분 성함을 2자 이상 입력해 주세요.');
          document.getElementById('contact-name').focus();
          return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
          alert('올바른 이메일 주소 형식을 입력해 주세요. (예: name@example.com)');
          document.getElementById('contact-email').focus();
          return;
        }

        if (!message || message.length < 5) {
          alert('문의 내용을 5자 이상 작성해 주세요.');
          document.getElementById('contact-message').focus();
          return;
        }

        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = `<span>전송 중... ⏳</span>`;
        }

        fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            from_name: from_name,
            email: email,
            message: message,
            hp_website: honeypotVal || ''
          })
        })
        .then(async (response) => {
          const result = await response.json().catch(() => ({}));
          if (response.ok && result.success) {
            sessionStorage.setItem('LAST_EMAIL_SENT_TIME', Date.now().toString());
            alert('문의 메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다. 🚀');
            form.reset();
          } else {
            const errMsg = result.error || '이메일 전송 실패';
            alert(`이메일 전송 실패 (${errMsg})\nDirect 이메일(${defaultEmail})로 문의해 주세요.`);
          }
        })
        .catch((err) => {
          console.error('API 호출 오류:', err);
          alert(`서버 통신 중 오류가 발생했습니다.\nDirect 이메일(${defaultEmail})로 문의해 주세요.`);
        })
        .finally(() => {
          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalBtnContent;
          }
        });
      });
    }
  }

  function renderModal(onAdminAuthSuccess, getPortfolioDataFunc, savePortfolioDataFunc, onRefreshApp) {
    const container = document.getElementById('modal-container');
    if (!container) return;
    container.innerHTML = `
      <div id="admin-modal-overlay" class="modal-overlay">
        <div class="modal-container">
          <button id="admin-modal-close" class="modal-close-btn">&times;</button>
          <h3 class="modal-title">🔐 관리자(Admin) 비밀번호 인증</h3>
          <p class="modal-description">
            작업물을 추가, 수정, 삭제하고 관리하려면 비밀번호를 입력해 주세요.<br>
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

      <!-- 프로젝트 상세 정보 모달 -->
      <div id="project-detail-overlay" class="modal-overlay">
        <div class="modal-container" style="max-width: 680px;">
          <button id="project-modal-close" class="modal-close-btn">&times;</button>
          <div id="project-detail-content"></div>
        </div>
      </div>

      <!-- 프로젝트 추가/수정 모달 -->
      <div id="project-edit-overlay" class="modal-overlay">
        <div class="modal-container" style="max-width: 620px;">
          <button id="project-edit-close" class="modal-close-btn">&times;</button>
          <h3 id="project-edit-modal-title" class="modal-title">🚀 작업물 추가 / 수정</h3>
          <form id="project-edit-form">
            <input type="hidden" id="project-edit-id" />
            <div class="form-group" style="margin-bottom: var(--space-md);">
              <label class="form-label">대표 아이콘 / 이모지</label>
              <input type="text" id="project-edit-icon" class="form-input" placeholder="🚀 또는 💡" value="🚀" required />
            </div>
            <div class="form-group" style="margin-bottom: var(--space-md);">
              <label class="form-label">프로젝트 제목</label>
              <input type="text" id="project-edit-title" class="form-input" placeholder="예: 대학생 창업 성향 진단 테스트" required />
            </div>
            <div class="form-group" style="margin-bottom: var(--space-md);">
              <label class="form-label">한 줄 요약 (Summary)</label>
              <input type="text" id="project-edit-summary" class="form-input" placeholder="카드에 노출될 짧은 요약 문구" required />
            </div>
            <div class="form-group" style="margin-bottom: var(--space-md);">
              <label class="form-label">상세 내용 (Detail)</label>
              <textarea id="project-edit-detail" class="form-textarea" placeholder="팝업 상세 창에 노출될 상세 설명 문구" style="height: 90px;"></textarea>
            </div>
            <div class="form-group" style="margin-bottom: var(--space-md);">
              <label class="form-label">기술 스택 태그 (쉼표 구분)</label>
              <input type="text" id="project-edit-tags" class="form-input" placeholder="JavaScript, Node.js, Vercel" required />
            </div>
            <div class="form-group" style="margin-bottom: var(--space-md);">
              <label class="form-label">Live Demo URL 주소</label>
              <input type="text" id="project-edit-demo" class="form-input" placeholder="./startup-test/ 또는 https://..." />
            </div>
            <div class="form-group" style="margin-bottom: var(--space-lg);">
              <label class="form-label">GitHub 소스코드 URL 주소</label>
              <input type="text" id="project-edit-github" class="form-input" placeholder="https://github.com/username/repo" />
            </div>
            <div style="display: flex; justify-content: flex-end; gap: var(--space-sm);">
              <button type="button" id="project-edit-cancel" class="btn-cancel">취소</button>
              <button type="submit" class="btn-save" style="background: var(--color-primary);">저장하기</button>
            </div>
          </form>
        </div>
      </div>
    `;

    const adminOverlay = document.getElementById('admin-modal-overlay');
    const adminForm = document.getElementById('admin-password-form');
    const adminClose = document.getElementById('admin-modal-close');
    const adminCancel = document.getElementById('admin-cancel-btn');
    const passwordInput = document.getElementById('admin-password-input');
    let pendingAuthCallback = null;

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
          alert('관리자 인증에 성공하였습니다! 작업물 추가/수정 권한이 부여됩니다.');
          setAdminLoggedIn(true);
          closeAdminModal();
          if (onAdminAuthSuccess) onAdminAuthSuccess();
          if (pendingAuthCallback) {
            const cb = pendingAuthCallback;
            pendingAuthCallback = null;
            cb();
          }
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

    // 프로젝트 추가/수정 모달 조작
    const editOverlay = document.getElementById('project-edit-overlay');
    const editForm = document.getElementById('project-edit-form');
    const editClose = document.getElementById('project-edit-close');
    const editCancel = document.getElementById('project-edit-cancel');

    function closeProjectEditModal() {
      editOverlay.classList.remove('active');
      editForm.reset();
    }
    if (editClose) editClose.addEventListener('click', closeProjectEditModal);
    if (editCancel) editCancel.addEventListener('click', closeProjectEditModal);

    if (editForm) {
      editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const data = getPortfolioDataFunc();
        const editId = document.getElementById('project-edit-id').value;
        const icon = document.getElementById('project-edit-icon').value.trim() || '🚀';
        const title = document.getElementById('project-edit-title').value.trim();
        const summary = document.getElementById('project-edit-summary').value.trim();
        const detail = document.getElementById('project-edit-detail').value.trim();
        const tagsRaw = document.getElementById('project-edit-tags').value;
        const tags = tagsRaw.split(',').map(t => t.trim()).filter(Boolean);
        const demoUrl = document.getElementById('project-edit-demo').value.trim();
        const githubUrl = document.getElementById('project-edit-github').value.trim();

        if (editId) {
          const target = data.projects.find(p => p.id === editId);
          if (target) {
            target.icon = icon;
            target.title = title;
            target.summary = summary;
            target.detail = detail || summary;
            target.tags = tags;
            target.demoUrl = demoUrl;
            target.githubUrl = githubUrl;
          }
        } else {
          const newProj = {
            id: 'project-' + Date.now(),
            icon,
            title,
            summary,
            detail: detail || summary,
            tags,
            demoUrl,
            githubUrl
          };
          data.projects.push(newProj);
        }

        savePortfolioDataFunc(data);
        alert('작업물 정보가 성공적으로 저장되었습니다!');
        closeProjectEditModal();
        if (onRefreshApp) onRefreshApp();
      });
    }

    return {
      openAdminModal: (onSuccessCb) => {
        pendingAuthCallback = onSuccessCb || null;
        adminOverlay.classList.add('active');
        passwordInput.focus();
      },
      openProjectModal: (project) => {
        const box = document.getElementById('project-detail-content');
        box.innerHTML = `
          <h3 class="modal-title" style="font-size: 1.8rem; margin-bottom: var(--space-xs);">${escapeHtml(project.title || '')}</h3>
          <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: var(--space-lg);">
            ${(project.tags || []).map(t => `<span class="skill-badge">${escapeHtml(t)}</span>`).join('')}
          </div>
          <p class="modal-description" style="font-size: 1.05rem; white-space: pre-line; margin-bottom: var(--space-xl);">${escapeHtml(project.detail || project.summary || '')}</p>
          <div style="display: flex; gap: var(--space-md);">
            ${project.demoUrl ? `<a href="${project.demoUrl}" target="_blank" class="btn btn-primary" style="flex: 1;">🔗 Live Demo 방문</a>` : ''}
            ${project.githubUrl ? `<a href="${project.githubUrl}" target="_blank" class="btn btn-secondary" style="flex: 1;">💻 GitHub 소스코드</a>` : ''}
          </div>
        `;
        projectOverlay.classList.add('active');
      },
      openProjectEditModal: (project) => {
        const titleEl = document.getElementById('project-edit-modal-title');
        const idInput = document.getElementById('project-edit-id');
        const iconInput = document.getElementById('project-edit-icon');
        const titleInput = document.getElementById('project-edit-title');
        const summaryInput = document.getElementById('project-edit-summary');
        const detailInput = document.getElementById('project-edit-detail');
        const tagsInput = document.getElementById('project-edit-tags');
        const demoInput = document.getElementById('project-edit-demo');
        const githubInput = document.getElementById('project-edit-github');

        if (project) {
          titleEl.textContent = '✏️ 작업물 수정';
          idInput.value = project.id;
          iconInput.value = project.icon || '🚀';
          titleInput.value = project.title || '';
          summaryInput.value = project.summary || '';
          detailInput.value = project.detail || project.summary || '';
          tagsInput.value = (project.tags || []).join(', ');
          demoInput.value = project.demoUrl || '';
          githubInput.value = project.githubUrl || '';
        } else {
          titleEl.textContent = '➕ 새 작업물 추가';
          idInput.value = '';
          iconInput.value = '🚀';
          titleInput.value = '';
          summaryInput.value = '';
          detailInput.value = '';
          tagsInput.value = '';
          demoInput.value = '';
          githubInput.value = '';
        }
        editOverlay.classList.add('active');
      }
    };
  }

  // 3. 메인 초기화 실행 함수
  function startApp() {
    let data = getPortfolioData();
    let modalControls = renderModal(
      () => initApp(),
      () => data,
      (updatedData) => savePortfolioData(updatedData),
      () => initApp()
    );

    function initApp() {
      renderHeader(() => modalControls.openAdminModal());
      renderHero(data);
      renderAboutSection(data, () => renderHero(data));
      renderProjectsSection(
        data,
        (p) => modalControls.openProjectModal(p),
        () => {
          if (!isAdminLoggedIn()) {
            modalControls.openAdminModal(() => modalControls.openProjectEditModal(null));
          } else {
            modalControls.openProjectEditModal(null);
          }
        },
        (p) => modalControls.openProjectEditModal(p),
        (p) => {
          if (confirm(`"${p.title}" 작업물을 삭제하시겠습니까?`)) {
            data.projects = data.projects.filter(item => item.id !== p.id);
            savePortfolioData(data);
            initApp();
          }
        }
      );
      renderSkillsSection(data);
      renderContactSection();
    }

    // 1차 즉시 렌더링 (LocalStorage / 기본 데이터)
    try {
      initApp();
    } catch (err) {
      console.error("1차 렌더링 오류 감지 -> 캐시 리셋 후 복구:", err);
      localStorage.removeItem(STORAGE_KEY);
      data = INITIAL_DATA;
      initApp();
    }

    // 2차 Supabase DB 비동기 로딩 (서버 데이터 존재 시 화면 갱신)
    fetchPortfolioDataFromSupabase().then(remoteData => {
      if (remoteData) {
        Object.assign(data, remoteData);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        initApp();
      }
    }).catch(() => {});
  }

  // DOM 로딩 상태에 따른 안전 즉시 실행
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startApp);
  } else {
    startApp();
  }
})();

