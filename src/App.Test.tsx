

import React, { useState } from 'react';
import ChangePassword from './containers/changePassword/ChangePassword';
import Login from './containers/authantication/Login';
import DashboardLoading from './components/CoomingSoon/CoomingSoon';
import AssetListing from './containers/StockManagement/AssetListing/AssetListing';
import AssetStatusChart from './containers/Dashboard/AssetStatusDonut';
import CreateNewCategory from './containers/StockManagement/CreateNewCategory';
import Alert, { AlertType } from './components/Alert/Alert';
import TableModal from './components/TableModal/TableModal';
const chartData = [40, 30, 30];
function Test() {

  const [viewTable, SetViewTable] = useState(true);

  const backToList = () => {
    SetViewTable(false);
  }

  const closeMe =() =>{
    alert('hey');
  }
  return (
    // < ChangePassword />
    // <CreateNewCategory/>
    // <AssetListing/>
    // <AssetStatusChart data={chartData} />
    <TableModal
     onClose={backToList}
      title = 'MUHABURA STORE ' 
      isOpen = {viewTable} 
       tag={['desktops -category ', 'lenovo']} />

    // <Alert title='error in your submission ' alertType={AlertType.WARNING} close={closeMe} />



  );
}

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



    


