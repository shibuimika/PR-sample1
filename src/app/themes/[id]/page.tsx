import ThemeDetail from '@/components/themes/ThemeDetail';
import { mockThemes } from '@/lib/mock-data';

interface ThemeDetailPageProps {
  params: {
    id: string;
  };
}

export default function ThemeDetailPage({ params }: ThemeDetailPageProps) {
  return <ThemeDetail themeId={params.id} />;
}

// 静的生成のためのパラメータを設定
export async function generateStaticParams() {
  // モックデータからすべてのテーマIDを取得
  return mockThemes.map((theme) => ({
    id: theme.id,
  }));
} 