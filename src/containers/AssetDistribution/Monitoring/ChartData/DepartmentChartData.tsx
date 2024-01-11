import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const DepartmentChart: React.FC = () => {
   const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        barHeight: '80%', // Adjust the bar height as needed
        distributed: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['COMPUTER SCIENCE', 'INFORMATION TECHNOLOGY', 'COMPUTER ENGEERING', 'INFORMATION SYSTEM', 'MECHANICAL ENGEERING'],
      axisTicks: {
        show: true,
      },
    },
  };

  const series = [
    {
      name: 'Active',
      data: [1500, 2000, 400, 800, 1200],
    },
    {
      name: 'Inactive',
      data: [1000, 1500, 300, 600, 900],
      color: '#ffdaa4',
    },
    // Add more series as needed
  ];

  return (
    <div className="p-4 rounded-md">
      <h1 className="text-2xl mb-4">Active and Inactive Desktop  distribution summary in Department</h1>
      <h2 className='text-black'>3000</h2>
      <ReactApexChart options={options} series={series} type={options.chart?.type} height={options.chart?.height} />
    </div>
  );
};

export default DepartmentChart;
