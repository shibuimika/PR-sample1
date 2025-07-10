import React from 'react';
import ThemeForm from '../../../components/themes/ThemeForm';

const NewThemePage = () => {
  return (
    <div className="max-w-xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">テーマ新規作成</h1>
      <ThemeForm />
    </div>
  );
};

export default NewThemePage; 