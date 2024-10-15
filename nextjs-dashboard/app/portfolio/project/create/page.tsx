import React from 'react';
import Form from '@/app/ui/portfolio/project/create-form';
import { fetchSkills } from '@/app/lib/data';

export default async function Page() {
    const skills = await fetchSkills();

    return (
        <div>
            <h1>Create Project Page</h1>
            <Form skills={skills} />
        </div>
    );
}