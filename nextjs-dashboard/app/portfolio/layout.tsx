import React from 'react';
import Navigation from "@/app/ui/dashboard/navigation";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      id="dashboard-layout"
      className="layout flex h-screen flex-col"
    >
      <div className="nav w-full flex-none">
        <Navigation />
      </div>
      <div className="main flex-grow">
        <div className="h-60 w-full background banner bg-center" />
        {children}
      </div>
    </div>
  );
}
