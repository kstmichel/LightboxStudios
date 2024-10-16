import Link from "next/link";
import NavLinks from "@/app/ui/dashboard/nav-links";
import CreativeDevStudioLogo from "@/app/ui/brand-logo";
import { PowerIcon } from "@heroicons/react/24/outline";

export default function Navigation() {
  return (
    <div className="container flex h-full flex-row">
      <Link className="flex h-20 items-center justify-start" href="/">
        <div className="w-70 text-white">
          <CreativeDevStudioLogo />
        </div>
      </Link>
      <div className="flex grow flex-row flex-end flex-row justify-end w-100">
        <NavLinks />
        {/* <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div> */}
        <form>
          <button className="flex w-full grow items-center justify-center gap-2 p-3 text-sm font-medium  text-white hover:text-pink-600 md:flex-none md:justify-start ">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
}
