import React from 'react';
// import { useRouter } from 'next/navigation';
import Pagination from '@/app/ui/invoices/pagination';
// import { lusitana } from '@/app/ui/fonts';
import {Box} from '@mui/material';
import TabClient from 'app/ui/portfolio/tab-client';
// import Image from 'next/image';
import { PortfolioPanel } from 'app/lib/definitions';


const portfolioPanels: PortfolioPanel[] = [
    {
        id: 'web-development',
        value: 0,
        title: 'Web Development',
        description: 'Projects I have worked on'
    },
    {
        id: 'ui-design',
        value: 1,
        title: 'UI Designs',
        description: 'Designs I have worked on'
    },
    {
        id: 'games', 
        value: 2, 
        title: 'Games',
        description: 'Games I have worked on'
    }
]

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {

    // query is going to be active tab value
    if (searchParams?.query === undefined) {
       searchParams = {
        query: searchParams?.query || '0',
        page: searchParams?.page || '1'
       };
    }

    const query = searchParams?.query || 'web-development';
    const currentPage = Number(searchParams?.page) || 1;
    const totalPages = 5 // await fetchPortfolioPages(query);

    return(
        <div className="w-full">
            <div className="w-full flex flex-col items-center justify-between">
                <Box sx={{ width: '100%' }}>
                    <TabClient query={query} page={currentPage} panels={portfolioPanels} />
                </Box>

                <div className="mt-5 flex w-full justify-center">
                    <Pagination totalPages={totalPages} />
                </div> 
            </div>

            <div id="project-sidebar" className='w-1/4'>
                More information about the focused project
            </div>
        </div>
    );
    
};
