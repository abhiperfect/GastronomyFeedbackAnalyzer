import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import CoefficientGrid from "./AttributesBarGraph";
import Grid from "@mui/material/Grid";
import BarAnimationHeading from "./BarAnimationHeading";
export default function BarAnimation() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
      id='customers' 
      maxWidth="lg">
        <Box
          sx={{
               
            bgcolor: "",
            minHeight: "100vh",
            padding: "",
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
          }}
        >
          <BarAnimationHeading />
          <CoefficientGrid />
        </Box>
      </Container>
    </React.Fragment>
  );
}
