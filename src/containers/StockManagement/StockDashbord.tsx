import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../../app/store";
import { fetchAssets, Asset } from "../../actions/asset.action";
import { GoDatabase } from "react-icons/go";
import { IoMdMenu } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import StockTable, { buildingInterface } from "./Components/DataTable";
import StockLocation from "../../components/stockLocation/StockLocation";
import Categories from "./Components/Categories";
import { Link } from "react-router-dom";
import CreateNewCategory from "./Components/CreateNewCategory";
import { Assets } from "../../actions/asset.action";
import StockLoading from "../../components/StockLoading/StockLoading";
import DataChart from "./Components/DataChart";
import { HiOutlineCurrencyDollar } from "react-icons/hi";
import { IoStatsChart } from "react-icons/io5";
import { FaTableList } from "react-icons/fa6";
import { formatNumberWithCommas } from "../../utils/functions";
import { fetchSpecifications } from "../../actions/uploadpecification.action";

interface AssetProps {
  assetsData: Assets[];
  assetLoading: boolean;
  assetError: string | null;
  fetchAssets: () => void;
}

const StockDashboard: React.FC<AssetProps> = ({ assetsData, assetLoading, assetError, fetchAssets }) => {
  useEffect(() => {
    if (assetsData.length === 0) {
      fetchAssets();
    }
    fetchSpecifications();
  }, [fetchAssets, assetsData.length, fetchSpecifications]);  


 
  const [showTable, setShowTable] = useState(false);
  const [isBuildingModalOpen, setIsBuildingModalOpen] = useState(false); 
  const [newCategory, setNewCategory] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeCategoryBuildingData, setActiveCategoryBuildingData] = useState<buildingInterface[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  // const [activeCategory, setActiveCategory] = useState<number | string | null>(null);
  
  const filteredAssetsData = assetsData.filter(category => {
   const totalAssets = category.buildings.reduce((total, building) =>
     total + building.rooms.reduce((roomTotal, room) => roomTotal + room.assets.length, 0), 0
   );
   return totalAssets > 0 && category.category.name.toLowerCase().includes(searchQuery.toLowerCase());
 }); 

 useEffect(() => { 
  if (assetsData.length > 0 && !activeCategory) {
    setActiveCategory(filteredAssetsData[0].category.id); 
  }
}, [assetsData, activeCategory]); 

  useEffect(() => {
    if (activeCategory && assetsData.length > 0) {
      const category = assetsData.find((category) => category.category.id === activeCategory);
      if (category) {
        const filteredBuildings: buildingInterface[] = category.buildings.map((building) => {
          const totalAssets = building.rooms.reduce((sum, room) => sum + room.assets.length, 0);
          const totalValue = building.rooms.reduce((sum, room) => sum + room.assets.reduce((roomSum, asset) => roomSum + asset.current_value, 0), 0);
  
          return {
            no: building.id,
            buildingName: building.name,
            totalRooms: building.rooms.length,
            totalAsset: totalAssets,
            totalValue: totalValue,
            assets: building.rooms.flatMap(room => room.assets.map(asset => ({
              ...asset
            }))),
            rooms: building.rooms.map(room => ({
              no: room.id,
              roomName: room.name,
              floor: room.floor,
              totalAssets: room.assets.length,
              assets: room.assets.map(asset => ({
                ...asset
              }))
            }))
          };
        });
  
        setActiveCategoryBuildingData(filteredBuildings);
      }
    }
  }, [activeCategory, assetsData]);
  


  if (assetLoading) {
    return <StockLoading />; 
  }

  if (assetError) {
    return <div>Error: {assetError}</div>;
  }

  const openBuildingModal = () => setIsBuildingModalOpen(true);
  const closeBuildingModal = () => setIsBuildingModalOpen(false);

  const displayTable = () => setShowTable(true);
  const displayDashboard = () => setShowTable(false);

  const closeNewCategoryModal = () => setNewCategory(false);
  const createNewCategoryModal = () => setNewCategory(true);

 const setActiveCategoryHandler = (categoryId: string) => setActiveCategory(categoryId);


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };


