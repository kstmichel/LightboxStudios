"use client";
import React, { useState, Suspense } from "react";
import { 
  Box, 
  Tabs, 
  Tab, 
  Snackbar, 
  Alert, 
  AlertColor, 
  Typography, 
} from "@mui/material";
import Gallery from "@/app/ui/portfolio/gallery";
import {
  PortfolioCategoryKeys,
  PortfolioPanel,
  portfolioPanelData,
  PortfolioCategoryId,
  Skill,
} from "@/app/lib/definitions";
import { roboto } from "@/app/ui/fonts";
import { PortfolioSkeleton } from "../skeletons";

interface TabNavigationProps {
  category: PortfolioCategoryKeys | null;
  page: number;
  skillsLibrary: Skill[];
}

const Portfolio = ({ category, page, skillsLibrary }: TabNavigationProps) => {
  const [activeTab, setActiveTab] = useState<number>(Object.keys(PortfolioCategoryId).indexOf(category || PortfolioCategoryId.web_development));
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<AlertColor>('success');
  
  const ChangeActiveTab = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const showSnackbar = (message: string, severity: AlertColor) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);

    //temporary bugfix to get snackbar to auto-hide
    setTimeout(() => {
      setSnackbarOpen(false);
    }, 2000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }

  const handleError = (error: string) => {
    showSnackbar(error, 'error');
  };

  return (
   <>
    <Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div className="gallery_tabs">
        <Tabs
          value={activeTab}
          textColor="inherit"
          indicatorColor="secondary"
          onChange={ChangeActiveTab}
          centered
        >
            {portfolioPanelData.map((panel: PortfolioPanel) => (
                <Tab
                  key={`tab_${panel.id}`}
                  label={panel.title}
                  aria-label={panel.title}
                  aria-labelledby={`tab_${panel.id}`}
                  sx={{
                    "&.MuiTab-textColorPrimary": {
                      color: "white",
                    },
                    "&.MuiTab-selected": {
                      color: "white",
                    },
                  }}
                  className={`${roboto.className}`}
                />
            ))}
        </Tabs>
      </div>
      
      <div className="h-20 md:h-60 relative md:absolute w-full banner bg-center" />

      {portfolioPanelData.map((panel, index) => (
        <div
          key={`tabpanel_${panel.id}`}
          role="tabpanel"
          id={`simple-tabpanel-${index}`}
          aria-labelledby={`simple-tab-${index}`}
          className="panel_backdrop p-0 md:p-8 md:pt-14 min-h-screen"
          hidden={activeTab !== index}
        >
          <div className="container">
            <Box className='px-3 py-5 md:px-8 md:py-8' style={{backgroundColor: '#47484f'}}>
              <Typography variant="h4" className="text-white">{panel.title}</Typography>
              <Typography variant="body1" className="text-white pt-4">{panel.description}</Typography>

              <div className='mt-12 mb-16'>
                <Suspense fallback={<PortfolioSkeleton />}>
                  <Gallery
                    category={panel.id}
                    page={page}
                    skillsLibrary={skillsLibrary}
                    onShowSnackbar={showSnackbar}
                    isActive={activeTab === panel.value}
                    onError={handleError}
                  />
                </Suspense>
              </div>
            </Box>
          </div>
        </div>
      ))}
    </Box>
    </>
  );
};

export default Portfolio;
