import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../reducers";
import { Auth, FC_SetError, FC_SetSuccess } from "../../actions";
import Alert,{AlertType} from "../../components/Alert/Alert";
import { AiOutlineScan } from "react-icons/ai";
import { FaHashtag } from "react-icons/fa";
import { IoQrCodeSharp } from "react-icons/io5";
import { FaBarcode } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";

import Dropdown from "../../components/Fragments/DropDown";
import CategoriesData from "../../utils/CategoriesData";

interface AppProps {
  auth: Auth;
  FC_SetSuccess: (msg: string) => void;
  FC_SetError: (msg: string) => void;
}

const AssetTracking: React.FC<AppProps> = ({ auth, FC_SetSuccess, FC_SetError }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    // componentDidMount logic goes here if needed
  }, []);


  const options = CategoriesData;
  return (
    <div className="mr-4">
      <div className="flex flex-row justify-between bg-white rounded-lg p-3 animate__animated animate__faster animate__fadeInBottomLeft">
        <div className="pl-1 flex gap-2 items-center ">
          <AiOutlineScan className="text-4xl text-my-blue" />
          <div className="flex item-center flex-col">
            <div className="flex text-black text-xl font-bold px-2">
              Track For an asset
            </div>
            <div className="px-2 rounded-md bg-primary-700 text-gray-500 w-max text-sm">
              Track For asset using  serial number, Category , and Scnaning Code
            </div>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <Dropdown options={options}/>
        </div>
        </div>
      <div className=" py-4 rounded-lg  flex flex-row gap-4 ">
     <div className="flex flex-col w-1/3 justify-center items-center px-10 py-4 bg-white rounded-lg">
      <FaHashtag className="text-my-blue font-bold  text-7xl"/>
      <h3 className="text-3xl font-bold  ">Serial Number</h3>
      <h5 className=" text-sm text-gray-500">Track for asset when serial number is already known</h5>
      </div>
     <div className="flex flex-col w-1/3 justify-center items-center px-10 py-4 bg-white rounded-lg">

      <IoQrCodeSharp className="text-my-blue font-bold  text-7xl"/>
      <h3 className="text-3xl font-bold  ">QR-Code</h3>
      <h5 className=" text-sm text-gray-500">Track for asset by scanning QR-Code on the Asset</h5>
     </div>
     <div className="flex flex-col w-1/3 justify-center items-center px-10 py-4 bg-white rounded-lg">
      <FaBarcode className="text-my-blue font-bold  text-7xl"/>
      <h3 className="text-3xl font-bold  ">Barcode</h3>
      <h5 className=" text-sm text-gray-500">Track for asset by scanning Barcode on the Asset</h5>
     </div>
    </div>

    <div className=" w-full bg-white rounded-lg px-4 py-4 flex flex-row  justify-between animate__animated">
      <div className="flex flex-row gap-4  items-center">
        <FaSearch className="text-5xl font-bold  text-info"/>
        <div>
          <h3 className=" font-bold text-xl">Search For Asset</h3>
        <h5 className="text-md text-gray-500"> if you don't have serial number, qr-code or bar code please using oprion to search for the Asset</h5>
        </div>
      </div>
      <div className=" flex items-center">
        <MdOutlineArrowOutward className="text-5xl font-bold text-gray-500"/>
      </div>
       </div>
    </div>
  );
};

const mapStateToProps = ({ auth }: StoreState): { auth: Auth } => {
  return {
    auth,
  };
};

export default connect(mapStateToProps, {
  FC_SetSuccess,
  FC_SetError,
})(AssetTracking);
