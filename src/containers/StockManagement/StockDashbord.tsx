import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import DataChart from "./DataChart";
import { Auth, FC_SetError, FC_SetSuccess } from "../../actions";
import Alert, { AlertType } from "../../components/Alert/Alert";
import { GoDatabase } from "react-icons/go";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { GiConfirmed } from "react-icons/gi";
import StockTable from "./DataTable";
import StockLocation from "../../components/stockLocation/StockLocation";
import Categories from "./Categories";
import CategoriesData from "../../utils/CategoriesData";
import { Link } from "react-router-dom";

interface AppProps {
  auth: Auth;
  FC_SetSuccess: (msg: string) => void;
  FC_SetError: (msg: string) => void;
}

const App: React.FC<AppProps> = ({ auth, FC_SetSuccess, FC_SetError }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // componentDidMount logic here
  }, []);

  const [showtable, setShowTable] = useState(false);

  function displayTable(){
    setShowTable(true);

  }

  function displayDashboard(){
    setShowTable(false);
  }
  const [isPopupOpen, setPopupOpen] = useState(false);

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  const categoryData = CategoriesData.map(category =>{
    return <Categories CategoryName={category.CategoryName} totalAsset={category.totalAsset}/>
  });
  const totalCategories = categoryData.length;
  return (
    <div className="mr-4 ">
      <div className="flex flex-row items-center gap-5 mb-2 bg-white rounded-lg p-3 animate__animated animate__fadeInRight animate__faster justify-between">
        <div className="pl-1 flex gap-2 items-center ">
          <GoDatabase className="text-4xl text-my-blue" />
          <div className="flex item-center flex-col">
            <div className="flex text-black text-xl font-bold px-2">
              Stock Management
            </div>
            <div className="px-2 rounded-md bg-primary-700 text-black w-max text-sm">
              Manage Stock From Different Location In One College
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col justify-center align-center">
            <p className="text-gray-400 justify-center">category</p>
            <h2 className="text-black font-bold text-2xl flex justify-center">
              {totalCategories}
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
          onClick={handleOpenPopup}
          className="p-2 bg-blue-white rounded-lg text-my-blue justify-center items-center flex flex-row gap-2">
            <MdOutlineAddBusiness /> Create Stock Location
          </button>
        </div>
      </div>

      {error !== null && (
        <div className="w-full my-3">
          {error !== "" && (
            <Alert
            alertType={AlertType.WARNING}
            title={"Not found!"}
            description={error}
              close={() => {
                setError("");
              }}
              className={"border-2 border-white"}
            />
          )}
        </div>
      )}

      <div className="flex flex-row gap-4">
        <div className="relative w-1/3 p-4 rounded-lg bg-white py-10 pb-16 animate__animated animate__fadeInRight animate__fast min-h-96">
          <div className="flex">
            <h3 className="text-xl font-bold text-black justify-center">
              Asset Categories
            </h3>
          </div> 
          <div className=" flex flex-wrap gap-2 mt-2">
         {categoryData}
             
          </div>
          {/* ... (repeat the above block for each category) ... */}
          <button className="ml-8 p-2 border-2 border-my-blue text-my-blue rounded-lg w-3/4 bottom-2 absolute justify-center items-center">
            Create New Category
          </button>
        </div>

        <div className="w-2/3 h-full p-4 rounded-lg bg-white py-10 pb-16 animate__animated animate__fadeInRight animate__fast">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <IoMdMenu className="text-2xl text-gray-400" />
              <h3 className="text-black font-bold"> Desktop - Assets</h3>
            </div>
            <div className="flex flex-row items-center gap-2">
              <GiConfirmed className="text-3xl text-[#53cc75]" />
              <div>
                <h4>total Desktop</h4>
                <h3 className="font-bold text-xl">3,200</h3>
              </div>
            </div>
          </div>
          <div>
          <div className=" flex flex-row justify-between border-b-2 border-blue-white">
            <div className="flex flex-row justify-between">
            <button className={!showtable? " text-black font-bold border-b-2 border-my-blue" : "text-black text-xl"} onClick={displayDashboard}> Dashboard</button>
            </div>
            <div>
            <button className={showtable? " text-black font-bold border-b-2 border-my-blue" : "text-black text-xl"} onClick={displayTable}>list</button>
            </div>
            <div>
          {showtable && <input type="text" placeholder=" search..."  className="bg-gray-200 py-1 px-16 rounded-lg text-black  outline-none font-bold" />}
            </div>
            </div>
          </div>
          <div className="bg-white p-2">
            { !showtable ? <DataChart /> : <StockTable/>}
          </div>
          <div>
          <Link to= '/upload-stock' className=" flex ml-20 p-2  bg-my-blue text-white rounded-lg w-3/4 bottom-2 absolute justify-center items-center">
            Upload- <span className="font-bold">Desktop </span> -  Stock
          </Link>
          </div>
        </div>
      </div>
      {isPopupOpen && <StockLocation onClose={handleClosePopup} />}
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
