import * as React from "react";
import UserHeader from "../components/common/UserHeader";
import HostelInfo from "../components/HotelInfo/HotelInfo";
import TitlebarImageList from "../components/HotelInfo/ImageList";
import HotelDetail from "../components/HotelInfo/HotelDetail";
import Footer from "../components/common/Footer";
import Feedback from "../components/HotelInfo/Feedback";
import Divider from "@mui/material/Divider";
import FeedbackAnalysis from "../components/HotelInfo/FeedbackAnalysis";
import getLPTheme from "./getLPTheme";
import PropTypes from "prop-types";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/common/Header";
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
          Custom theme
        </ToggleButton>
        <ToggleButton value={false}>Material Design 2</ToggleButton>
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
export default function FeedbackPage() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };
  return (
    <HostelInfo>
          <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
      {/* <Header mode={mode} toggleColorMode={toggleColorMode} /> */}
      <UserHeader mode={mode} toggleColorMode={toggleColorMode}/>
      <TitlebarImageList />
      <HotelDetail />
      <Divider />
      <FeedbackAnalysis />
      <Divider />
      <Feedback />
      <Divider />
      <Footer />
      </ThemeProvider>
    </HostelInfo>
  );
}
