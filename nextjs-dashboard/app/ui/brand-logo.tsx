import React from 'react';
import Image from 'next/image';
import { robotoCondensed } from "@/app/ui/fonts";

export default function LightboxStudiosLogo({isActive}: {isActive: boolean}) {
  return (
    <div
      className={`${robotoCondensed.className} flex flex-row flex-center items-center leading-none text-gray-800`}
    >
      <div className="flex flex-col flex-left items-left">
        <div className={`dark-to-light ${isActive && 'active'} flex flex-col flex-left items-left`}>
          <Image src="icons/lightbox-collection.png" alt="Lightbox Collection" className="w-40 h-40" />
        </div>
      </div>
    </div>
  );
}
