'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, MessageSquare, Edit, Heart, Calendar, ArrowLeft, Star, Target, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { mockReporters, mockContactHistory, mockArticles } from '@/lib/mock-data';

interface ReporterDetailProps {
  reporterId: string;
}

type TabType = 'themes' | 'history' | 'articles' | 'profile';

export default function ReporterDetail({ reporterId }: ReporterDetailProps) {
  const [activeTab, setActiveTab] = useState<TabType>('themes');

  // 記者データの取得
  const reporter = mockReporters.find(r => r.id === reporterId);
  const contactHistories = mockContactHistory.filter(ch => ch.reporterId === reporterId);
  const articles = mockArticles.filter(a => a.reporterId === reporterId);

  if (!reporter) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <h3 className="text-lg font-medium text-gray-900">記者が見つかりません</h3>
          <p className="mt-1 text-sm text-gray-500">
            指定された記者のデータが存在しません。
          </p>
          <Link
            href="/reporters"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            記者一覧に戻る
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'themes' as TabType, label: '関心テーマ', count: reporter.interests.length + reporter.specialties.length },
    { id: 'history' as TabType, label: 'やり取り履歴', count: contactHistories.length },
    { id: 'articles' as TabType, label: '最新記事', count: articles.length },
    { id: 'profile' as TabType, label: '詳細プロフィール', count: null },
  ];

  return (
    <div className="space-y-6">
      {/* パンくずナビ */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <Link href="/reporters" className="text-gray-700 hover:text-gray-900">
              記者一覧
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <span className="ml-1 text-gray-400 md:ml-2">/</span>
              <span className="ml-1 text-gray-500 md:ml-2">{reporter.name}</span>
            </div>
          </li>
        </ol>
      </nav>

      {/* コンパクトなヘッダー */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl font-bold text-gray-900">{reporter.name}</h1>
                <p className="text-base text-gray-600">{reporter.company}</p>
                <p className="text-sm text-gray-500">{reporter.position}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Mail className="mr-1 h-4 w-4" />
                連絡
              </button>
              <button className="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <Edit className="mr-1 h-4 w-4" />
                編集
              </button>
              <button className="inline-flex items-center p-2 border border-gray-300 rounded-md text-gray-400 hover:text-red-500 hover:border-red-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                <Heart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm focus:outline-none
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.label}
                {tab.count !== null && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-900'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* タブコンテンツ */}
        <div className="p-6">
          {activeTab === 'themes' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                  関心テーマ・マッチング分析
                </h3>
                
                {/* テーマパネル */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* 専門分野パネル */}
                  {reporter.specialties.map((specialty, index) => (
                    <div key={`specialty-${index}`} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Star className="h-5 w-5 text-blue-600 mr-2" />
                          <h4 className="font-medium text-blue-900">{specialty}</h4>
                        </div>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                          専門分野
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-blue-700">マッチング度</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-blue-200 rounded-full h-2 mr-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '85%'}}></div>
                          </div>
                          <span className="text-blue-600 font-medium">85%</span>
                        </div>
                      </div>
                      <p className="text-xs text-blue-600 mt-2">
                        高い専門性を有する分野
                      </p>
                    </div>
                  ))}

                  {/* 興味関心パネル */}
                  {reporter.interests.map((interest, index) => (
                    <div key={`interest-${index}`} className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center">
                          <Target className="h-5 w-5 text-green-600 mr-2" />
                          <h4 className="font-medium text-green-900">{interest}</h4>
                        </div>
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                          興味関心
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-green-700">関心度</span>
                        <div className="flex items-center">
                          <div className="w-16 bg-green-200 rounded-full h-2 mr-2">
                            <div className="bg-green-600 h-2 rounded-full" style={{width: '72%'}}></div>
                          </div>
                          <span className="text-green-600 font-medium">72%</span>
                        </div>
                      </div>
                      <p className="text-xs text-green-600 mt-2">
                        継続的に注目している分野
                      </p>
                    </div>
                  ))}

                  {/* 注目トレンドパネル */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center">
                        <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
                        <h4 className="font-medium text-purple-900">注目トレンド</h4>
                      </div>
                      <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full">
                        AI分析
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-purple-700">適合度</span>
                      <div className="flex items-center">
                        <div className="w-16 bg-purple-200 rounded-full h-2 mr-2">
                          <div className="bg-purple-600 h-2 rounded-full" style={{width: '91%'}}></div>
                        </div>
                        <span className="text-purple-600 font-medium">91%</span>
                      </div>
                    </div>
                    <p className="text-xs text-purple-600 mt-2">
                      最新の業界トレンドに敏感
                    </p>
                  </div>
                </div>

                {/* マッチング推奨アクション */}
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-gray-900 mb-3">📋 アプローチ推奨事項</h4>
                  <div className="space-y-2 text-sm text-gray-700">
                    <div className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>データと具体的な数値を含めた提案が効果的</span>
                    </div>
                    <div className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>最新技術トレンドと関連付けた内容が関心を引く</span>
                    </div>
                    <div className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                      <span>専門性を活かした深い分析記事のネタ提供が有効</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">やり取り履歴</h3>
              <p className="mt-1 text-sm text-gray-500">
                {contactHistories.length}件のやり取り履歴があります。
              </p>
            </div>
          )}

          {activeTab === 'articles' && (
            <div className="text-center py-12">
              <Calendar className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">最新記事</h3>
              <p className="mt-1 text-sm text-gray-500">
                {articles.length}件の記事があります。
              </p>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">詳細プロフィール</h3>
                
                {/* 連絡先情報 */}
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <h4 className="text-sm font-medium text-gray-900 mb-3">連絡先情報</h4>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="flex items-center">
                      <Mail className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{reporter.email}</span>
                    </div>
                    {reporter.phone && (
                      <div className="flex items-center">
                        <Phone className="mr-2 h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-900">{reporter.phone}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <MessageSquare className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        推奨連絡手段: {reporter.contactPreference === 'email' ? 'メール' : 
                                    reporter.contactPreference === 'phone' ? '電話' : 'メール・電話'}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-900">
                        最終更新: {reporter.updatedAt.toLocaleDateString('ja-JP')}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 備考 */}
                {reporter.notes && (
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">📝 備考・メモ</h4>
                    <p className="text-sm text-gray-700">{reporter.notes}</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 