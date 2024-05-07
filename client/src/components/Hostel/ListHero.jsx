import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";

export default function ListHero(){
  return(
    <Box maxWidth="600px">
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
      Explore Guest Feedback & Reviews for Hotels - Share&nbsp;
      <Typography
        component=""
        variant="h1"
        sx={{
          fontSize: "clamp(3rem, 10vw, 4rem)",
          color: (theme) =>
            theme.palette.mode === "light"
              ? "primary.main"
              : "primary.light",
        }}
      >
        Your Experience!
      </Typography>
    </Typography>
    <Typography
      textAlign="center"
      color="text.secondary"
      sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
    >
      {/* Find your perfect stay from our curated selection of top-rated
      hotels. */}
    </Typography>
    
  </Box>
  );
}