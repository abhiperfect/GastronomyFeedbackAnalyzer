import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function FoodFeedbackHeading() {
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
          marginTop:'50px'
        }}
      >
        Food Quality Analysis
      </Typography>
      <Typography
        textAlign="center"
        color="text.secondary"
        sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
      >
        Explore the distribution of customer satisfaction percentages across
        different attributes of food quality, including taste, texture,
        presentation, freshness, aroma, portion size, value for money, and
        healthiness, through the bar graph visualization.
      </Typography>
    </Box>
  );
}
