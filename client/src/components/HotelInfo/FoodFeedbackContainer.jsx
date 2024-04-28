import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import FoodQualityBarAnimation from "./FoodQualityBarAnimation";
import FoodFeedbackHeading from "./FoodFeedbackHeading";

export default function FoodFeedbackContainer() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container
      id='food'
      maxWidth="false">
        <Box 
                  sx={{
                    bgcolor: "",
                    minHeight: "80vh",
                    padding: "",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
        
        >
          <FoodFeedbackHeading/>
          <FoodQualityBarAnimation />
        </Box>
      </Container>
    </React.Fragment>
  );
}
