import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import { TextField, InputAdornment } from "@mui/material";
import axios from 'axios';
import { useAuth } from "../../context/context.js";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const buttonStyle = {
  width: "100%",
  marginTop: "1rem",
};

export default function AddHotel() {
  const {  currentId } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phoneNumber: "",
    website: "",
    image: null, 
    managerId:  currentId,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/addhotel', formData);
      if (response.status === 200) {
        console.log('Hotel added successfully');
        toast.success('Hotel added successfully');
        // Reset form fields
        setFormData({
          name: "",
          address: "",
          city: "",
          state: "",
          country: "",
          phoneNumber: "",
          website: "",
          image: null,
          managerId:  currentId,
        });
      } else {
        console.error('Error adding hotel:', response.statusText);
        toast.error('Error adding hotel');
      }
    } catch (error) {
      console.error('Error adding hotel:', error.message);
      toast.error('Error adding hotel');
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <Box style={{
    
    }}>
      <Button variant="contained" onClick={handleOpen}>
        Add Hotel
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}
        borderRadius={10}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
          user ID:{ currentId} | Add a New Hotel
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{ "& .MuiTextField-root": { m: 1, width: "100%",

               } }}
            >
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
              <TextField
                label="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
              <TextField
                label="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
              <TextField
                label="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                required
              />
              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
              />
              <TextField
                label="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
                required
              />
              <input
                type="file"
                accept="image/*"
                name="image"
                id="image" // Added id for association
                onChange={handleFileChange}
                style={{ display: "none" }}
              />
              <label htmlFor="image"> {/* Associating label with input */}
                <Button
                  variant="contained"
                  component="span"
                  fullWidth
                  style={buttonStyle}
                >
                  Upload Image
                </Button>
              </label>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                style={buttonStyle}
              >
                Submit
              </Button>
            </Box>
          </Typography>
        </Box>
      </Modal>
      <ToastContainer />
    </Box>
  );
}
