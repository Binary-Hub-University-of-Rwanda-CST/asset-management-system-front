import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
// import assetSpecifications from "../../../utils/uploadSpecification";
import { saveValidatedData } from "../../../actions/saveUploaded.action";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";
import Alert, {AlertType} from "../../../components/Alert/Alert";
import { useNavigate } from 'react-router-dom'; 
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tableHeaders: string[];
  tableData: Record<string, any>[];
  tag?: string[];
}

const ValidationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  tableHeaders,
  tableData,
  tag,
}) => {
  const [filteredData, setFilteredData] = useState<Record<string, any>[]>([]);
  const [saveError, setSaveError] = useState<string|null>(null);
  const [showRemove, setShowRemove] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Initially, set filteredData to tableData
    setFilteredData(tableData);
    // console.log(tableData); 
  }, [tableData]);

  const uploadSpecification = useSelector((state: StoreState) => state.uploadSpecificaiton.specifications);  
  useEffect(() => {
    setFilteredData(validateData(tableData));
  }, [tableData, uploadSpecification, tableHeaders]);
  const dispatch: AppDispatch = useDispatch();
  
  


  const validateData = (data: Record<string, any>[]) => {
    const uniqueValuesTracker: Record<string, Set<any>> = {};
    uploadSpecification.forEach((spec) => {
      if (spec.unique) {
        uniqueValuesTracker[spec.name] = new Set();
      }
    });
  
    const validatedData = data.map((row) => {
      const validatedRow: Record<string, any> = {};
      let hasErrors = false;
  
      tableHeaders.forEach((header) => {
        const spec = uploadSpecification.find((spec) => spec.name === header);
        if (spec) {
          const cellValue = row[header];
          let error = null;
  
          // Validation checks...
          if (spec.required && (!cellValue || cellValue === "")) {
            error = "Required field";
          } else if (spec.allowedValues && !spec.allowedValues.includes(cellValue)) {
            const allowedValuesToShow = spec.allowedValues.slice(0, 2).join(", ");
            const allowedValuesMessage =
              spec.allowedValues.length > 2 ? `${allowedValuesToShow}, ...` : allowedValuesToShow;
            error = `Invalid value. Expected: ${allowedValuesMessage}`;
          } else if (spec.type === "string" && typeof cellValue !== "string") {
            error = "Expected a string value";
          } else if (spec.type === "number" && isNaN(parseFloat(cellValue))) {
            error = "Must be a number";
          } else if (spec.unique && uniqueValuesTracker[header]?.has(cellValue)) {
            error = "Duplicate value found";
          }
  
          if (error) {
            hasErrors = true;
          }
  
          validatedRow[header] = { value: cellValue, error };
        } else {
          validatedRow[header] = { value: row[header], error: "Specification not found" };
          hasErrors = true;
        }
      });
  
      validatedRow.hasErrors = hasErrors;
      return validatedRow;
    });
  
    return validatedData;
  };
  // Helper function to check if any errors exist in the row
  const hasAnyErrors = (row: Record<string, any>) => {
    for (const header in row) {
      if (header !== 'hasErrors' && row[header]?.error !== null) {
        return true; // Found an error in the row
      }
    }
    return false; // No errors found in the row
  };
  
  

  const handleOverlayClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const transformDataForUpload = (data: any[]) => {
    return data.map((row) => {
      
      const transformedRow: { [key: string]: any } = {};
      for (const key in row) {
        if (row.hasOwnProperty(key)) {
          transformedRow[key] = row[key].value;
        }
      }
      return transformedRow;
    });
  };
  
  
  const handleSaveData = () => {
    const isValid = filteredData.every(row => !row.hasErrors);
  
    if (isValid) {
      const transformedData = transformDataForUpload(filteredData);
  
      dispatch(saveValidatedData(transformedData));
      localStorage.setItem("validatedAssetsData", JSON.stringify(transformedData));
      onClose();
      navigate('/upload-assets');
    } else {
      console.error("Cannot save data. Please fix validation errors.");
      setSaveError('Cannot save data. Please fix validation errors.');
    }
  };
   
  
  

  const handleDeleteRow = (rowIndex: number) => {
    const updatedData = filteredData.filter((_, index) => index !== rowIndex);
    setFilteredData(updatedData);
  }; 

 
  const handleRemove = () => setShowRemove(!showRemove);

  const handleCellEdit = (newValue: any, rowIndex: number, header: string) => {
    const updatedData = [...filteredData];
    const spec = uploadSpecification.find((spec) => spec.name === header);
  
    if (spec) {
      let error = null;
      if (spec.required && (!newValue || newValue === "")) {
        error = "Required field";
      } else if (spec.allowedValues && !spec.allowedValues.includes(newValue)) {
        const allowedValuesToShow = spec.allowedValues.slice(0, 2).join(", ");
        const allowedValuesMessage = spec.allowedValues.length > 2 ? `${allowedValuesToShow}, ...` : allowedValuesToShow;
        error = `Invalid value. Expected: ${allowedValuesMessage}`;
      } else if (spec.type === "string" && typeof newValue !== "string") {
        error = "Expected a string value";
      } else if (spec.type === "number" && isNaN(parseFloat(newValue))) {
        error = "Must be a number";
      } else if (
        spec.unique &&
        updatedData.some(
          (row, index) => index !== rowIndex && row[header].value === newValue
        )
      ) {
        error = "Duplicate value found";
      }
  
      updatedData[rowIndex] = {
        ...updatedData[rowIndex],
        [header]: {
          value: newValue,
          error: error,
        },
      };
  
      // Recalculate hasErrors for the entire row
      updatedData[rowIndex].hasErrors = Object.keys(updatedData[rowIndex]).some(
        key => key !== 'hasErrors' && updatedData[rowIndex][key].error !== null
      );
  
      setFilteredData(updatedData);
    }
  };
   

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-screen h-full flex items-center justify-center bg-black bg-opacity-50 pt-20 px-4 z-50"
          onClick={handleOverlayClick}
        >
          <div className="bg-white w-full h-full py-4 rounded-t-xl animate__animated animate__fadeInUp animate__faster">
            <div className="flex flex-row gap-3 justify-between  items-center bold border-blue-white border-b-2 pb-2 mx-0 px-5">
              <div className=" flex gap-2 ">
                <button
                  className="flex gap-1 items-center text-my-blue bg-blue-white rounded-lg py-1 px-2 top-2 left-2 hover:text-gray-800"
                  onClick={onClose}
                >
                  <FaArrowLeft /> Back to list
                </button>
                <h4 className="font-bold text-md pr-5">{title}</h4>
                {tag &&
                  tag.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-white text-my-blue font-bold text-sm rounded-md px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
              <div>
                {saveError && 
                <Alert
                // className="border border-danger text-red-700 rounded-md px-2  " 
                alertType={AlertType.DANGER} title={saveError}  close={()=>{setSaveError(null)} } timeOut={5000}/>  }    
              </div>
              <div className="flex gap-2  ">
                {!showRemove ? (
                  <button
                    onClick={handleRemove}
                    className=" border border-danger flex gap-2 p-2 rounded-md  items-center  py-1 "
                  >
                    <FaTrashAlt className=" text-red-700" />
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={handleRemove}
                    className=" border border-danger flex gap-2 p-2 rounded-md  items-center  py-1   "
                  >
                    <TiArrowBack className=" text-red-700" />
                    Cancel
                  </button>
                )}
                {!showRemove && (
                <button
                className={`flex items-center gap-2 bg-my-blue text-white rounded-md py-1 p-2 ${filteredData.some(row => row.hasErrors) ? 'opacity-50 cursor-not-allowed' : ''}`}
                onClick={handleSaveData}
                disabled={filteredData.some(row => row.hasErrors)} 
              >
                <FaRegCheckCircle />
                Save Assets Data
              </button>
              
              
                
                )}
              </div>
            </div>

            <div className="flex flex-col px-6 py-2">
              <div className="overflow-x-auto mt-4">
                <div style={{ maxHeight: "600px" }}>
                  {filteredData.length > 0 ? (
                    <table className="min-w-full">
                      <thead>
                        <tr>
                          {showRemove && (
                            <th className="px-4 py-2 text-left text-sm font-bold text-black uppercase"></th>
                          )}
                          <th className="px-4 py-2 text-left text-sm font-bold text-black uppercase">
                            #
                          </th>
                          {tableHeaders.map((header) => (
                            <th
                              key={header}
                              className="px-4 py-3 text-left text-sm font-bold text-black uppercase"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {showRemove && (
                              <td className="px-4 py-1 font-sm">
                                <button
                                  className="px-4 py-1 rounded-md border hover:bg-danger border-red-500"
                                  onClick={() => handleDeleteRow(rowIndex)}
                                >
                                  <FaTrashAlt className="text-red-700" />
                                </button>
                              </td>
                            )}
                            <td className="px-2 py-1 font-sm">
                              {rowIndex + 1}
                            </td>
                            {tableHeaders.map((header, cellIndex) => {
                              const spec = uploadSpecification.find(
                                (spec) => spec.name === header
                              );
                              return (
                                <td
                                  key={`${rowIndex}-${cellIndex}`}
                                  className={`px-1 font-sm`}
                                >
                                  {spec && spec.allowedValues ? (
                                    <>
                                      <select
                                        className={`px-2 py-1 border ${
                                          row[header].error
                                            ? "border-red-600"
                                            : "border-blue-white"
                                        } rounded-md outline-my-blue`}
                                        value={row[header].value}
                                        onChange={(e) =>
                                          handleCellEdit(
                                            e.target.value,
                                            rowIndex,
                                            header
                                          )
                                        }  
                                      >
                                        <option value="" disabled>
                                          Select an option
                                        </option>
                                        {spec.allowedValues.map((value) => (
                                          <option key={value} value={value}>
                                            {value}
                                          </option>
                                        ))}
                                      </select>
                                      {row[header].error && (
                                        <div className="text-red-600 text-sm mt-1">
                                          {row[header].error}
                                        </div>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <input
                                        className={`px-2 py-1 border ${
                                          row[header].error
                                            ? "border-red-600"
                                            : "border-blue-white"
                                        } rounded-md outline-my-blue`}
                                        type="text"
                                        value={row[header].value}
                                        onChange={(e) =>
                                          handleCellEdit(
                                            e.target.value,
                                            rowIndex,
                                            header
                                          )
                                        }
                                      />
                                      {row[header].error && (
                                        <div className="text-red-600 text-sm mt-1">
                                          {row[header].error}
                                        </div>
                                      )}
                                    </>
                                  )}
                                </td>
                              );
                            })}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <h1 className="text-center">No data found</h1>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
 
export default ValidationModal;
