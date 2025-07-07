'use client';

import React, { useState } from 'react';
import { Upload, File, X } from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (file: File, extractedText?: string) => void;
  maxSize?: number; // MB単位
  allowedTypes?: string[]; // 例: ['application/pdf', 'text/plain']
}

export default function FileUpload({
  onFileUpload,
  maxSize = 10, // デフォルト10MB
  allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain']
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // ドラッグイベント処理
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  // ドロップ処理
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files[0]);
    }
  };

  // ファイル選択処理
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files[0]);
    }
  };

  // ファイル検証と処理
  const handleFiles = (file: File) => {
    setError(null);
    
    // ファイルタイプのバリデーション
    if (allowedTypes.length > 0 && !allowedTypes.includes(file.type)) {
      setError(`サポートされていないファイル形式です。許可されている形式: ${allowedTypes.join(', ')}`);
      return;
    }
    
    // ファイルサイズのバリデーション
    if (file.size > maxSize * 1024 * 1024) {
      setError(`ファイルサイズが大きすぎます。最大サイズ: ${maxSize}MB`);
      return;
    }
    
    setFile(file);
    
    // ファイルのテキスト抽出をシミュレート
    processFile(file);
  };

  // ファイル処理（テキスト抽出など）
  const processFile = async (file: File) => {
    setIsUploading(true);
    
    try {
      // ここではテキスト抽出をシミュレートしています
      // 実際の実装では、APIを使用してPDFからテキストを抽出するなどの処理を行います
      await new Promise(resolve => setTimeout(resolve, 1000)); // アップロード中の状態を表示するため
      
      // PDFやWord文書からのテキスト抽出は別途サーバーサイドで行う必要があります
      // ここではテキストファイルの場合のみテキストを読み込みます
      let extractedText = '';
      if (file.type === 'text/plain') {
        extractedText = await file.text();
      }
      
      onFileUpload(file, extractedText);
    } catch (err) {
      console.error('ファイル処理エラー:', err);
      setError('ファイルの処理中にエラーが発生しました。');
    } finally {
      setIsUploading(false);
    }
  };

  // ファイルの削除
  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
  };

  return (
    <div className="w-full">
      {!file ? (
        <div
          className={`w-full border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            dragActive
              ? 'border-blue-400 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <div className="space-y-3">
            <div className="flex justify-center">
              <Upload className="h-10 w-10 text-gray-400" />
            </div>
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500"
              >
                <span>ファイルをアップロード</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  onChange={handleChange}
                  accept={allowedTypes.join(',')}
                />
              </label>
              <p className="pl-1">またはドラッグ＆ドロップ</p>
            </div>
            <p className="text-xs text-gray-500">
              PDFまたはWord文書（最大 {maxSize}MB）
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full border rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0">
                <File className="h-6 w-6 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {file.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleRemoveFile}
              className="p-1 rounded-full hover:bg-gray-200"
            >
              <X className="h-5 w-5 text-gray-500" />
            </button>
          </div>
          
          {isUploading && (
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full w-full animate-pulse"></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">処理中...</p>
            </div>
          )}
        </div>
      )}
      
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
} 