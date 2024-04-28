import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../components/common/Header";
import HotelCard from "../components/ui/HotelCard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Footer from "../components/common/Footer.jsx";
import { Typography } from "@mui/material";
import ListHero from "../components/Hostel/ListHero.jsx";
import UserHeader from "../components/common/UserHeader.jsx";
import { useAuth } from "../context/context.js";
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import getLPTheme from './getLPTheme';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { useSetMode } from '../context/context.js';

function ToggleCustomTheme({ showCustomTheme, toggleCustomTheme }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100dvw',
        position: 'fixed',
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
          backgroundColor: 'background.default',
          '& .Mui-selected': {
            pointerEvents: 'none',
          },
        }}
      >
        <ToggleButton value>
          <AutoAwesomeRoundedIcon sx={{ fontSize: '20px', mr: 1 }} />
          Custom theme 1
        </ToggleButton>
        <ToggleButton value={false}>Custom theme 2</ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

// ToggleCustomTheme.propTypes = {
//   showCustomTheme: PropTypes.shape({
//     valueOf: PropTypes.func.isRequired,
//   }).isRequired,
//   toggleCustomTheme: PropTypes.func.isRequired,
// };
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));


export default function HotelsList() {
  const { mode, setMode } = useSetMode();
  const {isAuthenticated} = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(true);
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    // setMode('dark');
    setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };


  React.useEffect(() => {
    setIsLoading(true);
    // Simulate async authentication check
    const checkAuthentication = async () => {
      const storedToken = localStorage.getItem("token");
      // Your authentication check logic here...
      // For demonstration purposes, we're using a setTimeout to simulate an asynchronous operation
      setTimeout(() => {
        setIsLoading(false);
        if (!storedToken) {
          navigate('/login');
        }
      }, 2000); // Simulating a 2-second delay
    };

    checkAuthentication();
  }, [isAuthenticated, navigate]);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
    <React.Fragment>
      <CssBaseline />
      <UserHeader 
      mode={mode} toggleColorMode={toggleColorMode}
      />
      <Container
        maxWidth="false"
        style={{
          padding: "0",
          // backgroundImage: `linear-gradient(180deg, #CEE5FD, #FFF)`, // Background image style
          mt: 10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
            pt: 14, // Add padding top
            maxWidth: "100vp",
          }}
        >
          <ListHero />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            bgcolor: "",
            height: "100vh",
            width: "100%",
            padding: "100px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              direction: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
          </Box>
          <Footer />
        </Box>
        <ToggleCustomTheme
        showCustomTheme={showCustomTheme}
        toggleCustomTheme={toggleCustomTheme}
      />
      </Container>
    </React.Fragment>
    </ThemeProvider>
  );
}
