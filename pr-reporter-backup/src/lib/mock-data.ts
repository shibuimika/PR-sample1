import { Reporter, Article, ContactHistory, Theme, Event } from './schemas';

// モック記者データ
export const mockReporters: Reporter[] = [
  {
    id: 'reporter-1',
    name: '田中 太郎',
    company: '日本経済新聞',
    email: 'tanaka@nikkei.com',
    phone: '03-1234-5678',
    position: '経済部記者',
    interests: ['フィンテック', 'スタートアップ', 'DX'],
    specialties: ['金融', '経済政策', '企業分析'],
    contactPreference: 'email',
    notes: 'AI関連の記事を多く執筆。返信は早い。',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-12-01'),
  },
  {
    id: 'reporter-2',
    name: '佐藤 花子',
    company: 'TechCrunch Japan',
    email: 'sato@techcrunch.jp',
    phone: '03-9876-5432',
    position: 'シニアライター',
    interests: ['AI', 'SaaS', 'IoT'],
    specialties: ['テクノロジー', 'スタートアップ', 'プロダクト分析'],
    contactPreference: 'both',
    notes: 'テック系に詳しい。デモや実機があると食いつきが良い。',
    createdAt: new Date('2024-02-20'),
    updatedAt: new Date('2024-11-15'),
  },
  {
    id: 'reporter-3',
    name: '山田 次郎',
    company: '朝日新聞',
    email: 'yamada@asahi.com',
    phone: '03-5555-1111',
    position: '科学部記者',
    interests: ['環境技術', 'バイオテック', 'データサイエンス'],
    specialties: ['科学技術', '環境問題', '研究開発'],
    contactPreference: 'email',
    notes: '学術的な裏付けを重視。研究者との関係が深い。',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-10-30'),
  },
];

// モック記事データ
export const mockArticles: Article[] = [
  {
    id: 'article-1',
    reporterId: 'reporter-1',
    title: '国内フィンテック企業の資金調達額が過去最高を記録',
    content: '2024年上半期、国内のフィンテック企業による資金調達総額が...',
    url: 'https://nikkei.com/article/fintech-funding-2024',
    publishedAt: new Date('2024-07-01'),
    tags: ['フィンテック', '資金調達', '投資'],
    summary: 'フィンテック企業の資金調達動向について分析',
    createdAt: new Date('2024-07-01'),
  },
  {
    id: 'article-2',
    reporterId: 'reporter-2',
    title: '生成AIを活用した新しいSaaSプロダクトが続々登場',
    content: '生成AIの技術進歩により、従来にない革新的なSaaSプロダクトが...',
    url: 'https://techcrunch.jp/2024/06/generative-ai-saas',
    publishedAt: new Date('2024-06-15'),
    tags: ['AI', 'SaaS', 'プロダクト'],
    summary: '生成AIを活用したSaaSプロダクトの最新トレンド',
    createdAt: new Date('2024-06-15'),
  },
  {
    id: 'article-3',
    reporterId: 'reporter-3',
    title: 'カーボンニュートラル実現に向けた新技術の開発状況',
    content: '2030年のカーボンニュートラル実現に向けて、各社が...',
    url: 'https://asahi.com/science/carbon-neutral-tech',
    publishedAt: new Date('2024-05-20'),
    tags: ['環境技術', 'カーボンニュートラル', '技術開発'],
    summary: 'カーボンニュートラル実現に向けた技術開発の現状',
    createdAt: new Date('2024-05-20'),
  },
];

// モック連絡履歴データ
export const mockContactHistory: ContactHistory[] = [
  {
    id: 'contact-1',
    reporterId: 'reporter-1',
    date: new Date('2024-06-01'),
    type: 'email',
    subject: '新フィンテックサービス「PayFast」のご紹介',
    content: 'この度、弊社では新しいフィンテックサービス「PayFast」をリリースいたします...',
    outcome: 'interested',
    nextActionDate: new Date('2024-06-15'),
    createdAt: new Date('2024-06-01'),
  },
  {
    id: 'contact-2',
    reporterId: 'reporter-2',
    date: new Date('2024-05-15'),
    type: 'meeting',
    subject: 'AIチャットボットサービスの取材について',
    content: '弊社のAIチャットボットサービスについてデモンストレーションを実施...',
    outcome: 'successful',
    createdAt: new Date('2024-05-15'),
  },
  {
    id: 'contact-3',
    reporterId: 'reporter-3',
    date: new Date('2024-04-20'),
    type: 'email',
    subject: '環境配慮型IoTセンサーの開発について',
    content: '弊社で開発中の環境配慮型IoTセンサーについて...',
    outcome: 'follow_up_needed',
    nextActionDate: new Date('2024-05-01'),
    createdAt: new Date('2024-04-20'),
  },
];

