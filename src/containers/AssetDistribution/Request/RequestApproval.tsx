import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { StoreState } from "@react-pdf-viewer/core"; 
import { Auth, FC_SetError, FC_SetSuccess } from "../../../actions";
import Alert, { AlertType } from "../../../components/Alert/Alert";
import { FaRegCheckCircle } from "react-icons/fa";
import { BsFillPrinterFill } from "react-icons/bs";
import RequestData from "../../../utils/RequestData";

import RequestApprovalTable from "./RequestApprovalTable";

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

const RequestApproval: React.FC<AppProps> = ({ auth, FC_SetSuccess, FC_SetError }) => {
  const [state, setState] = useState<AppState>({
    loading: false,
    success: "",
    error: "",
  });

  const [selectedStatus, setSelectedStatus] = useState<string | null>('pending');

  useEffect(() => {
    // Equivalent to componentDidMount
    // You can place your componentDidMount logic here
  }, []);
      // Calculate lengths for each status
      const pendingCount = RequestData.filter((item) => item.status.toLowerCase() === 'pending').length;
      const approvedCount = RequestData.filter((item) => item.status.toLowerCase() === 'approved').length;
      const rejectedCount = RequestData.filter((item) => item.status.toLowerCase() === 'rejected').length;
    

      
  return (
    <div className="mr-4 mt-20 ml-72">
     <div  className=" flex flex-col mb-2 bg-white rounded-lg p-3 animate__animated animate__fadeInRight animate__faster">
      <div className="flex flex-row items-center justify-between ">
      <div className="flex flex-row items-center justify-between ">
        <div className="pl-1 flex gap-2 items-center  ">
          <FaRegCheckCircle className="text-4xl text-my-blue" />
          <div className="flex item-center flex-col">
            <div className="flex text-black text-2xl font-bold px-2">
             Asset Request Validation
            </div>
            <div className="px-2 rounded-md bg-primary-700 text-black w-max text-sm">
              List of Requested Asset With Their Status
            </div>
          </div>
          </div>
      </div>
        <div className="flex justify-center items-center gap-5">
            <button className="py-2 px-6  border-2 border-my-blue rounded-lg text-black flex flex-row items-center gap-2"><BsFillPrinterFill className=" text-my-blue" />Print Report</button>
        </div>
        </div>
        <div className=" flex flex-row gap-12 text-xl ml-10 mt-4"> 
        <button 
        onClick={() => setSelectedStatus('pending')}
        className={ (selectedStatus == 'pending')? "border-b-2 border-my-blue px-4 py-2 font-bold": ""}>
            pending requests
             <span className="px-2 rounded-full bg-info text-white ml-2" >{pendingCount}</span>
             </button>
        <button
        onClick={() => setSelectedStatus('approved')}
        className={ (selectedStatus == 'approved')? "border-b-2 border-my-blue px-4 py-2 font-bold": ""}
        >
            Approved Requests <span className="px-2 rounded-full bg-confirm text-white" >{approvedCount}</span></button>
        <button
        onClick={() => setSelectedStatus('rejected')}
        className={ (selectedStatus == 'rejected')? "border-b-2 border-my-blue px-4 py-2 font-bold": ""}>
            Rejected Requests <span className="px-2 rounded-full bg-[#ca1d1d] text-white" >{rejectedCount}</span></button>
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
      <div className="p-4 rounded-lg overflow-y-auto bg-white py-10 pb-16 animate__animated animate__fadeInRight animate__fast ">
      <RequestApprovalTable selectedStatus={selectedStatus} />
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
})(RequestApproval);
