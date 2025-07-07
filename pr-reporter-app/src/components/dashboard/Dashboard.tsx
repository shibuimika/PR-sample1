'use client';

import React, { useEffect, useState } from 'react';
import { 
  Users, 
  FileText, 
  MessageSquare,
  TrendingUp,
  Clock,
  ArrowRight
} from 'lucide-react';
import { mockApi } from '@/lib/mock-data';
import { formatDate } from '@/lib/utils';

interface DashboardStats {
  totalReporters: number;
  totalEvents: number;
  totalThemes: number;
  totalContacts: number;
  recentContacts: number;
  successRate: number;
}

interface RecentActivity {
  id: string;
  type: 'contact' | 'event' | 'match';
  title: string;
  description: string;
  date: Date;
  status: 'success' | 'pending' | 'failed';
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalReporters: 0,
    totalEvents: 0,
    totalThemes: 0,
    totalContacts: 0,
    recentContacts: 0,
    successRate: 0,
  });
  const [recentActivity, setRecentActivity] = useState<RecentActivity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [reporters, events, themes, contacts] = await Promise.all([
          mockApi.getReporters(),
          mockApi.getEvents(),
          mockApi.getThemes(),
          mockApi.getContactHistory(),
        ]);

        const recentContactsCount = contacts.filter(
          contact => 
            new Date(contact.date).getTime() > Date.now() - 30 * 24 * 60 * 60 * 1000
        ).length;

        const successfulContacts = contacts.filter(
          contact => contact.outcome === 'successful' || contact.outcome === 'interested'
        ).length;

        const successRate = contacts.length > 0 
          ? Math.round((successfulContacts / contacts.length) * 100)
          : 0;

        setStats({
          totalReporters: reporters.length,
          totalEvents: events.length,
          totalThemes: themes.length,
          totalContacts: contacts.length,
          recentContacts: recentContactsCount,
          successRate,
        });

        // 最近のアクティビティを生成
        const activities: RecentActivity[] = [
          {
            id: '1',
            type: 'contact',
            title: '田中太郎記者に企画提案',
            description: 'AI活用による業務効率化に関する提案メールを送信',
            date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
            status: 'success',
          },
          {
            id: '2',
            type: 'event',
            title: 'AI & Tech Summit 2024',
            description: '2名の記者が参加予定',
            date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
            status: 'pending',
          },
          {
            id: '3',
            type: 'match',
            title: '記者マッチング完了',
            description: 'フィンテック関連の記事に対して3名の記者をマッチング',
            date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
            status: 'success',
          },
        ];

        setRecentActivity(activities);
      } catch (error) {
        console.error('Dashboard data fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const statCards = [
    {
      title: '記者数',
      value: stats.totalReporters,
      icon: Users,
      color: 'bg-blue-500',
      change: '+12%',
      changeType: 'increase' as const,
    },
    {
      title: '今月のコンタクト',
      value: stats.recentContacts,
      icon: MessageSquare,
      color: 'bg-green-500',
      change: '+8%',
      changeType: 'increase' as const,
    },
    {
      title: '成功率',
      value: `${stats.successRate}%`,
      icon: TrendingUp,
      color: 'bg-purple-500',
      change: '+5%',
      changeType: 'increase' as const,
    },
    {
      title: 'アクティブテーマ',
      value: stats.totalThemes,
      icon: FileText,
      color: 'bg-orange-500',
      change: '+2',
      changeType: 'increase' as const,
    },
  ];

  const quickActions = [
    {
      title: '新しい記者を追加',
      description: '記者情報を登録して関係を構築',
      icon: Users,
      color: 'bg-blue-500',
      action: () => console.log('Add reporter'),
    },
    {
      title: 'ファイルをアップロード',
      description: '資料をアップロードして記者をマッチング',
      icon: FileText,
      color: 'bg-green-500',
      action: () => console.log('Upload file'),
    },
    {
      title: 'メッセージを生成',
      description: 'AI を使って企画提案メールを作成',
      icon: MessageSquare,
      color: 'bg-purple-500',
      action: () => console.log('Generate message'),
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* ウェルカメッセージ */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">おかえりなさい！</h1>
            <p className="text-gray-600 mt-1">
              今日も効果的な広報活動を進めていきましょう。
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              <span>最終更新: {formatDate(new Date())}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div key={index} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center">
                <div className={`p-3 rounded-lg ${card.color}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">{card.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                  <div className="flex items-center mt-1">
                    <span className="text-sm text-green-600 font-medium">
                      {card.change}
                    </span>
                    <span className="text-sm text-gray-500 ml-1">前月比</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* クイックアクション */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            クイックアクション
          </h2>
          <div className="space-y-3">
            {quickActions.map((action, index) => {
              const Icon = action.icon;
              return (
                <button
                  key={index}
                  onClick={action.action}
                  className="w-full flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${action.color}`}>
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="ml-4 flex-1 text-left">
                    <p className="font-medium text-gray-900">{action.title}</p>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400" />
                </button>
              );
            })}
          </div>
        </div>

        {/* 最近のアクティビティ */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            最近のアクティビティ
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    activity.status === 'success' ? 'bg-green-100' :
                    activity.status === 'pending' ? 'bg-yellow-100' :
                    'bg-red-100'
                  }`}>
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'success' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {activity.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    {formatDate(activity.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 