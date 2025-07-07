'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  Edit, 
  Trash2, 
  Calendar, 
  Tag, 
  FileText,
  BarChart 
} from 'lucide-react';
import { mockApi } from '@/lib/mock-data';
import { Theme } from '@/lib/schemas';
import { cn } from '@/lib/utils';

interface ThemeDetailProps {
  themeId: string;
}

export default function ThemeDetail({ themeId }: ThemeDetailProps) {
  const [theme, setTheme] = useState<Theme | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTheme = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await mockApi.getThemeById(themeId);
        setTheme(data);
      } catch (error) {
        console.error('テーマの取得に失敗しました:', error);
        setError('テーマの取得に失敗しました。');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTheme();
  }, [themeId]);

  // 日付フォーマット
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // 優先度に応じた色設定
  const priorityColor = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !theme) {
    return (
      <div className="text-center py-20">
        <h3 className="mt-2 text-lg font-medium text-gray-900">
          {error || 'テーマが見つかりませんでした'}
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          テーマが削除されたか、存在しないIDです。
        </p>
        <div className="mt-6">
          <Link
            href="/themes"
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            テーマ一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div className="flex items-center">
          <Link
            href="/themes"
            className="mr-4 p-2 rounded-full hover:bg-gray-100"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight">{theme.title}</h1>
        </div>
        
        <div className="flex space-x-3">
          <Link
            href={`/themes/${theme.id}/edit`}
            className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Edit className="w-4 h-4 mr-2" />
            編集
          </Link>
          <button
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            削除
          </button>
        </div>
      </div>

      {/* メインコンテンツ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 左側：テーマ情報 */}
        <div className="lg:col-span-2 space-y-6">
          {/* 基本情報 */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">テーマ情報</h2>
            
            <div className="space-y-4">
              {/* 優先度バッジとカテゴリ */}
              <div className="flex flex-wrap items-center gap-3">
                <span 
                  className={cn(
                    "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                    priorityColor[theme.priority]
                  )}
                >
                  {theme.priority === 'high' ? '優先度：高' : 
                   theme.priority === 'medium' ? '優先度：中' : '優先度：低'}
                </span>
                
                {theme.category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-800 text-xs font-medium">
                    <FileText className="w-3 h-3 mr-1" />
                    {theme.category}
                  </span>
                )}
              </div>
              
              {/* 説明文 */}
              <div>
                <h3 className="text-sm font-medium text-gray-500">説明</h3>
                <div className="mt-1 text-sm text-gray-900 whitespace-pre-wrap">
                  {theme.description}
                </div>
              </div>
              
              {/* キーワード */}
              {theme.keywords.length > 0 && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500">キーワード</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {theme.keywords.map((keyword, index) => (
                      <span 
                        key={index} 
                        className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs"
                      >
                        <Tag className="w-3 h-3 mr-1" />
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              {/* 作成・更新日 */}
              <div className="border-t pt-4 mt-4 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-500">作成日: </span>
                  <span className="text-gray-900">
                    {formatDate(theme.createdAt)}
                  </span>
                </div>
                <div>
                  <span className="text-gray-500">最終更新日: </span>
                  <span className="text-gray-900">
                    {formatDate(theme.updatedAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 関連コンテンツ（仮） */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">関連コンテンツ</h2>
            <p className="text-sm text-gray-500">
              このテーマに関連するコンテンツはまだありません。
            </p>
          </div>
        </div>

        {/* 右側：サイドバー */}
        <div className="space-y-6">
          {/* 統計情報（仮） */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">統計情報</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <BarChart className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">マッチした記者</span>
                </div>
                <span className="text-sm font-medium">0人</span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-500">関連イベント</span>
                </div>
                <span className="text-sm font-medium">0件</span>
              </div>
            </div>
          </div>

          {/* アクション */}
          <div className="bg-white p-6 shadow rounded-lg">
            <h2 className="text-lg font-medium text-gray-900 mb-4">アクション</h2>
            <div className="space-y-3">
              <Link
                href={`/matching?themeId=${theme.id}`}
                className="block w-full text-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                マッチング記者を検索
              </Link>
              
              <Link
                href={`/messages?themeId=${theme.id}`}
                className="block w-full text-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                メッセージを作成
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 