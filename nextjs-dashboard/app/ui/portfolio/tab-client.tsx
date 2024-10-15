'use client';
import React, { useState, Suspense, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Tabs, Tab, Snackbar, Alert } from '@mui/material';
import TabPanel from './tab-panel';
import GalleryClient from './gallery-client';
import { PortfolioPanel, portfolioPanels, Project } from '@/app/lib/definitions';
import {debounce} from '@/app/lib/utils';
import {roboto} from '@/app/ui/fonts';
import { PortfolioSkeleton } from '../skeletons';

interface Props {
  category: string;
  page: number;
  initialData: Project[];
}

const TabClient = ({ category, page, initialData }: Props) => {
  const router = useRouter();
  const initialTab = portfolioPanels.findIndex(panel => panel.id === category);
  const [value, setValue] = useState(initialTab);
  const [projectsByCategory, setProjectsByCategory] = useState(() => {
    const initialProjects: { [key: string]: Project[] } = {};
    portfolioPanels.forEach(panel => {
      initialProjects[panel.id] = panel.id === category ? initialData : panel.projects;
    });
    return initialProjects;
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const debouncedPush = debounce((newValue: number) => {
        setValue(newValue);
        router.push(`${portfolioPanels[newValue].id}`);
        }, 600); 

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    const isTabActionToRight = value < newValue;

    const currentGallery = document.getElementById(`gallery_${portfolioPanels[value].id}`);

    if (currentGallery) {
        currentGallery.className += isTabActionToRight ? ' move-left' : ' move-right';
    }

    debouncedPush(newValue);
};

  const handleSnackbarClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const updateProjectsByCategory = useCallback((category: string, projects: Project[]) => {
    setProjectsByCategory((prev) => ({ ...prev, [category]: projects }));
  }, []);

  return (
    <Box>
      <Snackbar
            open={snackbarOpen}
            autoHideDuration={6000}
            onClose={() => handleSnackbarClose}
        >
            <Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
                {snackbarMessage}
            </Alert>
      </Snackbar>
      <Tabs value={value} textColor="secondary" indicatorColor="secondary" onChange={handleChange} centered className="container">
        { 
          portfolioPanels.map((panel: PortfolioPanel) => (
            <Tab key={`tab_${panel.id}`} 
                label={panel.title} 
                sx={{
                    '&.MuiTab-textColorPrimary': {
                        color: 'white',
                    }
                }}
                className={`${roboto.className} font-500`}
            />
        ))
        }
      </Tabs>
      {
        portfolioPanels.map((panel, index) => (
          <TabPanel key={`tabpanel_${panel.id}`} value={value} index={index}>
            <div className="container pt-6 w-full"> 
                <Suspense fallback={<PortfolioSkeleton />}>
                    <GalleryClient 
                        category={panel.id} 
                        page={page} 
                        projects={projectsByCategory[panel.id]}
                        updateProjectsByCategory={updateProjectsByCategory} 
                    />
                </Suspense>
            </div>
          </TabPanel>
        ))
      }
    </Box>
  );
};

export default TabClient;