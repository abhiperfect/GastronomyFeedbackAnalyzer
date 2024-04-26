import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useFoodFeedbackQualityContext } from '../../context/context';

const valueFormatter = (value) => `${value}%`;

const chartSetting = {
  yAxis: [
    {
      label: 'Food Quality Analysis (%)',
    },
  ],
  series: [{ dataKey: 'coefficientOfVariance', label: 'Food Quality Analysis', valueFormatter }],
  height: 500,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};

export default function FoodQualityBarAnimation() {
  const { foodFeedback } = useFoodFeedbackQualityContext();
  const data = foodFeedback.map(({ label, coefficientOfVariance }) => ({
    label,
    coefficientOfVariance: parseFloat(coefficientOfVariance.toFixed(2)), // Round to 2 decimal places
  }));

  return (
    <div style={{ width: '80%' }}>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
        {...chartSetting}
      />
    </div>
  );
}
