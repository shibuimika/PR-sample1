import ReporterDetail from '@/components/reporters/ReporterDetail';
import { mockReporters } from '@/lib/mock-data';

interface ReporterDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReporterDetailPage({ params }: ReporterDetailPageProps) {
  const { id } = await params;
  
  return <ReporterDetail reporterId={id} />;
}

// 静的生成のためのパラメータを設定
export async function generateStaticParams() {
  // モックデータからすべての記者IDを取得
  return mockReporters.map((reporter) => ({
    id: reporter.id,
  }));
} 