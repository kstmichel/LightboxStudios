import React from 'react'; 
import Link from "next/link";
import NavLinks from "@/app/ui/nav-links";
import { Person } from '@mui/icons-material';
import { robotoCondensed } from "@/app/ui/fonts";

export default function Navigation() {
  return (
    <div className="container px-3 md:px-5 flex h-full flex-row">
      <Link className="flex h-20 items-center justify-start" href="/about">
        <div className="w-70 flex flex-row flex-center items-center leading-none text-gray-800">
            <div className="flex flex-col flex-left items-left">
              <h1 style={{ fontSize: "26px" }} className={`${robotoCondensed.className}`}>Katie St. Michel</h1> {/*TODO: user first and last name here*/}
              <h2 style={{ fontSize: "20px" }} className={`${robotoCondensed.className}`}>Frontend Engineer</h2> {/*TODO: user title here*/}
            </div>
          </div>
      </Link>
      <div className="flex grow flex-row flex-end justify-end w-100">
        <NavLinks />
        <form>
          <button className="flex w-full grow items-center justify-center gap-2 p-3 text-sm font-medium md:flex-none md:justify-start ">
            <Person className="w-6 text-gray-800" />
            <div className="hidden md:block text-gray-600">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
