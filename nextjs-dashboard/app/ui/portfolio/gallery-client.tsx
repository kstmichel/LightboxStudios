'use client';
import {ImageList, ImageListItem} from '@mui/material';
import { Suspense } from 'react';
import Skills from './skills';
import { Project } from 'app/lib/definitions';

interface GalleryClientProps {
    projects: Project[];
}

export default function GalleryClient({projects}: GalleryClientProps) {
    console.log('gallery client!');

    const onClickHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        console.log('Image clicked');
    };

   return (
        <ImageList sx={{ width: '100%', height: 250 }} cols={3} rowHeight={250}>
            {projects.map((project: Project) => (
                <div key={`project_wrapper${project.id}`}>
                    <ImageListItem key={`image_p${project.id}`}>
                        <img
                            srcSet={`${project.image_url}`}
                            src={`${project.image_url}`}
                            alt={project.alt}
                            loading="lazy"
                            style={{overflow: 'hidden'}}
                            onClick={onClickHandler}
                        />
                        <h5>{project.title}</h5>
                    </ImageListItem>
                    {/* <Suspense key={`skills_p${project.id}`} fallback={<div>Skills Loading...</div>}>
                        <Skills projectID={project.id} />
                    </Suspense> */}
                </div>
              ))}
        </ImageList>
   ); 
}