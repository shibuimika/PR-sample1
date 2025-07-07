import OpenAI from 'openai';

// 環境変数の型安全な取得
const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error('OPENAI_API_KEY is not defined');
}

// OpenAIクライアントの作成
export const openai = new OpenAI({
  apiKey,
});

// 記者データの型定義
interface ReporterData {
  name: string;
  company: string;
  position?: string;
  articles?: Array<{ title: string }>;
  interests?: string[];
}

// 記者プロファイルの型定義
interface ReporterProfile {
  name: string;
  company: string;
  interests?: string[];
  communicationStyle?: string;
}

// テーマの型定義
interface Theme {
  title: string;
  description: string;
  keywords?: string[];
}

// AI分析用のプロンプトテンプレート
export const PromptTemplates = {
  // 記者の興味・関心分析
  analyzeReporterInterests: (reporterData: ReporterData) => `
記者の情報を分析して、以下の観点から詳細な分析を行ってください：

記者情報：
- 名前: ${reporterData.name}
- 会社: ${reporterData.company}
- 職位: ${reporterData.position || '不明'}
- 過去の記事: ${reporterData.articles?.map((a) => a.title).join(', ') || 'なし'}
- 既知の興味分野: ${reporterData.interests?.join(', ') || 'なし'}

分析内容：
1. 主要な興味・関心分野
2. 記事の傾向とパターン
3. 専門領域の深さ
4. 効果的なアプローチ方法
5. 最適な連絡タイミング

JSON形式で以下の構造で回答してください：
{
  "interests": ["分野1", "分野2", "分野3"],
  "expertise_level": "beginner|intermediate|expert",
  "preferred_content_type": "news|analysis|interview|feature",
  "communication_style": "formal|casual|technical|narrative",
  "best_contact_time": "morning|afternoon|evening",
  "recommended_approach": "具体的なアプローチ方法",
  "confidence_score": 0-100
}
`,

  // 企画提案メッセージ生成
  generatePitchMessage: (reporterProfile: ReporterProfile, theme: Theme, tone: string) => `
以下の情報を基に、効果的な企画提案メールを作成してください：

記者情報：
- 名前: ${reporterProfile.name}
- 会社: ${reporterProfile.company}
- 興味分野: ${reporterProfile.interests?.join(', ') || '不明'}
- コミュニケーションスタイル: ${reporterProfile.communicationStyle || '不明'}

企画情報：
- テーマ: ${theme.title}
- 説明: ${theme.description}
- キーワード: ${theme.keywords?.join(', ') || 'なし'}

トーン: ${tone}

要件：
1. 件名を含む完全なメール形式
2. 記者の関心に合わせたカスタマイズ
3. 具体的な価値提案
4. 次のアクションが明確
5. 適切な敬語と丁寧語

メール構成：
- 件名
- 挨拶
- 自己紹介（簡潔）
- 企画の概要と価値
- 記者にとってのメリット
- 具体的な提案内容
- 次のステップ
- 結び

JSON形式で以下の構造で回答してください：
{
  "subject": "件名",
  "body": "メール本文",
  "key_points": ["重要ポイント1", "重要ポイント2"],
  "call_to_action": "具体的な次のアクション",
  "estimated_response_probability": 0-100
}
`,

  // ファイル内容に基づく記者マッチング
  matchReportersFromContent: (extractedText: string, reporters: ReporterData[]) => `
以下の文書内容を分析し、最も適切な記者を推薦してください：

文書内容：
${extractedText.substring(0, 2000)}${extractedText.length > 2000 ? '...' : ''}

記者リスト：
${reporters.map((r, i) => `
${i + 1}. ${r.name} (${r.company})
   - 興味分野: ${r.interests?.join(', ') || 'なし'}
   - 過去記事: ${r.articles?.slice(0, 3).map((a) => a.title).join(', ') || 'なし'}
`).join('')}

分析要件：
1. 文書の主要トピックとキーワード抽出
2. 各記者との関連性スコア（0-100）
3. マッチング理由の詳細説明
4. 推奨アプローチ方法

JSON形式で以下の構造で回答してください：
{
  "document_summary": "文書の要約",
  "main_topics": ["トピック1", "トピック2"],
  "keywords": ["キーワード1", "キーワード2"],
  "matches": [
    {
      "reporter_id": "記者ID",
      "reporter_name": "記者名",
      "score": 0-100,
      "reasons": ["理由1", "理由2"],
      "suggested_approach": "推奨アプローチ",
      "confidence": "low|medium|high"
    }
  ]
}
`,
};

// AI API呼び出し用のヘルパー関数
export class AIService {
  static async analyzeReporter(reporterData: ReporterData) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'あなたは経験豊富な広報専門家です。記者の分析と効果的なコミュニケーション戦略の立案を行います。',
          },
          {
            role: 'user',
            content: PromptTemplates.analyzeReporterInterests(reporterData),
          },
        ],
        temperature: 0.3,
        max_tokens: 1000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('AI response is empty');

      return JSON.parse(content);
    } catch (error) {
      console.error('Error analyzing reporter:', error);
      throw new Error('記者分析に失敗しました');
    }
  }

  static async generatePitchMessage(reporterProfile: ReporterProfile, theme: Theme, tone: string = 'professional') {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'あなたは優秀な広報担当者です。記者に対する効果的な企画提案メールを作成します。',
          },
          {
            role: 'user',
            content: PromptTemplates.generatePitchMessage(reporterProfile, theme, tone),
          },
        ],
        temperature: 0.4,
        max_tokens: 1500,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('AI response is empty');

      return JSON.parse(content);
    } catch (error) {
      console.error('Error generating pitch message:', error);
      throw new Error('メッセージ生成に失敗しました');
    }
  }

  static async matchReportersFromContent(extractedText: string, reporters: ReporterData[]) {
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'あなたは広報戦略のエキスパートです。文書内容を分析し、最適な記者をマッチングします。',
          },
          {
            role: 'user',
            content: PromptTemplates.matchReportersFromContent(extractedText, reporters),
          },
        ],
        temperature: 0.2,
        max_tokens: 2000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('AI response is empty');

      return JSON.parse(content);
    } catch (error) {
      console.error('Error matching reporters:', error);
      throw new Error('記者マッチングに失敗しました');
    }
  }
} 