'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, SortAsc, SortDesc, User, Mail, Phone } from 'lucide-react';
import { mockReporters } from '@/lib/mock-data';

type SortField = 'name' | 'company' | 'updatedAt';
type SortDirection = 'asc' | 'desc';

interface FilterState {
  searchTerm: string;
  company: string;
  specialty: string;
  contactPreference: string;
}

export default function ReporterList() {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    company: '',
    specialty: '',
    contactPreference: ''
  });
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  // 会社とスペシャリティの一覧を取得
  const companies = useMemo(() => {
    const uniqueCompanies = [...new Set(mockReporters.map(r => r.company))];
    return uniqueCompanies.sort();
  }, []);

  const specialties = useMemo(() => {
    const allSpecialties = mockReporters.flatMap(r => r.specialties);
    const uniqueSpecialties = [...new Set(allSpecialties)];
    return uniqueSpecialties.sort();
  }, []);

  // フィルタリング済みの記者一覧
  const filteredReporters = useMemo(() => {
    let filtered = mockReporters;

    // 検索フィルタ
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      filtered = filtered.filter(reporter => 
        reporter.name.toLowerCase().includes(searchLower) ||
        reporter.company.toLowerCase().includes(searchLower) ||
        reporter.specialties.some(spec => spec.toLowerCase().includes(searchLower)) ||
        reporter.interests.some(interest => interest.toLowerCase().includes(searchLower))
      );
    }

    // 会社フィルタ
    if (filters.company) {
      filtered = filtered.filter(reporter => reporter.company === filters.company);
    }

    // スペシャリティフィルタ
    if (filters.specialty) {
      filtered = filtered.filter(reporter => 
        reporter.specialties.includes(filters.specialty)
      );
    }

    // 連絡手段フィルタ
    if (filters.contactPreference) {
      filtered = filtered.filter(reporter => 
        reporter.contactPreference === filters.contactPreference
      );
    }

    return filtered;
  }, [filters]);

  // ソート済みの記者一覧
  const sortedReporters = useMemo(() => {
    return [...filteredReporters].sort((a, b) => {
      let aValue: string | Date;
      let bValue: string | Date;

      switch (sortField) {
        case 'name':
          aValue = a.name;
          bValue = b.name;
          break;
        case 'company':
          aValue = a.company;
          bValue = b.company;
          break;
        case 'updatedAt':
          aValue = a.updatedAt;
          bValue = b.updatedAt;
          break;
        default:
          aValue = a.name;
          bValue = b.name;
      }

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredReporters, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      company: '',
      specialty: '',
      contactPreference: ''
    });
  };

  return (
    <div className="space-y-6">
      {/* ヘッダー */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">記者一覧</h1>
          <p className="mt-1 text-sm text-gray-600">
            {sortedReporters.length} 件の記者情報を表示中
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
            新しい記者を追加
          </button>
        </div>
      </div>

      {/* フィルター */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-wrap gap-4">
          {/* 検索 */}
          <div className="flex-1 min-w-64">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="記者名、会社、専門分野で検索..."
                value={filters.searchTerm}
                onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          {/* 会社フィルタ */}
          <div className="min-w-40">
            <select
              value={filters.company}
              onChange={(e) => handleFilterChange('company', e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">全ての会社</option>
              {companies.map(company => (
                <option key={company} value={company}>{company}</option>
              ))}
            </select>
          </div>

          {/* スペシャリティフィルタ */}
          <div className="min-w-40">
            <select
              value={filters.specialty}
              onChange={(e) => handleFilterChange('specialty', e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">全ての専門分野</option>
              {specialties.map(specialty => (
                <option key={specialty} value={specialty}>{specialty}</option>
              ))}
            </select>
          </div>

          {/* 連絡手段フィルタ */}
          <div className="min-w-36">
            <select
              value={filters.contactPreference}
              onChange={(e) => handleFilterChange('contactPreference', e.target.value)}
              className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">全ての連絡手段</option>
              <option value="email">メール</option>
              <option value="phone">電話</option>
              <option value="both">両方</option>
            </select>
          </div>

          {/* フィルタクリア */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <Filter className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* 記者一覧テーブル */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    <span>記者名</span>
                    {sortField === 'name' && (
                      sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('company')}
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    <span>会社</span>
                    {sortField === 'company' && (
                      sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  専門分野
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  連絡先
                </th>
                <th className="px-6 py-3 text-left">
                  <button
                    onClick={() => handleSort('updatedAt')}
                    className="flex items-center space-x-1 text-xs font-medium text-gray-500 uppercase tracking-wider hover:text-gray-700"
                  >
                    <span>最終更新</span>
                    {sortField === 'updatedAt' && (
                      sortDirection === 'asc' ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />
                    )}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedReporters.map((reporter) => (
                <tr key={reporter.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{reporter.name}</div>
                        <div className="text-sm text-gray-500">{reporter.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{reporter.company}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {reporter.specialties.slice(0, 2).map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                        >
                          {specialty}
                        </span>
                      ))}
                      {reporter.specialties.length > 2 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          +{reporter.specialties.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div className="flex items-center space-x-2">
                      {reporter.contactPreference === 'email' || reporter.contactPreference === 'both' ? (
                        <Mail className="h-4 w-4 text-gray-400" />
                      ) : null}
                      {reporter.contactPreference === 'phone' || reporter.contactPreference === 'both' ? (
                        <Phone className="h-4 w-4 text-gray-400" />
                      ) : null}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {reporter.updatedAt.toLocaleDateString('ja-JP')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      詳細
                    </button>
                    <button className="text-gray-600 hover:text-gray-900">
                      編集
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* フィルタ結果が空の場合 */}
      {sortedReporters.length === 0 && (
        <div className="text-center py-12">
          <User className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">記者が見つかりません</h3>
          <p className="mt-1 text-sm text-gray-500">
            検索条件を変更して再度お試しください。
          </p>
        </div>
      )}
    </div>
  );
} 