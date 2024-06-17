import React, { useState } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import DataChart from "./Components/DataChart";
import { Auth, FC_SetError, FC_SetSuccess } from "../../actions";
import { GoDatabase } from "react-icons/go";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import StockTable from "./Components/DataTable";
import StockLocation from "../../components/stockLocation/StockLocation";
import Categories from "./Components/Categories";
import CategoriesData from "../../utils/CategoriesData";
import { Link } from "react-router-dom";
import CreateNewCategory from "./Components/CreateNewCategory"; // Import the component

const App: React.FC = () => {
  const [showtable, setShowTable] = useState(false);
  const [isStockModalOpen, setIsStockModalOpen] = useState(false);

    const openStockModal = () => setIsStockModalOpen(true);
    const closeStockModal = () => setIsStockModalOpen(false);

  const displayTable = () => {
    setShowTable(true);
  };

  const displayDashboard = () => {
    setShowTable(false);
  };

  const [newCategory, setNewCategory] = useState(false);

 
  const closeNewCategoryModal = () => {
    setNewCategory(false);
  };

  const CreateNewCategoryModal = () => {
    setNewCategory(true);
  };

  const [activeCategory, setActiveCategory] = useState(1);

  const iamActive = (key: number) => {
    setActiveCategory(key);
  };

  const categoryData = CategoriesData.map((category) => (
    <Categories
      key={category.id}
      id={category.id}
      CategoryName={category.CategoryName}
      totalAsset={category.totalAsset}
      handleActive={iamActive}
      isActive={activeCategory === category.id}
    />
  ));

  const totalCategories = categoryData.length;
  return (
    <div className="mr-4 ">
      <div className="flex flex-row items-center gap-3  mb-2 bg-white rounded-lg p-2  justify-between">
        <div className="pl-1 flex gap-2 items-center ">
          <GoDatabase className="text-3xl  font-bold  text-my-blue" />
          <div className="flex item-center flex-col">
            <div className="flex text-black text-xl font-bold px-2">
              Stock Management
            </div>
            <div className="px-2 rounded-md bg-primary-700 text-black  w-max text-sm">
              Manage Stock From Different Location In One College
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-3 ">
          <div className="flex flex-col justify-center align-center">
            <p className="text-gray-400 justify-center">category</p>
            <h2 className="text-black font-bold text-2xl flex justify-center">
              {totalCategories < 10 ? `0${totalCategories}` : `${totalCategories}`}
            </h2>
          </div>
          <div className="flex flex-col justify-center align-center">
            <p className="text-gray-400">total stocks</p>
            <h2 className="text-black font-bold text-2xl flex justify-center">
              08
            </h2>
          </div>
        </div>
        <div>
        <button
         onClick={openStockModal}
         className="p-1 px-3  bg-my-blue rounded-md text-white"
         >
          Create Stock Location</button>
        </div>
      </div>

      <div className="flex flex-row gap-4">
        <div className="relative w-1/3 px-4  rounded-lg bg-white py-10 pb-16 animate__animated animate__fast animate__fadeInBottomRight min-h-96">
          <div className="flex">
            <h3 className="text-md  font-bold text-black justify-center">
              Asset Categories
            </h3>
          </div>
          <div className=" flex  justify-center flex-wrap gap-2 mt-2">
            {categoryData}
          </div>
          <button
            onClick={CreateNewCategoryModal}
            className="ml-8 p-1  border-2 border-my-blue text-my-blue rounded-lg w-3/4 bottom-2 absolute justify-center items-center"
          >
            Create New Category
          </button>
        </div>

        <div className="w-2/3 h-full p-4 rounded-lg relative bg-white py-10 pb-16 animate__animated animate__fadeInBottomRight animate__fast">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <IoMdMenu className="text-xl text-gray-400"  />
              <h3 className="text-black font-bold"> Desktop - Assets</h3>
            </div>
            <div className="flex flex-row items-center gap-2">
              <FaRegCheckCircle className="text-3xl font-bold text-confirm" />
              <div>
                <h4>total Desktop</h4>
                <h3 className="font-bold text-xl">3,200</h3>
              </div>
            </div>
          </div>
          <div>
            <div className=" flex flex-row justify-between border-b-2 border-blue-white mb-0 p-0">
              <div className="flex flex-row justify-between">
                <button
                  className={!showtable ? " text-black font-bold border-b-2 border-my-blue text-xl" : "text-black text-xl"}
                  onClick={displayDashboard}
                > Dashboard</button>
              </div>
              <div>
                <button
                  className={showtable ? " text-black font-bold border-b-2 border-my-blue text-xl" : "text-black text-xl"}
                  onClick={displayTable}
                >List</button>
              </div>
              <div>
                {showtable && <input type="text" placeholder=" search..." className="bg-gray-200 py-1 px-16 rounded-lg text-black  outline-none font-bold animate__animated animate__faster animate__zoomIn" />}
              </div>
            </div>
          </div>
          <div className="bg-white p-2">
            {/* { !showtable ? <Rechart data={data}/> : <StockTable/>} */}
            {!showtable ? <DataChart /> : <StockTable />}
          </div>
          <div>
            <Link to='/upload-stock' className=" flex ml-20 p-2  bg-my-blue text-white rounded-lg w-3/4 bottom-2 absolute justify-center items-center">
              Upload- <span className="font-bold">Desktop </span> -  Stock
            </Link>
          </div>
        </div>
      </div>
     
      {isStockModalOpen && <StockLocation  isOpen={isStockModalOpen} onClose={closeStockModal} />}

      {newCategory && (
        <CreateNewCategory isOpen={newCategory} onClose={closeNewCategoryModal} />
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }: StoreState): { auth: Auth } => {
  return {
    auth,
  };
};

export const StockDashboard = connect(mapStateToProps, {
  FC_SetSuccess,
  FC_SetError,
})(App);
