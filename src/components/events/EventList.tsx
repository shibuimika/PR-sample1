'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Filter, SortAsc, SortDesc, Calendar, Users, FileText, Tag } from 'lucide-react';
import { mockEvents } from '@/lib/mock-data';
import { Event } from '@/lib/schemas';

type SortField = 'title' | 'eventDate' | 'type' | 'participantCount' | 'exposureCount';
type SortDirection = 'asc' | 'desc';

interface FilterState {
  searchTerm: string;
  type: string;
  status: string;
}

export default function EventList() {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    type: '',
    status: '',
  });
  const [sortField, setSortField] = useState<SortField>('eventDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  // イベントの種類と状態の一覧を取得
  const eventTypes = useMemo(() => {
    const uniqueTypes = [...new Set(mockEvents.map(e => e.type))];
    return uniqueTypes.sort();
  }, []);

  const eventStatuses = useMemo(() => {
    const uniqueStatuses = [...new Set(mockEvents.map(e => e.status))];
    return uniqueStatuses.sort();
  }, []);

  // フィルタリング済みのイベント一覧
  const filteredEvents = useMemo(() => {
    let filtered = mockEvents;

    // 検索フィルタ
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    // 種類フィルタ
    if (filters.type) {
      filtered = filtered.filter(event => event.type === filters.type);
    }

    // 状態フィルタ
    if (filters.status) {
      filtered = filtered.filter(event => event.status === filters.status);
    }

    return filtered;
  }, [filters]);

  // ソート済みのイベント一覧
  const sortedEvents = useMemo(() => {
    return [...filteredEvents].sort((a, b) => {
      let aValue: string | number | Date;
      let bValue: string | number | Date;

      switch (sortField) {
        case 'title':
          aValue = a.title;
          bValue = b.title;
          break;
        case 'eventDate':
          aValue = a.eventDate;
          bValue = b.eventDate;
          break;
        case 'type':
          aValue = a.type;
          bValue = b.type;
          break;
        case 'participantCount':
          aValue = a.participantCount;
          bValue = b.participantCount;
          break;
        case 'exposureCount':
          aValue = a.exposureCount;
          bValue = b.exposureCount;
          break;
        default:
          aValue = a.eventDate;
          bValue = b.eventDate;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredEvents, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      type: '',
      status: '',
    });
  };

  const getTypeLabel = (type: Event['type']) => {
    const typeLabels = new Map<Event['type'], string>([
      ['conference', 'カンファレンス'],
      ['seminar', 'セミナー'],
      ['workshop', 'ワークショップ'],
      ['press_event', '記者発表'],
      ['other', 'その他'],
    ]);
    return typeLabels.get(type) || type;
  };

  const getStatusLabel = (status: Event['status']) => {
    const statusLabels = new Map<Event['status'], string>([
      ['planned', '予定'],
      ['ongoing', '進行中'],
      ['completed', '完了'],
      ['cancelled', 'キャンセル'],
    ]);
    return statusLabels.get(status) || status;
  };

  const getStatusColor = (status: Event['status']) => {
    const statusColors = new Map<Event['status'], string>([
      ['planned', 'bg-blue-100 text-blue-800'],
      ['ongoing', 'bg-yellow-100 text-yellow-800'],
      ['completed', 'bg-green-100 text-green-800'],
      ['cancelled', 'bg-red-100 text-red-800'],
    ]);
    return statusColors.get(status) || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">イベント一覧</h1>
          <p className="mt-1 text-sm text-gray-600">
            {sortedEvents.length} 件のイベントを表示中
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            新しいイベントを追加
          </button>
        </div>
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          {/* 検索 */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="イベント名、説明、タグで検索..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* 種類フィルタ */}
          <div className="min-w-40">
            <select
              value={filters.type}
              onChange={(e) => handleFilterChange('type', e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">全ての種類</option>
              {eventTypes.map(type => (
                <option key={type} value={type}>{getTypeLabel(type)}</option>
              ))}
            </select>
          </div>

          {/* 状態フィルタ */}
          <div className="min-w-40">
            <select
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">全ての状態</option>
              {eventStatuses.map(status => (
                <option key={status} value={status}>{getStatusLabel(status)}</option>
              ))}
            </select>
          </div>

          {/* フィルタクリア */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* イベント一覧テーブル */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('eventDate')}
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    <span>開催日</span>
                    {sortField === 'eventDate' && (
                      sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('type')}
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    <span>種類</span>
                    {sortField === 'type' && (
                      sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('title')}
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    <span>タイトル</span>
                    {sortField === 'title' && (
                      sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('participantCount')}
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    <span>参加人数</span>
                    {sortField === 'participantCount' && (
                      sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('exposureCount')}
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    <span>露出数</span>
                    {sortField === 'exposureCount' && (
                      sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </button>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedEvents.map((event) => (
                <tr key={event.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {event.eventDate.toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(event.status)}`}>
                      <Tag className="mr-1 h-3 w-3" />
                      {getTypeLabel(event.type)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Link 
                      href={`/events/${event.id}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {event.title}
                    </Link>
                    <p className="text-sm text-gray-500 mt-1">{event.description}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {event.participantCount} 人
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <FileText className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        {event.exposureCount} 件
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* フィルタ結果が空の場合 */}
      {sortedEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">イベントが見つかりません</h3>
          <p className="mt-1 text-sm text-gray-500">
            検索条件を変更して再度お試しください。
          </p>
        </div>
      )}
    </div>
  );
} 