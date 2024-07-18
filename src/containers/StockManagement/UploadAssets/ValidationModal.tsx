import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaTrashAlt, FaRegCheckCircle, FaCube, FaCubes } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
// import assetSpecifications from "../../../utils/uploadSpecification";
import { saveValidatedData } from "../../../actions/saveUploaded.action";
import { AppDispatch } from "../../../app/store";
import { useDispatch } from "react-redux";
import Alert, { AlertType } from "../../../components/Alert/Alert";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import LoadingCircle from "../../../components/Loading/LoadingCircle";
import { MdOutlineDangerous } from "react-icons/md";
import { HiOutlineCheck } from "react-icons/hi";
import Loader from "../../../components/Loading/Loader";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tableHeaders: string[];
  tableData: Record<string, any>[];
  tag?: string[];
  isLoading: boolean;
  onDataValidated: () => void;
}

const ValidationModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  tableHeaders,
  tableData,
  tag,
  isLoading,
  onDataValidated,
}) => {
  const [filteredData, setFilteredData] = useState<Record<string, any>[]>([]);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [showRemove, setShowRemove] = useState(false);
  const [errorCount, setErrorCount] = useState(0);
  const [validCount, setValidCount] = useState(0);
  const navigate = useNavigate();

  const uploadSpecification = useSelector(
    (state: StoreState) => state.uploadSpecificaiton.specifications
  );

  useEffect(() => {
    setFilteredData(validateData(tableData));
  }, [tableData, uploadSpecification, tableHeaders]);
  const dispatch: AppDispatch = useDispatch();

  // helper to hadle number
  const parseNumber = (value: string): number | null => {
    if (typeof value === "number") return value;
    if (typeof value !== "string") return null;

    // Remove commas and percentage signs
    let cleanedValue = value.replace(/,/g, "").replace(/%$/, "");

    // Try parsing the cleaned value
    let parsedValue = parseFloat(cleanedValue);

    if (isNaN(parsedValue)) return null;

    // If it was a percentage, divide by 100
    if (value.endsWith("%")) {
      parsedValue /= 100;
    }

    return parsedValue;
  };

  const validateData = (data: Record<string, any>[]) => {
    const uniqueValuesTracker: Record<string, Set<any>> = {};
    uploadSpecification.forEach((spec) => {
      if (spec.unique) {
        uniqueValuesTracker[spec.name] = new Set();
      }
    });

    let errorCount = 0;
    let validCount = 0;

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
          } else if (
            spec.allowedValues &&
            !spec.allowedValues.includes(cellValue)
          ) {
            const allowedValuesToShow = spec.allowedValues
              .slice(0, 2)
              .join(", ");
            const allowedValuesMessage =
              spec.allowedValues.length > 2
                ? `${allowedValuesToShow}, ...`
                : allowedValuesToShow;
            error = `Invalid value. Expected: ${allowedValuesMessage}`;
          } else if (spec.type === "string" && typeof cellValue !== "string") {
            error = "Expected a string value";
          } else if (
            spec.type === "number" &&
            cellValue !== "" &&
            parseNumber(cellValue) === null
          ) {
            error = "Must be a valid number";
          } else if (
            spec.type === "boolean" &&
            !["true", "false", true, false].includes(cellValue)
          ) {
            error = "Must be a boolean value";
          } else if (
            spec.type === "date" &&
            cellValue !== "" &&
            isNaN(Date.parse(cellValue))
          ) {
            error = "Must be a valid date";
          } else if (
            spec.unique &&
            uniqueValuesTracker[header]?.has(cellValue)
          ) {
            error = "Duplicate value found";
          }

          if (error) {
            hasErrors = true;
          } else if (spec.unique) {
            uniqueValuesTracker[header].add(cellValue);
          }

          validatedRow[header] = { value: cellValue, error };
        } else {
          validatedRow[header] = {
            value: row[header],
            error: "Specification not found",
          };
          hasErrors = true;
        }
      });

      validatedRow.hasErrors = hasErrors;
      if (hasErrors) {
        errorCount++;
      } else {
        validCount++;
      }
      return validatedRow;
    });

    setErrorCount(errorCount);
    setValidCount(validCount);

    return validatedData;
  };
  // Helper function to check if any errors exist in the row
  const hasAnyErrors = (row: Record<string, any>) => {
    for (const header in row) {
      if (header !== "hasErrors" && row[header]?.error !== null) {
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
        if (row.hasOwnProperty(key) && key !== "hasErrors") {
          const spec = uploadSpecification.find((s) => s.name === key);
          if (spec) {
            switch (spec.type) {
              case "number":
                const parsedNumber = parseNumber(row[key].value);
                transformedRow[key] = parsedNumber !== null ? parsedNumber : 0;
                break;
              case "boolean":
                transformedRow[key] =
                  row[key].value === "true" || row[key].value === true;
                break;
              case "date":
                const dateValue = row[key].value;
                if (dateValue instanceof Date) {
                  transformedRow[key] = dateValue.toISOString();
                } else if (typeof dateValue === "string") {
                  const parsedDate = new Date(dateValue);
                  if (!isNaN(parsedDate.getTime())) {
                    transformedRow[key] = parsedDate.toISOString();
                  } else {
                    console.error(
                      `Invalid date value for ${key}: ${dateValue}`
                    );
                    transformedRow[key] = null; // or use a default date
                  }
                } else {
                  console.error(`Invalid date value for ${key}: ${dateValue}`);
                  transformedRow[key] = null; // or use a default date
                }
                break;
              default:
                transformedRow[key] = row[key].value;
            }
          } else {
            transformedRow[key] = row[key].value;
          }
        }
      }
      return transformedRow;
    });
  };

  const handleSaveData = () => {
    const isValid = filteredData.every((row) => !row.hasErrors);

    if (isValid) {
      const transformedData = transformDataForUpload(filteredData);

      dispatch(saveValidatedData(transformedData));
      localStorage.setItem(
        "validatedAssetsData",
        JSON.stringify(transformedData)
      );
      onClose();
      // navigate("/upload-assets");
      onDataValidated();
    } else {
      console.error("Cannot save data. Please fix validation errors.");
      setSaveError("Cannot save data. Please fix validation errors.");
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
        const allowedValuesMessage =
          spec.allowedValues.length > 2
            ? `${allowedValuesToShow}, ...`
            : allowedValuesToShow;
        error = `Invalid value. Expected: ${allowedValuesMessage}`;
      } else if (spec.type === "string" && typeof newValue !== "string") {
        error = "Expected a string value";
      } else if (spec.type === "number" && parseNumber(newValue) === null) {
        error = "Must be a valid number";
      } else if (
        spec.type === "boolean" &&
        !["true", "false", true, false].includes(newValue)
      ) {
        error = "Must be a boolean value";
      } else if (spec.type === "date" && isNaN(Date.parse(newValue))) {
        error = "Must be a valid date";
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
        (key) =>
          key !== "hasErrors" && updatedData[rowIndex][key].error !== null
      );

      setFilteredData(updatedData);
      let newErrorCount = 0;
      let newValidCount = 0;
      updatedData.forEach((row) => {
        if (row.hasErrors) {
          newErrorCount++;
        } else {
          newValidCount++;
        }
      });

      setErrorCount(newErrorCount);
      setValidCount(newValidCount);
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
          {isLoading && (<LoadingCircle/>
          )}
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
                {/* {tag &&
                  tag.map((tag) => (
                    <span
                      key={tag}
                      className="bg-blue-white text-my-blue font-bold text-sm rounded-md px-2 py-1"
                    >
                      {tag}
                    </span>
                  ))} */}
                <div className="flex justify-between items-center  gap-4   ">
                  <div className="flex gap-1  items-center px-2 py-1 rounded-md bg-blue-white ">
                    <FaCubes className="text-lg "/> 
                    <span className="font-bold">Total Assets:</span>{" "}
                    {filteredData.length}
                  </div>
                  <div className="flex gap-2  items-center rounded-md px-2 py-1 border border-green-600  ">
                    <FaRegCheckCircle className="font-bold text-lg text-green-600 "/> 
                    <span className="font-bold text-green-600">
                      Valid Assets:
                    </span>{" "}
                    {validCount}
                  </div>
                  <div className="flex gap-1  items-center bg-danger rounded-md px-2 py-1  "> 
                    <MdOutlineDangerous className="font-bold text-lg text-red-600"/>
                    <span className="font-bold text-red-600">
                      Assets with Errors:
                    </span>{" "}
                    {errorCount}
                  </div>
                </div>
              </div>
              <div>
                {saveError && (
                  <Alert
                    // className="border border-danger text-red-700 rounded-md px-2  "
                    alertType={AlertType.DANGER}
                    title={saveError}
                    close={() => {
                      setSaveError(null);
                    }}
                    timeOut={5000}
                  />
                )}
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
                    className={`flex items-center gap-2 bg-my-blue text-white rounded-md py-1 p-2 ${
                      filteredData.some((row) => row.hasErrors)
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    onClick={handleSaveData}
                    disabled={filteredData.some((row) => row.hasErrors)}
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
                              {header.replace(/_/g, " ")}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {filteredData.map((row, rowIndex) => (
                          <tr key={rowIndex} className={` `}>
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
                            <td
                              className={`px-2 py-1 font-sm ${
                                hasAnyErrors(row)
                                  ? "bg-red-400 font-bold text-sm "
                                  : ""
                              }`}
                            >
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
                                        {row[header].error && (
                                          <option
                                            value={row[header].value}
                                            className="bg-red-200  overline text-red-600"
                                          >
                                            {row[header].value} (Invalid)
                                          </option>
                                        )}
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
                    <h1 className="text-center font-bold text-warning ">Loading ...</h1>
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
