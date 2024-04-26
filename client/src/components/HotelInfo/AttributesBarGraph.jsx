import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { axisClasses } from '@mui/x-charts/ChartsAxis';
import { useDataAnalysisContext } from '../../context/context';

const valueFormatter = (value) => `${value.toFixed(2)}%`;

const chartSetting = {
  yAxis: [
    {
      label: 'Customer Percentage (%)',
    },
  ],
  series: [
    { dataKey: 'coefficientOfVariation', label: 'Customer Satisfaction Percentage', valueFormatter, color: '#B20DCF' }
  ],
  height: 500,
  sx: {
    [`& .${axisClasses.directionY} .${axisClasses.label}`]: {
      transform: 'translateX(-10px)',
    },
  },
};
export default function AttributesBarGraph() {
  const { dataAnalysis } = useDataAnalysisContext();
  const data = dataAnalysis || [];

  return (
    <div style={{ width: '60%' }}>
      <BarChart
        dataset={data}
        xAxis={[{ scaleType: 'band', dataKey: 'label' }]}
        {...chartSetting}
      />
    </div>
  );
}
