'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, MapPin, Users, FileText, ExternalLink, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react';
import { mockApi } from '@/lib/mock-data';
import { Event, EventParticipant, Reporter } from '@/lib/schemas';

interface EventDetailProps {
  eventId: string;
}

export default function EventDetail({ eventId }: EventDetailProps) {
  const [event, setEvent] = useState<Event | null>(null);
  const [participants, setParticipants] = useState<EventParticipant[]>([]);
  const [reporters, setReporters] = useState<Reporter[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setLoading(true);
        setError(null);

        // イベント詳細取得
        const eventData = await mockApi.getEventById(eventId);
        if (!eventData) {
          setError('イベントが見つかりません');
          return;
        }
        setEvent(eventData);

        // 記者データ取得
        const reportersData = await mockApi.getReporters();
        setReporters(reportersData);
        
        // モックデータから該当イベントの参加者を取得
        // mockApi.getEventParticipantsが実装されていないため、仮の実装
        const mockEventParticipants = await mockApi.getEventParticipantsByEventId(eventId);
        setParticipants(mockEventParticipants);
      } catch (err) {
        console.error('イベントデータの取得に失敗しました:', err);
        setError('イベントデータの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  const getReporterById = (reporterId: string) => {
    return reporters.find(r => r.id === reporterId);
  };

  const getExposureStatusIcon = (status: EventParticipant['exposureStatus']) => {
    const statusConfig = new Map([
      ['published', { icon: CheckCircle, color: 'text-green-600', label: '掲載済み' }],
      ['planned', { icon: Clock, color: 'text-yellow-600', label: '掲載予定' }],
      ['declined', { icon: XCircle, color: 'text-red-600', label: '掲載見送り' }],
      ['pending', { icon: AlertCircle, color: 'text-gray-600', label: '未確認' }],
    ]);
    return statusConfig.get(status) || { icon: AlertCircle, color: 'text-gray-600', label: '未確認' };
  };

  const getEventTypeLabel = (type: Event['type']) => {
    const typeLabels = new Map<Event['type'], string>([
      ['conference', 'カンファレンス'],
      ['seminar', 'セミナー'],
      ['workshop', 'ワークショップ'],
      ['press_event', '記者発表'],
      ['other', 'その他'],
    ]);
    return typeLabels.get(type) || type;
  };

  const getEventStatusLabel = (status: Event['status']) => {
    const statusLabels = new Map<Event['status'], string>([
      ['planned', '予定'],
      ['ongoing', '進行中'],
      ['completed', '完了'],
      ['cancelled', 'キャンセル'],
    ]);
    return statusLabels.get(status) || status;
  };

  const getEventStatusColor = (status: Event['status']) => {
    const statusColors = new Map<Event['status'], string>([
      ['planned', 'bg-blue-100 text-blue-800'],
      ['ongoing', 'bg-yellow-100 text-yellow-800'],
      ['completed', 'bg-green-100 text-green-800'],
      ['cancelled', 'bg-red-100 text-red-800'],
    ]);
    return statusColors.get(status) || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-2 text-sm text-gray-600">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <XCircle className="h-16 w-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">エラーが発生しました</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <Link 
            href="/events"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            イベント一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* ヘッダー */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getEventStatusColor(event.status)}`}>
                {getEventStatusLabel(event.status)}
              </span>
            </div>
            <p className="text-lg text-gray-600 mb-4">{event.description}</p>
            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                {event.eventDate.toLocaleDateString('ja-JP')}
              </div>
              {event.location && (
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
              )}
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2" />
                {getEventTypeLabel(event.type)}
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link
              href="/events"
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              一覧に戻る
            </Link>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              編集
            </button>
          </div>
        </div>
      </div>

      {/* 統計情報 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">参加人数</p>
              <p className="text-2xl font-semibold text-gray-900">{event.participantCount}人</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <FileText className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">露出数</p>
              <p className="text-2xl font-semibold text-gray-900">{event.exposureCount}件</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <CheckCircle className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">掲載率</p>
              <p className="text-2xl font-semibold text-gray-900">
                {event.participantCount > 0 
                  ? Math.round((event.exposureCount / event.participantCount) * 100) 
                  : 0}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 参加記者一覧 */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">参加記者一覧</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  記者名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  メディア名
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  露出有無
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  記事URL
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  備考
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {participants.map((participant) => {
                const reporter = getReporterById(participant.reporterId);
                const statusConfig = getExposureStatusIcon(participant.exposureStatus);
                const StatusIcon = statusConfig.icon;

                return (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      {reporter ? (
                        <Link
                          href={`/reporters/${reporter.id}`}
                          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
                        >
                          {reporter.name}
                        </Link>
                      ) : (
                        <span className="text-gray-500">不明</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">
                        {reporter?.company || '不明'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <StatusIcon className={`h-4 w-4 mr-2 ${statusConfig.color}`} />
                        <span className="text-sm text-gray-900">{statusConfig.label}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {participant.articleUrl ? (
                        <a
                          href={participant.articleUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 hover:underline inline-flex items-center"
                        >
                          記事を見る
                          <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                      ) : (
                        <span className="text-gray-500">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-900">
                        {participant.notes || '-'}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 参加者がいない場合 */}
      {participants.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
          <div className="text-center">
            <Users className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">参加者がいません</h3>
            <p className="mt-1 text-sm text-gray-500">
              まだ参加者が登録されていません。
            </p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              参加者を追加
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 