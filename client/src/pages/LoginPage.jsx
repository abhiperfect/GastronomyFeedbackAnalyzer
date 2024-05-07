import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import getLPTheme from "./getLPTheme";
import { useAuth } from "../context/context";
import { useSetMode } from "../context/context.js";
import { alpha } from "@mui/material";
import { toast } from "react-toastify";
import { useUserContext } from "../context/context";
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
export default function LoginPage() {
  const { setUserData } = useUserContext();
  const { login, setUser ,setUserRole} = useAuth();
  const { mode, setMode } = useSetMode();
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const [loading, setLoading] = React.useState(false); // State variable to track loading state
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });
  const notifyError = (message) =>
    toast.error(message, {
      position: toast.POSITION.TOP_LEFT,
    });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    if (!password) {
      // Display an error message to the user
      toast.error("Please enter your password.");
      return; // Exit the function early
    }
  
    try {
      setLoading(true); // Start loading
      const response = await axios.post("http://localhost:8000/login", {
        email,
        password,
      });
     
      if (response.status === 200) {
        const responseData = response.data;

        if (responseData.success && responseData.userData.role === "user") {
          const token = response.data.token;
          setUserRole("user");
          login(response.data.userData, token);
          navigate("/hotellist");

          toast.success(responseData.message);
        }
      else if (
          responseData.success &&
          responseData.userData.role === "manager"

        ) {
          setUserRole("manager");
          const token = response.data.token;
          login(response.data.userData, token);
          navigate("/managerhotellist");
          toast.success(responseData.message);
        } else {
          // Display error toast with the appropriate message
          const errorMessage =
            responseData.message || "User password incorrect.";
          toast.error(errorMessage);
        }
      } else {
        // Handle other status codes
        if (response.status === 401) {
          // Unauthorized error
          toast.error("Unauthorized access. Please check your credentials.");
        } else if (response.status === 404) {
          // Not found error
          toast.error("Requested resource not found.");
        } else {
          // Display a generic error message for other status codes
          toast.error("An error occurred. Please try again later.");
        }
      }
    } catch (error) {
      // Display error toast for network or server errors
      toast.error("An error occurred. Please try again later.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Header mode={mode} toggleColorMode={toggleColorMode} />

        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Box
          sx={(theme) => ({
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
          })}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{
            // backgroundImage: `linear-gradient(180deg, #CEE5FD, #FFF)`, // Background image style
            borderRadius: "10px", // Optional: Add border-radius for a rounded look
            padding: "20px",
            boxShadow: "none",
          }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: "100px",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
{loading ? "Signing In..." : "Sign In"}
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <Footer />
      <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
    </ThemeProvider>
  );
}
