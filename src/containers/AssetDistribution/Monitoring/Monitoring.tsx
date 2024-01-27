import React, { ReactElement, useEffect, useState } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import { Auth, FC_SetError, FC_SetSuccess } from "../../../actions";
import Alert, { AlertType } from "../../../components/Alert/Alert";
import { IoShareSocialOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiConfirmed } from "react-icons/gi";
import { CiViewTable } from "react-icons/ci";
import { ImStatsBars } from "react-icons/im";
import { RiFileExcel2Line } from "react-icons/ri";  

import Dropdown from "../../../components/Fragments/DropDown";
import CategoriesData from "../../../utils/CategoriesData";
import DepartmentsChart from "./ChartData/DepartmentChartData";
import BuildingsChart from "./ChartData/BuildingChart";
import DepartmentTable from "./TableData/DepaartmentDataTable";
import BuildingsTable from "./TableData/BuildingDataTable";
import { BiExclude } from "react-icons/bi";

interface AppProps {
  auth: Auth;
  FC_SetSuccess: (msg: string) => void;
  FC_SetError: (msg: string) => void;
}

interface AppState {
  loading: boolean;
  success: string;
  error: string;
}

const Monitoring: React.FC<AppProps> = ({ auth, FC_SetSuccess, FC_SetError }) => {
  const [state, setState] = useState<AppState>({
    loading: false,
    success: "",
    error: "",
  });

  useEffect(() => {
    // Equivalent to componentDidMount
    // You can place your componentDidMount logic here
  }, []);

  const [showTableData, setShowTableData] =useState(false);
  const [byDepartment, setByDepartment] = useState(true);

  //Toggle  show data in Table Or In Graph
  const ShowDataInTable = () =>{
    setShowTableData(true);
  };
  const ShowGraphData = () =>{ setShowTableData(false)
  };

  // toggle show data of Department or of Building

  const ShowBuildingData = () =>{
    setByDepartment(false);
  }

  const ShowDepartmnentData = () =>{
    setByDepartment(true);
  }

  let dataPresented = <DepartmentsChart/>;

  if(byDepartment && !showTableData){
    dataPresented = <DepartmentsChart/>
  }
  else if(byDepartment && showTableData){
    dataPresented = <DepartmentTable/>
  }
  else if(!byDepartment && !showTableData){
    dataPresented =<BuildingsChart/>
  }
  else if (!byDepartment && showTableData){
    dataPresented = <BuildingsTable/>
  }
  const options = CategoriesData;

  return (
    <div className="mr-4 ">
      <div className="flex flex-col mb-2 bg-white rounded-lg p-3 gap-2 animate__animated animate__fadeInRight animate__faster justify-between">
      <div className="flex flex-row items-center gap-5 justify-between ">
        <div className="pl-1 flex gap-2 items-center ">
          <IoShareSocialOutline className="text-4xl text-my-blue" />
          <div className="flex item-center flex-col">
            <div className="flex text-black text-2xl font-bold px-2">
             Asset Distribution Monitoring
            </div>
            <div className="px-2 rounded-md bg-primary-700 text-black w-max text-sm">
              This Screen Helps YOU to Monitor How Assset Are Distributed in Didderent Loctation 
            </div>
          </div>
          </div>
        <div className="flex justify-center items-center z-50">
      <Dropdown  options={options} />
        </div>
      </div>
       <div className="flex flex-row  justify-between">
            <div className="flex flex-row gap-4">
              <button
              onClick={ShowDepartmnentData}
              className={byDepartment ? "text-xl font-bold border-b-2 border-my-blue": " text-xl"}
              > by department</button>
              <button
              onClick={ShowBuildingData}
              className={!byDepartment ? "text-xl font-bold border-b-2 border-my-blue px-4 py-2": " text-xl px-4 py-2"}
              > by Building</button>
              </div>
            <div className="flex flex-row gap-4 items-center ">
              <div className="flex flex-row items-center gap-2"> 
              <RiDeleteBin6Line className="text-3xl text-red-600"/>
              <div className="flex flex-col  items-center">
                <h5>Total Damaged</h5>
                <h3 className="font-bold text-xl">300</h3>

              </div>
              </div>
              <div className="flex flex-row items-center gap-2"> 
              <GiConfirmed className="text-3xl text-green-600"/>
              <div className="flex flex-col items-center ">
                <h5>Total Active</h5>
                <h3 className="text-xl font-bold"> 3200</h3>
              </div>
              </div>
            </div>
          </div>
      </div>

      {state.error !== null && (
        <div className="w-full my-3">
          {state.error !== "" && (
            <Alert
              alertType={AlertType.WARNING}
              title={"Not found!"}
              description={state.error}
              close={() => {
                setState({
                  ...state,
                  error: "",
                });
              }}
              className={"border-2 border-white"}
            />
          )}
        </div>
      )}
      <div className=" rounded-lg bg-white py-2 pb-16 ">
        <div className="flex items-center  gap-2 border-b-2 border-my-gray py-2 ">
          <button 
          onClick={ShowGraphData}
          className={!showTableData ? " py-2 bg-blue-white font-bold text-xl rounded-lg px-4 flex flex-row items-center  gap-2 text-my-blue ml-4" :"py-2 bg-my-gray rounded-lg px-4 flex flex-row items-center text-xl gap-2 ml-4 "}>
            <ImStatsBars className="font-bold" />
             graph 
             </button>
          <button 
          onClick={ShowDataInTable}
          className={showTableData ? " py-2 bg-blue-white font-bold text-xl rounded-lg px-4 flex flex-row items-center  gap-2 text-my-blue " :"py-2 bg-my-gray rounded-lg px-4 flex flex-row items-center text-xl gap-2"}>
            <CiViewTable /> 
            Table
            </button>

            <button className={showTableData ? "py-2 px-4 flex flex-row absolute right-4 items-center gap-2 bg-[#edfbf5] rounded-lg": "hidden"}>  <RiFileExcel2Line className="text-[#68d9a9] font-bold"/> Download Excel</button>
        </div>
        <div className=" flex  h-96 justify-center items-center w-full mt-6">
          {/* {byDepartment? <DepartmentsChart/>: <BuildingsChart/>} */}
          {/* {byDepartment && showTableData ? <DepartmentTable/>: <BuildingsTable/>} */}
          {dataPresented}
          
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({
  auth,
}: StoreState): {
  auth: Auth;
} => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, {
  FC_SetSuccess,
  FC_SetError,
})(Monitoring);
