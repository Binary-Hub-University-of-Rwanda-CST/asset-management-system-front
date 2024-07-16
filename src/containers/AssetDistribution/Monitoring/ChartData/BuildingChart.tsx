import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const BuildingsChart: React.FC = () => {
   const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        barHeight: '80%', 
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['MUHABURA', 'KHE', 'AGACIRO', 'SABE', 'KALISIMBI'],
      axisTicks: {
        show: true,
      },
    },
  };

  const series = [
    {
      name: 'Active',
      data: [1200, 3000, 500, 900, 1500],
    },
    {
      name: 'Inactive',
      data: [1100, 1200, 200, 300, 400],
      color: '#ffdaa4',
    },
    // Add more series as needed
  ];

  return (
    <div className="p-4 rounded-md">
      <h1 className="text-2xl mb-4">Active and Inactive Desktop  distribution summary in Buildings</h1>
      <h2 className='text-black'>3000</h2>
      <ReactApexChart options={options} series={series} type={options.chart?.type} height={options.chart?.height} />
    </div>
  );
};

export default BuildingsChart;
