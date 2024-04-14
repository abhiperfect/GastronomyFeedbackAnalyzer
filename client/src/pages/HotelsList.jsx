import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Header from "../components/common/Header";
import HotelCard from "../components/ui/HotelCard";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Footer from "../components/common/Footer.jsx";
import { Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function HotelsList() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Header />
      <Container
        maxWidth="false"
        style={{
          padding: "0",
          backgroundImage: `linear-gradient(180deg, #CEE5FD, #FFF)`, // Background image style
          mt:10,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent:'center',
            alignItems:'center' ,
            textAlign: "center",
            pt: 14, // Add padding top
            maxWidth:'100vp'
          }}
        >
          <Box maxWidth='600px'>
          <Typography variant="h3" component="h1" gutterBottom >
          Explore Guest Feedback & Reviews for Hotels - Share Your Experience!
          </Typography>
          <Typography variant="body1" gutterBottom>
            Find your perfect stay from our curated selection of top-rated
            hotels.
          </Typography>
          </Box>

        </Box>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            bgcolor: "",
            height: "100vh",
            width: "100%",
            padding: "100px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              direction: "row",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
            <HotelCard></HotelCard>
          </Box>
          <Footer />
        </Box>
      </Container>
    </React.Fragment>
  );
}
