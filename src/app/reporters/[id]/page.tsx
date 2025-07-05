import MainLayout from '@/components/layout/MainLayout';
import ReporterDetail from '@/components/reporters/ReporterDetail';

interface ReporterDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ReporterDetailPage({ params }: ReporterDetailPageProps) {
  const { id } = await params;
  
  return (
    <MainLayout>
      <ReporterDetail reporterId={id} />
    </MainLayout>
  );
} 