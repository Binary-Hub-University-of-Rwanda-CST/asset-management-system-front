// src/components/ApexDonutChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface ApexDonutChartProps {
  data: number[];
}

const AssetStatusChart: React.FC<ApexDonutChartProps> = ({ data }) => {
  const options = {
    chart: {
      type: 'donut' as const, // Specify the type as 'donut'
    },
    labels: ['Active Assets', 'Inactive Assets', 'Disposed Assets'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
  };

  return (
    <Chart
      options={options}
      series={data}
      type="donut"
      height={300}
    />
  );
};

export default AssetStatusChart;
