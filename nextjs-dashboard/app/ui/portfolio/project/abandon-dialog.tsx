import React from 'react';
import { 
    Typography, 
    Button,  
    Dialog,
    DialogActions,
    DialogContent,
 } from '@mui/material';

interface AbandonFormDialogProps {
    open: boolean;
    onCancel: () => void;
    onConfirm: () => void;
}

const AbandonFormDialog = ({open, onCancel, onConfirm}: AbandonFormDialogProps) => {
    return (
        <Dialog
          open={open}
          onClose={onCancel}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >

        <DialogContent>
            <Typography variant="h5" className='text-gray-900 mt-3'>Do you wish to discard these changes? </Typography>
            <Typography variant="body1" className="text-gray-700 mt-4">{`It looks like you started to make some changes to this project.`}<br />{`Just to be clear, this action cannot be undone.`}</Typography>
        </DialogContent>

        <DialogActions className="p-4">
          <Button variant="outlined" className="text-gray-800 outline-gray-600 hover:outline-gray-600 hover:text-gray-900" onClick={onCancel}>Go Back</Button>
          <Button variant="contained" type="button" className="bg-active text-white hover:bg-active-dark" onClick={onConfirm}>
            { 'Confirm' }
          </Button>
        </DialogActions>
      </Dialog>
    );
}

export default AbandonFormDialog;
