

// import React, { useState, lazy } from 'react';
// import ChangePassword from './containers/changePassword/ChangePassword';
// import Login from './containers/authantication/Login';
// import DashboardLoading from './components/CoomingSoon/CoomingSoon';
// import AssetListing from './containers/StockManagement/AssetListing/AssetListing';
// import AssetStatusChart from './containers/Dashboard/AssetStatusDonut';
// import CreateNewCategory from './containers/StockManagement/Components/CreateNewCategory';
// import Alert, { AlertType } from './components/Alert/Alert';
// import TableModal from './components/TableModal/TableModal';
// import FullAssets from './utils/FullAssets';
// import FakeAssetsData from './utils/FakeAssetsData';
// const chartData = [40, 30, 30];

// function Test() {

//   const [viewTable, SetViewTable] = useState(false);

//   const backToList = () => {
//     SetViewTable(false);
//   }

//   const closeMe =() =>{
//     alert('hey');
//   }
  
//   const tableHeaders = [
//     "Asset ID",
//     "Category ID",
//     "Brand ID",
//     "Stock ID",
//     "Supplier ID",
//     "Purchase Order Number",
//     "Value",
//     "Date In",
//   ];
//  const tags = ['Dektop -catgory', 'Muhabura'];
//   return (
//     <div className=" flex items-center justify-center h-screen App">
//       <button onClick={() => SetViewTable(true)} className=' animate__animated animate__fast animate__rubberBand   text-2xl bg-my-blue px-10 py-4 rounded-xl  text-white '>show fake reports
//       </button>
//       <TableModal
//         isOpen={viewTable}
//         onClose={backToList}
//         title=" vist Muhabura Store"
//         tableHeaders={tableHeaders}
//         tableData={FakeAssetsData}
//         tag={tags}
//       />
//     </div>
//   );
// };

// export default Test;

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



    



// AssetList.tsx
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RootState } from './app/store';
import { fetchAssets } from './actions/asset.action';
import { Assets } from './actions/asset.action';
import DataLoading from './components/dataLoading/DataLoading';
interface Props {
  assets: Assets[];
  loading: boolean;
  error: string | null;
  fetchAssets: () => void;
}

const AssetList: React.FC<Props> = ({ assets, loading, error, fetchAssets }) => { 
  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  if (loading) {
    return <DataLoading/>;    
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
console.log(" all assets:  " + assets); 

     return (
        <div> 
          <h1>Asset Data</h1>
            {assets.map((assetData, index) => (
                <div key={index}>
                    <h2>Category: {assetData.category.name}</h2>
                    {assetData.stock.map(stockItem => (
                        <div key={stockItem.id}>
                            <h3>Stock: {stockItem.name}</h3>
                            <p>Location: {stockItem.location}</p>
                            <ul>
                                {stockItem.asset.map((asset, i) => (
                                    <li key={i}>
                                        <h4>Specifications:</h4>
                                        <ul className=' ml-44 '> 
                                            {} assets deisplayed here 
                                        </ul>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

const mapStateToProps = (state: RootState) => ({
  assets: state.asset.assets,
  loading: state.asset.loading,
  error: state.asset.error,
});

export default connect(mapStateToProps, { fetchAssets })(AssetList); 
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