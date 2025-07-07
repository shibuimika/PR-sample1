import ThemeForm from '@/components/themes/ThemeForm';

export default function NewThemePage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">新規テーマ作成</h1>
      </div>
      <ThemeForm />
    </div>
  );
} 