import React, { useState, useEffect } from "react";
import TableModal from "../../../components/TableModal/TableModal";
import { FaFileExcel } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";

export interface StockInterface {
  no: string;
  stockName: string;
  stockLocation: string;
  totalAsset: number;
  assets: AssetInterface[];
}

export interface AssetInterface {
  [key: string]: string;
}

interface StockTableProps {
  activeCategory: string;
  activeCategoryData: StockInterface[];
}

const StockTable: React.FC<StockTableProps> = ({ activeCategoryData, activeCategory }) => {
  const [selectedStock, setSelectedStock] = useState<StockInterface | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(activeCategoryData);

  const handleRowClick = (stock: StockInterface) => {
    setSelectedStock(stock);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedStock(null);
    setIsModalOpen(false);
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
    if (!selectedStock) return;

    const csvData: string[] = [];
    // Add headers to CSV data
    csvData.push(Object.keys(selectedStock.assets[0]).join(','));

    // Add each asset data to CSV data
    selectedStock.assets.forEach(asset => {
      const assetValues = Object.values(asset);
      csvData.push(assetValues.join(','));
    });

    // Create CSV file content
    const csvContent = csvData.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);

    // Create link for download
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${selectedStock.stockName}_assets.csv`);
    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
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
              <th className="py-2 px-4">{activeCategory} Assets</th>
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
                <td className="py-2 px-4">{stock.assets.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        {selectedStock && (
          <TableModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            title={`${activeCategory}  Details for ${selectedStock.stockName}`}
            tableHeaders={selectedStock.assets.length > 0 ? Object.keys(selectedStock.assets[0]) : []}
            tableData={selectedStock.assets || []}
            tag={[activeCategory, selectedStock.stockName]}
          />
        )}
      </div>
    </>
  );
};

export default StockTable;
