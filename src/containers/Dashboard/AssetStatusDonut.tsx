
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
        breakpoint: 100,
        options: {
          chart: {
            width: 320,
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
          size: '50%', // Adjust the size to control the thickness of the donut
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
    colors: ['#22a8ff', '#ffb800', '#ff9c9c'], 
  };

  return (
    <Chart
      options={options}
      series={data}
      type="donut"
      height='300px'
    />
  );
};

export default AssetStatusChart;
