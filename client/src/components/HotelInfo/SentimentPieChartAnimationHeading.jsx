import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function SentimentPiChartHeading() {
  return (
    <Box maxWidth="800px">
      <Typography
        variant="h1"
        sx={{
          // display: 'flex',
          flexDirection: { xs: "column", md: "row" },
          alignSelf: "center",
          textAlign: "center",
          fontSize: "clamp(2rem, 5vw, 1rem)",
        }}
      >
        Sentiment Distribution Analysis for Comments and Suggestions
      </Typography>
      <Typography
        textAlign="center"
        color="text.secondary"
        sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
      >
        Dive into the sentiment distribution of both comments and suggestions
        with this pie chart. Visualize the breakdown of positive, negative, and
        neutral sentiments, offering a comprehensive overview of sentiment
        trends within the dataset. Gain valuable insights into user opinions and
        feedback, enabling informed decision-making and enhancing user
        experience.
      </Typography>
    </Box>
  );
}
