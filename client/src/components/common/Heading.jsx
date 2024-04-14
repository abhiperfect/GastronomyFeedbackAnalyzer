import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function Heading() {
  return (
    <Box maxWidth="800px">
      <Typography
        variant="h1"
        sx={{
          // display: 'flex',
          flexDirection: { xs: "column", md: "row" },
          alignSelf: "center",
          textAlign: "center",
          fontSize: "clamp(3.5rem, 10vw, 4rem)",
        }}
      >
        Hotel Pallvi Palace
      </Typography>
      <Typography
        textAlign="center"
        color="text.secondary"
        sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
      >
        8572, Arakashan Road, Paharganj ,Near Delhi Railway Station, New Delhi,
      </Typography>
    </Box>
  );
}
