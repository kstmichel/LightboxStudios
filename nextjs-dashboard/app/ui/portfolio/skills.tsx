import React from 'react';
import {fetchSkillsByProject} from '../../lib/data';
import { Skill } from '../../lib/definitions';


export default async function Skills({projectID} : {projectID: string}) {
    const skillsByProject: Skill[] = await fetchSkillsByProject(projectID);

    return (
        <div className='skills-component' key={projectID}>
            <h1>Skills Server Component</h1>
            <ul>
                {skillsByProject.map((skill: Skill) => (
                    <li key={skill.id}>{skill.name}</li>
                ))}
            </ul>
        </div>
    );
}
