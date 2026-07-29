/**
 * ==========================================================================
 * 창업 성향 테스트 메인 데이터 및 평가 알고리즘 모듈 (js/data.js)
 * ==========================================================================
 */

// 12개 질문 데이터 베이스 (2개 선택지 및 성향 가중치 매핑)
export const QUESTIONS_DATA = [
  {
    id: 1,
    number: "Q1",
    title: "창업 캠프 첫날! 팀원들과의 첫 아이디어 회의 상황에서 나는?",
    options: [
      {
        text: "세상에 없던 신선하고 파격적인 아이디어를 마구 던져 회의 분위기를 띄운다.",
        scores: { visionary: 3, driver: 1 }
      },
      {
        text: "현재 기술 수준으로 빠르게 제작 가능한 아이템인지 실현 가능성부터 점검한다.",
        scores: { maker: 3, analyst: 1 }
      }
    ]
  },
  {
    id: 2,
    number: "Q2",
    title: "팀에서 사용할 창업 아이템을 하나로 정해야 할 때 나는?",
    options: [
      {
        text: "시장 규모, 타깃 고객 데이터, 경쟁사 분석 자료를 먼저 찾아본다.",
        scores: { strategist: 2, analyst: 3 }
      },
      {
        text: "고객에게 제공할 핵심 기능(MVP)의 화면 구조와 프로토타입 구상부터 한다.",
        scores: { maker: 3, visionary: 1 }
      }
    ]
  },
  {
    id: 3,
    number: "Q3",
    title: "캠프 해커톤 중 팀원 간의 의견 충돌로 회의가 정체되었을 때 나는?",
    options: [
      {
        text: "각자의 의견을 귀담아듣고 갈등을 조율하며 상호 타협점을 찾아낸다.",
        scores: { connector: 3, strategist: 1 }
      },
      {
        text: "시간이 없으니 일단 결정을 내리고 당장 할 수 있는 일부터 실행에 옮긴다.",
        scores: { driver: 3, visionary: 1 }
      }
    ]
  },
  {
    id: 4,
    number: "Q4",
    title: "멘토링 시간에 창업 멘토님에게 피드백을 받을 때 나는?",
    options: [
      {
        text: "멘토님의 비즈니스 모델 지적 사항을 분석하고 수익 구조(BM)를 재설계한다.",
        scores: { strategist: 3, analyst: 1 }
      },
      {
        text: "멘토님의 인적 네트워크나 연계 가능한 외부 지원 사업 정보부터 물어본다.",
        scores: { connector: 3, driver: 1 }
      }
    ]
  },
  {
    id: 5,
    number: "Q5",
    title: "고객 반응을 테스트하기 위한 웹/앱 프로토타입 제작 시 나는?",
    options: [
      {
        text: "완벽하진 않더라도 오늘 당장 사람들에게 보여줄 데모 페이지를 만든다.",
        scores: { maker: 3, driver: 1 }
      },
      {
        text: "고객 설문조사 항목을 치밀하게 설계하고 통계 데이터를 수집할 준비를 한다.",
        scores: { analyst: 3, strategist: 1 }
      }
    ]
  },
  {
    id: 6,
    number: "Q6",
    title: "사업계획서를 작성할 때 내가 가장 재미있고 잘할 수 있는 파트는?",
    options: [
      {
        text: "새로운 시장 기회와 독창적인 서비스 비전을 설명하는 파트",
        scores: { visionary: 3, connector: 1 }
      },
      {
        text: "시장 규모 추정, 재무 계획 및 리스크 대응 방안을 작성하는 파트",
        scores: { analyst: 3, strategist: 1 }
      }
    ]
  },
  {
    id: 7,
    number: "Q7",
    title: "프로젝트 진행 중 예상치 못한 문제가 발생했을 때 나의 반응은?",
    options: [
      {
        text: "현장으로 나가 잠재 고객을 만나 직접 인터뷰하고 바로 해결책을 시험한다.",
        scores: { driver: 3, connector: 1 }
      },
      {
        text: "원인을 차근차근 분석하고 최선의 대안책 A, B, C를 작성하여 팀과 논의한다.",
        scores: { strategist: 2, analyst: 2 }
      }
    ]
  },
  {
    id: 8,
    number: "Q8",
    title: "팀원들과 작업 역할을 나눌 때 내가 선호하는 역할은?",
    options: [
      {
        text: "디자인, 프론트엔드/백엔드 개발, 제품 제작 등 직접 결과물을 만드는 역할",
        scores: { maker: 3, driver: 1 }
      },
      {
        text: "팀원들 간 업무 진행 상황을 챙기고 외부 멘토/전문가와 연계하는 역할",
        scores: { connector: 3, strategist: 1 }
      }
    ]
  },
  {
    id: 9,
    number: "Q9",
    title: "새로운 스타트업 창업 아이디어를 떠올릴 때 나는?",
    options: [
      {
        text: "일상의 불편함이나 최신 기술 트렌드에서 직관적으로 아이디어가 솟구친다.",
        scores: { visionary: 3, maker: 1 }
      },
      {
        text: "기존 시장의 데이터 지표와 경쟁사의 맹점을 세밀히 분석하여 아이템을 구상한다.",
        scores: { analyst: 3, strategist: 1 }
      }
    ]
  },
  {
    id: 10,
    number: "Q10",
    title: "최종 데모데이 발표(IR 피칭)를 준비할 때 나의 관심사는?",
    options: [
      {
        text: "심사위원들과 청중의 마음을 사로잡을 강렬한 스토리텔링과 발표 전달력",
        scores: { connector: 2, visionary: 2 }
      },
      {
        text: "질의응답 시 거침없이 답변할 수 있는 수익성 수치와 검증된 정량적 지표",
        scores: { strategist: 2, analyst: 2 }
      }
    ]
  },
  {
    id: 11,
    number: "Q11",
    title: "팀원들이 일할 맛 나게 만드는 나만의 무기는?",
    options: [
      {
        text: "특유의 친근함과 파이팅 넘치는 에너지로 팀 분위기를 밝게 만든다.",
        scores: { connector: 3, driver: 1 }
      },
      {
        text: "막힌 개발 문제나 디자인 시안을 척척 해결해 주는 실무 능력",
        scores: { maker: 3, visionary: 1 }
      }
    ]
  },
  {
    id: 12,
    number: "Q12",
    title: "창업 캠프가 끝난 뒤 스스로 가장 보람을 느끼는 순간은?",
    options: [
      {
        text: "내가 제안한 비전과 서비스를 실제로 사람들이 이용하고 좋아하는 모습을 볼 때",
        scores: { visionary: 2, maker: 2 }
      },
      {
        text: "목표했던 수치를 달성하고 캠프 내에서 완벽한 팀워크로 상을 받았을 때",
        scores: { driver: 2, strategist: 2 }
      }
    ]
  }
];

