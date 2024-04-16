import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { BarChart } from "@mui/x-charts/BarChart";
import { useAttributesCount } from "../../context/context";
import { useEffect } from "react";

export default function AttributesCountBarAnimation() {
  const [seriesNb, setSeriesNb] = React.useState(5);
  const [itemNb, setItemNb] = React.useState(5);
  const [skipAnimation, setSkipAnimation] = React.useState(false);
  const [replacedLabels, setReplacedLabels] = React.useState([]);
  const { attributesCount } = useAttributesCount();
  const data = attributesCount.data || [];

  const handleItemNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setItemNb(newValue);
  };
  const handleSeriesNbChange = (event, newValue) => {
    if (typeof newValue !== "number") {
      return;
    }
    setSeriesNb(newValue);
  };
  function replaceLabels(data) {
    const labelMapping = {
      food_quality: "Food Quality",
      cleanliness: "Cleanliness",
      menu_variety: "Menu Variety",
      staff_friendliness: "Staff Friendliness",
      length_of_stay: "Length of Stay",
      overall_satisfaction: "Overall Satisfaction",
    };

    return data.map((item) => ({
      label: labelMapping[item.label] || item.label,
      data: item.data,
    }));
  }

  useEffect(() => {
    setReplacedLabels(replaceLabels(data));
    console.log("sssssssssssssssssssssssssssssssssssss", replacedLabels);
  }, []);

  return (
    <Box sx={{ width: "100%" }}>
      <BarChart
        height={300}
        xAxis={[
          {
            scaleType: "band",
            data: ["⭐", "⭐⭐", "⭐⭐⭐", "⭐⭐⭐⭐", "⭐⭐⭐⭐⭐"],
          },
        ]}
        series={replacedLabels
          .slice(0, seriesNb)
          .map((s) => ({ ...s, data: s.data.slice(0, itemNb) }))}
        skipAnimation={skipAnimation}
      />
      <FormControlLabel
        checked={skipAnimation}
        control={
          <Checkbox
            onChange={(event) => setSkipAnimation(event.target.checked)}
          />
        }
        label="skipAnimation"
        labelPlacement="end"
      />
      <Typography id="input-item-number" gutterBottom>
        Number of items
      </Typography>
      <Slider
        value={itemNb}
        onChange={handleItemNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={5}
        aria-labelledby="input-item-number"
      />
      <Typography id="input-series-number" gutterBottom>
        Number of series
      </Typography>
      <Slider
        value={seriesNb}
        onChange={handleSeriesNbChange}
        valueLabelDisplay="auto"
        min={1}
        max={5}
        aria-labelledby="input-series-number"
      />
    </Box>
  );
}

const highlightScope = {
  highlighted: "series",
  faded: "global",
};
