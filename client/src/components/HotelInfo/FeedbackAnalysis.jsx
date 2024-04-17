import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AttributesCountBarAnimation from "./AttributesCountBarAnimation";
import AttributesBarHeading from "./AttributesBarHeading";
import { Divider } from "@mui/material";
import BarAnimationTwo from "./BarAnimationTwo";
import SentimentPiChartAnimation from "./SentimentPiCharAnimation";

export default function FeedbackAnalysis() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="false" style={{}}>
        <Box sx={{ bgcolor: "", height:'',}}>
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "20px" }}
          >
            <AttributesBarHeading />
          </Box>
          <AttributesCountBarAnimation />
          <Divider />
          <BarAnimationTwo/>
          <Divider />
        <SentimentPiChartAnimation/>
        </Box>
      </Container>
    </React.Fragment>
  );
}
