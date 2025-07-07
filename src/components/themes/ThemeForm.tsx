'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Minus, LinkIcon } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { z } from 'zod';
import { CreateThemeSchema, Theme } from '@/lib/schemas';
import FileUpload from './FileUpload';
import { mockApi } from '@/lib/mock-data';

interface ThemeFormProps {
  initialData?: Theme; // 編集時に使用
}

export default function ThemeForm({ initialData }: ThemeFormProps) {
  const router = useRouter();
  const isEditMode = !!initialData;

  // フォームの状態
  const [formData, setFormData] = useState<z.infer<typeof CreateThemeSchema>>({
    title: initialData?.title || '',
    description: initialData?.description || '',
    keywords: initialData?.keywords || [],
    category: initialData?.category || '',
    priority: initialData?.priority || 'medium',
  });

  // フォーム入力値の一時的な状態
  const [keyword, setKeyword] = useState('');
  const [urlInput, setUrlInput] = useState('');
  
  // その他の状態
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'manual' | 'url' | 'file'>('manual');

  // 入力ハンドラー
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // エラーがあれば消去
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // キーワード追加
  const handleAddKeyword = () => {
    if (!keyword.trim()) return;
    
    if (!formData.keywords.includes(keyword.trim())) {
      setFormData((prev) => ({
        ...prev,
        keywords: [...prev.keywords, keyword.trim()],
      }));
    }
    
    setKeyword('');
  };

  // キーワード削除
  const handleRemoveKeyword = (keywordToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      keywords: prev.keywords.filter((k) => k !== keywordToRemove),
    }));
  };

  // URLからの情報取得（デモ用）
  const handleUrlExtract = async () => {
    if (!urlInput.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      // ここではモックでURLからの情報取得をシミュレート
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // 実際の実装では、APIを使用してURLからメタデータを取得します
      // ここではデモのため、ダミーデータを設定します
      const extractedTitle = `${urlInput.split('/').pop() || ''}に関する分析`;
      const extractedDescription = `これは${urlInput}から抽出されたコンテンツに基づくテーマです。`;
      const extractedKeywords = ['自動抽出', 'URL', urlInput.includes('tech') ? 'テクノロジー' : '一般'];
      
      setFormData((prev) => ({
        ...prev,
        title: extractedTitle,
        description: extractedDescription,
        keywords: [...new Set([...prev.keywords, ...extractedKeywords])],
        category: urlInput.includes('tech') ? 'テクノロジー' : '一般',
      }));
      
      // タブを手入力に切り替え
      setActiveTab('manual');
      
    } catch (error) {
      setSubmitError('URLからの情報取得に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ファイルからの情報取得
  const handleFileUpload = (file: File, extractedText?: string) => {
    // ファイル名からタイトルを生成
    const fileName = file.name.split('.')[0];
    const extractedTitle = `${fileName}に関するテーマ`;
    
    // 抽出されたテキストから説明を生成（簡易的）
    const extractedDescription = extractedText 
      ? extractedText.slice(0, 300) 
      : `${file.name}からの内容に基づくテーマ`;
    
    // 簡易的なキーワード抽出（実際にはNLPなどを使用）
    const extractedKeywords = ['ファイルアップロード', file.type.includes('pdf') ? 'PDF' : 'ドキュメント'];
    
    setFormData((prev) => ({
      ...prev,
      title: extractedTitle,
      description: extractedDescription,
      keywords: [...new Set([...prev.keywords, ...extractedKeywords])],
    }));
    
    // タブを手入力に切り替え
    setActiveTab('manual');
  };

  // フォーム送信
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    
    try {
      // バリデーション
      const result = CreateThemeSchema.safeParse(formData);
      
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        
        result.error.errors.forEach((error) => {
          const field = error.path[0].toString();
          fieldErrors[field] = error.message;
        });
        
        setErrors(fieldErrors);
        return;
      }
      
      setIsSubmitting(true);
      
      // テーマの作成または更新
      if (isEditMode && initialData) {
        await mockApi.updateTheme(initialData.id, formData);
      } else {
        const newTheme = {
          ...formData,
          id: uuidv4(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
        
        await mockApi.createTheme(newTheme);
      }
      
      // テーマ一覧ページへリダイレクト
      router.push('/themes');
      
    } catch (error) {
      console.error('テーマの保存に失敗しました:', error);
      setSubmitError('テーマの保存に失敗しました。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* 入力方法タブ */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="flex border-b">
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium flex-1 text-center ${
              activeTab === 'manual'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('manual')}
          >
            手入力
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium flex-1 text-center ${
              activeTab === 'url'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('url')}
          >
            URLから取得
          </button>
          <button
            type="button"
            className={`px-4 py-2 text-sm font-medium flex-1 text-center ${
              activeTab === 'file'
                ? 'border-b-2 border-blue-500 text-blue-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('file')}
          >
            ファイルアップロード
          </button>
        </div>
        
        <div className="p-6">
          {activeTab === 'manual' && (
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  テーマタイトル <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.title ? 'border-red-300' : ''
                  }`}
                  placeholder="テーマのタイトルを入力"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  説明 <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${
                    errors.description ? 'border-red-300' : ''
                  }`}
                  placeholder="テーマの詳細な説明を入力"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>

              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  カテゴリ
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="カテゴリを入力（任意）"
                />
              </div>

              <div>
                <label htmlFor="priority" className="block text-sm font-medium text-gray-700">
                  優先度
                </label>
                <select
                  id="priority"
                  name="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="high">高</option>
                  <option value="medium">中</option>
                  <option value="low">低</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  キーワード
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    className="block w-full rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="キーワードを入力"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddKeyword();
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleAddKeyword}
                    className="inline-flex items-center rounded-r-md border border-l-0 border-gray-300 bg-gray-50 px-3 text-gray-500 hover:bg-gray-100"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap gap-2">
                  {formData.keywords.map((kw, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                    >
                      {kw}
                      <button
                        type="button"
                        onClick={() => handleRemoveKeyword(kw)}
                        className="ml-1 inline-flex h-4 w-4 items-center justify-center rounded-full text-blue-400 hover:bg-blue-200 hover:text-blue-600"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'url' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                URLを入力してウェブページから情報を自動抽出します。
              </p>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-50 px-3 text-gray-500">
                  <LinkIcon className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  className="block w-full flex-1 rounded-none rounded-r-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="https://example.com/article"
                />
              </div>
              <button
                type="button"
                onClick={handleUrlExtract}
                disabled={!urlInput.trim() || isSubmitting}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? '取得中...' : 'URLから情報を取得'}
              </button>
              <p className="text-xs text-gray-500">
                ※ ウェブページからタイトル、説明、キーワードなどを抽出します。必要に応じて手動で編集できます。
              </p>
            </div>
          )}

          {activeTab === 'file' && (
            <div className="space-y-4">
              <p className="text-sm text-gray-500">
                ファイルをアップロードして内容を自動抽出します。
              </p>
              <FileUpload onFileUpload={handleFileUpload} />
              <p className="text-xs text-gray-500">
                ※ PDFやWord文書からテキストを抽出し、テーマ情報を作成します。必要に応じて手動で編集できます。
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 送信ボタン */}
      <div className="flex justify-end">
        {submitError && (
          <p className="mr-auto text-sm text-red-600">{submitError}</p>
        )}
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          キャンセル
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '保存中...' : isEditMode ? '更新する' : '作成する'}
        </button>
      </div>
    </form>
  );
} 