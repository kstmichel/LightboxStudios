'use client';

import React, {useActionState} from 'react';
import {Button, SelectChangeEvent, TextField, TextareaAutosize, Box, FormControl, FormLabel, InputLabel, Select, MenuItem, Autocomplete, Link} from '@mui/material'
  // AutocompleteChangeReason, AutocompleteChangeDetails, 
// import { styled } from '@mui/material/styles';
// import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Skill } from '@/app/lib/definitions';
import { createProject, ProjectState } from '@/app/lib/actions';

const projectTypes = [
  {id: 'web_development', name: 'Web Development'},
  {id: 'game', name: 'Game'},
  {id: 'ui_design', name: 'UI Design'}
];

// const VisuallyHiddenInput = styled('input')({
//   clip: 'rect(0 0 0 0)',
//   clipPath: 'inset(50%)',
//   height: 1,
//   overflow: 'hidden',
//   position: 'absolute',
//   bottom: 0,
//   left: 0,
//   whiteSpace: 'nowrap',
//   width: 1,
// });

export default function Form({ skills }: { skills: Skill[] }) {
  const initialState: ProjectState = {message: '', errors: {}};
  const [state, formAction] = useActionState(createProject, initialState);
  const [type, setType] = React.useState('');
  // const [image, setImage] = React.useState('');
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>([]);

  
  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value as string);
  };
  
  const handleSkillsSelect = (event: React.SyntheticEvent<Element, Event>, value: Skill[]) => {
    // value will be an array of selected skill objects
    const selectedSkillIds = value.map(skill => skill.id);
    const selectedSkillNames = value.map(skill => skill.name);
  
    console.log('Selected Skill IDs:', selectedSkillIds);
    console.log('Selected Skill Names:', selectedSkillNames);
  
    // Update the state or perform other actions with the selected skills
    setSelectedSkills(value);
  };

  // const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setImage(event.target.value);
  // }

  return (
    <div className="w-full p-12">
      <Box className="rounded-md bg-gray-50 p-4 md:p-6 max-w-3xl" >

      <form action={formAction}>
        <h1 className="text-2xl font-bold text-black mb-6">Create Project</h1>
        <div className="mb-4 grid">
          <FormControl fullWidth className="mb-6">
            <FormLabel htmlFor="title" >Title</FormLabel>
            <TextField type="text" id="title" name="title" required />
            
            <div id="form-error" aria-live="polite" aria-atomic="true">
              {state.errors?.title &&
                state.errors.title.map((error: string) => (
                  <p className="mt-2 text-sm text-red-500" key={error}>
                    {error}
                  </p>
                ))}
          </div>
          </FormControl>

          <FormControl fullWidth className="mb-6">
            <FormLabel htmlFor="description" >Description</FormLabel>
            <TextareaAutosize  
                className="'w-80 text-sm font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
                id="description" name="description" maxRows={677} required/>

            <div id="form-error" aria-live="polite" aria-atomic="true">
                {state.errors?.description &&
                  state.errors.description.map((error: string) => (
                    <p className="mt-2 text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  ))}
            </div>
         </FormControl>

          <FormControl fullWidth className="mb-6">
            <FormLabel htmlFor="image_url">Image URL</FormLabel>
            <TextField type="text" id="image_url" name="image_url" required />
{/* 
            <Typography className="text-black" hidden={!image}>{image}</Typography>
            <Button
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                className={'max-w-xs w-full'}
              >
                Upload Thumbnail
                <VisuallyHiddenInput
                  type="file"
                  name="project-image"
                  onChange={handleImageChange}
                />
              </Button> */}
          </FormControl>

          <FormControl fullWidth className="mb-6">
            <FormLabel htmlFor="alt" >Image Alt Text</FormLabel>
            <TextField type="text" id="alt" name="alt" required/>
          </FormControl>
          
          <FormControl fullWidth className="mb-6">
              <InputLabel htmlFor="type" id="type">Type</InputLabel>
              <Select
                labelId="type"
                id="type"
                name="type"
                defaultValue={projectTypes[0].id}
                value={type}
                label={type}
                onChange={handleTypeChange}
                required
              >
                {
                  projectTypes.map((projectType) => (
                    <MenuItem key={projectType.id} value={projectType.id}>{projectType.name}</MenuItem>
                  ))
                }
              </Select>
          </FormControl>
      
          <FormControl fullWidth className="mb-6">
            <div className="flex flex-wrap flex-col w-full">
              <div id="search-skill">
                <FormLabel htmlFor="skills">Skills</FormLabel>
                <Autocomplete 
                    disablePortal 
                    options={skills} 
                    multiple={true}
                    value={selectedSkills}
                    onChange={handleSkillsSelect}
                    getOptionLabel={(option) => option.name}
                    renderInput={(params) => <TextField {...params} id="skills" name="skills" value={selectedSkills} className="mb-3" />} />
                    <input type="hidden" name="skills" value={JSON.stringify(selectedSkills.map(skill => skill.id))} />
              </div>
              {/* <div id="add-skill">
                  <TextField id="adkd-skill" name="add-skill" placeholder='Add Skill' />
                </div> */}
            </div>
          </FormControl>
        </div>

        <div id="form-actions" className="mt-6 flex justify-end gap-4">
            <Link
              href="/dashboard/portfolio"
              className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
            >
              Cancel
            </Link>
            <Button type="submit">Create Project</Button>
        </div>
    </form>
    </Box>
    </div>
  );
}
