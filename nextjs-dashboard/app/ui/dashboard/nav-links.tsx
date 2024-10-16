"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { roboto } from "@/app/ui/fonts";

export default function NavLinks() {
  const pathname = usePathname();

  const links = [
    { name: "about", href: "/dashboard" },
    { name: "portfolio", href: "/portfolio" },
    { name: "resume", href: "/resume" },
  ];

  return (
    <>
      {links.map((link) => {
        const linkColor =
          pathname === link.href || (pathname && pathname.includes(link.href))
            ? "text-orange-400"
            : "text-blue-400";

        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(
              `flex h-[48px] ${roboto.className} grow items-center justify-center p-3 text-sm font-medium hover:text-blue-300 md:flex-none md:justify-start md:p-2 md:px-3 ${linkColor}`,
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