// 6대 창업 성향 결과 데이터베이스
export const PERSONALITY_RESULTS = {
  visionary: {
    id: "visionary",
    title: "💡 아이디어형 (The Visionary)",
    tagline: "남들이 보지 못하는 새로운 세상과 기회를 발견하는 창의적 기획가",
    icon: "💡",
    summary: "독창적인 아이디어와 직관으로 트렌드를 선도하는 당신! 세상에 없던 가치를 상상하고 팀에 영감을 주는 비전 제시자입니다.",
    strengths: [
      "창의적이고 고정관념을 깨는 독창적인 아이디어 창출",
      "트렌드 변화를 빠르게 읽어내는 유연성과 통찰력",
      "팀원들에게 명확한 비전과 열정을 불어넣는 리더십"
    ],
    blindspots: [
      "디테일한 실무나 데이터 검증을 건너뛰고 바로 진행하려는 경향",
      "아이디어가 자주 바뀌어 팀원들에게 혼란을 줄 가능성"
    ],
    bestRole: "CEO / CPO (최고제품책임자) / 창업 리더",
    synergy: {
      bestPartner: "🛠️ 제작형 (The Maker)",
      bestPartnerDesc: "당신의 거대한 비전을 눈에 보이는 구체적인 제품으로 구현해 주는 최고의 짝꿍입니다.",
      cautionPartner: "🔍 분석형 (The Analyst)",
      cautionPartnerDesc: "아이디어 제시 시 현실적인 데이터 태클이 들어올 수 있으니 사전에 리스크를 검토해 보세요."
    }
  },
  maker: {
    id: "maker",
    title: "🛠️ 제작형 (The Maker)",
    tagline: "상상을 손 끝에서 실체로 완성하는 최고의 실무 엔지니어",
    icon: "🛠️",
    summary: "백가지 말보다 하나의 구동 가능한 MVP를 선호하는 당신! 탁월한 실무 능력과 기술로 팀의 제품을 직접 완성해내는 능력자입니다.",
    strengths: [
      "개발, 디자인, 프로토타이핑 등 구체적인 구현 능력",
      "실제 동작하는 MVP를 빠르게 제작하는 압도적인 생산성",
      "기술적 문제를 정확히 파악하고 수정하는 문제 해결력"
    ],
    blindspots: [
      "기술 자체에 몰입하여 고객의 실제 니즈나 시장성을 놓칠 위험",
      "타인에게 설명하기보다 혼자 처리하려는 경향"
    ],
    bestRole: "CTO (최고기술책임자) / Lead Developer / Product Designer",
    synergy: {
      bestPartner: "💡 아이디어형 (The Visionary)",
      bestPartnerDesc: "당신의 제작 능력에 원동력이 되는 끊임없는 영감과 아이디어를 제공해 줍니다.",
      cautionPartner: "🤝 협업형 (The Connector)",
      cautionPartnerDesc: "개발에 집중할 때 잦은 소통 요청이 부담스러울 수 있으니 작업 시간을 사전 공유하세요."
    }
  },
  strategist: {
    id: "strategist",
    title: "📊 전략형 (The Strategist)",
    tagline: "승리하는 사업 모델과 체계적인 로드맵을 그리는 냉철한 지휘관",
    icon: "📊",
    summary: "비즈니스의 구조와 스케일업 방향을 명확히 제시하는 당신! 팀이 나아갈 올바른 이정표를 세우는 차분한 아키텍트입니다.",
    strengths: [
      "수익 모델(BM) 및 시장 진입 전략 수립 능력",
      "치밀한 사업계획서 작성 및 논리적인 리소소 배분",
      "팀의 장기적 성장 방향성을 제시하는 전략적 사고"
    ],
    blindspots: [
      "너무 치밀한 계획 수립으로 인해 초기 실행 속도가 늦어질 가능성",
      "완벽한 모델을 추구하다 빠른 피봇(Pivot) 기회를 놓칠 위험"
    ],
    bestRole: "CSO (최고전략책임자) / COO / Business Developer",
    synergy: {
      bestPartner: "🚀 실행형 (The Driver)",
      bestPartnerDesc: "당신이 세운 정교한 전략을 지체 없이 현장에서 폭발적인 속도로 실행해 줍니다.",
      cautionPartner: "💡 아이디어형 (The Visionary)",
      cautionPartnerDesc: "갑작스러운 아이디어 변경으로 전략이 흔들릴 수 있으니 핵심 목표 기준을 바로 세우세요."
    }
  },
  connector: {
    id: "connector",
    title: "🤝 협업형 (The Connector)",
    tagline: "사람과 사람을 잇고 강력한 팀워크를 끌어내는 분위기 메이커",
    icon: "🤝",
    summary: "뛰어난 공감 능력과 네트워크로 팀을 하나로 묶어주는 당신! 외부 자원과 내부 팀원들의 시너지를 극대화하는 네트워커입니다.",
    strengths: [
      "팀원 간의 갈등을 원만하게 중재하는 공감 능력",
      "외부 멘토, 투자자, 파트너와의 뛰어난 네트워킹 능력",
      "팀의 사기를 높이고 유연한 분위기를 만드는 매력"
    ],
    blindspots: [
      "좋은 게 좋은 것이라는 태도로 쓴소리나 과감한 결단을 주저할 가능성",
      "관계에 치중하다 핵심 실무 과제를 놓칠 위험"
    ],
    bestRole: "CMO / CHRO (최고인사책임자) / Community Manager",
    synergy: {
      bestPartner: "🔍 분석형 (The Analyst)",
      bestPartnerDesc: "당신의 감성적인 네트워킹에 냉철한 객관적 지표와 데이터를 보완해 줍니다.",
      cautionPartner: "🛠️ 제작형 (The Maker)",
      cautionPartnerDesc: "제작 몰입 시간에 잦은 대화 요청 시 피로감을 느낄 수 있으니 1:1 정기 미팅을 활용하세요."
    }
  },
  analyst: {
    id: "analyst",
    title: "🔍 분석형 (The Analyst)",
    tagline: "데이터와 지표로 서비스의 리스크를 차단하는 리스크 파수꾼",
    icon: "🔍",
    summary: "근거 없는 주장은 NO! 철저한 데이터 수집과 객관적인 검증으로 팀의 손실을 방지하는 신중한 팩트 체커입니다.",
    strengths: [
      "시장 데이터 및 수치 지표 분석 능력",
      "사업 진행 시 발생할 세밀한 리스크 사전 감지 및 차단",
      "정량적 팩트 기반의 합리적인 의사결정"
    ],
    blindspots: [
      "데이터가 부족한 초기 창업 단계에서 지나치게 신중해질 위험",
      "비판적인 분석으로 인해 창의적인 아이디어를 위축시킬 가능성"
    ],
    bestRole: "CFO (최고재무책임자) / Data Analyst / Risk Manager",
    synergy: {
      bestPartner: "🤝 협업형 (The Connector)",
      bestPartnerDesc: "당신의 차가운 숫자 데이터에 따뜻한 대인 관계와 스토리를 입혀줍니다.",
      cautionPartner: "💡 아이디어형 (The Visionary)",
      cautionPartnerDesc: "아이디어 제시 시 즉각적인 팩트 체킹보다는 아이디어 확장 시간을 먼저 가져보세요."
    }
  },
  driver: {
    id: "driver",
    title: "🚀 실행형 (The Driver)",
    tagline: "생각보다 행동! 강력한 추진력으로 결과를 만들어내는 현장가",
    icon: "🚀",
    summary: "복잡한 고민 대신 일단 현장으로 달려가는 당신! 끊임없는 실행과 피드백 수집으로 목표를 돌파해내는 파워 엔진입니다.",
    strengths: [
      "목표를 향해 지체 없이 돌진하는 압도적인 실행력",
      "고객 현장에서 즉각적인 피드백을 수집하는 순발력",
      "어려운 장애물도 끝까지 밀어붙이는 불굴의 추진력"
    ],
    blindspots: [
      "성급한 결정으로 충분한 검증 없이 리소스를 낭비할 가능성",
      "속도를 맞추지 못하는 팀원들에게 답답함을 느낄 수 있음"
    ],
    bestRole: "COO (최고운영책임자) / Growth Hacker / Field Marketer",
    synergy: {
      bestPartner: "📊 전략형 (The Strategist)",
      bestPartnerDesc: "당신의 지치지 않는 폭발적 실행력에 올바른 방향성과 전략을 잡아줍니다.",
      cautionPartner: "🔍 분석형 (The Analyst)",
      cautionPartnerDesc: "속도를 내고 싶을 때 검증 절차로 마찰이 생길 수 있으니 최소 가이드라인만 합의해 보세요."
    }
  }
};

