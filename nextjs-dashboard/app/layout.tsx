import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body 
        className={`${inter.className} antialiased text-white`}
        style={{ backgroundColor: '#02021c' }}
      >{children}</body>
    </html>
  );
}
