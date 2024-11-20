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
  CircularProgress
} from "@mui/material";
import { Skill, portfolioPanelData, PortfolioCategoryKeys } from "@/app/lib/definitions";
import { ValidationErrors, validateFields } from '@/app/lib/validation';
import { ProjectState } from "@/app/lib/actions";
import { roboto } from "@/app/ui/fonts";

interface CreateFormProps{
  category: PortfolioCategoryKeys,
  skillsLibrary: Skill[];
  onSubmit: (formData: FormData) => void;
  onError: (message: string) => void;
  onClose: (state?: ProjectState) => void;
}

export default function CreateForm({ category, skillsLibrary, onSubmit, onError, onClose }: CreateFormProps) {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData: FormData = new FormData(e.target as HTMLFormElement)

    if(!formData){
        onError('Form data is missing');
    }

    // add selected skills to formData
    formData.set("skills", selectedSkills.map((skill) => skill.id).join(','));
    console.log('formData skills', formData.get('skills'));

    // client-side field validation
    setLoading(true);
    setValidationErrors({});
    const validationErrors = validateFields(Object.fromEntries(formData.entries()));
    if (Object.keys(validationErrors).length > 0) {
      setValidationErrors(validationErrors);
      setLoading(false);
      return;
    }

    onSubmit(formData);
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
        <h1 className={`text-2xl font-bold text-black mb-6 ${roboto.className}`}>Create Project</h1>
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
                  error={!!validationErrors?.alt}
                  helperText={validationErrors?.alt}
                  fullWidth
                />
            </Grid>

            <Grid item xs={12}>
              <TextField
                id="type"
                name="type"
                label="Type"
                variant="standard"
                defaultValue={category}
                error={!!validationErrors?.type}
                helperText={validationErrors?.type}
                fullWidth
                select
              >
                 {portfolioPanelData.map((projectType) => (
                    <MenuItem key={projectType.id} value={projectType.id}>
                      {projectType.title}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={12}>
                <FormLabel htmlFor="skills">Skills</FormLabel>
                <Autocomplete
                  aria-label="Skills"
                  disablePortal
                  multiple={true}
                  options={skillsLibrary}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  getOptionLabel={(option) => option.name}
                  onChange={(e, value) => setSelectedSkills([...value])}
                  className={`${validationErrors?.skills ? 'border-red-500' : ''}`}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="standard"
                      id="skills"
                      name="skills"
                      className="mb-3"
                      error={!!validationErrors?.skills}
                      helperText={validationErrors?.skills}
                    />
                  )}
                />
            </Grid>
          </Grid>

        <div id="form-actions" className="mt-6 flex justify-end gap-4">
          <Button type="button" className={`bg-default hover:bg-default-dark text-white`} onClick={() => onClose()}>Cancel</Button>
          <Button 
            type="submit" 
            variant="contained" 
            className="bg-primary hover:bg-active"
            disabled={loading}>
            {loading ? <CircularProgress size={24} /> : 'Create Project'}
            </Button>
        </div>
    </Box>
  );
}
