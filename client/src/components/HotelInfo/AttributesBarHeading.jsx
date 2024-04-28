import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function AttributesBarHeading() {
  return (
    <Box maxWidth="800px" >
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
        Explore Customer Satisfaction Across Key Attributes
      </Typography>
      <Typography
        textAlign="center"
        color="text.secondary"
        sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
      >
        Discover customer ratings across key attributes like food quality,
        cleanliness, menu variety, staff friendliness, length of stay, and
        overall satisfaction. Gain insights into customer perceptions and
        identify areas for improvement.
      </Typography>
    </Box>
  );
}