const categoryData = filteredAssetsData.map((category) => {
  const totalAssets = category.buildings.reduce((total, building) =>
    total + building.rooms.reduce((roomTotal, room) => roomTotal + room.assets.length, 0), 0
  );

  return (
    <Categories
      key={category.category.id}
      id={category.category.id}
      categoryName={category.category.name}
      totalAssets={totalAssets}
      handleActive={setActiveCategoryHandler}
      isActive={activeCategory === category.category.id}
    />
  );
});

 const totalCategories = filteredAssetsData.length; 

  const activeCategoryData = assetsData.find((category) => category.category.id === activeCategory);

  const activeCategoryName = activeCategoryData ? activeCategoryData.category.name : 'Desktop - Assets';
  const activeCategoryTotalAssets = activeCategoryData ? activeCategoryData.buildings.reduce((total, building) =>
    total + building.rooms.reduce((roomTotal, room) => roomTotal + room.assets.length, 0), 0
  ) : 0;

  const activeCategoryTotalValue = activeCategoryData
    ? activeCategoryData.buildings.reduce(
        (catTotal, building) =>
          catTotal + building.rooms.reduce(
            (roomTotal, room) =>
              roomTotal + room.assets.reduce((assetTotal, asset) => assetTotal + asset.current_value, 0),
            0
          ),
        0
      )
    : 0;

  const totalAssetsValue = assetsData.reduce((total, category) => {
    const categoryValue = category.buildings.reduce(
      (catTotal, building) =>
        catTotal + building.rooms.reduce(
          (roomTotal, room) =>
            roomTotal + room.assets.reduce((assetTotal, asset) => assetTotal + asset.current_value, 0),
          0
        ),
      0
    );
    return total + categoryValue;
  }, 0);

  const totalBuildings = activeCategoryData ? activeCategoryData.buildings.length : 0;

  return (
    <div className="mr-4">
      <div className="flex flex-row items-center gap-3 mb-2 bg-white rounded-lg p-2 justify-between">
        <div className="pl-1 flex gap-2 items-center">
          <GoDatabase className="text-3xl font-bold text-my-blue" />
          <div className="flex item-center flex-col">
            <div className="flex text-black text-2xl font-bold px-2">Asset  Management</div>
            <div className="px-2 rounded-md bg-primary-700 text-black w-max text-sm">
              Manage Assets From Different Location In One College
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3">
          <div className="flex flex-col justify-center align-center">
            <p className="text-gray-400 justify-center">Categories</p>
            <h2 className="text-black font-bold text-2xl flex justify-center">
              {totalCategories < 10 ? `0${totalCategories}` : `${totalCategories}`}
            </h2>
          </div>
          <div className="flex flex-col justify-center align-center">
            <p className="text-gray-400">Total Buildings</p>
            <h2 className="text-black font-bold text-2xl flex justify-center"> 
              {totalBuildings}   
            </h2>
          </div>
          <div className="flex flex-col justify-center align-center bg-blue-white rounded-md px-2 ">
            <p className="text-black">Total Assets Value</p>
            <h2 className="text-black font-bold text-2xl flex justify-center"> 
              {formatNumberWithCommas(totalAssetsValue) } FRW   
            </h2>
          </div>
        </div>
        <div>
          <button onClick={openBuildingModal} className="p-1 px-3 bg-my-blue rounded-md text-white">
            Create location 
          </button>
        </div>
      </div>

      <div className="flex flex-row gap-2">
        <div className="relative  w-1/3 p-4 rounded-lg bg-white pb-16 animate__animated animate__fast ">
          <div className="flex justify-center pb-2">
            <h3 className="text-md font-bold text-black justify-start  text-xl ">{totalCategories > 0 ? "Asset Categories" : " No Category current  "}</h3>
          </div>
                <input
              type="text"
              placeholder="Search categories"
              value={searchQuery}
              onChange={handleSearchChange}
              className="mb-4 p-2 py-1  border border-x-blue-white outline-my-blue  rounded w-full" 
                  />
          <div className="flex justify-center flex-wrap gap-2 mt-2 overflow-y-auto">  
            {categoryData} 
          </div>
          <button
            onClick={createNewCategoryModal}
            className="ml-8 p-1 border-2 border-my-blue text-my-blue rounded-lg w-3/4 bottom-2 absolute justify-center items-center"
          >
            Create New Category
          </button>
        </div>

        <div className="w-2/3 h-full p-4 rounded-lg relative bg-white py-4 pb-16 animate__animate animate__fast">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <IoMdMenu className="text-xl text-gray-400" />
              <h3 className="text-black font-bold text-xl ">{activeCategoryName} - Assets</h3>
            </div>
            <div className="flex flex-row items-center gap-2">
              <FaRegCheckCircle className="text-3xl font-bold text-confirm" />
              <div>
                <h4>Total {activeCategoryName}s</h4>
                <h3 className="font-bold text-xl">{activeCategoryTotalAssets}</h3>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 bg-blue-white rounded-md px-2 ">
              <HiOutlineCurrencyDollar className="text-3xl font-bold text-confirm" />
              <div>
                <h4>Total {activeCategoryName}s's value</h4> 
                <h3 className="font-bold text-xl">
                  {formatNumberWithCommas(activeCategoryTotalValue)}  FRW</h3>  
              </div>
            </div>
          </div>
          <div>
            <div className="flex flex-row justify-start   border-b-2 border-blue-white mb-0 p-0 gap-28  ">
              <div className="flex flex-row justify-between">
                <button
                  className={!showTable ? "text-black font-bold border-b-2 border-my-blue text-xl flex gap-1 items-center " : "text-black text-xl flex gap-1 items-center "}
                  onClick={displayDashboard}
                >
                 <IoStatsChart />

                  Graph 
                </button>
              </div>
              <div>
                <button
                  className={showTable ? "text-black font-bold border-b-2 border-my-blue text-xl flex gap-1 items-center " : "text-black text-xl flex gap-1 items-center "}
                  onClick={displayTable}
                >
                  <FaTableList /> 
                  Table
                </button>
              </div>
            </div>
          </div>
          <div className="bg-white p-2">
            {!showTable ?
              <DataChart categoryName={activeCategoryName} activeCategoryData={activeCategoryBuildingData} /> :
              <StockTable activeCategoryData={activeCategoryBuildingData} activeCategory={activeCategoryName} />}
          </div>
          <div>
            <Link
              to="/upload-assets"
              className="flex ml-20 p-1 bg-my-blue text-white rounded-lg w-3/4 bottom-2 absolute justify-center items-center"
            >
              Upload- <span className="font-bold">{activeCategoryName}</span> - Assets
            </Link>
          </div>
        </div>
      </div>

      {isBuildingModalOpen && <StockLocation isOpen={isBuildingModalOpen} onClose={closeBuildingModal} />}

      {newCategory && <CreateNewCategory isOpen={newCategory} onClose={closeNewCategoryModal} />}
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  assetsData: state.asset.assets,
  assetLoading: state.asset.loading,
  assetError: state.asset.error,
});

export default connect(mapStateToProps, {
  fetchAssets,
})(StockDashboard);
 