'use client';
import React, {useState} from 'react';
import {Box, Tabs, Tab} from '@mui/material';
import {useRouter} from 'next/navigation';
import {PortfolioPanel} from 'app/lib/definitions';
import TabPanel from 'app/ui/tab-panel';
import { Suspense } from 'react';
import PortfolioSkeleton from 'app/ui/skeletons';
import GalleryServer from './gallery-server';

enum TabOptions {
    web_development = 0,
    game = 1,
    ui_design = 2
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const getTabValue = (query: string): number => {
    return Object.keys(TabOptions).findIndex((key) => key === query);
}

const getTabKey = (index: number) => {
    return Object.entries(TabOptions).find(([, val]) => val === index)?.[0];
};

export default function TabClient({query, page, panels}: {query: string, page: number, panels: PortfolioPanel[]}) {
    const router = useRouter();
    const [value, setValue] = useState(getTabValue(query));
    
    const tabChangeHandler = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
        console.log('tab clicked, newValue', getTabKey(newValue));
        router.push(`?query=${getTabKey(newValue)}`);
    };

   return (
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={tabChangeHandler} centered aria-label="basic tabs example"
            sx={{
                '& .MuiTab-root': {
                    color: 'white', // Default text color
                },
                '& .Mui-selected': {
                    color: '#db2777', // Text color when selected
                },
            }}>
            { 
            panels &&
            panels.map((panel: PortfolioPanel, index: number) =>(
                    <Tab key={index} label={panel.title} {...a11yProps(index)} />
                ))
            }
        </Tabs>
        {
            panels.map((panel, index) => {
                if (value !== index) return null;

                return (
                    <TabPanel key={index} value={value} index={index}>
                        <>
                        {panel.title}
                        <Suspense key={query + page} fallback={<PortfolioSkeleton />}>   
                            <GalleryServer query={panel.id} page={page} />             
                        </Suspense>
                        </>
                </TabPanel>
                );

            })
        }
    </Box>
   )
};
