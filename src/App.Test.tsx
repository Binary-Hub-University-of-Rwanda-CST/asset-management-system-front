

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
import { Asset } from './actions/asset.action';
import DataLoading from './components/dataLoading/DataLoading';
interface Props {
  assets: Asset[];
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

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Asset List</h1>
      <div className="grid grid-cols-1 gap-4">
        {assets.map(asset => (
          <div key={asset.asset_id} className="bg-white shadow-md rounded-md p-4">
            <h2 className="text-lg font-semibold">{asset.category.category_name}</h2>
            <p className="text-gray-600">{asset.brand.name}</p>
            <p className="text-gray-600">{asset.stock.name}</p>
            <p className="text-gray-600">{asset.supplier.name}</p>
            <p className="mt-2">Purchase Order: {asset.purchase_order_number}</p>
            <p>Value: ${asset.value}</p>
            <p>Life Span: {asset.life_span_years} years</p>
            <p>Date In: {asset.date_in}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  assets: state.asset.assets,
  loading: state.asset.loading,
  error: state.asset.error,
});

export default connect(mapStateToProps, { fetchAssets })(AssetList);
