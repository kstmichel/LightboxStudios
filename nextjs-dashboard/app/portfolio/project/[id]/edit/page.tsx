import React from 'react';
import Form from '@/app/ui/portfolio/project/edit-form';
import { fetchProjectById, fetchSkills } from '@/app/lib/data';
import { Project } from '@/app/lib/definitions';
import { redirect } from 'next/navigation';

  export default async function Page({ params }: { params: { id: string } }) {
    console.log('hit dynamic edit page', params.id);
    const project: Project = await fetchProjectById(params.id);

    if(!project.id) redirect('/dashboard/portfolio');
    
    const skills = await fetchSkills();

    return (
        <div>
            <h1>Edit Project Page</h1>
            <Form project={project} skills={skills} />
        </div>
    );
}