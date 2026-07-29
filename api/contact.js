/**
 * ==========================================================================
 * Vercel Serverless Function: Contact API (/api/contact.js)
 * 브라우저 대신 서버 측에서 EmailJS REST API를 안전하게 호출합니다.
 * ==========================================================================
 */

module.exports = async function handler(req, res) {
  // CORS 및 헤더 설정
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  try {
    const { from_name, email, message, hp_website } = req.body || {};

    // 1. 허니팟 (Honeypot Trap) 봇 검증
    if (hp_website) {
      console.warn('스팸 봇 감지됨 (Honeypot filled)');
      return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    }

    // 2. 유효성 검증
    if (!from_name || from_name.trim().length < 2) {
      return res.status(400).json({ success: false, error: '성함을 2자 이상 입력해 주세요.' });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: '올바른 이메일 형식이 아닙니다.' });
    }
    if (!message || message.trim().length < 5) {
      return res.status(400).json({ success: false, error: '문의 내용을 5자 이상 입력해 주세요.' });
    }

    // 3. 서버 측 process.env 키 읽기 (기존 키 명칭 및 Value 100% 유지)
    const serviceId = process.env.EMAILJS_SERVICE_ID || 'service_vqj2f68';
    const templateId = process.env.EMAILJS_TEMPLATE_ID || 'template_s0otxbz';
    const publicKey = process.env.EMAILJS_PUBLIC_KEY || 'pPPNP051HTkuP4dbG';

    // 4. EmailJS REST API 서버 측 호출
    const emailjsPayload = {
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      template_params: {
        from_name: from_name.trim(),
        email: email.trim(),
        message: message.trim()
      }
    };

    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(emailjsPayload)
    });

    if (response.ok) {
      return res.status(200).json({ success: true, message: '이메일이 성공적으로 전송되었습니다.' });
    } else {
      const errorText = await response.text();
      console.error('EmailJS REST API 오류:', errorText);
      return res.status(500).json({ success: false, error: `EmailJS 전송 실패: ${errorText}` });
    }
  } catch (err) {
    console.error('서버 내부 오류:', err);
    return res.status(500).json({ success: false, error: err.message || '서버 내부 오류가 발생했습니다.' });
  }
};
