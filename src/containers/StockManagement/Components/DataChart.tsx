import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface Stock {
  no: string;
  stockName: string;
  stockLocation: string;
  totalAsset: number;
}

interface DataChartProps {
  activeCategoryData: Stock[];
  categoryName: string; // New prop for category name
}

const DataChart: React.FC<DataChartProps> = ({ activeCategoryData, categoryName }) => {
  // Extract stock location names
  const categories = activeCategoryData.map(stock => stock.stockLocation);

  // Extract total desktop values
  const desktopValues = activeCategoryData.map(stock => stock.totalAsset);

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 250,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        dataLabels: {
          position: 'right',
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: categories,
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: true,
      borderColor: '#f0f0f0',
      strokeDashArray: 0,
      position: 'back',
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  };

  const series = [
    {
      name: categoryName, // Use categoryName prop dynamically
      data: desktopValues,
    },
  ];

  return (
    <div className="p-4 rounded-3xl m-2 shadow-xl border-1 border-[#bbbdc3] ">
      <h1 className="text-lg ml-16 mb-1">{categoryName} stock summary in stock location</h1>
      <h2 className='text-black ml-16  font-bold'> {desktopValues.reduce((total, value) => total + value, 0)}</h2>
      <ReactApexChart
        options={options}
        series={series}
        type={options.chart?.type}
        height={options.chart?.height}
      />
    </div>
  );
};

export default DataChart;
