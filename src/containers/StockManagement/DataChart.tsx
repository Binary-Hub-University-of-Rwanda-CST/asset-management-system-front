import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';
import { stockData } from './StockData';

interface Stock {
  no: number;
  stockName: string;
  stockLocation: string;
  totalDesktop: number;
}

const DataChart: React.FC = () => {
  // const stockData: Stock[] = [
  //   { no: 1, stockName: "Stock A", stockLocation: "Location 1", totalDesktop: 500 },
  //   { no: 2, stockName: "Stock B", stockLocation: "Location 2", totalDesktop: 800 },
  //   { no: 3, stockName: "Stock C", stockLocation: "Location 3", totalDesktop: 1200 },
  //   { no: 4, stockName: "Stock D", stockLocation: "Location 4", totalDesktop: 1500 },
  // ];

  // Extract stock location names
  const categories = stockData.map(stock => stock.stockLocation);

  // Extract total desktop values
  const desktopValues = stockData.map(stock => stock.totalDesktop);

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
      show: true, // Show grid lines
      borderColor: '#f0f0f0', // Color of grid lines
      strokeDashArray: 0, // Length of dash stroke
      position: 'back', // Position of grid lines
      xaxis: {
        lines: {
          show: true, // Hide horizontal grid lines
        },
      },
      yaxis: {
        lines: {
          show: false, // Show vertical grid lines
        },
      },
    },
  };

  const series = [
    {
      name: 'Desktop',
      data: desktopValues,
    },
  ];

  return (
    <div className="p-4 rounded-3xl m-2 shadow-xl border-1 border-[#bbbdc3] ">
      <h1 className="text-lg ml-16 mb-1">Desktop stock summary in stock location</h1>
      <h2 className='text-black ml-16  font-bold'> 3,000</h2>
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
