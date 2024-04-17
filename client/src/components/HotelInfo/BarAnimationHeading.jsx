import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function BarAnimationHeading() {
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
        Customer Satisfaction Percentage
      </Typography>
      <Typography
        textAlign="center"
        color="text.secondary"
        sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
      >
        This graph displays customer satisfaction percentages for different
        attributes. It highlights the consistency of satisfaction levels based
        on coefficient variations. Higher percentages signify more stable
        satisfaction, while lower ones indicate variability. It offers insights
        into satisfaction trends, helping identify areas for improvement.
      </Typography>
    </Box>
  );
}
