import React from 'react';
import Navigation from "@/app/ui/navigation";

export const experimental_ppr = true;

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="layout flex flex-col"
    >
      <div className="nav w-full flex-none">
        <Navigation />
      </div>
      <div className="main flex-grow">
          {children}
      </div>
    </div>
  );
}
