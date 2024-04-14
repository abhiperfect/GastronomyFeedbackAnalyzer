import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import FormHelperText from "@mui/material/FormHelperText";
import { Typography } from "@mui/material";

export default function Feedback({ children }) {
  const [foodQuality, setFoodQuality] = useState("");
  const [cleanliness, setCleanliness] = useState("");
  const [menuVariety, setMenuVariety] = useState("");
  const [staffFriendliness, setStaffFriendliness] = useState("");
  const [comments, setComments] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [nationality, setNationality] = useState("");
  const [lengthOfStay, setLengthOfStay] = useState("");
  const [mealPreference, setMealPreference] = useState("");
  const [mealTimes, setMealTimes] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const [overallSatisfaction, setOverallSatisfaction] = useState("");
  const [city, setCity] = useState("");
  const [timing, setTiming] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission
  };
  // Validate ratings to be between 1 and 5
  const isValidRating = (value) => {
    const rating = parseInt(value);
    return !isNaN(rating) && rating >= 1 && rating <= 5;
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container
        maxWidth='"sm"'
        style={{ paddingLeft: "10%", paddingRight: "10%", marginTop: "100px" }}
      >
        <Typography variant="h3" gutterBottom>
          We Value Your Feedback
        </Typography>
        <Box sx={{ bgcolor: "", height: "120vh" }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {/* Food Quality */}
              <Grid item xs={6}>
                <TextField
                  label="Food Quality"
                  placeholder="Rate from 1 to 5"
                  value={foodQuality}
                  onChange={(e) => setFoodQuality(e.target.value)}
                  fullWidth
                  required
                  error={foodQuality && !isValidRating(foodQuality)}
                  helperText={
                    foodQuality &&
                    !isValidRating(foodQuality) &&
                    "Please enter a rating between 1 and 5"
                  }
                  FormHelperTextProps={{
                    error: !isValidRating(foodQuality),
                  }}
                />
              </Grid>
              {/* Cleanliness */}
              <Grid item xs={6}>
                <TextField
                  label="Cleanliness"
                  placeholder="Rate from 1 to 5"
                  value={cleanliness}
                  onChange={(e) => setCleanliness(e.target.value)}
                  fullWidth
                  required
                  error={cleanliness && !isValidRating(cleanliness)}
                  helperText={
                    cleanliness &&
                    !isValidRating(cleanliness) &&
                    "Please enter a rating between 1 and 5"
                  }
                  FormHelperTextProps={{
                    error: !isValidRating(cleanliness),
                  }}
                />
              </Grid>
              {/* Menu Variety */}
              <Grid item xs={6}>
                <TextField
                  label="Menu Variety"
                  placeholder="Rate from 1 to 5"
                  value={menuVariety}
                  onChange={(e) => setMenuVariety(e.target.value)}
                  fullWidth
                  required
                  error={menuVariety && !isValidRating(menuVariety)}
                  helperText={
                    menuVariety &&
                    !isValidRating(menuVariety) &&
                    "Please enter a rating between 1 and 5"
                  }
                  FormHelperTextProps={{
                    error: !isValidRating(menuVariety),
                  }}
                />
              </Grid>
              {/* Staff Friendliness */}
              <Grid item xs={6}>
                <TextField
                  label="Staff Friendliness"
                  placeholder="Rate from 1 to 5"
                  value={staffFriendliness}
                  onChange={(e) => setStaffFriendliness(e.target.value)}
                  fullWidth
                  required
                  error={staffFriendliness && !isValidRating(staffFriendliness)}
                  helperText={
                    staffFriendliness &&
                    !isValidRating(staffFriendliness) &&
                    "Please enter a rating between 1 and 5"
                  }
                  FormHelperTextProps={{
                    error: !isValidRating(staffFriendliness),
                  }}
                />
              </Grid>
              {/* Comments */}
              <Grid item xs={12}>
                <TextField
                  label="Comments"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  fullWidth
                  multiline
                  required
                />
              </Grid>
              {/* Age */}
              <Grid item xs={6}>
                <TextField
                  label="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              {/* Gender */}
              <Grid item xs={6} fullWidth required>
                <FormControl fullWidth required>
                  <InputLabel>Gender</InputLabel>
                  <Select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Nationality */}
              <Grid item xs={6}>
                <TextField
                  label="Nationality"
                  value={nationality}
                  onChange={(e) => setNationality(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              {/* Length of Stay */}
              <Grid item xs={6}>
                <TextField
                  label="Length of Stay"
                  value={lengthOfStay}
                  onChange={(e) => setLengthOfStay(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              {/* Meal Preference */}
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel id="meal-preference-label">
                    Meal Preference
                  </InputLabel>
                  <Select
                    labelId="meal-preference-label"
                    id="meal-preference"
                    value={mealPreference}
                    onChange={(e) => setMealPreference(e.target.value)}
                  >
                    <MenuItem value="Vegetarian">Vegetarian</MenuItem>
                    <MenuItem value="Non-Vegetarian">Non-Vegetarian</MenuItem>
                    <MenuItem value="Vegan">Vegan</MenuItem>
                    {/* Add more options as needed */}
                  </Select>
                </FormControl>
              </Grid>
              {/* Meal Times */}
              <Grid item xs={6}>
                <FormControl fullWidth required>
                  <InputLabel id="meal-times-label">Meal Times</InputLabel>
                  <Select
                    labelId="meal-times-label"
                    id="meal-times"
                    value={mealTimes}
                    onChange={(e) => setMealTimes(e.target.value)}
                  >
                    <MenuItem value="Breakfast">Breakfast</MenuItem>
                    <MenuItem value="Lunch">Lunch</MenuItem>
                    <MenuItem value="Dinner">Dinner</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              {/* Suggestions */}
              <Grid item xs={12}>
                <TextField
                  label="Suggestions"
                  value={suggestions}
                  onChange={(e) => setSuggestions(e.target.value)}
                  fullWidth
                  multiline
                  required
                />
              </Grid>
              {/* Overall Satisfaction */}
              <Grid item xs={6}>
                <FormControl
                  fullWidth
                  required
                  error={
                    overallSatisfaction && !isValidRating(overallSatisfaction)
                  }
                >
                  <InputLabel id="overall-satisfaction-label">
                    Overall Satisfaction
                  </InputLabel>
                  <Select
                    labelId="overall-satisfaction-label"
                    id="overall-satisfaction"
                    value={overallSatisfaction}
                    onChange={(e) => setOverallSatisfaction(e.target.value)}
                  >
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  {!isValidRating(overallSatisfaction) && (
                    <FormHelperText>
                      Please select a rating between 1 and 5
                    </FormHelperText>
                  )}
                </FormControl>
              </Grid>
              {/* City */}
              <Grid item xs={6}>
                <TextField
                  label="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              {/* Timing */}
              <Grid item xs={12}>
                <TextField
                  label="Timing"
                  placeholder="In Days"
                  value={timing}
                  onChange={(e) => setTiming(e.target.value)}
                  fullWidth
                  required
                />
              </Grid>
              {/* Submit Button */}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  sx={{ width: "100%", height: "60px" }}
                >
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Container>
    </React.Fragment>
  );
}
