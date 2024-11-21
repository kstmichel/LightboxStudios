"use client";
import React, { useEffect, useState } from "react";
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
import { Skill, Project, portfolioPanelData, PortfolioCategoryKeys } from "@/app/lib/definitions";
import {ValidationErrors, validateClientFields} from '@/app/lib/validation';

interface EditFormProps{
  project: Project;
  skillsLibrary: Skill[];
  onSubmit: (projectId: string, formData: FormData) => void;
  onChangesOccurred: (value: boolean) => void;
  onAbandon: () => void;
  onClose: () => void;
  onError: (message: string) => void;
}

export default function Form({
  project,
  skillsLibrary,
  onSubmit,
  onChangesOccurred,
  onAbandon,
  onClose,
  onError,
}: EditFormProps) {

  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description);
  const [imageUrl, setImageUrl] = useState(project.image_url);
  const [alt, setAlt] = useState(project.alt);
  const [type, setType] = useState(project.type);
  const [selectedSkills, setSelectedSkills] = useState<Skill[]>(project.skills);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors]= useState<ValidationErrors>({})
  const [formChanged, setFormChanged] = useState(false);

  useEffect(() => {
    if(!formChanged) {
      
    }
    
    onChangesOccurred(formChangesOccurred());
  }, [title, description, imageUrl, alt, type, selectedSkills]);

  const formChangesOccurred = (): boolean => {
    return (
      title !== project.title ||
      description !== project.description ||
      imageUrl !== project.image_url ||
      alt !== project.alt ||
      type !== project.type ||
      selectedSkills !== project.skills
    );
  }

  const handleCloseDrawer = () => {
    if(formChangesOccurred()){
      onAbandon();
      return;
    }

    onClose();
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    const formData: FormData = new FormData(e.target as HTMLFormElement);

    if (!project.id || !formData) {
      onError('Project or formData is missing');
      return;
    }

    // add selected skills to formData
    formData.set("skills", selectedSkills.map((skill) => skill.id).join(','));

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
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
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
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
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
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
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
                  value={alt}
                  onChange={(e) => setAlt(e.target.value)}
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
                value={type}
                onChange={(e) => setType(e.target.value as PortfolioCategoryKeys)}
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
                  value={selectedSkills}
                  onChange={(e, value) => setSelectedSkills([...value])}
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
            onClick={handleCloseDrawer}  
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
