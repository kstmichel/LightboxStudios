// import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { robotoCondensed } from '@/app/ui/fonts';

export default function CreativeDevStudioLogo() {
  return (
    <div
      className={`${robotoCondensed.className} flex flex-row flex-center items-center leading-none text-white`}
    >
      <div className='flex flex-col flex-left items-left'>
        <h1 style={{fontSize: '26px'}}>Katie St. Michel</h1>
        <h2 style={{fontSize: '20px'}}>Frontend Engineer</h2>
      </div>
    </div>
  );
}
