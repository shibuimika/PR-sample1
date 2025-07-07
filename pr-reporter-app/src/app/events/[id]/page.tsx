import EventDetail from '@/components/events/EventDetail';
import { mockEvents } from '@/lib/mock-data';

interface EventDetailPageProps {
  params: {
    id: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  return <EventDetail eventId={params.id} />;
}

// 静的生成のためのパラメータを設定
export async function generateStaticParams() {
  // モックデータからすべてのイベントIDを取得
  return mockEvents.map((event) => ({
    id: event.id,
  }));
} 