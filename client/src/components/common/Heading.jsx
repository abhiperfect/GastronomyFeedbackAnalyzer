import * as React from "react";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import {Link} from "@mui/material";
export default function Heading() {
  const location = useLocation();
  const {
    state: {
      index,
      name,
      address,
      city,
      State, // Renamed to avoid conflict with reserved word 'state'
      country,
      phoneNumber,
      website,
      image,
    },
  } = location;

  console.log(index,
    name,
    address,
    city,
    State, // Renamed to avoid conflict with reserved word 'state'
    country,
    phoneNumber,
    website,
    image,);
  return (
    <Box maxWidth="800px">
      <Typography
        variant="h1"
        sx={{
          // display: 'flex',
          flexDirection: { xs: "column", md: "row" },
          alignSelf: "center",
          textAlign: "start",
          fontSize: "clamp(3.5rem, 10vw, 4rem)",
        }}
      >
        {name}
      </Typography>
      <Typography
        textAlign="start"
        color="text.secondary"
        sx={{ alignSelf: "center", width: { sm: "100%", md: "100%" } }}
      >
        {address},{city},{State},{country}
      </Typography>
     <Link>
     {website}
     </Link>
     <Typography>
      {phoneNumber}
     </Typography>
    </Box>
  );
}
