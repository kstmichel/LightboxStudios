import CardWrapper from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lusitana } from '@/app/ui/fonts';
 
import { Suspense } from 'react';
import { RevenueChartSkeleton, LatestInvoicesSkeleton, CardsSkeleton } from '@/app/ui/skeletons';

export default async function Page() {

  return (
    <main>
      <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <h2>
        Goals: 
      </h2>
      <ul>
        <ol>
          <li>1. Create better navigation
            <ul>
              <li>Resume</li>
              <li>Portfolio - this page will have sub navigation (Development, Graphic Art, Painting), and will have drawer for each 
                project. Each project will have a sub navigation for the following:
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
