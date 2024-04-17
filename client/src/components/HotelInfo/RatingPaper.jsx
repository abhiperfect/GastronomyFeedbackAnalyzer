import * as React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import DoneIcon from "@mui/icons-material/Done";
import DeleteIcon from "@mui/icons-material/Delete";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import { useTotalFeedbackContext } from "../../context/context";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 120,
  height: 100,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
}));

export default function RatingPaper() {
  const { totalFeedback } = useTotalFeedbackContext();
  return (
    <Stack direction="row" spacing={2}>
      <DemoPaper square={false}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",

          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "green",
              padding: "10px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "green",
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                sx={{ color: "white", display: "flex" }}
              >
                {totalFeedback.rating}
              </Typography>
            </Box>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "green",
            }}
          >
            <StarIcon sx={{ fontSize: 36, color: "white" }} />
          </Box>
        </Box>

        <Box sx={{ fontSize:11}}> { totalFeedback.totalFeedback} Feedback</Box>
      </DemoPaper>
    </Stack>
  );
}
