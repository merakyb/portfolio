/**
 * ==========================================================================
 * Vercel Serverless API 엔드포인트 (/api/config)
 * 서버 환경변수(process.env.KAKAO_JAVASCRIPT_KEY)를 읽어서 클라이언트에 전달합니다.
 * ==========================================================================
 */

const fs = require('fs');
const path = require('path');

module.exports = (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate');

  let key = process.env.KAKAO_JAVASCRIPT_KEY;

  // 로컬 개발 환경에서 process.env가 없을 경우 .env 파일 동적 폴백 읽기
  if (!key) {
    try {
      const envPath = path.join(process.cwd(), '.env');
      if (fs.existsSync(envPath)) {
        const envContent = fs.readFileSync(envPath, 'utf8');
        const match = envContent.match(/KAKAO_JAVASCRIPT_KEY\s*=\s*(.+)/);
        if (match) {
          key = match[1].trim();
        }
      }
    } catch (err) {
      console.error('.env read error:', err);
    }
  }

  res.status(200).json({
    kakaoKey: key || ''
  });
};
