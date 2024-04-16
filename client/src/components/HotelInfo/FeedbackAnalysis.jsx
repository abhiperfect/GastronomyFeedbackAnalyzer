import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import AttributesCountBarAnimation from './AttributesCountBarAnimation';

export default function FeedbackAnalysis() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="false" style={{}}>
        <Box sx={{ bgcolor: '', height: '100vh',  }} >
          <AttributesCountBarAnimation/>
        </Box>
      </Container>
    </React.Fragment>
  );
}