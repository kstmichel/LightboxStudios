'use client';
import React, {useState} from "react";
import LightboxStudiosLogo from "@/app/ui/brand-logo";
import { roboto } from "@/app/ui/fonts";
import { Typography, Button } from "@mui/material";

export default function Page() {
  const [letThereBeLight, setLetThereBeLight] = useState(false);

  return (
    <main className="flex min-h-screen justify-center flex-col p-6">
      <div className="flex flex-col items-center text-center justify-center md:flex-row">
        <div 
          className="flex flex-col items-center gap-2 rounded-lg pxy-3 md:px-6 md:py-6 md:w-4/5 md:px-15"
          onMouseEnter={() => setLetThereBeLight(true)}
          onMouseLeave={() => setLetThereBeLight(false)}
        >
        <LightboxStudiosLogo isActive={letThereBeLight} />
        <div className={`flex flex-col gap-4 text-gray-100 ${roboto.className}`}>
            <Typography variant="h4"><strong>Welcome to <br />Lightbox Studios!</strong></Typography>
            <Typography variant="h5">A space just for you to bring your work into the light!</Typography>
        </div>
          <div className="flex mt-8 centered flex-col grow text-center justify-center gap-4 w-full md:w-1/4 md:min-w-64">
              <Button
                href="/login"
                variant="contained"
                size="large"
                className={`transition duration-700 ease-in-out text-white 
                    ${letThereBeLight ? 'bg-active hover:bg-active-dark' 
                      : 'bg-gray-800'}`}
                 >
                Log in
              </Button>

              <Button
                href="/portfolio/web_development"
                variant="outlined"
                size="large"
                className={`transition duration-700 ease-in-out text-white
                  ${letThereBeLight ? ' border-active hover:border-active-dark' 
                    : ' border-gray-800'}`}
              >
                Continue As Guest
              </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
