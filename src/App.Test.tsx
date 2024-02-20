

import React, { useState, lazy } from 'react';
import ChangePassword from './containers/changePassword/ChangePassword';
import Login from './containers/authantication/Login';
import DashboardLoading from './components/CoomingSoon/CoomingSoon';
import AssetListing from './containers/StockManagement/AssetListing/AssetListing';
import AssetStatusChart from './containers/Dashboard/AssetStatusDonut';
import CreateNewCategory from './containers/StockManagement/CreateNewCategory';
import Alert, { AlertType } from './components/Alert/Alert';
import TableModal from './components/TableModal/TableModal';
import FullAssets from './utils/FullAssets';
import FakeAssetsData from './utils/FakeAssetsData';
const chartData = [40, 30, 30];

function Test() {

  const [viewTable, SetViewTable] = useState(false);

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
  return (
    <div className=" flex items-center justify-center h-screen App">
      <button onClick={() => SetViewTable(true)} className=' animate__animated animate__fast animate__rubberBand   text-2xl bg-my-blue px-10 py-4 rounded-xl  text-white '>show fake reports
      </button>
      <TableModal
        isOpen={viewTable}
        onClose={backToList}
        title=" vist Muhabura Store"
        tableHeaders={tableHeaders}
        tableData={FakeAssetsData}
        tag={tags}
      />
    </div>
  );
};

export default Test;
// import React, { useState } from "react";
// import TableModal from "./components/TableModal/TableModal";
// import FullAssets from "./utils/FullAssets";

// const ExampleComponent: React.FC = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const openModal = () => {
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setIsModalOpen(false);
//   };

 

//   return (
//     <div>
//       <button onClick={openModal}>Open Modal</button>
//       c
//       <TableModal
//      isOpen={isModalOpen}
//     onClose={closeModal}
//     title="Asset Details"
//      tableHeaders={[
//     "Asset ID",
//     "Category",
//     "Brand",
//     "Stock",
//     "Supplier",
//     "Purchase Order Number",
//     "Value",
//     "Life Span (years)",
//     "Date In",
//   ]}
//   tableData={FullAssets}
// />

//     </div>
//   );
// };

// export default ExampleComponent;



    