// モックテーマデータ
export const mockThemes: Theme[] = [
  {
    id: 'theme-1',
    title: 'AI活用による業務効率化',
    description: '生成AIを活用した企業の業務効率化事例とその効果について',
    keywords: ['AI', '業務効率化', 'DX', '生産性向上'],
    category: 'テクノロジー',
    priority: 'high',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: 'theme-2',
    title: 'スタートアップの資金調達動向',
    description: '2024年のスタートアップ企業の資金調達動向と投資家の関心分野',
    keywords: ['スタートアップ', '投資', 'VC', '資金調達'],
    category: 'ビジネス',
    priority: 'medium',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-05-01'),
  },
  {
    id: 'theme-3',
    title: 'サステナビリティ経営',
    description: '企業のサステナビリティ経営への取り組みと成果',
    keywords: ['サステナビリティ', 'ESG', '環境経営', 'CSR'],
    category: '環境・社会',
    priority: 'high',
    createdAt: new Date('2024-03-01'),
    updatedAt: new Date('2024-04-01'),
  },
];

// モックイベントデータ
export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'AI & Tech Summit 2024',
    description: '最新のAI技術とその実用化事例を紹介する大規模カンファレンス',
    eventDate: new Date('2024-08-15'),
    location: '東京ビッグサイト',
    attendees: ['reporter-1', 'reporter-2'],
    tags: ['AI', 'テクノロジー', 'カンファレンス'],
    status: 'completed',
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-08-20'),
  },
  {
    id: 'event-2',
    title: 'フィンテック業界勉強会',
    description: '金融業界の最新トレンドとフィンテック企業の事例紹介',
    eventDate: new Date('2024-09-10'),
    location: 'オンライン',
    attendees: ['reporter-1'],
    tags: ['フィンテック', '金融', '勉強会'],
    status: 'completed',
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2024-09-15'),
  },
  {
    id: 'event-3',
    title: 'サステナビリティ経営セミナー',
    description: '企業のサステナビリティ経営への取り組み事例',
    eventDate: new Date('2024-10-05'),
    location: '大阪国際会議場',
    attendees: ['reporter-3'],
    tags: ['サステナビリティ', '経営', 'セミナー'],
    status: 'planned',
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-01'),
  },
];

// データ取得用のヘルパー関数
export const mockApi = {
  // 記者データ
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getReporters: async (_filters?: Record<string, unknown>) => {
    await new Promise(resolve => setTimeout(resolve, 500)); // API呼び出しをシミュレート
    return mockReporters;
  },

  getReporter: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockReporters.find(r => r.id === id);
  },

  // 記事データ
  getArticles: async (reporterId?: string) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return reporterId 
      ? mockArticles.filter(a => a.reporterId === reporterId)
      : mockArticles;
  },

  // 連絡履歴データ
  getContactHistory: async (reporterId?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return reporterId 
      ? mockContactHistory.filter(c => c.reporterId === reporterId)
      : mockContactHistory;
  },

  // テーマデータ
  getThemes: async () => {
    await new Promise(resolve => setTimeout(resolve, 200));
    return mockThemes;
  },

  // イベントデータ
  getEvents: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEvents;
  },

  // 記者マッチング（モック）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  matchReporters: async (_content: string) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return [
      {
        reporterId: 'reporter-1',
        reporterName: '田中 太郎',
        score: 85,
        reasons: ['フィンテック関連の記事を多数執筆', 'AI技術に強い関心'],
        suggestedApproach: 'データと具体的な数値を含めた提案が効果的',
        confidence: 'high' as const,
      },
      {
        reporterId: 'reporter-2',
        reporterName: '佐藤 花子',
        score: 78,
        reasons: ['テクノロジー分野の専門性', 'スタートアップに詳しい'],
        suggestedApproach: 'プロダクトデモを含めた提案が効果的',
        confidence: 'medium' as const,
      },
    ];
  },

  // メッセージ生成（モック）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  generateMessage: async (_reporterId: string, _themeId: string, _tone: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
      subject: '【新サービス】AI活用による業務効率化ソリューションのご紹介',
      body: `田中様\n\nいつもお世話になっております。\n\n先日の記事を拝見し、AI技術への深い洞察に感銘を受けました。\n\nこの度、弊社では新しいAI活用による業務効率化ソリューションをリリースいたします。\n\n特に以下の点で、田中様の読者の皆様にとって価値のある情報になると考えております：\n\n• 従来比3倍の業務効率化を実現\n• 導入コストを50%削減\n• 中小企業でも導入可能な簡単設定\n\nもしご興味をお持ちいただけましたら、詳細資料をお送りいたします。\n\nご多忙の中恐縮ですが、ご検討いただければ幸いです。\n\n何卒よろしくお願いいたします。`,
      keyPoints: ['AI技術への関心', '具体的な数値での訴求', '中小企業への適用性'],
      callToAction: '詳細資料の送付、もしくはオンライン説明会の設定',
      estimatedResponseProbability: 75,
    };
  },
}; 