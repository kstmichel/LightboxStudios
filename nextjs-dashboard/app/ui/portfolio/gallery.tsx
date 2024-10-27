"use cache";
import React, { useEffect, useState } from "react";
import useSWR from "swr";
import {
  ImageList,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CardActionArea,
  Typography,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
// import Skills from "./skills";
import { Project } from "app/lib/definitions";
import { roboto } from "app/ui/fonts";
import { PortfolioSkeleton } from "app/ui/skeletons";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Gallery({
  category,
  page,
  projects,
  updateProjectsByCategory,
  onError,
  onViewMore,
  onEdit,
}: {
  category: string;
  page: number;
  projects: Project[];
  updateProjectsByCategory: (category: string, projects: Project[]) => void;
  onError: (error: string) => void;
  onViewMore: (project: Project) => void;
  onEdit: (project: Project) => void;
}) {
  const [localProjects, setLocalProjects] = useState<Project[]>(projects);
  const { data: fetchedProjects, error } = useSWR(
    projects.length === 0 ? `/api/projects/${category}?page=${page}&category=${category}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 60000, // 1 minute
      initialData: projects,
    },
  );

  useEffect(() => {
    if (projects.length > 0) return;

    if (fetchedProjects) {
      setLocalProjects(fetchedProjects);
      console.log("Setting local projects", fetchedProjects);
      updateProjectsByCategory(category, projects);
    }
  }, [category, fetchedProjects, projects, updateProjectsByCategory]);


  if (error) {
    onError("Failed to load projects");
    return <div>Failed to load projects</div>;
  }

  if (!fetchedProjects && projects.length === 0) return <PortfolioSkeleton />;

  return (
    <div id={`gallery_${category}`} className={`gallery ${roboto}`}>
      <ImageList
        sx={{ width: "100%", height: "auto"}}
        cols={3}
        gap={8}
        rowHeight={250}
      >
        {localProjects.length > 0 &&
          localProjects.map((project: Project) => (
            <Card sx={{ maxWidth: 345 }} key={`card_${project.id}`}>
              <CardActionArea onClick={() => onViewMore(project)}>
                <CardMedia
                  sx={{ height: 140 }}
                  image={project.image_url}
                  title={project.alt}
                  style={{ position: "relative" }}
                >
                  {/* <Skills skills={project.skills} /> */}
                </CardMedia>

                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {project.title}
                  </Typography>
                  
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {project.description}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions className="flex space-between w-full">
                <Button size="small" onClick={() => onViewMore(project)}>Learn More</Button>
                <Button className="gallery_edit_button" onClick={() => onEdit(project)}>
                    <Edit />
                </Button>
              </CardActions>
            </Card>
          ))}
      </ImageList>
    </div>
  );
}
