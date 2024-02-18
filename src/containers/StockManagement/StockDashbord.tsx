import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import DataChart from "./DataChart";
import { Auth, FC_SetError, FC_SetSuccess } from "../../actions";
import { GoDatabase } from "react-icons/go";
import { MdOutlineAddBusiness } from "react-icons/md";
import { IoMdMenu } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import StockTable from "./DataTable";
import StockLocation from "../../components/stockLocation/StockLocation";
import Modal from '../../components/modal/Modal'
import Categories from "./Categories";
import CategoriesData from "../../utils/CategoriesData";
import { Link } from "react-router-dom";
import { number } from "prop-types";



const App = () => {

 

  const [showtable, setShowTable] = useState(false);

  function displayTable(){
    setShowTable(true);

  }

  function displayDashboard(){
    setShowTable(false);
  }
  const [isNewStock, setNewStock] = useState(false);

  const handleOpenPopup = () => {
    setNewStock(true);
  };

  const handleClosePopup = () => {
    setNewStock(false);
  };

  const [activeCategory, setActiveCategory] = useState(1)

  const iamActive  = (key:number) =>{
  setActiveCategory(key);
  // alert(activeCategory);
  }

  const [newCategory, setNewCategory] = useState(false);

  const closeNewCategoryModal = () => {
      setNewCategory(false);
  };
  const CreateNewCategory = () =>{
    setNewCategory(true);
    // alert(newCategory);
  }
  const [categoryName, setCategoryName] = useState('');
  
  function handleCategoryName(e:any){
      setCategoryName(e.target.value);
  }

  const categoryData = CategoriesData.map(category =>{
    return (
    <Categories 
    key={category.id}
    id={category.id}
    CategoryName={category.CategoryName} 
    totalAsset={category.totalAsset}
    handleActive = {iamActive}
    isActive = {activeCategory === category.id}
    />
    );
  });

  
  const totalCategories = categoryData.length;
  return (
    <div className="mr-4 ">
      <div className="flex flex-row items-center gap-5 mb-2 bg-white rounded-lg p-3  justify-between">
        <div className="pl-1 flex gap-2 items-center ">
          <GoDatabase className="text-4xl font-bold text-my-blue" />
          <div className="flex item-center flex-col">
            <div className="flex text-black text-xl font-bold px-2">
              Stock Management
            </div>
            <div className="px-2 rounded-md bg-primary-700 text-black  w-max text-sm">
              Manage Stock From Different Location In One College
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <div className="flex flex-col justify-center align-center">
            <p className="text-gray-400 justify-center">category</p>
            <h2 className="text-black font-bold text-2xl flex justify-center">
              {totalCategories<10 ? `0${totalCategories}`: `${totalCategories}`}
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

      
      <div className="flex flex-row gap-4">
        <div className="relative w-1/3 p-4 rounded-lg bg-white py-10 pb-16 animate__animated animate__fast animate__fadeInBottomRight min-h-96">
          <div className="flex">
            <h3 className="text-xl font-bold text-black justify-center">
              Asset Categories
            </h3>
          </div> 
          <div className=" flex  justify-center flex-wrap gap-2 mt-2">
         {categoryData}
             
          </div>
          {/* ... (repeat the above block for each category) ... */}
          <button 
        onClick={CreateNewCategory}
          className="ml-8 p-2 border-2 border-my-blue text-my-blue rounded-lg w-3/4 bottom-2 absolute justify-center items-center">
            Create New Category
          </button>
        </div>

        <div className="w-2/3 h-full p-4 rounded-lg relative bg-white py-10 pb-16 animate__animated animate__fadeInBottomRight animate__fast">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row items-center">
              <IoMdMenu className="text-2xl text-gray-400" />
              <h3 className="text-black font-bold"> Desktop - Assets</h3>
            </div>
            <div className="flex flex-row items-center gap-2">
            <FaRegCheckCircle className="text-3xl font-bold text-confirm"/>
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
             className={!showtable? " text-black font-bold border-b-2 border-my-blue text-xl" : "text-black text-xl"} 
             onClick={displayDashboard}> Dashboard</button>
            </div>
            <div>
            <button
             className={showtable? " text-black font-bold border-b-2 border-my-blue text-xl" : "text-black text-xl"}
              onClick={displayTable}>List</button>
            </div>
            <div>
          {showtable && <input type="text" placeholder=" search..."  className="bg-gray-200 py-1 px-16 rounded-lg text-black  outline-none font-bold animate__animated animate__faster animate__zoomIn" />}
            </div>
            </div>
          </div>
          <div className="bg-white p-2">
            {/* { !showtable ? <Rechart data={data}/> : <StockTable/>} */}
            { !showtable ? <DataChart/> : <StockTable/>}
          </div>
          <div>
          <Link to= '/upload-stock' className=" flex ml-20 p-2  bg-my-blue text-white rounded-lg w-3/4 bottom-2 absolute justify-center items-center">
            Upload- <span className="font-bold">Desktop </span> -  Stock
          </Link>
          </div>
        </div>
      </div>
      {isNewStock && <StockLocation onClose={handleClosePopup} />}

     { newCategory && 
      <Modal isOpen={newCategory} onClose={closeNewCategoryModal} title="Create New Asset Category" >
       <div className='flex flex-col items-start p-5 w-[650px]'>
        <label htmlFor="category">Category name</label>
        <input type="text"
        onChange={handleCategoryName}
        
        className=' p-2 font-bold bg-my-gray rounded-md outline-none px-5  mt-2 w-full'
        placeholder='Enter category name '
        />
        <h3 className=' mb-2'>specifications &  values</h3>
        <div className='flex flex-col items-center  bg-my-gray rounded-md w-full py-5 px-5'>
            <h3 className=' font-bold text-md '>No specification Added</h3>
            <h5 className=' items-center   mb-2 text-sm text-gray-600'> please click the following button to create new <br />
            specification and value</h5>
            <button className=' border-my-blue border-2  items-center w-full rounded-md  py-2 bg-white text-my-blue text-xl '> Create <span className='font-bold'>-new-</span>  specifification</button>
        </div>
        <button className=' w-full py-2 bg-my-blue rounded-md text-white text-xl mt-5'>create <span className='font-bold'>-{categoryName? categoryName : 'new'}-</span>  category</button>

       </div>
      </Modal>
      }

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
