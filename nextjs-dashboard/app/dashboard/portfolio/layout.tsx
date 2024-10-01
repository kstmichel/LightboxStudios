import ProjectDrawer from '@/app/ui/portfolio/project-drawer';

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col">
      <div className="flex-grow">{children}</div>
      <div className="w-full flex-none">
        <ProjectDrawer />
      </div>
    </div>
  );
}
