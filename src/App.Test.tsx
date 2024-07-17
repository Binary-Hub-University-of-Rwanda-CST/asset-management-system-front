

import React, { useState, lazy } from 'react';
import ChangePassword from './containers/changePassword/ChangePassword';
import Login from './containers/authantication/Login';
import DashboardLoading from './components/CoomingSoon/CoomingSoon';
import AssetStatusChart from './containers/Dashboard/AssetStatusDonut';
import CreateNewCategory from './containers/StockManagement/Components/CreateNewCategory';
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

// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from './app/store';

// const AssetsComponent: React.FC = () => {
//     const assetsData = useSelector((state: RootState) => state.asset.assets);
//     console.log(" Asset dat" + assetsData); 
    
//     const dispatch = useDispatch();

//     // Optionally, define functions to dispatch actions
//     // const handleSomeAction = () => {
//     //     dispatch(assetsActions.someAction());
//     // };

    // return (
    //     <div>
    //       <h1>Asset Data</h1>
    //         {assetsData.map((assetData, index) => (
    //             <div key={index}>
    //                 <h2>Category: {assetData.category.name}</h2>
    //                 {assetData.stock.map(stockItem => (
    //                     <div key={stockItem.id}>
    //                         <h3>Stock: {stockItem.name}</h3>
    //                         <p>Location: {stockItem.location}</p>
    //                         <ul>
    //                             {stockItem.asset.map((asset, i) => (
    //                                 <li key={i}>
    //                                     <h4>Specifications:</h4>
    //                                     <ul>
    //                                         {asset.specification.map((spec, j) => (
    //                                             <li key={j}>{spec.name}: {spec.value}</li>
    //                                         ))}
    //                                     </ul>
    //                                 </li>
    //                             ))}
    //                         </ul>
    //                     </div>
    //                 ))}
    //             </div>
    //         ))}
    //     </div>
    // );
// };

// export default AssetsComponent;