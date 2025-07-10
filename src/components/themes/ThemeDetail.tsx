'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Calendar, User, FileText, ExternalLink, Edit, ArrowLeft, Users, Target, MessageSquare, History } from 'lucide-react';
import { CombinedTheme, getThemeById, mockReporters } from '../../lib/mock-data';

type Props = { id: string };
type TabType = 'overview' | 'contacts' | 'history' | 'analysis';

const ThemeDetail: React.FC<Props> = ({ id }) => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [notes, setNotes] = useState('このテーマに関する取材のメモやアイデアをここに記録してください。');
  const [assignedReporter, setAssignedReporter] = useState('reporter-1');

  const theme: CombinedTheme | undefined = getThemeById(id);
  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">テーマが見つかりません</h2>
          <p className="text-gray-600 mb-4">指定されたテーマが存在しないか、削除された可能性があります。</p>
          <Link
            href="/themes"
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            テーマ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  // 既存テーマか新規作成テーマかを判定
  const isLegacyTheme = 'isLegacy' in theme;

  const tabs = [
    { id: 'overview' as TabType, label: '概要', icon: Target },
    { id: 'contacts' as TabType, label: '関連記者', icon: Users },
    { id: 'history' as TabType, label: '活動履歴', icon: History },
    { id: 'analysis' as TabType, label: '分析', icon: MessageSquare },
  ];

  const getThemeTitle = () => {
    return isLegacyTheme ? (theme as any).title : (theme as any).name;
  };

  const getThemeDescription = () => {
    return theme.description;
  };

  const getCreatedDate = () => {
    return isLegacyTheme ? (theme as any).createdAt : new Date();
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'bg-red-100 text-red-800',
      'medium': 'bg-yellow-100 text-yellow-800',
      'low': 'bg-green-100 text-green-800',
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* パンくずナビ */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
              <Link href="/themes" className="text-gray-700 hover:text-gray-900">
                テーマ一覧
              </Link>
            </li>
            <li>
        <div className="flex items-center">
                <span className="ml-1 text-gray-400 md:ml-2">/</span>
                <span className="ml-1 text-gray-500 md:ml-2">{getThemeTitle()}</span>
              </div>
            </li>
          </ol>
        </nav>
        </div>
        
      {/* メインレイアウト */}
      <div className="flex h-screen">
        {/* 左側 2/3 */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* ヘッダー部分 */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h1 className="text-3xl font-bold text-gray-900">{getThemeTitle()}</h1>
                  {isLegacyTheme && (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor((theme as any).priority)}`}>
                      優先度: {(theme as any).priority === 'high' ? '高' : (theme as any).priority === 'medium' ? '中' : '低'}
                    </span>
                  )}
                </div>
                <div className="flex items-center text-sm text-gray-500 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    作成日: {getCreatedDate().toLocaleDateString('ja-JP')}
                  </div>
                  {isLegacyTheme && (
                    <div className="flex items-center">
                      <FileText className="h-4 w-4 mr-2" />
                      カテゴリ: {(theme as any).category}
                    </div>
                  )}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="inline-flex items-center px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                  <Edit className="h-4 w-4 mr-2" />
                  編集
          </button>
        </div>
      </div>
            <p className="text-gray-600 text-lg leading-relaxed">{getThemeDescription()}</p>
          </div>

          {/* 取材対応者・参照元情報 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 取材対応者 */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <User className="h-5 w-5 mr-2" />
                取材対応者
              </h3>
              <div className="space-y-3">
                <select
                  value={assignedReporter}
                  onChange={(e) => setAssignedReporter(e.target.value)}
                  className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">担当者を選択してください</option>
                  {mockReporters.map((reporter) => (
                    <option key={reporter.id} value={reporter.id}>
                      {reporter.name} - {reporter.company}
                    </option>
                  ))}
                </select>
                {assignedReporter && (
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center">
                      <User className="h-4 w-4 text-blue-600 mr-2" />
                      <span className="font-medium text-blue-900">
                        {mockReporters.find(r => r.id === assignedReporter)?.name}
                </span>
                    </div>
                    <p className="text-sm text-blue-600 mt-1">
                      {mockReporters.find(r => r.id === assignedReporter)?.company}
                    </p>
                  </div>
                )}
              </div>
              </div>
              
            {/* 参照元ファイル・URL */}
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <ExternalLink className="h-5 w-5 mr-2" />
                参照元
              </h3>
              <div className="space-y-3">
                {!isLegacyTheme && (theme as any).url && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">関連URL</span>
                      <ExternalLink className="h-4 w-4 text-gray-400" />
                    </div>
                    <a
                      href={(theme as any).url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm break-all"
                    >
                      {(theme as any).url}
                    </a>
                  </div>
                )}
                {!isLegacyTheme && (theme as any).fileUrl && (
                  <div className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700">アップロードファイル</span>
                      <FileText className="h-4 w-4 text-gray-400" />
                    </div>
                    <a
                      href={(theme as any).fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 text-sm"
                    >
                      ファイルを開く
                    </a>
                  </div>
                )}
                {isLegacyTheme && (
                  <div className="text-sm text-gray-500 text-center py-4">
                    参照元ファイルやURLはありません
                  </div>
                )}
              </div>
                </div>
              </div>
              
          {/* キーワード（既存テーマのみ） */}
          {isLegacyTheme && (
            <div className="bg-white shadow-sm border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">キーワード</h3>
              <div className="flex flex-wrap gap-2">
                {(theme as any).keywords.map((keyword: string, index: number) => (
                      <span 
                        key={index} 
                    className="inline-flex items-center px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-sm font-medium"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
        </div>

        {/* 右側 1/3 */}
        <div className="w-96 bg-white border-l border-gray-200 flex flex-col">
          {/* タブ */}
          <div className="border-b border-gray-200">
            <nav className="flex" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex flex-col items-center px-3 py-4 text-xs font-medium hover:bg-gray-50 focus:z-10 ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-500 bg-blue-50'
                      : 'text-gray-500 border-b-2 border-transparent'
                  }`}
                >
                  <tab.icon className="h-4 w-4 mb-1" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* タブコンテンツ */}
          <div className="flex-1 p-4 overflow-y-auto">
            {activeTab === 'overview' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">概要情報</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">ステータス:</span>
                    <span className="text-green-600 font-medium">アクティブ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">関連記者:</span>
                    <span className="font-medium">3名</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">活動履歴:</span>
                    <span className="font-medium">5件</span>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'contacts' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">関連記者</h4>
                <div className="space-y-2">
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-medium">田中 太郎</div>
                    <div className="text-gray-500 text-xs">日経新聞</div>
                  </div>
                  <div className="p-2 bg-gray-50 rounded text-sm">
                    <div className="font-medium">佐藤 花子</div>
                    <div className="text-gray-500 text-xs">TechCrunch Japan</div>
                  </div>
                </div>
              </div>
            )}
            {activeTab === 'history' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">活動履歴</h4>
                <div className="space-y-2">
                  <div className="p-2 border-l-2 border-blue-500 bg-blue-50 text-sm">
                    <div className="font-medium">2024/12/20</div>
                    <div className="text-gray-600 text-xs">テーマ作成</div>
            </div>
                  <div className="p-2 border-l-2 border-green-500 bg-green-50 text-sm">
                    <div className="font-medium">2024/12/19</div>
                    <div className="text-gray-600 text-xs">記者への連絡</div>
        </div>
                </div>
              </div>
            )}
            {activeTab === 'analysis' && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">分析データ</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-gray-50 rounded text-center">
                    <div className="text-xs font-medium text-gray-700">注目度スコア</div>
                    <div className="text-2xl font-bold text-blue-600">78</div>
                  </div>
                  <div className="p-3 bg-gray-50 rounded text-center">
                    <div className="text-xs font-medium text-gray-700">マッチング率</div>
                    <div className="text-2xl font-bold text-green-600">85%</div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* メモ欄 */}
          <div className="border-t border-gray-200 p-4">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
              <MessageSquare className="h-4 w-4 mr-2" />
              メモ
            </h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={8}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none text-sm"
              placeholder="テーマに関するメモやアイデアを記録してください..."
            />
            <div className="mt-2 flex justify-end">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
                保存
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeDetail; 