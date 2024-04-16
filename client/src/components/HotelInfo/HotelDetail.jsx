import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Heading from "../common/Heading";
import RatingPaper from "./RatingPaper";

export default function HotelDetail() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="false" 
      style={{paddingLeft:'10%', paddingRight:'10%', paddingBottom:'150px'}}
      >
        <Box sx={{ bgcolor: "", height: "20vh" }}>
          <Box sx={{ display:'flex', justifyContent:'space-between'}}>
            <Heading />
            <RatingPaper />
          </Box>
        </Box>
      </Container>
    </React.Fragment>
  );
}
