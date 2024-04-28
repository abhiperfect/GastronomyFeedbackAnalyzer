import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Heading from "../common/Heading";
import RatingPaper from "./RatingPaper";
import Gmap from "./Gmap";
export default function HotelDetail() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth="false"
        style={{
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingBottom: "50px",
        }}
      >
        <Box sx={{ bgcolor: "", height: "80vh" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between",
         marginTop:'20px',
         marginBottom:'20px'
        }}>
            <Heading />
            <RatingPaper />
          </Box>
        <Gmap />
        </Box>
      </Container>
    </React.Fragment>
  );
}
