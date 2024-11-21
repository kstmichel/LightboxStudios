"use cache";
import React, { useEffect, useState } from "react";
import useSWR, {mutate} from "swr";
import {
  Grid,
  Typography,
  Drawer,
  Box,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import { Project, Skill, PortfolioCategoryKeys } from "app/lib/definitions";
import { roboto } from "app/ui/fonts";
import { PortfolioSkeleton } from "app/ui/skeletons";
import Skills from '@/app/ui/portfolio/skills';
import DeleteDialog from "@/app/ui/portfolio/project/delete-dialog";
import AbandonFormDialog from "@/app/ui/portfolio/project/abandon-dialog";
import { default as CreateProject } from "@/app/ui/portfolio/project/create-form";
import { default as EditProject } from "@/app/ui/portfolio/project/edit-form";
import Tile from "@/app/ui/portfolio/tile";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

enum ProjectAction {
  None,
  View,
  Edit,
  Create,
  Delete,
}

function ViewProject({project}: {project: Project}): JSX.Element {
  return (
    <Box sx={{ width: 400 }} role="presentation" className="p-5">
      <Typography variant="h4">{project.title}</Typography>
      <Typography variant="body1" className="mt-6">{project.description}</Typography>
      <div className="mt-10">
        <Typography variant="h6">Skills</Typography>
        <Skills skills={project.skills} />
      </div>
      <div className="mt-10">
        <Typography variant="h6">Github information here..</Typography>
        </div>
    </Box>
  )
}

export default function Gallery({
  category,
  page,
  skillsLibrary,
  isActive,
  onError,
  onShowSnackbar,
}: {
  category: string;
  page: number;
  skillsLibrary: Skill[];
  isActive: boolean,
  onError: (error: string) => void;
  onShowSnackbar: (message: string, severity: 'success' | 'error') => void;
}) {

  const [loading, setLoading] = useState(false);
  const [focusedProject, setFocusedProject] = useState<Project | null>(null);
  const [localProjects, setLocalProjects] = useState<Project[] | null>(null);
  const [action, setAction] = useState<ProjectAction>(ProjectAction.None);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [abandonEditFormDialogOpen, setAbandonEditFormDialogOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [abandonWarning, setAbandonWarning] = useState(false);

  // Fetch the projects
  const { data: fetchedProjects, error } = useSWR(
    `/api/projects?category=${category}&page=${page}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
    },
  );

  // CRUD operations
  const handleCreateProject = async (formData: FormData) => {
    if(!formData) {
        onError('No project to delete');
        setLoading(false);
        return { success: false, message: 'Project could not be created, please try again.' };
    }

    setLoading(true);
    
    try {
    
      const response = await fetch(`/api/projects/create`, {
        method: 'POST',
        body: formData,
      }).then((res) => res.json());
  
      if (!response.success) {
        onError('Failed to create project');
        return;
      }

      mutate(`/api/projects?category=${category}&page=${page}`, true);
      onShowSnackbar('Project was successfully created', 'success'); 
      setAbandonWarning(false);
      closeDrawer(true);     

    } catch (error) {
      console.error('Error creating project', error);
      onError('Failed to create project');
      return;
    }

    setLoading(false);
  };

  const handleUpdateProject = async (projectId: string, formData: FormData) => {
    if(!projectId || !formData) {
        onError('No project to delete');
        setLoading(false);
        return { success: false, message: 'No project to delete' };
    }

    setLoading(true);
    
    try {
    
      const response = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        body: formData,
      }).then((res) => res.json());
  
      if (!response.success) {
        onError('Failed to update project');
        return;
      }

      mutate(`/api/projects?category=${category}&page=${page}`, true);
      onShowSnackbar('Project was successfully updated', 'success'); 
      setAbandonWarning(false);
      closeDrawer(true);     

    } catch (error) {
      console.error('Error updating project', error);
      onError('Failed to update project');
      return;
    }

    setLoading(false);
  };

  const handleDeleteProject = async (projectId: string) => {
    setLoading(true);

    if(!projectId) {
        onError('No project to delete');
        setLoading(false);
        return { success: false, message: 'No project to delete' };
    }

    try {
        const response = await fetch(`/api/projects/${projectId}`, { method: 'DELETE' });

        if(response.ok) {
          mutate(`/api/projects?category=${category}&page=${page}`, true);
          onShowSnackbar('Project was successfully deleted', 'success');
        } else {
          throw new Error('Failed to delete project');
        }

    } catch (error: unknown) {
        onError((error as Error).message ?? 'Error occurred during Project deletion.');
    }

  setLoading(false);
};

  useEffect(() => {
    setLoading(true);

    setLocalProjects(fetchedProjects);

    setLoading(false);

  }, [fetchedProjects]);

  const closeDrawer = (isFormSubmit?: boolean) => {
    if(!isFormSubmit && abandonWarning) {
      setAbandonEditFormDialogOpen(true);
      return;
    }

    setDrawerOpen(false);
    setFocusedProject(null);
    setAction(ProjectAction.None);
  };

  const closeAbandonDialog = () => {
    setAbandonEditFormDialogOpen(false);
  }

  const handleAbandonWarningChange = (value: boolean) => {
    setAbandonWarning(value);
  }

  const onEventHandler = async (action: ProjectAction, project?: Project) => {
    setFocusedProject(project || null);
    setAction(action);

    if (action === ProjectAction.Delete) {
      setDeleteDialogOpen(true);
    } else {
      setDrawerOpen(true);
    }
  }

  function CreateProjectButton(): JSX.Element {
    return (
      <div className="w-full flex justify-start md:justify-end items-center my-6">      
        <div className='btn_color_change flex align-middle justify-end hover:cursor-pointer'
          onClick={() => onEventHandler(ProjectAction.Create)} >
          <Add 
            className="size-6 text-white font-bold" 
          />
          <Typography variant="button" className="text-white pl-2">Add Project</Typography>
        </div>
      </div>
    )
  }  

  if (error) {
    onError("Failed to load projects");
    return <div>Failed to load projects</div>;
  }

  if (!localProjects || loading) return <PortfolioSkeleton />;

  return (
    <>
      <DeleteDialog 
        open={deleteDialogOpen} 
        project={focusedProject}
        onDeleteCancel={() => setDeleteDialogOpen(false)}
        onDeleteProject={async (project?: Project) => {
          if(!project || !project.id) return;

          setDeleteDialogOpen(false);
          await handleDeleteProject(project.id);  // Delete the project
        }}
        onDeleteError={onError}
      />

      <AbandonFormDialog 
        open={abandonEditFormDialogOpen}
        onCancel={() => closeAbandonDialog()}
        onConfirm={() => {
          closeAbandonDialog();
          setAbandonWarning(false);
          closeDrawer(true);
        }}
      />

     <CreateProjectButton />

     <Box sx={{ flexGrow: 1 }}
          className={`gallery ${roboto.className} ${isActive && 'visible'}`}>
      {
        localProjects.length === 0 && !loading ? (
            <Typography className='text-center' variant="h5">Check back later to see new projects!</Typography>
      ) : (
          <Grid container spacing={2}>
              {
                localProjects.length > 0 &&
                localProjects.map((project: Project) => (
                  project && (
                    <Grid item xs={12} sm={6} md={4} key={project.id}>
                      <Tile
                        key={`project_${project.id}`}
                        project={project}
                        onAction={onEventHandler}
                      />
                    </Grid>
                  )
                ))
              }
          </Grid>
        )
      }
    </Box>

    <Drawer
        anchor="right"
        open={drawerOpen}
        elevation={16}
        onClose={() => closeDrawer(false)}
        ModalProps={{
          BackdropProps: {
            className: 'custom-backdrop',
          },
        }}
      >
        {action === ProjectAction.View && focusedProject && (
          <ViewProject project={focusedProject} />
        )}

        {action === ProjectAction.Edit && focusedProject && (
          <EditProject project={focusedProject} skillsLibrary={skillsLibrary} onSubmit={handleUpdateProject} onChangesOccurred={handleAbandonWarningChange} onError={onError} onClose={closeDrawer} />
        )}

        {action === ProjectAction.Create && (
          <CreateProject category={category as PortfolioCategoryKeys} skillsLibrary={skillsLibrary} onChangesOccurred={handleAbandonWarningChange} onSubmit={handleCreateProject} onError={onError} onClose={closeDrawer}  />
        )}
    </Drawer>
    </>
  );
}
