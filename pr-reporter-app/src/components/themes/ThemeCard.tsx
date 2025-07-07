'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Clock, Tag } from 'lucide-react';
import { Theme } from '@/lib/schemas';
import { cn } from '@/lib/utils';

interface ThemeCardProps {
  theme: Theme;
}

export default function ThemeCard({ theme }: ThemeCardProps) {
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
                priorityColor[theme.priority]
              )}
            >
              {theme.priority === 'high' ? '優先度：高' : 
               theme.priority === 'medium' ? '優先度：中' : '優先度：低'}
            </span>
            {theme.category && (
              <span className="text-sm text-gray-500">{theme.category}</span>
            )}
          </div>
          
          <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
            {theme.title}
          </h3>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {theme.description}
          </p>
          
          {theme.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {theme.keywords.slice(0, 3).map((keyword, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-xs"
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {keyword}
                </span>
              ))}
              {theme.keywords.length > 3 && (
                <span className="text-xs text-gray-500">他 {theme.keywords.length - 3} 個</span>
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
              <span>更新: {formatDate(theme.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 