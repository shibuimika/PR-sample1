'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Filter, Search } from 'lucide-react';
import ThemeCard from './ThemeCard';
import { Theme } from '@/lib/schemas';
import { mockApi } from '@/lib/mock-data';

export default function ThemeList() {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    const fetchThemes = async () => {
      setIsLoading(true);
      try {
        const data = await mockApi.getThemes();
        setThemes(data);
      } catch (error) {
        console.error('テーマの取得に失敗しました:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchThemes();
  }, []);

  // 検索とフィルタリング
  const filteredThemes = themes.filter((theme) => {
    const matchesSearch = theme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theme.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         theme.keywords.some(keyword => 
                           keyword.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesFilter = filter === 'all' || 
                         (filter === 'high' && theme.priority === 'high') ||
                         (filter === 'medium' && theme.priority === 'medium') ||
                         (filter === 'low' && theme.priority === 'low');
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight">テーマ一覧</h1>
        
        <Link 
          href="/themes/new" 
          className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Plus className="w-4 h-4 mr-2" />
          新規テーマ作成
        </Link>
      </div>

      {/* 検索とフィルターセクション */}
      <div className="flex flex-col sm:flex-row gap-4 pb-4">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="テーマを検索..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        
        <div className="flex items-center">
          <Filter className="h-5 w-5 text-gray-400 mr-2" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="block w-full py-2 pl-3 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">すべての優先度</option>
            <option value="high">優先度：高</option>
            <option value="medium">優先度：中</option>
            <option value="low">優先度：低</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : filteredThemes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredThemes.map((theme) => (
            <ThemeCard key={theme.id} theme={theme} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <h3 className="mt-2 text-lg font-medium text-gray-900">テーマが見つかりません</h3>
          <p className="mt-1 text-sm text-gray-500">
            {searchTerm || filter !== 'all' ? 
              '検索条件を変更してみてください。' : 
              '新しいテーマを作成してみましょう。'}
          </p>
          {!searchTerm && filter === 'all' && (
            <div className="mt-6">
              <Link
                href="/themes/new"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Plus className="w-4 h-4 mr-2" />
                新規テーマを作成
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
} 