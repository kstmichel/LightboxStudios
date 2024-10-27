"use client";
import React, { useEffect, useState, Suspense, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Box, Tabs, Tab, Snackbar, Alert, Drawer, Typography } from "@mui/material";
import { Add } from "@mui/icons-material";
import TabPanel from "./tab-panel";
import Gallery from "./gallery";
import Skills from './skills';
import { default as CreateForm } from "@/app/ui/portfolio/project/create-form";
import { default as EditForm } from "@/app/ui/portfolio/project/edit-form";
import {
  PortfolioPanel,
  portfolioPanels,
  Project,
  Skill
} from "@/app/lib/definitions";
import { debounce } from "@/app/lib/utils";
import { roboto } from "@/app/ui/fonts";
import { PortfolioSkeleton } from "../skeletons";

enum DrawerAction {
  View = 0,
  Edit = 1,
  Create = 2,
}

interface Props {
  category: string;
  page: number;
  initialData: Project[];
  skillsLibrary: Skill[];
}

const TabClient = ({ category, page, initialData, skillsLibrary }: Props) => {
  const router = useRouter();
  const initialTab = portfolioPanels.findIndex((panel) => panel.id === category);

  const [value, setValue] = useState(initialTab);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [openDrawer, setOpenDrawer] = useState(false);
  const [drawerMode, setDrawerMode] = useState<DrawerAction>(DrawerAction.View);
  const [focusedProject, setFocusedProject] = useState<Project | null>(null);
  const [projectsByCategory, setProjectsByCategory] = useState(() => {
      const initialProjects: { [key: string]: Project[] } = {};
        portfolioPanels.forEach((panel) => {
          initialProjects[panel.id] =
            panel.id === category ? initialData : panel.projects;
        });
        return initialProjects;
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const debouncedPush = debounce((newValue: number) => {
    router.push(`${portfolioPanels[newValue].id}`);
  }, 200);
  
  useEffect(() => {
    const currentGallery = document.getElementById(
      `gallery_${portfolioPanels[value].id}`,
    );
    if (currentGallery) {
      currentGallery.className += " visible";
    }
  }, [value]);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    debouncedPush(newValue);
  };

  const toggleDrawer = (newOpen: boolean, mode: DrawerAction, project?: Project) => () =>  {
    console.log('toggleDrawer', newOpen, mode, project);

    setOpenDrawer(newOpen);
    setDrawerMode(mode);

    if(project) {
      console.log('focused project changed', project);
      setFocusedProject(project);
    }
  };

  const handleError = (error: string) => {
    setSnackbarMessage(error);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = (
    event?: React.SyntheticEvent,
    reason?: string,
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const updateProjectsByCategory = useCallback(
    (category: string, projects: Project[]) => {
      console.log("Updating projects for category", category);
      setProjectsByCategory((prev) => ({ ...prev, [category]: projects }));
    },
    [],
  );

  return (
   <>
    <Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => handleSnackbarClose}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>

      <div className="gallery_tabs">
        <Tabs
          value={value}
          textColor="inherit"
          indicatorColor="secondary"
          onChange={handleChange}
        >
            {portfolioPanels.map((panel: PortfolioPanel) => (
                <Tab
                  key={`tab_${panel.id}`}
                  label={panel.title}
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
      {portfolioPanels.map((panel, index) => (
        <TabPanel key={`tabpanel_${panel.id}`} value={value} index={index}>
          <div className="floating-panel">
            <div className="container">
                <div className="gallery-wrapper">
                  <Add 
                    className="icon_button_outlined text-white text-4xl font-bold hover:cursor-pointer" 
                    onClick={toggleDrawer(true, DrawerAction.Create)} 
                  />

                  <Suspense fallback={<PortfolioSkeleton />}>
                    <Gallery
                      category={panel.id}
                      page={page}
                      projects={projectsByCategory[panel.id]}
                      updateProjectsByCategory={updateProjectsByCategory}
                      onError={handleError}
                      onViewMore={(project: Project) => {
                        console.log('tab-client onViewMore', project);
                        toggleDrawer(true, DrawerAction.View, project)();
                      }}
                      onEdit={(project: Project) => toggleDrawer(true, DrawerAction.Edit, project)()}
                    />
                  </Suspense>
                </div>
            </div>
          </div>
        </TabPanel>
      ))}
    </Box>

    <Drawer
        anchor="right"
        open={openDrawer}
        elevation={16}
        onClose={toggleDrawer(false, drawerMode)}
        className="w-full md:w-4/12"
        ModalProps={{
          BackdropProps: {
            className: 'custom-backdrop',
          },
        }}
      >
        {drawerMode === DrawerAction.View && focusedProject && (
          <Box sx={{ width: 400 }} role="presentation" className="p-5">
            <Typography variant="h4">{focusedProject.title}</Typography>
            <Typography variant="body1" className="mt-6">{focusedProject.description}</Typography>
            <div className="mt-10">
              <Typography variant="h6">Skills</Typography>
              <Skills skills={focusedProject.skills} />
            </div>
            <div className="mt-10">
              <Typography variant="h6">Github information here..</Typography>
              </div>
          </Box>
        )}

        {drawerMode === DrawerAction.Edit && focusedProject && (
          <EditForm project={focusedProject} skills={skillsLibrary} />
        )}

        {drawerMode === DrawerAction.Create && (
          <CreateForm onClose={toggleDrawer(false, DrawerAction.Create)} skills={skillsLibrary} />
        )}
      </Drawer>
    </>
  );
};

export default TabClient;
