'use client';
import React, {useEffect} from 'react';
import useSWR from 'swr';
import {ImageList, ImageListItem, Button, Card, CardActions, CardContent, CardMedia, CardActionArea, Typography} from '@mui/material';
import {Edit} from '@mui/icons-material';
import Skills from './skills';
import { Project } from 'app/lib/definitions';
import Image from 'next/image';
import {roboto} from 'app/ui/fonts';
import {PortfolioSkeleton} from 'app/ui/skeletons';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GalleryClient({ category, page, projects, updateProjectsByCategory }: { category: string, page: number, projects: Project[], updateProjectsByCategory: (category: string, projects: Project[]) => void }) {
    const { data: fetchedProjects, error } = useSWR(
        projects.length === 0 ? `/api/projects/${category}?page=${page}` : null,
        fetcher,
        {
          revalidateOnFocus: false,
          dedupingInterval: 60000, // 1 minute
          initialData: projects,
        }
      );

    useEffect(() => {
        if (projects.length > 0) return;
    
        if (fetchedProjects) {
          updateProjectsByCategory(category, fetchedProjects);
        }
      }, [fetchedProjects, category, updateProjectsByCategory]);
    
      
      if (error) return <div>Failed to load projects</div>;
      if (!fetchedProjects && projects.length === 0) return <PortfolioSkeleton />;
    
    return (
        <div id={`gallery_${category}`} className="gallery">
            <ImageList sx={{ width: '100%', height: 'auto', gap: '5px' }} cols={3} rowHeight={250}>
                {projects.length > 0 && 
                 projects.map((project: Project) => (
                    <Card sx={{ maxWidth: 345 }} key={`card_${project.id}`}>
                        <CardActionArea>
                            <CardMedia
                                sx={{ height: 140 }}
                                image={project.image_url}
                                title={project.alt}
                            />

                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div">
                                    {project.title}
                                </Typography>
                                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                    {project.description}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                        <CardActions className="flex space-between w-full">
                            <Button size="small">Learn More</Button>
                            <Button className="gallery_edit_button">
                                <a href={`/dashboard/portfolio/project/${project.id}/edit`}><Edit /></a>
                            </Button>
                        </CardActions>
                  </Card>

                    // <div key={project.id}>
                    //     <ImageListItem key={`image_${project.id}`}>
                    //         <Image 
                    //             className="gallery_image"
                    //             src={project.image_url}
                    //             alt={project.alt}
                    //             onClick={onClickHandler}
                    //             width={250}
                    //             height={250}
                    //             />
                    //         <h5 className={`gallery_title ${roboto.className}`}>{project.title}</h5>
                    //         <Button variant="outlined" className="gallery_edit_button"><a href={`/dashboard/portfolio/project/${project.id}/edit`}><Edit /></a></Button>
                    //     </ImageListItem>
                    //     <Skills skills={project.skills} />
                    // </div>
                ))}
            </ImageList>
        </div>
   ); 
}
