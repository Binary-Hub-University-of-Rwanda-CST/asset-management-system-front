// src/containers/Dashboard/RewuestBar.tsx
import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface RewuestBarProps {
  categories: string[];
  series: {
    name: string;
    data: number[];
  }[];
}

const RequestChart: React.FC<RewuestBarProps> = ({ categories, series }) => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 'auto',
    },
    plotOptions: {
      bar: {
        horizontal: true,
        columnWidth: '55%',
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 1,
      colors: ['transparent'],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: 'Values',
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val: number) {
          // Convert the number to a string for tooltip
          return val.toString();
        },
      },
    },
  };

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      height={250}
    />
  );
};

export default RequestChart;
