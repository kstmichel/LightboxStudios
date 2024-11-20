import React from 'react';
import { 
    Typography, 
    Button,  
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
 } from '@mui/material';
import { Project } from 'app/lib/definitions';

interface DeleteDialogProps {
    open: boolean;
    project: Project | null;
    onDeleteCancel: () => void;
    onDeleteProject: (project?: Project) => Promise<void>;
    onDeleteError: (message: string) => void;
}

const DeleteDialog = ({ open, project, onDeleteCancel, onDeleteProject }: DeleteDialogProps) => {
    if(!project) return null;
    
    return (
        <Dialog
            open={open}
            onClose={onDeleteCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
        <DialogTitle id="alert-dialog-title" className="bg-gray-100 text-gray-500">
          {"Hold on..."}
        </DialogTitle>

        <DialogContent>
            <Typography variant="h5" className='text-gray-900 mt-3'>Are you sure you want to delete this project? </Typography>
            <Typography variant="body1" className="text-gray-700 mt-4">{`This project looks pretty cool, would be a shame to delete it forever.`}<br />{`Just to be clear, this action cannot be undone.`}</Typography>
        </DialogContent>

        <DialogActions className="p-4">
          <Button variant="outlined" className="text-gray-800 outline-gray-600 hover:outline-gray-600 hover:text-gray-900" onClick={onDeleteCancel}>Nevermind</Button>
          <Button variant="contained" type="button" className="bg-active text-white hover:bg-active-dark" onClick={() => onDeleteProject(project || undefined)}>
            { 'Delete' }
          </Button>
        </DialogActions>
      </Dialog>
    )
};

export default DeleteDialog;