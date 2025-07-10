import React from 'react';
import Link from 'next/link';
import { Calendar, Tag, FileText } from 'lucide-react';
import { getAllLegacyThemes } from '../../lib/mock-data';

const ThemesPage = () => {
  const themes = getAllLegacyThemes();

  const getPriorityColor = (priority: string) => {
    const priorityColors = new Map([
      ['high', 'bg-red-100 text-red-800'],
      ['medium', 'bg-yellow-100 text-yellow-800'],
      ['low', 'bg-green-100 text-green-800'],
    ]);
    return priorityColors.get(priority) || 'bg-gray-100 text-gray-800';
  };

  const getPriorityLabel = (priority: string) => {
    const priorityLabels = new Map([
      ['high', '高'],
      ['medium', '中'],
      ['low', '低'],
    ]);
    return priorityLabels.get(priority) || priority;
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">テーマ一覧</h1>
          <p className="mt-1 text-sm text-gray-600">
            {themes.length} 件のテーマを表示中
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/themes/new"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            新しいテーマを追加
          </Link>
        </div>
      </div>

      {/* テーマ一覧 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {themes.map((theme) => (
          <Link
            key={theme.id}
            href={`/themes/${theme.id}`}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="space-y-4">
              {/* ヘッダー部分 */}
              <div className="flex items-start justify-between">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                  {theme.title}
                </h3>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(theme.priority)}`}>
                  優先度: {getPriorityLabel(theme.priority)}
                </span>
              </div>

              {/* 説明 */}
              <p className="text-sm text-gray-600 line-clamp-3">
                {theme.description}
              </p>

              {/* カテゴリ */}
              <div className="flex items-center text-sm text-gray-500">
                <FileText className="h-4 w-4 mr-1" />
                <span>{theme.category}</span>
              </div>

              {/* キーワード */}
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-500">
                  <Tag className="h-4 w-4 mr-1" />
                  <span>キーワード</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {theme.keywords.slice(0, 4).map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs"
                    >
                      {keyword}
                    </span>
                  ))}
                  {theme.keywords.length > 4 && (
                    <span className="inline-flex items-center px-2 py-0.5 rounded bg-gray-50 text-gray-500 text-xs">
                      +{theme.keywords.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* 日付情報 */}
              <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-gray-100">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  作成: {theme.createdAt.toLocaleDateString('ja-JP')}
                </div>
                <div>
                  更新: {theme.updatedAt.toLocaleDateString('ja-JP')}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* 空の状態 */}
      {themes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">テーマがありません</h3>
          <p className="mt-1 text-sm text-gray-500">
            新しいテーマを作成してみましょう。
          </p>
          <div className="mt-6">
            <Link
              href="/themes/new"
              className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              新しいテーマを追加
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemesPage; 