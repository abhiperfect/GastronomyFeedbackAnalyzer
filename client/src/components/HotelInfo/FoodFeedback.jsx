import React, { useState } from 'react';
import { Box, Button, Typography, Modal, TextField, Grid } from '@mui/material';
import axios from 'axios';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FoodFeedback() {
  const [open, setOpen] = React.useState(false);
  const [feedback, setFeedback] = useState({
    taste: '',
    texture: '',
    presentation: '',
    freshness: '',
    aroma: '',
    portionSize: '',
    valueForMoney: '',
    healthiness: '',
  });
  const [fieldErrors, setFieldErrors] = useState({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Check if the entered value is a number between 1 and 5
    if (!isNaN(value) && value >= 1 && value <= 5) {
      // Update feedback state if value is valid
      setFeedback((prevFeedback) => ({
        ...prevFeedback,
        [name]: value,
      }));
      // Clear error if present
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: '',
      }));
    } else {
      // Show error if value is not within the valid range
      setFieldErrors((prevErrors) => ({
        ...prevErrors,
        [name]: 'Value must be between 1 and 5',
      }));
    }
  };

  const handleSubmit = () => {
    // Check if any field is empty or has an error
    for (const key in feedback) {
      if (feedback[key] === '' || fieldErrors[key]) {
        alert('Please fill in all fields with valid values.');
        return;
      }
    }
    // Handle form submission here
    console.log(feedback);
    submitFormData();
    handleClose();
  };
  const submitFormData = async () => {
    try {
      console.log("AAAAAAAAA", feedback);
      const response = await axios.post('your_api_endpoint_here', feedback);
      console.log(response.data); // Handle success response
    } catch (error) {
      console.error('Error submitting form data:', error.response); // Handle error
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} style={{ width: '100%', border: '1px solid #A2A8B0' }}>
        Food Feedback
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ overflow: 'scroll', height: '-webkit-fill-available' }}>
          <Typography variant="h5" sx={{ margin: '20px', textAlign: 'center' }}>
            Food Feedback
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(feedback).map(([field, value]) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  name={field}
                  label={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={value}
                  onChange={handleChange}
                  fullWidth
                  placeholder={`Feedback for ${field}`}
                  required
                  error={!!fieldErrors[field]}
                  helperText={fieldErrors[field]}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ width: '100%', height: '50px', marginTop: '20px' }}
          >
            OK
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
