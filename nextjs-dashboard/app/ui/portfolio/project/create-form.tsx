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
} from "@mui/material";
import { Skill, portfolioPanels } from "@/app/lib/definitions";
import { createProject, ProjectState } from "@/app/lib/actions";
import { roboto } from "@/app/ui/fonts";

interface CreateFormProps{
  skills: Skill[];
  onClose: (value: boolean) => void;
}

export default function Form({ skills, onClose }: CreateFormProps) {
  const initialState: ProjectState = { message: "", errors: {} };
  const [state, formAction] = useActionState(createProject, initialState);
  const [type, setType] = React.useState("");
  const [selectedSkills, setSelectedSkills] = React.useState<Skill[]>([]);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setType(event.target.value as string);
  };

  const handleSkillsSelect = (
    event: React.SyntheticEvent<Element, Event>,
    value: Skill[],
  ) => {
    console.log('setSelectedSkills', value, selectedSkills.map(skill => skill.id).join(','));
    setSelectedSkills(value);
  };

  return (
    <Box className="rounded-md bg-gray-50 p-6 w-full md:min-w-96">
    <form action={formAction}>
      <h1 className={`text-2xl font-bold text-black mb-6 ${roboto.className}`}>Create Project</h1>
      <div className="mb-4 grid">
        <FormControl fullWidth className="mb-6">
          <FormLabel htmlFor="title">Title</FormLabel>
          <TextField type="text" id="title" name="title" autoComplete="on" required />

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
            className="'w-80 h-40 theme_field"
            id="description"
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
          <TextField type="text" id="image_url" name="image_url" autoComplete="on" required />
        </FormControl>

        <FormControl fullWidth className="mb-6">
          <FormLabel htmlFor="alt">Image Alt Text</FormLabel>
          <TextField type="text" id="alt" name="alt" autoComplete="on" required />
        </FormControl>

        <FormControl fullWidth className="mb-6">
          <InputLabel htmlFor="type" id="type">
            Type
          </InputLabel>
          <Select
            labelId="type"
            id="type"
            name="type"
            defaultValue={portfolioPanels[0].id}
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
                    id="skills"
                    name="skills"
                    value={selectedSkills}
                    className="mb-3"
                  />
                )}
              />
              <input
                type="hidden"
                name="skills"
                value={`${selectedSkills.map(skill => skill.id)}`}
              />
            </div>
            {/* <div id="add-skill">
              <TextField id="adkd-skill" name="add-skill" placeholder='Add Skill' />
            </div> */}
          </div>
        </FormControl>
      </div>

      <div id="form-actions" className="mt-6 flex justify-end gap-4">
        <Button type="button" className={`bg-default`} onClick={() => onClose(true)}>Cancel</Button>
        <Button type="submit" variant="contained" className="bg-primary">Create Project</Button>
      </div>
    </form>
  </Box>
  );
}
