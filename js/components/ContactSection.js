/**
 * ==========================================================================
 * 연락처 및 푸터 컴포넌트 모듈 (ContactSection.js)
 * 이메일 복사 기능 및 EmailJS 기반 문의 메시지 전송 폼 처리를 담당합니다.
 * 모든 주석은 한글로 작성되어 있습니다.
 * ==========================================================================
 */

export function renderContactSection() {
  const container = document.getElementById('contact-container');
  if (!container) return;

  const defaultEmail = "bin030922@gmail.com";

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

          <!-- EmailJS 연동 문의 전송 폼 -->
          <form id="contact-form" class="contact-form">
            <div class="form-group">
              <label class="form-label" for="contact-name">보내시는 분 이름</label>
              <input type="text" id="contact-name" name="from_name" class="form-input" placeholder="성함 또는 기업/단체명" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-email">회신 받으실 이메일 주소</label>
              <input type="email" id="contact-email" name="email" class="form-input" placeholder="your-email@example.com" required />
            </div>
            <div class="form-group">
              <label class="form-label" for="contact-message">문의 내용</label>
              <textarea id="contact-message" name="message" class="form-textarea" placeholder="프로젝트 문의나 협업에 관한 내용을 작성해 주세요." required></textarea>
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

  // EmailJS 폼 제출 이벤트 핸들러
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    const submitBtn = document.getElementById('send-email-btn');
    const originalBtnContent = submitBtn ? submitBtn.innerHTML : '<span>이메일 보내기 🚀</span>';

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const from_name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const message = document.getElementById('contact-message').value.trim();

      if (!from_name || !email || !message) {
        alert('모든 입력 항목(이름, 이메일 주소, 문의 내용)을 작성해 주세요.');
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>전송 중... ⏳</span>`;
      }

      const serviceId = "service_vqj2f68";
      const templateId = "template_s0otxbz";
      const apiKey = "pPPNP051HTkuP4dbG";

      const templateParams = {
        from_name: from_name,
        email: email,
        message: message
      };

      const emailjsClient = (window.emailjs && window.emailjs.send) ? window.emailjs : (typeof emailjs !== 'undefined' ? emailjs : null);

      if (emailjsClient) {
        emailjsClient.send(serviceId, templateId, templateParams, apiKey)
          .then((response) => {
            console.log('EmailJS Success:', response.status, response.text);
            alert('문의 메시지가 성공적으로 전송되었습니다! 빠른 시일 내에 답변드리겠습니다. 🚀');
            contactForm.reset();
          })
          .catch((error) => {
            console.error('EmailJS Error:', error);
            alert(`이메일 전송 중 오류가 발생했습니다.\nDirect 이메일(${defaultEmail})로 문의해 주세요.`);
          })
          .finally(() => {
            if (submitBtn) {
              submitBtn.disabled = false;
              submitBtn.innerHTML = originalBtnContent;
            }
          });
      } else {
        alert('EmailJS SDK를 로드하지 못했습니다. 잠시 후 다시 시도해 주세요.');
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnContent;
        }
      }
    });
  }
}
