/**
 * ==========================================================================
 * 연락처 및 푸터 컴포넌트 모듈 (ContactSection.js)
 * 이메일 복사 기능, 문의 메시지 전송 폼 및 푸터를 처리합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

export function renderContactSection() {
  const container = document.getElementById('contact-container');
  if (!container) return;

  const defaultEmail = "example@domain.com";

  container.innerHTML = `
    <section id="contact" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span>✉️</span> 연락하기 (Contact)
          </h2>
          <p class="section-subtitle">프로젝트 문의나 협업 제안은 언제든 편하게 연락해 주세요!</p>
        </div>

        <div class="contact-card">
          <!-- 이메일 빠른 복사 박스 -->
          <div class="contact-email-box">
            <span class="email-address" id="email-text">${defaultEmail}</span>
            <button id="copy-email-btn" class="copy-btn">
              <span>📋 이메일 복사</span>
            </button>
          </div>

          <!-- 간단 문의 전송 폼 -->
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
            <button type="submit" class="btn-send">
              <span>메시지 전송하기 🚀</span>
            </button>
          </form>
        </div>

        <!-- 하단 푸터 -->
        <footer class="footer">
          <div class="footer-socials">
            <a href="https://github.com" target="_blank" class="social-link" title="GitHub">💻 GitHub</a>
            <a href="https://linkedin.com" target="_blank" class="social-link" title="LinkedIn">🔗 LinkedIn</a>
            <a href="#" class="social-link" title="Blog">📝 Blog</a>
          </div>
          <p>© 2026 Personal Portfolio. Designed & Built with Modern Web Standard.</p>
        </footer>
      </div>
    </section>
  `;

  // 이메일 복사 기능 이벤트 등록
  const copyBtn = document.getElementById('copy-email-btn');
  if (copyBtn) {
    copyBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(defaultEmail).then(() => {
        alert(`이메일 주소(${defaultEmail})가 클립보드에 복사되었습니다!`);
      }).catch(err => {
        console.error('이메일 복사 실패', err);
      });
    });
  }

  // 폼 제출 이벤트 핸들러
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('문의 메시지가 성공적으로 전송되었습니다! 빠르게 답변드리겠습니다.');
      contactForm.reset();
    });
  }
}
