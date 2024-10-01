import React from 'react';
import { fetchGalleryProjectsByCategory } from '../../lib/data';
import { Project } from '../../lib/definitions';
import GalleryClient from './gallery-client';

export default async function GalleryServer({query, page}: {query: string, page: number}) {
    const projectsByCategory: Project[] = await fetchGalleryProjectsByCategory(query, page);
    console.log('projectsByCategory', projectsByCategory);

    return (
        <GalleryClient projects={projectsByCategory} />
    );
};
