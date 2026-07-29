/**
 * ==========================================================================
 * Vercel Serverless Function: Portfolio API (/api/portfolio.js)
 * 브라우저 대신 서버 측에서 Supabase DB에 조회 및 저장을 안전하게 처리합니다.
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

  // 기존 등록된 Key 명칭 100% 유지
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

  // Supabase 환경변수가 설정되지 않은 경우 처리
  if (!supabaseUrl || !supabaseAnonKey || !supabaseUrl.startsWith('http')) {
    if (req.method === 'GET') {
      return res.status(200).json({ success: false, data: null, message: 'Supabase URL/KEY가 서버 환경변수에 설정되어 있지 않습니다.' });
    }
    return res.status(400).json({ success: false, error: 'Supabase 서버 환경변수가 구성되지 않았습니다.' });
  }

  // 깔끔한 URL 트림
  const baseUrl = supabaseUrl.replace(/\/+$/, '');

  if (req.method === 'GET') {
    try {
      const fetchUrl = `${baseUrl}/rest/v1/portfolio?id=eq.main&select=data`;
      const response = await fetch(fetchUrl, {
        method: 'GET',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn('Supabase DB 조회 오류:', errText);
        return res.status(200).json({ success: false, data: null, error: errText });
      }

      const rows = await response.json();
      if (Array.isArray(rows) && rows.length > 0 && rows[0].data) {
        return res.status(200).json({ success: true, data: rows[0].data });
      }
      return res.status(200).json({ success: true, data: null });
    } catch (err) {
      console.error('Supabase DB GET 실패:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  } else if (req.method === 'POST') {
    try {
      const payloadData = req.body;
      if (!payloadData) {
        return res.status(400).json({ success: false, error: '저장할 데이터가 전달되지 않았습니다.' });
      }

      const upsertUrl = `${baseUrl}/rest/v1/portfolio`;
      const upsertBody = [
        {
          id: 'main',
          data: payloadData,
          updated_at: new Date().toISOString()
        }
      ];

      const response = await fetch(upsertUrl, {
        method: 'POST',
        headers: {
          'apikey': supabaseAnonKey,
          'Authorization': `Bearer ${supabaseAnonKey}`,
          'Content-Type': 'application/json',
          'Prefer': 'resolution=merge-duplicates'
        },
        body: JSON.stringify(upsertBody)
      });

      if (response.ok || response.status === 201 || response.status === 204) {
        return res.status(200).json({ success: true, message: 'Supabase DB 저장 완료' });
      } else {
        const errText = await response.text();
        console.error('Supabase DB UPSERT 실패:', errText);
        return res.status(500).json({ success: false, error: errText });
      }
    } catch (err) {
      console.error('Supabase DB POST 실패:', err);
      return res.status(500).json({ success: false, error: err.message });
    }
  } else {
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }
};