/**
 * 최종 점수 산출 알고리즘 함수
 * @param {Array} userAnswers - 사용자가 선택한 문항별 점수 배열
 * @returns {Object} { mainType, subType, scores, scorePercentages }
 */
export function calculateResult(userAnswers) {
  const scores = {
    visionary: 0,
    maker: 0,
    strategist: 0,
    connector: 0,
    analyst: 0,
    driver: 0
  };

  userAnswers.forEach(ans => {
    if (ans && ans.scores) {
      Object.keys(ans.scores).forEach(key => {
        if (scores[key] !== undefined) {
          scores[key] += ans.scores[key];
        }
      });
    }
  });

  // 점수 내림차순 정렬
  const sorted = Object.keys(scores).sort((a, b) => scores[b] - scores[a]);
  const mainTypeId = sorted[0];
  const subTypeId = sorted[1];

  const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr, 0) || 1;

  // 육각형 차트용 백분율 점수 계산 (최대값 기준 정규화)
  const maxScore = scores[mainTypeId] || 1;
  const scorePercentages = {};
  Object.keys(scores).forEach(key => {
    scorePercentages[key] = Math.round((scores[key] / maxScore) * 100);
  });

  return {
    mainType: PERSONALITY_RESULTS[mainTypeId] || PERSONALITY_RESULTS.visionary,
    subType: PERSONALITY_RESULTS[subTypeId] || PERSONALITY_RESULTS.maker,
    rawScores: scores,
    scorePercentages
  };
}

/**
 * URL Query parameter (?type=visionary&sub=driver) 기반 결과 객체 생성 함수
 */
export function getResultByTypeId(mainTypeId, subTypeId) {
  const main = PERSONALITY_RESULTS[mainTypeId] || PERSONALITY_RESULTS.visionary;
  const sub = PERSONALITY_RESULTS[subTypeId] || PERSONALITY_RESULTS.maker;

  const defaultScores = {
    visionary: 40,
    maker: 40,
    strategist: 40,
    connector: 40,
    analyst: 40,
    driver: 40
  };
  defaultScores[main.id] = 100;
  defaultScores[sub.id] = 75;

  return {
    mainType: main,
    subType: sub,
    rawScores: defaultScores,
    scorePercentages: defaultScores
  };
}
