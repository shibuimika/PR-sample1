'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Users, 
  Calendar, 
  FileText, 
  Search,
  Upload,
  MessageSquare,
  Menu,
  X,
  Home,
  Settings
} from 'lucide-react';

interface MainLayoutProps {
  children: React.ReactNode;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  active?: boolean;
}

const navigationItems: NavItem[] = [
  { id: 'dashboard', label: 'ダッシュボード', icon: Home, href: '/' },
  { id: 'reporters', label: '記者一覧', icon: Users, href: '/reporters' },
  { id: 'events', label: 'イベント', icon: Calendar, href: '/events' },
  { id: 'themes', label: 'テーマ', icon: FileText, href: '/themes' },
  { id: 'matching', label: '記者マッチング', icon: Search, href: '/matching' },
  { id: 'upload', label: 'ファイル読み込み', icon: Upload, href: '/upload' },
  { id: 'messages', label: 'メッセージ生成', icon: MessageSquare, href: '/messages' },
  { id: 'settings', label: '設定', icon: Settings, href: '/settings' },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');
  const pathname = usePathname();

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleNavClick = () => {
    setSidebarOpen(false); // モバイルでは閉じる
  };

  // pathnameに基づいてアクティブなナビゲーション項目を更新
  React.useEffect(() => {
    const currentItem = navigationItems.find(item => item.href === pathname);
    if (currentItem) {
      setActiveItem(currentItem.id);
    } else {
      setActiveItem('dashboard');
    }
  }, [pathname]);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* オーバーレイ（モバイル用） */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* サイドバー */}
      <aside 
        className={cn(
          "fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">PR Reporter</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.id;
              
              return (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    onClick={handleNavClick}
                    className={cn(
                      "w-full flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                      isActive 
                        ? "bg-blue-50 text-blue-700 border-r-2 border-blue-700"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    )}
                  >
                    <Icon className={cn(
                      "mr-3 h-5 w-5",
                      isActive ? "text-blue-600" : "text-gray-400"
                    )} />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* サイドバーフッター */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">U</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-700">ユーザー</p>
              <p className="text-xs text-gray-500">admin@example.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* メインコンテンツエリア */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ヘッダー */}
        <header className="flex items-center justify-between h-16 px-4 bg-white shadow-sm border-b">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-md hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>
            <h2 className="ml-2 text-lg font-semibold text-gray-800">
              {navigationItems.find(item => item.id === activeItem)?.label || 'ダッシュボード'}
            </h2>
          </div>

          <div className="flex items-center space-x-4">
            {/* 検索バー */}
            <div className="relative hidden md:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="検索..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* 通知アイコン */}
            <button className="p-2 rounded-full hover:bg-gray-100">
              <div className="relative">
                <div className="w-6 h-6 bg-gray-400 rounded-full"></div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              </div>
            </button>
          </div>
        </header>

        {/* メインコンテンツ */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
} 