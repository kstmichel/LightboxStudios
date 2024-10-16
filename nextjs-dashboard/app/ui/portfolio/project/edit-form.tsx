"use client";

import React, { useActionState } from "react";
import {
  Button,
  SelectChangeEvent,
  TextField,
  TextareaAutosize,
  Box,
  FormControl,
  FormLabel,
  InputLabel,
  Select,
  MenuItem,
  Autocomplete,
  Link,
} from "@mui/material";
import { Skill, Project, portfolioPanels } from "@/app/lib/definitions";
import { editProject, ProjectState } from "@/app/lib/actions";

export default function Form({
  project,
  skills,
}: {
  project: Project;
  skills: Skill[];
}) {
  const initialState: ProjectState = { message: "", errors: {} };
  const [state, formAction] = useActionState(editProject, initialState);
  const [type, setType] = React.useState<string>(project.type);
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>(
    project.skills || [],
  );

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value as string);
  };

  const handleSkillsSelect = (
    event: React.SyntheticEvent<Element, Event>,
    value: Skill[],
  ) => {
    // Update the state or perform other actions with the selected skills
    setSelectedSkills(value);
  };

  return (
    <div className="container w-full p-12">
      <Box className="rounded-md bg-gray-50 p-4 md:p-6 max-w-3xl">
        <form action={formAction}>
          <h1 className="text-2xl font-bold text-black mb-6">Edit Project</h1>
          <input type="hidden" name="id" value={project.id} />
          <div className="mb-4 grid">
            <FormControl fullWidth className="mb-6">
              <FormLabel htmlFor="title">Title</FormLabel>
              <TextField
                type="text"
                defaultValue={project.title}
                id="title"
                name="title"
                required
              />

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
              <FormLabel htmlFor="description">Description</FormLabel>
              <TextareaAutosize
                className="'w-80 text-sm font-normal leading-5 px-3 py-2 rounded-lg shadow-md shadow-slate-100 focus:shadow-outline-purple dark:focus:shadow-outline-purple focus:shadow-lg border border-solid border-slate-300 hover:border-purple-500 dark:hover:border-purple-500 focus:border-purple-500 dark:focus:border-purple-500 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-300 focus-visible:outline-0 box-border"
                id="description"
                defaultValue={project.description}
                name="description"
                maxRows={677}
                required
              />

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
              <TextField
                type="text"
                id="image_url"
                name="image_url"
                defaultValue={project.image_url}
                required
              />
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
              <FormLabel htmlFor="alt">Image Alt Text</FormLabel>
              <TextField
                type="text"
                id="alt"
                name="alt"
                defaultValue={project.alt}
                required
              />
            </FormControl>

            <FormControl fullWidth className="mb-6">
              <InputLabel htmlFor="type" id="type">
                Type
              </InputLabel>
              <Select
                labelId="type"
                id="type"
                name="type"
                value={type}
                label={type}
                onChange={handleTypeChange}
                required
              >
                {portfolioPanels.map((projectType) => (
                  <MenuItem key={projectType.id} value={projectType.id}>
                    {projectType.title}
                  </MenuItem>
                ))}
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
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        id="skillsField"
                        name="skillsField"
                        className="mb-3"
                      />
                    )}
                  />
                  <input
                    type="hidden"
                    name="skills"
                    value={selectedSkills.map((skill) => skill.id)}
                  />
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
            <Button type="submit">Update Project</Button>
          </div>
        </form>
      </Box>
    </div>
  );
}
