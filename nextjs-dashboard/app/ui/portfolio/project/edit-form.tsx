"use client";
import React, { useState } from "react";
import {
  Button,
  TextField,
  Box,
  FormLabel,
  MenuItem,
  Grid,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Skill, Project, portfolioPanelData } from "@/app/lib/definitions";
import {ValidationErrors, validateFields} from '@/app/lib/validation';

interface EditFormProps{
  project: Project;
  skillsLibrary: Skill[];
  onSubmit: (projectId: string, formData: FormData) => void;
  onClose: () => void;
  onError: (message: string) => void;
}

export default function Form({
  project,
  skillsLibrary,
  onSubmit,
  onClose,
  onError,
}: EditFormProps) {

  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors]= useState<ValidationErrors>({})
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(project.skills);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData: FormData = new FormData(e.target as HTMLFormElement);

    if(!project.id || !formData) {
      onError('Project or formData is missing');
      return;
    };

    // add selected skills to formData
    formData.set("skills", selectedSkills.map((skill) => skill.id).join(','));

    setLoading(true);
    setValidationErrors({});
    const validationErrors = validateFields(Object.fromEntries(formData.entries()));
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      setLoading(false);
      return;
    }

    onSubmit(project.id, formData);
    setLoading(false);
  }

  return (
    <Box     
      component="form"
      className="rounded-md bg-gray-50 p-6 max-w-96 h-lvh"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(e);
      }}  
      >      
        <h1 className="text-2xl font-bold text-black mb-6">Edit Project</h1>
        <input type="hidden" name="id" value={project.id} />
        <div id="errors" aria-live="polite" aria-atomic="true" className="mb-4" hidden={!validationErrors}>
            {Object(validationErrors).entries > 0 && (
               <p className="mt-2 text-sm text-active-light">Please resolve the following errors.</p>
            )}
        </div>

          <Grid container spacing={3}>
            <Grid item xs={12}>
                <TextField
                  id="title"
                  name="title"
                  label="Title"
                  variant="standard"
                  defaultValue={project.title}
                  error={!!validationErrors?.title}
                  fullWidth
                  helperText={validationErrors?.title}
                />
             </Grid>

             <Grid item xs={12}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  variant="standard"
                  defaultValue={project.description}
                  error={!!validationErrors?.description}
                  helperText={validationErrors?.description}
                  fullWidth
                  multiline
                  maxRows={4}
                />
             </Grid>

             <Grid item xs={12}>
                <TextField
                  id="image_url"
                  name="image_url"
                  label="Image Pathname"
                  variant="standard"
                  defaultValue={project.image_url}
                  error={!!validationErrors?.image_url}
                  helperText={validationErrors?.image_url}
                  fullWidth
                />
             </Grid>

             <Grid item xs={12}>
                <TextField
                  type="text"
                  id="alt"
                  name="alt"
                  label="Image Description"
                  variant="standard"
                  defaultValue={project.alt}
                  error={!!validationErrors?.alt}
                  helperText={validationErrors?.alt}
                  fullWidth
                />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="type"
                name="type"
                label="Category"
                variant="standard"
                defaultValue={project.type}
                error={!!validationErrors?.type}
                helperText={validationErrors?.type}
                fullWidth
                select
              >
                 {portfolioPanelData.map((panel) => (
                    <MenuItem key={panel.id} value={panel.id}>
                      {panel.title}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
                <FormLabel htmlFor="skills">Skills</FormLabel>
                <Autocomplete
                  aria-label="Skills"
                  disablePortal
                  className={`${validationErrors?.skills ? 'border-red-500' : ''}`}
                  multiple={true}
                  defaultValue={project.skills}
                  options={skillsLibrary}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  onChange={(e, value) => setSelectedSkills([...value])}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      id="skills"
                      name="skills"
                      variant="standard"
                      className="mb-3"
                      error={!!validationErrors?.skills}
                      helperText={validationErrors?.skills}
                    />
                  )}
                />
            </Grid>
          </Grid>

        <div id="form-actions" className="mt-6 flex justify-end gap-4">
          <Button type="button" 
            className={`bg-default hover:bg-default-dark text-white`} 
            onClick={() => onClose()}  
          >
                Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            className="bg-primary hover:bg-active"
            disabled={loading}
            >
            {loading ? <CircularProgress size={24} /> : 'Save'}
          </Button>
        </div>
    </Box>
  );
}
