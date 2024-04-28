import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import SentimentPiChartHeading from "./SentimentPieChartAnimationHeading";
import SentimentPieActiveArc from "./SentimentPieChartAnimation";
export default function SentimentPieChart() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container 
      id='sentiment'
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
          <SentimentPiChartHeading />
          <SentimentPieActiveArc />
        </Box>
      </Container>
    </React.Fragment>
  );
}
