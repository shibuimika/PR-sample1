'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Clock, Tag } from 'lucide-react';
import { Theme } from '@/lib/schemas';
import { CombinedTheme } from '@/lib/mock-data';
import { cn } from '@/lib/utils';

interface ThemeCardProps {
  theme: Theme | CombinedTheme;
}

// 統一されたテーマデータ型
interface UnifiedThemeData {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  category: string;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
  updatedAt: Date;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
  // 新旧テーマタイプの違いを吸収するヘルパー関数
  const getThemeData = (theme: Theme | CombinedTheme): UnifiedThemeData => {
    // NewTheme型の場合はデフォルト値を設定
    if ('url' in theme || 'fileUrl' in theme) {
      return {
        id: theme.id,
        title: theme.title,
        description: theme.description,
        keywords: [],
        category: 'その他',
        priority: 'medium',
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
    
    // LegacyTheme型またはTheme型の場合
    // 型ガードを使ってプロパティの存在を確認
    const hasKeywords = 'keywords' in theme;
    const hasCategory = 'category' in theme;
    const hasPriority = 'priority' in theme;
    const hasCreatedAt = 'createdAt' in theme;
    const hasUpdatedAt = 'updatedAt' in theme;
    
    return {
      id: theme.id,
      title: theme.title,
      description: theme.description,
      keywords: hasKeywords ? theme.keywords : [],
      category: hasCategory ? theme.category || 'その他' : 'その他',
      priority: hasPriority ? theme.priority : 'medium',
      createdAt: hasCreatedAt ? theme.createdAt : new Date(),
      updatedAt: hasUpdatedAt ? theme.updatedAt : new Date(),
    };
  };

  const themeData = getThemeData(theme);

  // 優先度に応じた色設定
  const priorityColor = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800',
  };

  // 日付フォーマット
  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link 
      href={`/themes/${theme.id}`}
      className="block h-full"
    >
      <div className="h-full border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow bg-white">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between mb-2">
            <span 
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium",
                priorityColor[themeData.priority]
              )}
            >
              {themeData.priority === 'high' ? '優先度：高' : 
               themeData.priority === 'medium' ? '優先度：中' : '優先度：低'}
            </span>
            <span className="text-sm text-gray-500">{themeData.category}</span>
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {theme.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {theme.description}
          </p>
          
          {themeData.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {themeData.keywords.slice(0, 3).map((keyword: string, index: number) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {keyword}
                </span>
              ))}
              {themeData.keywords.length > 3 && (
                <span className="text-xs text-gray-500">他 {themeData.keywords.length - 3} 個</span>
              )}
            </div>
          )}
          
          <div className="flex justify-between items-center text-xs text-gray-500 mt-3">
            <div className="flex items-center">
              <FileText className="w-3 h-3 mr-1" />
              <span>テーマID: {theme.id.slice(0, 8)}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3 h-3 mr-1" />
              <span>更新: {formatDate(themeData.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 