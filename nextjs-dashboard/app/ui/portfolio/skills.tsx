'use client';
import React from 'react';
import { ImageList, ImageListItem } from '@mui/material';
import { Skill } from 'app/lib/definitions';
import Image from 'next/image';

export default function Skills({skills} : {skills: Skill[]}) {

    return (
        <div className='skills-component'>
            <ImageList  sx={{ width: '100%', height: 'auto' }} cols={6} rowHeight={50}>
                {skills.map((skill: Skill) => (
                    <ImageListItem key={`skill_${skill.id}`}>
                        <Image 
                            src={skill.icon_url} 
                            alt={skill.name} 
                            width={30} 
                            height={30}
                            priority
                         />
                    </ImageListItem>
                ))}
            </ImageList>
        </div>
    );
}
