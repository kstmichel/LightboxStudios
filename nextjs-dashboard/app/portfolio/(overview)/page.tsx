'use server';

import React from 'react';
import {Link, Breadcrumbs} from '@mui/material';

export default async function Page({
    searchParams,
  }: {
    searchParams?: {
      query?: string;
      page?: string;
    };
  }) {

    return(
        <div className="container pt-6 w-full">
            <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href="/dashboard/portfolio">
                    Portfolio
                </Link>
                <Link color="textPrimary" href="/dashboard/portfolio/project/create" aria-current="page">
                    Create Project
                </Link>
            </Breadcrumbs>
          
            <div className="w-3/4">
                <Link href='/dashboard/portfolio/project/create'>Create Project</Link>
            </div>
    
            <div id="project-drawer" className='w-1/4'>
                More information about the focused project
            </div>
        </div>
    );
    
};
