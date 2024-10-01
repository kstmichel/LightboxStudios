'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'home', href: '/dashboard' },
  { name: 'portfolio', href: '/dashboard/portfolio' },
  { name: 'resume', href: '/dashboard/resume' },
  {
    name: 'invoices',
    href: '/dashboard/invoices'
  },
  { name: 'customers', href: '/dashboard/customers' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const linkColor = pathname === link.href ? 'text-pink-600' : 'text-blue-400';

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(`flex h-[48px] grow items-center justify-center p-3 text-sm font-medium hover:text-blue-300 md:flex-none md:justify-start md:p-2 md:px-3 ${linkColor}`
            )}
          >
            {/* <LinkIcon className="w-6" /> */}
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
