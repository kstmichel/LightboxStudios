import React from 'react';
import { robotoCondensed } from "@/app/ui/fonts";

export default function LightboxStudiosLogo({isActive = false}: {isActive: boolean}) {
  return (
    <div
      className={`${robotoCondensed.className} flex flex-row flex-center items-center leading-none text-white`}
    >
      <div className="flex flex-col flex-left items-left">
        <div className={` ${isActive && 'active'} flex flex-col flex-left items-left`}>
          <div className="brand-logo">
            <div className="brand-logo--container">
              <div className="brand-logo--images" />
                <div className='brand-logo--mask-layer'>
                    {/* <div className="spinner-circle"></div> */}
                    <div className={`illuminate ${isActive && 'active'}`}></div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
