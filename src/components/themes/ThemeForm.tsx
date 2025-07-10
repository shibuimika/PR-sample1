'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { addTheme, NewTheme } from '../../lib/mock-data';
import { v4 as uuidv4 } from 'uuid';

const ThemeForm: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // ファイルは一旦URLとして仮保存（本来はアップロード処理が必要）
    let fileUrl = '';
    if (file) {
      fileUrl = URL.createObjectURL(file);
    }
    const newTheme: NewTheme = {
      id: uuidv4(),
      title,
      description,
      url: url || undefined,
      fileUrl: fileUrl || undefined,
    };
    addTheme(newTheme);
    router.push(`/themes/${newTheme.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
              <div>
        <label>テーマ名</label>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} required className="input input-bordered w-full" />
              </div>
              <div>
        <label>説明</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} required className="textarea textarea-bordered w-full" />
              </div>
              <div>
        <label>関連URL</label>
        <input type="url" value={url} onChange={e => setUrl(e.target.value)} className="input input-bordered w-full" />
      </div>
      <div>
        <label>ファイルアップロード</label>
        <input type="file" onChange={handleFileChange} className="file-input w-full" />
      </div>
      <button type="submit" className="btn btn-primary w-full">作成</button>
    </form>
  );
};

export default ThemeForm; 