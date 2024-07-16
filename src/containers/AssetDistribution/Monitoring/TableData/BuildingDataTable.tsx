import React from "react";

interface Building {
  no: number;
  buldingName: string;
  totalOffices: number;
  activeAssets: number;
  inactiveAssets: number;
}

const BuildingsTable: React.FC = () => {
  const buildingData: Building[] = [
    { no: 1, buldingName: "Building A", totalOffices:  10, activeAssets: 500 , inactiveAssets:4},
    { no: 2, buldingName: "Building B", totalOffices:  44, activeAssets: 800 , inactiveAssets:43},
    { no: 3, buldingName: "Building C", totalOffices:  21, activeAssets: 1200, inactiveAssets:24 },
    { no: 4, buldingName: "Building D", totalOffices:  89, activeAssets: 1500, inactiveAssets:8 },
  ];

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white ">
        <thead>
          <tr className="min-w-full bg-white border-b-2 border-gray-300">
            <th className="py-2 px-4 ">No</th>
            <th className="py-2 px-4 ">Building Name</th>
            <th className="py-2 px-4 ">Total Offices</th>
            <th className="py-2 px-4 ">Active Asset</th>
            <th className="py-2 px-4 ">Inactive Asset</th>
          </tr>
        </thead>
        <tbody>
          {buildingData.map((Building) => (
            <tr key={Building.no} className="min-w-full bg-white border-b border-gray-300">
              <td className="py-2 px-4 ">{Building.no}</td>
              <td className="py-2 px-4 ">{Building.buldingName}</td>
              <td className="py-2 px-4 ">{Building.totalOffices}</td>
              <td className="py-2 px-4 ">{Building.activeAssets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BuildingsTable;
