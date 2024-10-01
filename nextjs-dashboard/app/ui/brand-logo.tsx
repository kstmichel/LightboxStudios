// import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function CreativeDevStudioLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row flex-center items-center leading-none text-white`}
    >
      {/* <GlobeAltIcon className="h-12 w-100 rotate-[15deg]" /> */}
      <div className='flex flex-col flex-left items-left'>
        <h1>Katie St. Michel</h1>
        <h3>Software Engineer</h3>
      </div>
    </div>
  );
}
