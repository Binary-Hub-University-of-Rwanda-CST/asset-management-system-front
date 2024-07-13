import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import assetSpecifications from "../../../utils/uploadSpecification";
import { saveValidatedData } from "../../../actions/saveUploaded.action";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";

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
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showRemove, setShowRemove] = useState(false);

  useEffect(() => {
    // Initially, set filteredData to tableData
    setFilteredData(tableData);
    console.log(tableData); 
  }, [tableData]);
  const dispatch: AppDispatch = useDispatch();

  const validateData = () => {
    // Create an object to keep track of unique values for each column
    const uniqueValuesTracker: Record<string, Set<any>> = {};

    // Initialize the tracker with empty sets for each column that requires unique values
    assetSpecifications.forEach((spec) => {
      if (spec.unique) {
        uniqueValuesTracker[spec.name] = new Set();
      }
    });

    const validatedData = tableData.map((row) => {
      const validatedRow: Record<string, any> = {};
      let hasErrors = false;

      tableHeaders.forEach((header) => {
        const spec = assetSpecifications.find((spec) => spec.name === header);
        if (spec) {
          const cellValue = row[header];

          // Validate required fields
          if (spec.required && (!cellValue || cellValue === "")) {
            validatedRow[header] = {
              value: cellValue,
              error: "Required field",
            };
            hasErrors = true;
          } else if (
            spec.allowedValues &&
            !spec.allowedValues.includes(cellValue)
          ) {
            // Truncate the error message if it has too many allowed values
            const allowedValuesToShow = spec.allowedValues
              .slice(0, 2)
              .join(", ");
            const allowedValuesMessage =
              spec.allowedValues.length > 2
                ? `${allowedValuesToShow}, ...`
                : allowedValuesToShow;
            validatedRow[header] = {
              value: cellValue,
              error: `Invalid value. Expected: ${allowedValuesMessage}`,
            };
            hasErrors = true;
          } else if (spec.type === "string" && typeof cellValue !== "string") {
            // Validate string type
            validatedRow[header] = {
              value: cellValue,
              error: "Expected a string value",
            };
            hasErrors = true;
          } else if (spec.type === "number" && isNaN(parseFloat(cellValue))) {
            // Validate number type
            validatedRow[header] = {
              value: cellValue,
              error: "Must be a number",
            };
            hasErrors = true;
          } else if (
            spec.unique &&
            uniqueValuesTracker[header]?.has(cellValue)
          ) {
            // Validate unique values
            validatedRow[header] = {
              value: cellValue,
              error: "Duplicate value found",
            };
            hasErrors = true;
          } else {
            validatedRow[header] = {
              value: cellValue,
            };

            // Add the value to the unique values tracker if needed
            if (spec.unique) {
              uniqueValuesTracker[header].add(cellValue);
            }
          }
        }
         else {
          validatedRow[header] = {
            value: row[header],
            error: "Specification not found",
          };
          hasErrors = true;
        } 
      });

      validatedRow.hasErrors = hasErrors;
      return validatedRow;
    });

    setFilteredData(validatedData);
  };

  useEffect(() => {
    validateData();
  }, [tableData]);

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

  const handleSaveData = () => {
    // Final validation before saving
    const isValid = filteredData.every(row => !row.hasErrors);
  
    if (isValid) {
      // Perform save actions
      dispatch(saveValidatedData(filteredData));
      localStorage.setItem("validatedAssetsData", JSON.stringify(filteredData));
      // dispatch(sendValidatedData(filteredData)); // Dispatch the thunk action to send data to the backend
      onClose();
    } else {
      // Handle case where there are still errors
      console.error("Cannot save data. Please fix validation errors.");
      // Optionally, show a message or log an error indicating validation issues
    }
  };
  
  

  const handleDeleteRow = (rowIndex: number) => {
    const updatedData = filteredData.filter((_, index) => index !== rowIndex);
    setFilteredData(updatedData);
  }; 

 
  const handleRemove = () => setShowRemove(!showRemove);

  const handleCellEdit = (newValue: any, rowIndex: number, header: string) => {
    const updatedData = [...filteredData];
    const spec = assetSpecifications.find((spec) => spec.name === header);
    if (spec) {
      let error = "";
      // Validate required fields
      if (spec.required && (!newValue || newValue === "")) {
        error = "Required field";
      } else if (spec.allowedValues && !spec.allowedValues.includes(newValue)) {
        // Truncate the error message if it has too many allowed values
        const allowedValuesToShow = spec.allowedValues.slice(0, 2).join(", ");
        const allowedValuesMessage =
          spec.allowedValues.length > 2
            ? `${allowedValuesToShow}, ...`
            : allowedValuesToShow;
        error = `Invalid value. Expected: ${allowedValuesMessage}`;
      } else if (spec.type === "string" && typeof newValue !== "string") {
        // Validate string type
        error = "Expected a string value";
      } else if (spec.type === "number" && isNaN(parseFloat(newValue))) {
        // Validate number type
        error = "Must be a number";
      } else if (
        spec.unique &&
        filteredData.some(
          (row, index) => index !== rowIndex && row[header].value === newValue
        )
      ) {
        // Validate unique values
        error = "Duplicate value found";
      }

      updatedData[rowIndex][header] = {
        value: newValue,
        error: error || null,
      };

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
                className={`flex items-center gap-2 bg-my-blue text-white rounded-md py-1 p-2 `}
                onClick={handleSaveData}
                // disabled={filteredData.some(row => row.hasErrors)}    
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
                              const spec = assetSpecifications.find(
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
