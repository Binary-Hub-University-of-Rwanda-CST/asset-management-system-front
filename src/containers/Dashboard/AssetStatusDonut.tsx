// src/components/ApexDonutChart.tsx
import React from 'react';
import Chart from 'react-apexcharts';

interface ApexDonutChartProps {
  data: number[];
}

const AssetStatusChart: React.FC<ApexDonutChartProps> = ({ data }) => {
  const options = {
    chart: {
      type: 'donut' as const,
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
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
              formatter: function (w: any) {
                return data.reduce((a, b) => a + b, 0).toFixed(0);
              },
              label: 'Total',
            },
          },
          size: '60%', // Adjust the size to control the thickness of the donut
          background: 'transparent', // Set the color of the inner circle (hole)
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value: any, { series, w }: { series: any, w: any }) {
          return `${value} Assets`;
        },
      },
    },
    colors: ['#22a8ff', '#ffb800', '#ff9c9c'], // Change the colors array to include the desired color for "Disposed Assets"
  };

  return (
    <Chart
      options={options}
      series={data}
      type="donut"
      height={400}
    />
  );
};

export default AssetStatusChart;
