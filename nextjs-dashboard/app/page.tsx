'use client';
import React, {useState} from "react";
import LightboxStudiosLogo from "@/app/ui/brand-logo";
import { roboto } from "@/app/ui/fonts";
import { Typography, Button } from "@mui/material";
// import Image from 'next/image';

export default function Page() {
  const [letThereBeLight, setLetThereBeLight] = useState(false);

  return (
    <main className="flex min-h-screen justify-center flex-col p-6">
      <div className="mt-4 flex flex-col items-center text-center justify-center md:flex-row">
        <div 
          className="flex flex-col items-center gap-2 rounded-lg bg-gray-50 px-6 py-10 md:w-3/5 md:px-15"
          onMouseEnter={() => setLetThereBeLight(true)}
          onMouseLeave={() => setLetThereBeLight(false)}
        >
        <LightboxStudiosLogo isActive={letThereBeLight} />
        <div className={`flex flex-col gap-4 text-gray-800 ${roboto.className}`}>
            <Typography variant="h4"><strong>Welcome to <br />Lightbox Studios!</strong></Typography>
            <Typography variant="h5">A space just for you to bring your work into the light!</Typography>
        </div>
          <div className="flex mt-8 centered flex-col grow text-center justify-center gap-4 w-2/4">
              <Button
                href="/login"
                variant="contained"
                size="large"
                className={`visible text-white transition-colors ${letThereBeLight ? 'bg-active' : 'bg-gray-800'}`}
                 >
                Log in
              </Button>

              <Button
                href="/portfolio"
                variant="outlined"
                size="large"
                className={`visible transition-colors ${letThereBeLight ? 'text-active border-active' : 'text-gray-800 border-gray-800'}`}
              >
                Continue As Guest
              </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
