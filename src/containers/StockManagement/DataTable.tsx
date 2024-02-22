import React, { useState } from "react";
import { stockData } from "../../utils/StockLocation";
import AppModal, { ModalSize, Themes, ModalMarginTop } from "../../components/AppModal/AppModal";

interface Stock {
  no: number;
  stockName: string;
  stockLocation: string;
  totalDesktop: number;
}

const StockTable: React.FC = () => {
  const [selectedStock, setSelectedStock] = useState<Stock | null>(null);

  const handleRowClick = (stock: Stock) => {
    setSelectedStock(stock);
  };

  const handleCloseModal = () => {
    setSelectedStock(null);
  };

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
            <tr
              key={stock.no}
              className="min-w-full bg-white border-b border-gray-300 cursor-pointer hover:bg-blue-white hover:text-my-blue hover:font-bold hover:rounded-lg active:bg-blue-white"
              onClick={() => handleRowClick(stock)}
            >
              <td className="py-2 px-4 ">{stock.no}</td>
              <td className="py-2 px-4 ">{stock.stockName}</td>
              <td className="py-2 px-4 ">{stock.stockLocation}</td>
              <td className="py-2 px-4 ">{stock.totalDesktop}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {selectedStock && (
        <AppModal
          backDrop={true}
          theme={Themes.default}
          close={handleCloseModal}
          backDropClose={true}
          widthSizeClass={ModalSize.medium}
          displayClose={true}
          padding={{ title: true, body: true, footer: true }}
          marginTop={ModalMarginTop.medium}
          title="Stock Details"
        >
          <div>
            <p>No: {selectedStock.no}</p>
            <p>Name: {selectedStock.stockName}</p>
            <p>Location: {selectedStock.stockLocation}</p>
            <p>Total Desktop: {selectedStock.totalDesktop}</p>
          </div>
        </AppModal>
      )}
    </div>
  );
};

export default StockTable;
