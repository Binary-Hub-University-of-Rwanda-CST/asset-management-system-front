import React from "react";

interface department {
  no: number;
  departmentName: string;
  totalOffices: number;
  activeAssets: number;
  inactiveAssets: number;
}

const DepartmentTable: React.FC = () => {
  const departmentData: department[] = [
    { no: 1, departmentName: "department A", totalOffices:  10, activeAssets: 500 , inactiveAssets:4},
    { no: 2, departmentName: "department B", totalOffices:  44, activeAssets: 800 , inactiveAssets:43},
    { no: 3, departmentName: "department C", totalOffices:  21, activeAssets: 1200, inactiveAssets:24 },
    { no: 4, departmentName: "department D", totalOffices:  89, activeAssets: 1500, inactiveAssets:8 },
  ];

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white ">
        <thead>
        <tr className="min-w-full bg-white border-b-2 border-gray-300">
            <th className="py-2 px-4 ">No</th>
            <th className="py-2 px-4 ">Department</th>
            <th className="py-2 px-4 ">Total Offices</th>
            <th className="py-2 px-4 ">Active Asset</th>
            <th className="py-2 px-4 ">Inactive Asset</th>
          </tr>
        </thead>
        <tbody>
          {departmentData.map((department) => (
            <tr key={department.no} className="min-w-full bg-white border-b border-gray-300">
              <td className="py-2 px-4 ">{department.no}</td>
              <td className="py-2 px-4 ">{department.departmentName}</td>
              <td className="py-2 px-4 ">{department.totalOffices}</td>
              <td className="py-2 px-4 ">{department.activeAssets}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DepartmentTable;
