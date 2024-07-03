import React from "react";
import ReactApexChart from "react-apexcharts";
import { Building } from "../../actions";
import { ApexOptions } from "apexcharts";

interface BuildingAssetsBarGraphProps {
  buildings: Building[];
}

const formatValue = (value: number): string => {
  if (value >= 1e6) {
    return (value / 1e6).toFixed(2) + "M FRW"; // Convert to millions
  } else if (value >= 1e3) {
    return (value / 1e3).toFixed(1) + "K FRW"; // Convert to thousands
  } else {
    return value.toFixed(0) + " FRW";
  }
};

const BuildingAssetsBarGraph: React.FC<BuildingAssetsBarGraphProps> = ({ buildings }) => {
  // Consolidate buildings and calculate total asset value across all categories
  const buildingMap = new Map<string, number>(); // Map to store building names and total asset values

  buildings.forEach((building) => {
    building.rooms.forEach((room) => {
      room.assets.forEach((asset) => {
        const currentAssetValue = buildingMap.get(building.name) || 0;
        buildingMap.set(building.name, currentAssetValue + asset.current_value);
      });
    });
  });

  // Prepare data for the chart
  const buildingData = Array.from(buildingMap).map(([name, totalAssetValue]) => ({
    name,
    totalAssetValue,
  }));

  // Sort buildings by total asset value descending
  buildingData.sort((a, b) => b.totalAssetValue - a.totalAssetValue);

  // Extract building names and asset values
  const categories = buildingData.map((building) => building.name);
  const assets = buildingData.map((building) => building.totalAssetValue);

  // Calculate dynamic height based on number of buildings
  const minHeight = 130;
  const maxHeight = 500; // Adjust maximum height as per your design requirements
  const dynamicHeight = Math.min(Math.max(buildingData.length * 50, minHeight), maxHeight); 

  const options: ApexOptions = {
    chart: {
      type: "bar", 
      height: dynamicHeight,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        borderRadius: 5,
        dataLabels: {
        //   position: "middle",   
            
        }, 
      },
    },
    dataLabels: {
      enabled: true,
      textAnchor: "middle",  
      formatter: (val: number) => formatValue(val),
    //   offsetX: ,  
    },
    
    xaxis: {
      categories: categories,
      axisTicks: {
        show: false,
      },
    },
    grid: {
      show: true,
      borderColor: "#f0f0f0",
      strokeDashArray: 0,
      position: "back",
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
      name: "Asset Value",
      data: assets,
    },
  ];

  return (
    <div className="p-4 rounded-3xl m-2 w-full "> 
      <h1 className="text-lg ml-16 mb-1">Building Assets Summary</h1>
      <h2 className="text-black ml-16 font-bold">
        Total Assets value : {formatValue(
          buildingData.reduce((total, building) => total + building.totalAssetValue, 0)
        )}
      </h2>
      <ReactApexChart
        options={options}
        series={series}
        type={options.chart?.type}
        height={options.chart?.height}
      />
    </div>
  );
};

export default BuildingAssetsBarGraph;

 