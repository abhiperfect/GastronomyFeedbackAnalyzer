import * as React from "react";
import UserHeader from "../components/common/UserHeader";
import HostelInfo from "../components/HotelInfo/HotelInfo";
import TitlebarImageList from "../components/HotelInfo/ImageList";
import HotelDetail from "../components/HotelInfo/HotelDetail";
import Footer from "../components/common/Footer";
import Feedback from "../components/HotelInfo/Feedback";
import Divider from "@mui/material/Divider";
import FeedbackAnalysis from "../components/HotelInfo/FeedbackAnalysis";
export default function FeedbackPage() {
  return (
    <HostelInfo>
      <UserHeader />
      <TitlebarImageList />
      <HotelDetail />
      <Divider />
      <FeedbackAnalysis />
      <Divider />
      <Feedback />
      <Divider />
      <Footer />
    </HostelInfo>
  );
}
