import ReporterDetail from '@/components/reporters/ReporterDetail';
import { mockReporters } from '@/lib/mock-data';

interface ReporterDetailPageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function ReporterDetailPage({ params }: ReporterDetailPageProps) {
  return <ReporterDetail reporterId={params.id} />;
}

// 静的生成のためのパラメータを設定
export async function generateStaticParams() {
  // モックデータからすべての記者IDを取得
  return mockReporters.map((reporter) => ({
    id: reporter.id,
  }));
} 