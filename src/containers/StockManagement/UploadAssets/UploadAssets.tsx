import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { StoreState } from "../../../reducers";
import { Auth, FC_SetError, FC_SetSuccess, fetchAssets } from "../../../actions";
import Alert, { AlertType } from "../../../components/Alert/Alert";
import { GoDatabase } from "react-icons/go";
import UploadModal from "../Components/UploadModal";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpecifications } from "../../../actions/uploadpecification.action";
import { AppDispatch } from "../../../app/store";
import UploadSummary from "./UploadSummary";
import { FaPlus, FaRegCheckCircle } from "react-icons/fa";
import DynamicTable from "./UploadedAssetList";
import Successfully from "../../../components/Successfully/Successfully";
import LoadingCircle from "../../../components/Loading/LoadingCircle";
import { saveValidatedData, sendValidatedData } from "../../../actions/saveUploaded.action";
import { useNavigate } from "react-router-dom";

interface AppProps {
  auth: Auth;
  FC_SetSuccess: (msg: string) => void;
  FC_SetError: (msg: string) => void;
}

const UploadStock: React.FC<AppProps> = ({
  auth,
  FC_SetSuccess,
  FC_SetError,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>("");  
  const [showSummary, setShowSummary] = useState(false);
  const [uploadDataModalOpen, setUploadDataModalOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();
  const ValidatedData = useSelector((state: StoreState) => state.validatedData.validatedData);

  useEffect(() => {
    dispatch(fetchSpecifications());
  }, [dispatch]);

  const totalValidatedData = ValidatedData.length;

  const activeLink = "text-lg font-bold border-b-2 border-my-blue py-1 pb-0 ";

  const handleSaveAssets = async () => {
    setLoading(true);
    try {
      await dispatch(sendValidatedData(ValidatedData));
      setShowSuccess(true);
      setError(""); // Clear any previous errors
      handleDeleteAllAssets();
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const closeUploadDataModal = () => {
    setUploadDataModalOpen(false);
  };

  const createUploadData = () => {
    setUploadDataModalOpen(true);
  };

  const handleDeleteAllAssets = () => {
    dispatch(saveValidatedData([]));
  };

  const handleDismissError = () => {
    setError("");
  };

  const closeSucces = () => {
    setShowSuccess(false);
    // dispatch(fetchAssets()); // Fetch the assets to refresh the list
    navigate('/'); // Navigate to the desired route
  }

  return (
    <div className="mr-4 flex flex-col gap-4">
      <div className="flex flex-col gap-1 bg-white rounded-lg p-2 pb-0 justify-between">
        <div className="flex flex-row justify-between">
          <div className="pl-1 flex gap-2 items-center">
            <GoDatabase className="text-4xl text-my-blue" />
            <div className="flex item-center flex-col">
              <div className="flex text-black text-xl font-bold px-2">
                Upload Assets
              </div>
              <div className="px-2 rounded-md bg-primary-700 text-black w-max text-sm">
                Upload Assets in Building room
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-col justify-center align-center mt-">
              <p className="text-gray-400">total uploads</p>
              <h2 className="text-black font-bold text-2xl flex justify-center">
                {totalValidatedData}
              </h2>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex-row gap-10 ml-10 text-lg">
            <button
              type="button"
              className={`text-lg py-1 pb-0 px-2 ${!showSummary && activeLink}`}
              onClick={() => setShowSummary(false)}
            >
              Asset List
            </button>
            <button
              onClick={() => setShowSummary(true)}
              className={`text-lg px-2 py-1 pb-0 ml-10 ${showSummary && activeLink}`}
            >
              Summary
            </button>
          </div>
          {ValidatedData.length > 0 && (
            <button
              className="bg-success rounded-md text-white px-2 flex gap-2 items-center"
              onClick={handleSaveAssets}
            >
              <FaRegCheckCircle />
              Save Assets in the Stock
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="w-full my-3">
          <Alert
            alertType={AlertType.DANGER}
            title={"Error"}
            description={error}
            close={handleDismissError}
            className={"border-2 border-white bg-danger"}
          />
        </div>
      )}

      <div className="bg-white py-10 pb-16 p-2 rounded-lg animate__animated animate__zoomIn animate__fast">
        {ValidatedData.length === 0 ? (
          <div className="flex flex-col p-4 rounded-lg bg-my-gray mx-12 gap-2 mb-56">
            <div className="flex items-center justify-center w-full">
              <h3 className="font-bold text-2xl text-black">No Assets Uploaded</h3>
            </div>
            <div className="text-center text-md text-gray-400">
              Click the following button to upload the Assets in a specific room
            </div>
            <div className="text-center font-light text-black">
              <button
                onClick={createUploadData}
                className="bg-my-blue text-white rounded-lg py-2 px-6 text-xl"
              >
                Upload Assets
              </button>
            </div>
          </div>
        ) : (
          <div className=" w-full ">
            {showSummary ? (
              <UploadSummary
                totalUploadedAssets={ValidatedData.length}
                status="not stored in stock"
                onDeleteAll={handleDeleteAllAssets}
              />
            ) : (
              <DynamicTable data={ValidatedData} />
            )}
            <button
              onClick={createUploadData}
              className=" flex justify-start items-center gap-4 p-2 w-full h-10 mt-4 bottom-4 border-2 border-blue-white rounded-md font-bold text-sm capitalize "
            >
              <FaPlus className="font-bold text-md text-my-blue" />
              add other assets
            </button>
          </div>
        )}
      </div>

      {uploadDataModalOpen && <UploadModal close={closeUploadDataModal} />}
      {loading && <LoadingCircle title="Saving Assets" subTitle="Please wait..." />}
      {showSuccess && !error && (
        <Successfully
          title={`assets Successfully Saved`}
          subTitle="Click the following button to continue"
          onClose={closeSucces}
          buttonText="Yes & Continue"
        />
      )}
    </div>
  );
};

const mapStateToProps = ({ auth }: StoreState): { auth: Auth } => ({
  auth,
});

export default connect(mapStateToProps, {
  FC_SetSuccess,
  FC_SetError,
})(UploadStock);
 