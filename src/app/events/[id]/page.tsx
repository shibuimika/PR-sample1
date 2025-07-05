import EventDetail from '@/components/events/EventDetail';

interface EventDetailPageProps {
  params: {
    id: string;
  };
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  return <EventDetail eventId={params.id} />;
} 