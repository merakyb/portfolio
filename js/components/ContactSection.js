/**
 * ==========================================================================
 * 연락처 및 푸터 컴포넌트 모듈 (ContactSection.js)
 * 이메일 복사 기능, 3중 스팸 방지(Anti-Spam) 및 EmailJS 기반 문의 전송을 담당합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

export function renderContactSection() {
  const container = document.getElementById('contact-container');
  if (!container) return;

  const defaultEmail = "bin030922@gmail.com";
  const COOLDOWN_MS = 60000; // 60초 쿨다운 제한 시간

  container.innerHTML = `
    <section id="contact" class="section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">
            <span>✉️</span> 연락하기 (Contact)
          </h2>
          <p class="section-subtitle">백엔드 아키텍처 구축, 프로젝트 문의, 협업 제안은 언제든 편하게 연락해 주세요!</p>
        </div>

        <div class="contact-card">
          <!-- 이메일 빠른 복사 박스 -->
          <div class="contact-email-box">
            <span class="email-address" id="email-text">${defaultEmail}</span>
            <button id="copy-email-btn" class="copy-btn" type="button">
              <span>📋 이메일 주소 복사</span>
            </button>
          </div>

          <!-- EmailJS 연동 및 3중 스팸 방지 문의 전송 폼 -->
          <form id="contact-form" class="contact-form">
            <!-- 🛡️ 1차 스팸 방지: 자동화 봇 트랩용 허니팟 숨김 필드 (사람 시각/스크린리더 미노출) -->
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
            <button type="submit" id="send-email-btn" class="btn-send">
              <span>이메일 보내기 🚀</span>
            </button>
          </form>
        </div>

        <!-- 하단 푸터 -->
        <footer class="footer">
          <div class="footer-socials">
            <a href="https://github.com/merakyb" target="_blank" class="social-link" title="GitHub">💻 GitHub</a>
            <a href="mailto:bin030922@gmail.com" class="social-link" title="Email">✉️ Direct Email</a>
          </div>
          <p>© 2026 이터븀 (윤여빈). All rights reserved. Built with Modern Web Standard & Supabase DB.</p>
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

  // EmailJS 폼 제출 이벤트 핸들러 (3중 스팸 방지 적용)
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const submitBtn = document.getElementById('send-email-btn');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : '<span>이메일 보내기 🚀</span>';

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // 🛡️ [스팸 방지 1차] 허니팟 (Honeypot Trap) 검증
      const honeypotVal = document.getElementById('hp-website')?.value;
      if (honeypotVal) {
        console.warn('스팸 봇 제출 감지: 허니팟 필드 감지됨');
        alert('문의 메시지가 성공적으로 전송되었습니다!');
        contactForm.reset();
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

      // 서버리스 API (/api/contact) 호출로 이메일 전송 (API 키 브라우저 미노출)
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
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
          contactForm.reset();
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
