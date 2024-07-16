import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface Bulding {
  no: string;
  buildingName: string;
  // stockLocation: string;
  totalAsset: number;
}

interface DataChartProps {
  activeCategoryData: Bulding[];
  categoryName: string; 
}

const DataChart: React.FC<DataChartProps> = ({ activeCategoryData, categoryName }) => {
  // Filter out buildings with zero assets
  const filteredData = activeCategoryData.filter(stock => stock.totalAsset > 0);

  // Extract bulding names and building names
  const categories = filteredData.map(building => `${building.buildingName} `); 
  const assets = filteredData.map(building => building.totalAsset);

  // Calculate chart height
  const minHeight = 130;
  const dynamicHeight = Math.max(filteredData.length * 50, minHeight); 

  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: dynamicHeight,
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
      name: categoryName, 
      data: assets,
    },
  ];

  return (
    <div className="p-4 rounded-3xl m-2 shadow-xl border-1 border-[#bbbdc3]">
      <h1 className="text-lg ml-16 mb-1">{categoryName} summary in buildings location</h1>
      <h2 className='text-black ml-16 font-bold'>Total {categoryName}: {assets.reduce((total, value) => total + value, 0)}</h2>
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
  