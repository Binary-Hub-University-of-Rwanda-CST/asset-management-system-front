import React, { useState, useEffect } from "react";
import { stockData } from "../../../utils/StockLocation";
import AppModal, { ModalSize, Themes, ModalMarginTop } from "../../../components/AppModal/AppModal";
import TableModal from "../../../components/TableModal/TableModal";
import FakeAssetsData from "../../../utils/FakeAssetsData";
import FullAssets from "../../../utils/FullAssets";
import { FaFileExcel } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export interface StockInterface {
  no: string;
  stockName: string;
  stockLocation: string;
  totalAsset: number;
}

interface AssetInterface {
  [key: string]: any;
}

interface StockTableProps {
  activeCategory: string;
  activeCategoryData: StockInterface[];
}

const StockTable: React.FC<StockTableProps> = ({ activeCategoryData, activeCategory }) => {
  const [viewTable, SetViewTable] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockInterface | null>(null);
  const [selectedStockAssets, setSelectedStockAssets] = useState<AssetInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(activeCategoryData);

  const handleRowClick = (stock: StockInterface) => {
    setSelectedStock(stock);
    // Filter assets based on the selected stock
    const stockAssets = FullAssets.filter(asset => asset.stock_id === stock.no);
    setSelectedStockAssets(stockAssets);
    setIsModalOpen(true); // Open the modal when a row is clicked
  };

  const handleCloseModal = () => {
    setSelectedStock(null);
    setSelectedStockAssets([]);
    setIsModalOpen(false); // Close the modal
  };

  useEffect(() => {
    const filtered = activeCategoryData.filter(stock =>
      Object.values(stock).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setFilteredData(filtered);
  }, [searchTerm, activeCategoryData]);

  const exportToCSV = () => {
    const csvContent = "data:text/csv;charset=utf-8," +
      ["No", "Stock Name", "Stock Location", "Total Asset"].join(",") + "\n" +
      filteredData.map(stock =>
        [stock.no, stock.stockName, stock.stockLocation, stock.totalAsset].join(",")
      ).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "stock_data.csv");
    document.body.appendChild(link);
    link.click();
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <div className="flex flex-row w-full relative mb-4">
          <input
            type="text"
            name="search"
            id="search"
            placeholder="Search..."
            className="py-1 text-sm w-11/12 bg-my-gray rounded-lg px-8 focus:outline-my-gray focus:bg-white pl-10 relative"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <span className="absolute left-4 top-4 transform -translate-y-1/2 text-gray-500">
            <FaSearch />
          </span>
          <button className="flex items-center justify-center rounded-md px-8 bg-green-600 w-1/12 ml-4 text-white text-sm" onClick={exportToCSV}>
            <FaFileExcel className="" /> Export
          </button>
        </div>
        <table className="min-w-full bg-white">
          <thead>
            <tr className="min-w-full bg-white border-b-2 border-gray-300">
              <th className="py-2 px-4">No</th>
              <th className="py-2 px-4">Stock Name</th>
              <th className="py-2 px-4">Stock Location</th>
              <th className="py-2 px-4">{activeCategory} assets</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((stock, index) => (
              <tr
                key={stock.no}
                className="min-w-full bg-white border-b border-gray-300 cursor-pointer hover:bg-blue-white hover:text-my-blue hover:font-bold hover:rounded-lg active:bg-blue-white"
                onClick={() => handleRowClick(stock)}
              >
                <td className="py-2 px-4">{index + 1}</td>
                <td className="py-2 px-4">{stock.stockName}</td>
                <td className="py-2 px-4">{stock.stockLocation}</td>
                <td className="py-2 px-4">{stock.totalAsset}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <TableModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          title="Asset Details"
          tableHeaders={selectedStockAssets.length > 0 ? Object.keys(selectedStockAssets[0].specifications) : []}
          tableData={selectedStockAssets}
        />
      </div>
    </>
  );
};

export default StockTable; 
