import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

const DataChart: React.FC = () => {
  const options: ApexOptions = {
    chart: {
      type: 'bar',
      height: 250,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['MUHABURA', 'AGACIRO', 'KHE', 'POO1', 'ADMINISTARTION'],
      axisTicks:{
        show:true,
      }
    },
  };

  const series = [
    {
      name: 'Series 1',
      data: [1500, 2000, 400, 800, 1200],
    },
  ];

  return (
    <div className=" p-4 rounded-md">
      <h1 className="text-2xl  mb-4">Desktop stock sumarry in stock location</h1>
      <h2 className='text-black'> 3000</h2>
      <ReactApexChart options={options} series={series} type={options.chart?.type} height={options.chart?.height} />
    </div>
  );
};

export default DataChart;
