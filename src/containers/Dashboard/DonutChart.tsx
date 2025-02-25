import React from 'react';
import Chart from 'react-apexcharts';
import { Assets } from '../../actions';

interface DonutChartProps {
  assetsData: Assets[];
}

const formatValue = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M FRW`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k FRW`;
  }
  return `${value.toLocaleString()} FRW`;
};

const DonutChart: React.FC<DonutChartProps> = ({ assetsData }) => {
  const filteredData = assetsData.filter((category) => 
    category.buildings.reduce((catTotal, building) =>
      catTotal +
      building.rooms.reduce((roomTotal, room) =>
        roomTotal + room.assets.reduce((assetTotal, asset) => assetTotal + asset.current_value, 0),
        0
      ),
      0
    ) > 0
  );

  const series = filteredData.map((category) =>
    category.buildings.reduce((catTotal, building) =>
      catTotal +
      building.rooms.reduce((roomTotal, room) =>
        roomTotal + room.assets.reduce((assetTotal, asset) => assetTotal + asset.current_value, 0),
        0
      ),
      0
    )
  );

  const totalAssetsValue = series.reduce((total, value) => total + value, 0);

  const options = {
    chart: {
      type: 'donut' as 'donut',
    },
    labels: filteredData.map((category) => category.category.name),
    responsive: [
      {
        breakpoint: 380,
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
    tooltip: {
      enabled: true,
      y: {
        formatter: formatValue
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: 'Total Assets Value',
              formatter: () => formatValue(totalAssetsValue)
            },
          },
        },
      },
    },
  };

  return (
    <div className="donut">
      <Chart options={options} series={series} type="donut" width="450" />
    </div>
  );
};

export default DonutChart; 