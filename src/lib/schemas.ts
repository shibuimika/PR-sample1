import { z } from 'zod';

// 記者スキーマ
export const ReporterSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, '記者名は必須です').max(100),
  company: z.string().min(1, '会社名は必須です').max(100),
  email: z.string().email('有効なメールアドレスを入力してください'),
  phone: z.string().optional(),
  position: z.string().optional(),
  interests: z.array(z.string()).default([]),
  specialties: z.array(z.string()).default([]),
  contactPreference: z.enum(['email', 'phone', 'both']).default('email'),
  notes: z.string().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// 記事スキーマ
export const ArticleSchema = z.object({
  id: z.string().uuid(),
  reporterId: z.string().uuid(),
  title: z.string().min(1, 'タイトルは必須です').max(200),
  content: z.string().optional(),
  url: z.string().url('有効なURLを入力してください').optional(),
  publishedAt: z.date(),
  tags: z.array(z.string()).default([]),
  summary: z.string().optional(),
  createdAt: z.date(),
});

// やり取り履歴スキーマ
export const ContactHistorySchema = z.object({
  id: z.string().uuid(),
  reporterId: z.string().uuid(),
  date: z.date(),
  type: z.enum(['email', 'phone', 'meeting', 'other']),
  subject: z.string().min(1, '件名は必須です').max(200),
  content: z.string().min(1, '内容は必須です'),
  outcome: z.enum(['successful', 'no_response', 'interested', 'not_interested', 'follow_up_needed']),
  nextActionDate: z.date().optional(),
  createdAt: z.date(),
});

// テーマスキーマ
export const ThemeSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'タイトルは必須です').max(100),
  description: z.string().min(1, '説明は必須です'),
  keywords: z.array(z.string()).default([]),
  category: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).default('medium'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// イベントスキーマ
export const EventSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1, 'タイトルは必須です').max(200),
  description: z.string(),
  eventDate: z.date(),
  location: z.string().optional(),
  attendees: z.array(z.string().uuid()).default([]),
  tags: z.array(z.string()).default([]),
  status: z.enum(['planned', 'ongoing', 'completed', 'cancelled']).default('planned'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// マッチング結果スキーマ
export const MatchResultSchema = z.object({
  reporterId: z.string().uuid(),
  themeId: z.string().uuid().optional(),
  score: z.number().min(0).max(100),
  reasons: z.array(z.string()),
  confidence: z.enum(['low', 'medium', 'high']),
  suggestedApproach: z.string(),
  createdAt: z.date(),
});

// ファイルアップロードスキーマ
export const FileUploadSchema = z.object({
  id: z.string().uuid(),
  filename: z.string().min(1),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number().max(10 * 1024 * 1024, 'ファイルサイズは10MB以下にしてください'),
  url: z.string().url(),
  extractedText: z.string().optional(),
  processedAt: z.date().optional(),
  createdAt: z.date(),
});

// メッセージ生成リクエストスキーマ
export const MessageGenerationSchema = z.object({
  reporterId: z.string().uuid(),
  themeId: z.string().uuid().optional(),
  tone: z.enum(['formal', 'casual', 'friendly', 'professional']).default('professional'),
  purpose: z.enum(['introduction', 'pitch', 'follow_up', 'invitation']),
  additionalContext: z.string().optional(),
});

// 型エクスポート
export type Reporter = z.infer<typeof ReporterSchema>;
export type Article = z.infer<typeof ArticleSchema>;
export type ContactHistory = z.infer<typeof ContactHistorySchema>;
export type Theme = z.infer<typeof ThemeSchema>;
export type Event = z.infer<typeof EventSchema>;
export type MatchResult = z.infer<typeof MatchResultSchema>;
export type FileUpload = z.infer<typeof FileUploadSchema>;
export type MessageGeneration = z.infer<typeof MessageGenerationSchema>;

// 入力用スキーマ（IDや日付を除外）
export const CreateReporterSchema = ReporterSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const UpdateReporterSchema = CreateReporterSchema.partial();

export const CreateArticleSchema = ArticleSchema.omit({ 
  id: true, 
  createdAt: true 
});

export const CreateContactHistorySchema = ContactHistorySchema.omit({ 
  id: true, 
  createdAt: true 
});

export const CreateThemeSchema = ThemeSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const CreateEventSchema = EventSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export type CreateReporter = z.infer<typeof CreateReporterSchema>;
export type UpdateReporter = z.infer<typeof UpdateReporterSchema>;
export type CreateArticle = z.infer<typeof CreateArticleSchema>;
export type CreateContactHistory = z.infer<typeof CreateContactHistorySchema>;
export type CreateTheme = z.infer<typeof CreateThemeSchema>;
export type CreateEvent = z.infer<typeof CreateEventSchema>; 