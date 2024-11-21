"use client";
import React, { useEffect, useState, useCallback } from "react";
import {
  Button,
  TextField,
  Box,
  FormLabel,
  MenuItem,
  Grid,
  Typography,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { Skill, Project, portfolioPanelData, PortfolioCategoryKeys } from "@/app/lib/definitions";
import {ValidationErrors, validateClientFields} from '@/app/lib/validation';
import { useDebouncedCallback } from "use-debounce";

interface EditFormProps{
  project: Project;
  skillsLibrary: Skill[];
  onSubmit: (projectId: string, formData: FormData) => void;
  onChangesOccurred: (value: boolean) => void;
  onClose: (isFormSubmit: boolean) => void;
  onError: (message: string) => void;
}

export default function Form({
  project,
  skillsLibrary,
  onSubmit,
  onChangesOccurred,
  onClose,
  onError,
}: EditFormProps) {

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [image_url, setImage_url] = useState(project.image_url);
  const [alt, setAlt] = useState(project.alt);
  const [type, setType] = useState(project.type);
  const [skills, setSkills] = useState<Skill[]>(project.skills);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors]= useState<ValidationErrors>({})
  const [changesDetected, setChangesDetected] = useState<boolean>(false);

  const formChangesOccurred = useCallback((): boolean => {
    return (
      title !== project.title ||
      description !== project.description ||
      image_url !== project.image_url ||
      alt !== project.alt ||
      type !== project.type ||
      skills !== project.skills
    );
  }, [title, description, image_url, alt, type, skills, project]);

  useEffect(() => {
    setChangesDetected(formChangesOccurred());
    
  }, [title, description, image_url, alt, type, skills, formChangesOccurred]);

  useEffect(() => {
    onChangesOccurred(changesDetected);
  }, [changesDetected, onChangesOccurred])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData: FormData = new FormData(e.target as HTMLFormElement);

    if (!project.id || !formData) {
      onError('Project or formData is missing');
      return;
    }

    // add selected skills to formData
    formData.set("skills", skills.map((skill) => skill.id).join(','));

    setLoading(true);
    setValidationErrors({});
    const validationErrors = validateClientFields(Object.fromEntries(formData.entries()));
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      setLoading(false);
      return;
    }

    onSubmit(project.id, formData);
    setLoading(false);
  }

  return (
    <>
      <Box     
          component="form"
          className="rounded-md bg-gray-50 p-6 max-w-96 h-lvh"
          noValidate
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit(e);
          }}  
      >      
        <Typography variant="h6" className="font-bold text-black mb-6">Edit Project</Typography>
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
                  onChange={useDebouncedCallback((e) => setTitle(e.target.value), 500)}
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
                  defaultValue={description}
                  onChange={useDebouncedCallback((e) => setDescription(e.target.value), 500)}
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
                  defaultValue={image_url}
                  onChange={useDebouncedCallback((e) => setImage_url(e.target.value), 500)}
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
                  defaultValue={alt}
                  onChange={useDebouncedCallback((e) => setAlt(e.target.value), 500)}
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
                defaultValue={type}
                onChange={useDebouncedCallback((e) => setType(e.target.value as PortfolioCategoryKeys), 500)}
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
                  defaultValue={skills}
                  onChange={(e, value) => setSkills([...value])}
                  options={skillsLibrary}
                  getOptionLabel={(option) => option.name}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
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
            onClick={() => onClose(false)}  
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
   </>
  );
}
