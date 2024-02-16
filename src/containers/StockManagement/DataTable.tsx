import React from "react";
import { stockData } from "./StockData";

interface Stock {
  no: number;
  stockName: string;
  stockLocation: string;
  totalDesktop: number;
}

const StockTable: React.FC = () => {
  // const stockData: Stock[] = [
  //   { no: 1, stockName: "Stock A", stockLocation: "Location 1", totalDesktop: 500 },
  //   { no: 2, stockName: "Stock B", stockLocation: "Location 2", totalDesktop: 800 },
  //   { no: 3, stockName: "Stock C", stockLocation: "Location 3", totalDesktop: 1200 },
  //   { no: 4, stockName: "Stock D", stockLocation: "Location 4", totalDesktop: 1500 },
  // ];

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white ">
        <thead>
          <tr className="min-w-full bg-white border-b-2 border-gray-300">
            <th className="py-2 px-4 ">No</th>
            <th className="py-2 px-4 ">Stock Name</th>
            <th className="py-2 px-4 ">Stock Location</th>
            <th className="py-2 px-4 ">Total Desktop</th>
          </tr>
        </thead>
        <tbody>
          {stockData.map((stock) => (
            <tr key={stock.no} className="min-w-full bg-white border-b border-gray-300">
              <td className="py-2 px-4 ">{stock.no}</td>
              <td className="py-2 px-4 ">{stock.stockName}</td>
              <td className="py-2 px-4 ">{stock.stockLocation}</td>
              <td className="py-2 px-4 ">{stock.totalDesktop}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;
