import React from 'react';
import ThemeDetail from '../../../components/themes/ThemeDetail';
import { getAllLegacyThemes } from '../../../lib/mock-data';

interface ThemeDetailPageProps {
  params: {
    id: string;
  };
}

const ThemeDetailPage = ({ params }: ThemeDetailPageProps) => {
  return (
    <ThemeDetail id={params.id} />
  );
};

export default ThemeDetailPage;

// 静的生成のためのパラメータを設定
export async function generateStaticParams() {
  // 既存モックテーマのIDを取得（新規作成テーマは動的）
  return getAllLegacyThemes().map((theme) => ({
    id: theme.id,
  }));
} 