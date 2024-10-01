import React from 'react';
import Box from '@mui/material/Box';
import {TabPanelProps} from 'app/lib/definitions';

export default function TabPanel(props: TabPanelProps) {
    const { children, value, index } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        className="bg-grey-600"
      
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
  }
