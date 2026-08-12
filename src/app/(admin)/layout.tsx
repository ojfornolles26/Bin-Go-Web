import Sidebar from '@/components/admin/sidebar';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[100dvh] w-full bg-slate-50 font-geist-sans text-slate-900">
      <Sidebar />
      <main className="flex-1 min-w-0 p-8">
        {children}
      </main>
    </div>
  );
}
