import Navigation from '@/app/ui/dashboard/navigation';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div id="dashboard-layout" className="background layout flex h-screen flex-col">
      <div className="nav pb-4 w-full flex-none">
        <Navigation />
      </div>
      <div className="main pt-4 flex-grow">{children}</div>
    </div>
  );
}
