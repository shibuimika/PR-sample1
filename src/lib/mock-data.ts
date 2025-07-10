import { Reporter, Article, ContactHistory, Event, EventParticipant } from './schemas';

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

// テーマ型定義（新規作成用）
export type NewTheme = {
  id: string;
  title: string;
  description: string;
  url?: string;
  fileUrl?: string;
};

// 社内PR担当者型定義
export type InternalPRStaff = {
  id: string;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  expertise: string[];
};

// 社内PR担当者データ
export const mockInternalPRStaff: InternalPRStaff[] = [
  {
    id: 'staff-1',
    name: '山田 健太',
    department: '広報部',
    position: '広報マネージャー',
    email: 'k.yamada@company.com',
    phone: '03-1234-5678',
    expertise: ['テクノロジー', 'AI', 'DX'],
  },
  {
    id: 'staff-2',
    name: '佐々木 美咲',
    department: '広報部',
    position: '広報スペシャリスト',
    email: 'm.sasaki@company.com',
    phone: '03-1234-5679',
    expertise: ['ビジネス', '経営戦略', 'サステナビリティ'],
  },
  {
    id: 'staff-3',
    name: '田村 誠',
    department: '技術広報部',
    position: 'テクニカル広報',
    email: 'm.tamura@company.com',
    phone: '03-1234-5680',
    expertise: ['AI', '技術開発', 'エンジニアリング'],
  },
  {
    id: 'staff-4',
    name: '高橋 遥',
    department: '広報部',
    position: '広報アシスタント',
    email: 'h.takahashi@company.com',
    phone: '03-1234-5681',
    expertise: ['メディア対応', 'イベント企画'],
  },
];

// 既存テーマ型定義（一覧表示用）
export type LegacyTheme = {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
  updatedAt: Date;
};

// 統合テーマ型（詳細ページで使用）
export type CombinedTheme = NewTheme | (LegacyTheme & { isLegacy: true });

// 新規作成テーマデータ配列
let themes: NewTheme[] = [];

// 既存のモックテーマデータ（一覧表示用）
export const mockThemes: LegacyTheme[] = [
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

// 新規テーマ追加関数
export function addTheme(theme: NewTheme) {
  themes.push(theme);
}

// 統合テーマ取得関数（新規作成 + 既存モック）
export function getThemeById(id: string): CombinedTheme | undefined {
  // まず新規作成テーマから検索
  const newTheme = themes.find((t) => t.id === id);
  if (newTheme) return newTheme;
  
  // 次に既存モックテーマから検索
  const legacyTheme = mockThemes.find((t) => t.id === id);
  if (legacyTheme) return { ...legacyTheme, isLegacy: true };
  
  return undefined;
}

// 一覧表示用（既存モックテーマのみ）
export function getAllLegacyThemes(): LegacyTheme[] {
  return mockThemes;
}

// 新規作成テーマのみ取得
export function getAllThemes(): NewTheme[] {
  return themes;
}

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
    type: 'conference',
    participantCount: 2,
    exposureCount: 3,
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
    type: 'seminar',
    participantCount: 1,
    exposureCount: 1,
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
    type: 'seminar',
    participantCount: 1,
    exposureCount: 0,
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-08-01'),
  },
];

// モックイベント参加者データ
export const mockEventParticipants: EventParticipant[] = [
  {
    id: 'participant-1',
    eventId: 'event-1',
    reporterId: 'reporter-1',
    exposureStatus: 'published',
    articleUrl: 'https://nikkei.com/ai-summit-2024',
    notes: 'AI技術の最新動向について詳細な記事を執筆',
    createdAt: new Date('2024-08-16'),
  },
  {
    id: 'participant-2',
    eventId: 'event-1',
    reporterId: 'reporter-2',
    exposureStatus: 'published',
    articleUrl: 'https://techcrunch.jp/ai-summit-report',
    notes: 'スタートアップ企業のAI活用事例を中心にレポート',
    createdAt: new Date('2024-08-16'),
  },
  {
    id: 'participant-3',
    eventId: 'event-2',
    reporterId: 'reporter-1',
    exposureStatus: 'published',
    articleUrl: 'https://nikkei.com/fintech-study-session',
    notes: 'フィンテック業界の最新トレンドについて分析記事を掲載',
    createdAt: new Date('2024-09-11'),
  },
  {
    id: 'participant-4',
    eventId: 'event-3',
    reporterId: 'reporter-3',
    exposureStatus: 'pending',
    notes: 'サステナビリティ経営の記事執筆予定',
    createdAt: new Date('2024-10-06'),
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

  getReporterById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const reporter = mockReporters.find(r => r.id === id);
    if (!reporter) throw new Error('Reporter not found');
    return reporter;
  },

  createReporter: async (reporter: Reporter) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Creating reporter:', reporter);
    return { success: true, id: reporter.id };
  },

  updateReporter: async (id: string, data: Partial<Reporter>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Updating reporter:', id, data);
    return { success: true };
  },

  deleteReporter: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Deleting reporter:', id);
    return { success: true };
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
    await new Promise(resolve => setTimeout(resolve, 500));
    return getAllLegacyThemes(); // 一覧では既存モックテーマを返す
  },

  getThemeById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const theme = getThemeById(id); // 統合テーマを返す
    if (!theme) throw new Error('Theme not found');
    return theme;
  },

  createTheme: async (theme: NewTheme) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Creating theme:', theme);
    return { success: true, id: theme.id };
  },

  updateTheme: async (id: string, data: Partial<NewTheme>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Updating theme:', id, data);
    return { success: true };
  },

  deleteTheme: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Deleting theme:', id);
    return { success: true };
  },

  // イベントデータ
  getEvents: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockEvents;
  },

  getEventById: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const event = mockEvents.find(e => e.id === id);
    if (!event) throw new Error('Event not found');
    return event;
  },

  createEvent: async (event: Event) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Creating event:', event);
    return { success: true, id: event.id };
  },

  updateEvent: async (id: string, data: Partial<Event>) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Updating event:', id, data);
    return { success: true };
  },

  deleteEvent: async (id: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log('Deleting event:', id);
    return { success: true };
  },

  // イベント参加者データ
  getEventParticipants: async (eventId?: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return eventId 
      ? mockEventParticipants.filter(p => p.eventId === eventId)
      : mockEventParticipants;
  },

  getEventParticipantsByEventId: async (eventId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockEventParticipants.filter(p => p.eventId === eventId);
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