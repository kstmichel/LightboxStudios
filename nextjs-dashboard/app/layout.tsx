import React from 'react';
import "@/app/ui/global.css";
import { inter } from "@/app/ui/fonts";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}glob antialiased text-white`}>
        {children}
      </body>
    </html>
  );
}
