import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

export default function HostelInfo({children}) {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='false' 
      style={{padding:'0',
      // backgroundImage: `linear-gradient(180deg, #CEE5FD, #FFF)`,
      // paddingTop:'100px'
    }}
    >
        <Box sx={{ bgcolor: 'inherit', height: '100vh' }} >
          {children}
      </Box>
      </Container>
    </React.Fragment>
  );
}
