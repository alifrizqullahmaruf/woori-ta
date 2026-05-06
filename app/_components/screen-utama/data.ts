const ASSETS = "/images/screen-utama";

export type TopStock = {
  rank: 1 | 2 | 3;
  ticker: string;
  logo: string;
};

export const TOP_THREE: ReadonlyArray<TopStock> = [
  { rank: 1, ticker: "NVDA", logo: `${ASSETS}/top-three/nvda.png` },
  { rank: 2, ticker: "AMD", logo: `${ASSETS}/top-three/amd.png` },
  { rank: 3, ticker: "TSLA", logo: `${ASSETS}/top-three/tsla.png` },
];

export type MentionTag = {
  count: string;
  flag: string;
};

export const MENTION_TAGS: ReadonlyArray<MentionTag> = [
  { count: "86", flag: `${ASSETS}/icons/mention-flag-1.png` },
  { count: "650", flag: `${ASSETS}/icons/mention-flag-2.png` },
  { count: "191", flag: `${ASSETS}/icons/mention-flag-3.png` },
];

export const HOTTEST_STOCK_TAGS: readonly string[] = [
  "AI GPU Exclusive",
  "Strong semiconductor sector",
  "Ministry of National Defense AI Expansion",
];

export type TrendingStock = {
  rank: number;
  nameKo: string;
  weeklyDelta: string;
  source: string;
  highlight: string;
  logo: string;
};

export const TRENDING_STOCKS: ReadonlyArray<TrendingStock> = [
  {
    rank: 1,
    nameKo: "실리콘 모션 테크놀로지 ADR",
    weeklyDelta: "+53.97%",
    source: "X 기준",
    highlight: "NAND 컨트롤러 강세로 급등",
    logo: `${ASSETS}/trending/silicon-motion.png`,
  },
  {
    rank: 2,
    nameKo: "맥스리니어",
    weeklyDelta: "+51.25%",
    source: "X 기준",
    highlight: "실적 호조와 공매도 감소로 급등세",
    logo: `${ASSETS}/trending/maxlinear.png`,
  },
  {
    rank: 3,
    nameKo: "AXT",
    weeklyDelta: "+51.1%",
    source: "Reddit·X 기준",
    highlight: "AI 광학 산업 성장 기대감 급등",
    logo: `${ASSETS}/trending/axt.png`,
  },
];

export type Theme = {
  nameKo: string;
  delta: string;
  icon: string;
};

export const THEMES: ReadonlyArray<Theme> = [
  { nameKo: "MZ 소비 플랫폼", delta: "+8.2%", icon: `${ASSETS}/themes/mz-platform.svg` },
  { nameKo: "암호화폐", delta: "+8.1%", icon: `${ASSETS}/themes/crypto.svg` },
  { nameKo: "여가", delta: "+7.5%", icon: `${ASSETS}/themes/leisure.svg` },
  { nameKo: "양자 컴퓨터", delta: "+6%", icon: `${ASSETS}/themes/quantum.svg` },
  { nameKo: "클라우드", delta: "+5.8%", icon: `${ASSETS}/themes/cloud.svg` },
];

export type Issue = {
  titleKo: string;
  bodyKo: string;
  hero: string;
};

export const ISSUES: ReadonlyArray<Issue> = [
  {
    titleKo: "중동 긴장 고조로 유가 100달러 돌파, 글로벌 증시 급락",
    bodyKo:
      "호르무즈 해협 봉쇄 우려로 WTI 원유가 배럴당 100달러를 돌파했습니다. 다우지수는 557포인트 급락하며 지정학적 리스크가 시장을 압박하고 있습니다.",
    hero: `${ASSETS}/issues/oil-shock.png`,
  },
  {
    titleKo: "빅테크 실적 호조에 S&P 500, 4월 10.49% 급등…밸류에이션 부담은 '경고등'",
    bodyKo:
      "S&P 500이 4월 10.49% 상승하며 2020년 이후 최고 월간 성과를 기록했습니다. 1분기 실적 성장률 27.1% 달성했으나, 선행 PER 24배로 밸류에이션 부담이 커지고 있습니다.",
    hero: `${ASSETS}/issues/sp500-april.png`,
  },
  {
    titleKo: "파월 퇴임·워시 지명 임박…매파 성향에 연말 금리 인상 가능성 부상",
    bodyKo:
      "제롬 파월 의장 임기 종료와 케빈 워시의 매파적 성향으로 통화정책 불확실성이 커지고 있습니다. 인플레이션 재가속 우려로 연말 금리 인상 가능성이 제기되고 있습니다.",
    hero: `${ASSETS}/issues/powell-warsh.png`,
  },
];

export const DISCLAIMER_LINES: readonly string[] = [
  "본 서비스는 주식회사 어드바이저로렌이 우리은행 고객을 위해 제공하는 것으로, 현재 위탁 테스트 단계에 있으므로 별도의 사전 고지 없이 서비스가 중단될 수 있습니다. 고객께서는 이와 같은 테스트 환경 및 잠재적인 위험성을 충분히 인지한 상태에서 서비스를 이용하시기 바랍니다.",
  "본 서비스는 금융 전문 생성형 AI '어드바이저로렌'이 제공하는 참고용 정보이며, 제공된 정보는 부정확하거나 최신 정보가 아닐 수 있습니다.",
  "투자 판단 및 그에 따른 최종 결정과 책임은 전적으로 고객 본인에게 있으며, 본 서비스는 어떠한 투자 권유도 포함하지 않습니다.",
];

export const BRAND = {
  headerLogo: `${ASSETS}/brand/advisor-loren.svg`,
  footerLogo: `${ASSETS}/brand/advisor-loren-footer.svg`,
};

export const ICONS = {
  chevronRight: `${ASSETS}/icons/chevron-right.png`,
  sectionAccent: `${ASSETS}/icons/section-icon.svg`,
  externalLink: `${ASSETS}/icons/external-link.svg`,
};
