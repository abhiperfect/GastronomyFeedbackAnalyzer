import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import Snackbar from "@mui/material/Snackbar";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getLPTheme from "./getLPTheme";
import PropTypes from "prop-types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import { useAuth } from "../context/context";
import { useSetMode } from '../context/context.js';
import { alpha } from "@mui/material";
const defaultTheme = createTheme();
function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100dvw",
        position: "fixed",
        bottom: 24,
      }}
    >
      <ToggleButtonGroup
        color="primary"
        exclusive
        value={showCustomTheme}
        onChange={toggleCustomTheme}
        aria-label="Platform"
        sx={{
          backgroundColor: "background.default",
          "& .Mui-selected": {
            pointerEvents: "none",
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: "20px", mr: 1 }} />
          Custom theme 1
        </ToggleButton>
        <ToggleButton value={false}>Custom theme 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

ToggleCustomTheme.propTypes = {
  showCustomTheme: PropTypes.shape({
    valueOf: PropTypes.func.isRequired,
  }).isRequired,
  toggleCustomTheme: PropTypes.func.isRequired,
};
export default function SignUpPage() {
  const { login} = useAuth();
  const { mode, setMode } = useSetMode();
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [userId, setUserId] = useState(null);
  const handleClick = () => {
    setOpen(true);
  };
  const notify = () => toast.info("OTP Sent Successfully");
  const notifyCom = (message) => toast.success(message);
  const notifyError = (message) =>
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
    });
    
    function notifyInfo(message) {
      toast.info(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Automatically close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
    
    // Function to display a success toast notification
    function notifySuccess(message) {
      toast.success(message, {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Automatically close after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    phonenumber: "",
    otp: "",
    allowExtraEmails: false,
    showOTPField: false, // Flag to show OTP field
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.phonenumber
    ) {
      // Display error toast notification if any field is blank
      notifyError("All fields are required");
      return; // Exit the function early if any field is blank
    }
    try {
      const response = await axios.post("http://localhost:8000/signup", {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        phonenumber: formData.phonenumber,
        allowExtraEmails: formData.allowExtraEmails,
      });
      setUserId(response.data.userId);
      console.log(response.data); // Assuming the server responds with some data
      if (!response.data.success) {
        handleClick();
      } else {
        notify();
      }
      // If OTP verification is required, show OTP field
      if (response.data.otpRequired) {
        setFormData({ ...formData, showOTPField: true });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const handleOTPSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/verify-otp", {
        userId: userId,
        otp: formData.otp,
      });
  
  
      // Display a toast notification
      if (!response.data.success) {
        // If OTP verification failed
        notifyError(response.data.message);
      } else if (response.data.exists) {
        // If user already exists
        notifyInfo("User already exists");
      } else {
        
        // Save the token securely
      const token = response.data.token;
      login(response.data.userData, token);
        // If OTP is verified successfully, proceed to the next page
        
        notifySuccess(response.data.message);
        navigate("/hotellist", {
          state: {
            // phoneNumber,
          },
        });
      }
    } catch (error) {

      // Handle error, show toast notification if needed
      notifyError("Failed to verify OTP");
    }
  };

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <Header mode={mode} toggleColorMode={toggleColorMode} />
      <Box
        sx={(theme)=>({
              backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        })}
      >
        <Container component="main" maxWidth="xs" sx={{ mt:0,
        paddingTop:'120px'
        
        }}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 3 }}
            >
              <Snackbar
                open={open}
                autoHideDuration={5000}
                onClose={handleClose}
                message="User Already Exist"
              />
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    autoFocus
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="family-name"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="phonenumber"
                    label="Phone Number"
                    name="phonenumber"
                    autoComplete="phonenumber"
                    value={formData.phonenumber}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </Grid>
                {formData.showOTPField ? (
                  <Grid item xs={12}>
                    <TextField
                      required
                      fullWidth
                      id="otp"
                      label="OTP"
                      name="otp"
                      autoComplete="otp"
                      value={formData.otp}
                      onChange={handleChange}
                    />
                  </Grid>
                ) : (
                  <Grid item xs={12}>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign Up
                    </Button>
                  </Grid>
                )}
                <Grid item xs={12}>
                  <FormControlLabel
                    control={
                      <Checkbox name="allowExtraEmails" color="primary" />
                    }
                    label="I want to receive inspiration, marketing promotions and updates via email."
                    checked={formData.allowExtraEmails}
                    onChange={handleChange}
                  />
                </Grid>
              </Grid>
              {/* Render OTP verification button if OTP field is shown */}
              {formData.showOTPField && (
                <Button
                  onClick={handleOTPSubmit}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Verify OTP
                </Button>
              )}
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Link href="#" variant="body2">
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Box sx={{ mt: 5 }}></Box>
        </Container>
        <Footer />
        {/* <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      /> */}
      </Box>
    </ThemeProvider>
  );
}
