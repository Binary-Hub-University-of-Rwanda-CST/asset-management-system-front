import React, { useState } from "react";
import { stockData } from "../../../utils/StockLocation";
import AppModal, { ModalSize, Themes, ModalMarginTop } from "../../../components/AppModal/AppModal";
import TableModal from "../../../components/TableModal/TableModal";
import FakeAssetsData from "../../../utils/FakeAssetsData";

 export interface StockInterface {
  no: string; 
  stockName: string;
  stockLocation: string;
  totalAsset: number;
}
interface StockTableProps {
  activeCategory: string,
  activeCategoryData: StockInterface[];
} 


const StockTable: React.FC<StockTableProps> = ({ activeCategoryData, activeCategory }) => {
  const [viewTable, SetViewTable] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockInterface | null>(null);
  
  
  const backToList = () => {
    SetViewTable(false);
  }
  
  const closeMe =() =>{
    alert('hey');
  }
  
  const tableHeaders = [
    "Asset ID",
    "Category ID",
    "Brand ID",
    "Stock ID",
    "Supplier ID",
    "Purchase Order Number",
    "Value",
    "Date In",
  ];
  const tags = ['Dektop -catgory', 'Muhabura']; 
  const handleRowClick = (stock: StockInterface) => {
    setSelectedStock(stock);
  };

  const handleCloseModal = () => {
    setSelectedStock(null);
  };
   let index:number = 0;

  return (
    <div className="container mx-auto p-4">
      <table className="min-w-full bg-white ">
        <thead>
          <tr className="min-w-full bg-white border-b-2 border-gray-300">
            <th className="py-2 px-4 ">No</th>
            <th className="py-2 px-4 ">Stock Name</th>
            <th className="py-2 px-4 ">Stock Location</th>
            <th className="py-2 px-4 ">{activeCategory} assets</th> 
          </tr>
        </thead> 
        <tbody>
          {activeCategoryData.map((stock) => (
            <tr
              key={stock.no}
              className="min-w-full bg-white border-b border-gray-300 cursor-pointer hover:bg-blue-white hover:text-my-blue hover:font-bold hover:rounded-lg active:bg-blue-white"
              onClick={() => handleRowClick(stock)}
            >
              <td className="py-2 px-4 ">{index++}</td> 
              <td className="py-2 px-4 ">{stock.stockName}</td>
              <td className="py-2 px-4 ">{stock.stockLocation}</td>
              <td className="py-2 px-4 ">{stock.totalAsset}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
       {/* {selectedStock == null  && (  */}
         <TableModal
         isOpen={viewTable}
         onClose={handleCloseModal}
         title=" vist Muhabura Store"
         tableHeaders={tableHeaders}
         tableData={FakeAssetsData}
         tag={tags}
       />
      {/* )}  */}  
    </div>
  );
};  

export default StockTable;
