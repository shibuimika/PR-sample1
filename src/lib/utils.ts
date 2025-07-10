import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Tailwind CSS クラス結合用
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 日付フォーマット用
export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(d);
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

// ファイルサイズフォーマット用
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizeMap = new Map([
    [0, 'Bytes'],
    [1, 'KB'],
    [2, 'MB'],
    [3, 'GB'],
  ]);
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  // セキュリティ対策：Map.getを使用
  const sizeIndex = Math.min(i, 3);
  const size = sizeMap.get(sizeIndex) || 'Bytes';
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + size;
}

// エラーハンドリング用
export class AppError extends Error {
  public readonly statusCode: number;
  public readonly isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, this.constructor);
  }
}

// APIレスポンス用の標準フォーマット
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    message: string;
    code?: string;
    details?: unknown;
  };
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function createSuccessResponse<T>(data: T, pagination?: ApiResponse<T>['pagination']): ApiResponse<T> {
  return {
    success: true,
    data,
    ...(pagination && { pagination }),
  };
}

export function createErrorResponse(message: string, code?: string, details?: unknown): ApiResponse<never> {
  return {
    success: false,
    error: {
      message,
      code,
      details,
    },
  };
}

// 非同期エラーハンドリング用ラッパー
export function asyncHandler<T extends unknown[], R>(
  fn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }
      
      console.error('Unexpected error:', error);
      throw new AppError('内部サーバーエラーが発生しました', 500);
    }
  };
}

// バリデーション用ヘルパー
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhoneNumber(phone: string): boolean {
  const phoneRegex = /^[\d\-\+\(\)\s]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export function validateUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// セキュリティ用ヘルパー
export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // HTMLタグを除去
    .replace(/javascript:/gi, '') // JavaScript URIを除去
    .trim();
}

export function validateFileType(file: File, allowedTypes: string[]): boolean {
  return allowedTypes.includes(file.type);
}

export function validateFileSize(file: File, maxSizeInMB: number): boolean {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  return file.size <= maxSizeInBytes;
}

// ページネーション用ヘルパー
export function calculatePagination(page: number, limit: number, total: number) {
  const totalPages = Math.ceil(total / limit);
  const hasNextPage = page < totalPages;
  const hasPrevPage = page > 1;
  
  return {
    page,
    limit,
    total,
    totalPages,
    hasNextPage,
    hasPrevPage,
    nextPage: hasNextPage ? page + 1 : null,
    prevPage: hasPrevPage ? page - 1 : null,
  };
}

// デバウンス用ヘルパー
export function debounce<T extends (...args: unknown[]) => unknown>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// ローカルストレージ用ヘルパー
export const localStorage = {
  get: <T>(key: string): T | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },
  
  set: <T>(key: string, value: T): void => {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error('Failed to save to localStorage:', error);
    }
  },
  
  remove: (key: string): void => {
    if (typeof window === 'undefined') return;
    
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error('Failed to remove from localStorage:', error);
    }
  },
};

// テキスト処理用ヘルパー
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

export function extractKeywords(text: string, maxCount: number = 10): string[] {
  const words = text
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(/\s+/)
    .filter(word => word.length > 3);
  
  const wordCount = words.reduce((acc, word) => {
    const safeKey = word.replace(/[^\w]/g, ''); // セキュリティ対策
    if (safeKey) {
      acc.set(safeKey, (acc.get(safeKey) || 0) + 1);
    }
    return acc;
  }, new Map<string, number>());
  
  return Array.from(wordCount.entries())
    .sort(([, a], [, b]) => b - a)
    .slice(0, maxCount)
    .map(([word]) => word);
}

// UUID生成用（クライアントサイド）
export function generateId(): string {
  return crypto.randomUUID();
} 

// 記者とテーマの親和性スコア計算＆マッチング関数
import { Reporter } from './schemas';
import { CombinedTheme, getAllLegacyThemes, getAllThemes } from './mock-data';

/**
 * 記者とテーマの親和性スコアを計算し、スコア順で返す
 * @param reporter 記者オブジェクト
 * @param themes テーマ配列
 * @param topN 上位N件（デフォルト3件）
 */
export function matchThemesForReporter(
  reporter: Reporter,
  themes: CombinedTheme[],
  topN: number = 3
): { theme: CombinedTheme; score: number }[] {
  // interests, specialties, keywords, description で一致数を計算
  return themes
    .map(theme => {
      // 新旧テーマでフィールド差異を吸収
      const keywords = 'keywords' in theme ? theme.keywords : [];
      const description = theme.description || '';
      // 記者の関心ワード
      const interestWords = [
        ...(reporter.interests || []),
        ...(reporter.specialties || [])
      ];
      // キーワード一致数
      let score = 0;
      interestWords.forEach(word => {
        // キーワード完全一致
        if (keywords.some(k => k.includes(word) || word.includes(k))) score += 2;
        // 説明文に部分一致
        if (description.includes(word)) score += 1;
      });
      return { theme, score };
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN);
} 