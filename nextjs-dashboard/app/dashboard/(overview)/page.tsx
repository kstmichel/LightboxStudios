import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
import Image from 'next/image';

import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default async function Page() {

  return (
    <main className="flex min-h-screen flex-col p-6"
    style={{ background: '#fff' }}>
       <Image
        src='/CreativeDevStudiosBackground.jpg'
        width={7654}
        height={1200}
        style={{
          position: 'fixed',
          width: '100%',
          top: '0',
          bottom: '0',
          left: '0',
          zIndex: '-1',
        }}
        alt='starry sky with coding symbols'
      />
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <h2>
        Goals: 
      </h2>
      <ul>
        <ol>
          <li>
            Come up with a couple games or cool UI/UX for a shop or something.
            Oh yeahh! come up with a warm hobbit-style shop to showcase my paintings.
            Link to the shop (in new tab) from CreativeDevStudio site.
            That and a game built in React. Oh maybe the shop would be built in Angular...
            This would give me an opportunity to show off my creativity.

            creativedevstudios.com/kstmichel/
            creativedevstudios.com/kstmichel/resume
            creativedevstudios.com/kstmichel/portfolio (this can be broken up in tabs if need-be)
            creativedevstudios.com/kstmichel/contact
          </li>
          <li>1. Create better navigation
            <ul>
              <li>Resume</li>
              <li>Portfolio - this page will have sub navigation (Development/Gallery), and will have drawer for each 
                project. Probably want to have a separate route for paintings...not sure if we want those accessible
                to recuiters. Each project will have a sub navigation for the following:
                <ul>
                  <li>Project Overview</li>
                  <li>Project Details</li>
                  <li>Project Images</li>
                  <li>Project Videos</li>
                  <li>Project Files</li>
                  <li>Project Skills</li>
                </ul>
              </li>
              <li>Contact</li>
            </ul>
          </li>
          <li>2. Create better layout</li>
          <li>3. Featured section on homepage</li>
          <li>4. Authentication / Login</li>
        </ol>
      </ul>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Suspense fallback={<CardsSkeleton />}>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={<LatestInvoicesSkeleton />}>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  );
}
