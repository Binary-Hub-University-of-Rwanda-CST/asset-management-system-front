import React, { useState, useEffect } from "react";
import { FaArrowLeft, FaTrashAlt, FaRegCheckCircle } from "react-icons/fa";
import { TiArrowBack } from "react-icons/ti";
import Dropdown, { Option, dropdownStyle } from "../../../components/Fragments/DropDown"; // Import Dropdown component
import assetSpecifications from "../../../utils/uploadSpecification";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  tableHeaders: string[];
  tableData: Record<string, any>[];
  tag?: string[];
}

const style: dropdownStyle = {
  buttonStyle: 'flex items-center rounded-md bg-my-gray shadow-sm px-4 py-1 text-xl font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500',
  optionStyle: 'flex w-80 mx-2 justify-between items-center'
};

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
  }, [tableData]);

  const validateData = () => {
    const validatedData = tableData.map((row) => {
      const validatedRow: Record<string, any> = {};
      let hasErrors = false;

      tableHeaders.forEach((header) => {
        validatedRow[header] = row[header]; // Copy original data

        // Validate each cell based on assetSpecifications
        const spec = assetSpecifications.find((spec) => spec.name === header);
        if (spec) {
          // Check required fields
          if (spec.required && (!row[header] || row[header] === "")) {
            validatedRow[header] = {
              value: row[header],
              error: "Required field",
            };
            hasErrors = true;
          }

          // Check allowed values for dropdowns
          if (
            spec.allowedValues &&
            !spec.allowedValues.includes(row[header])
          ) {
            validatedRow[header] = {
              value: row[header],
              error: `Invalid value. Expected: ${spec.allowedValues.join(
                ", "
              )}`,
            };
            hasErrors = true;
          }

          // Additional checks based on type specification
          if (spec.type === "string" && typeof row[header] !== "string") {
            validatedRow[header] = {
              value: row[header],
              error: "Expected a string value",
            };
            hasErrors = true;
          }

          if (spec.type === "number" && isNaN(parseFloat(row[header]))) {
            validatedRow[header] = {
              value: row[header],
              error: "Must be a number",
            };
            hasErrors = true;
          }
        } else {
          // Handle undefined specification case
          validatedRow[header] = {
            value: row[header],
            error: "Specification not found",
          };
          hasErrors = true;
        }
      });

      // Set row error status
      validatedRow.hasErrors = hasErrors;

      return validatedRow;
    });

    setFilteredData(validatedData);
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

  const handleSaveData = () => {
    // Handle saving validated data
    console.log("Saving data:", filteredData);
    onClose();
  };

  const handleCategoryChange = (option: Option) => {
    setSelectedCategory(option.value as string);
  };

  const handleRemove = () => setShowRemove(!showRemove);

  const handleCellEdit = (newValue: any, rowIndex: number, header: string) => {
    const updatedData = [...filteredData];
    updatedData[rowIndex][header] = newValue;
    setFilteredData(updatedData);
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
                    className={`flex items-center gap-2 bg-my-blue text-white rounded-md py-1  p-2 ${
                      !selectedCategory
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:bg-opacity-80"
                    }`}
                    onClick={handleSaveData}
                    disabled={!selectedCategory}
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
                          <th className="px-4 py-2 text-left text-sm font-bold text-black uppercase">#</th>
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
                          <tr
                            key={rowIndex}
                            className={`${row.hasErrors ? "bg-red-100" : ""}`} // Highlight row if it has errors
                          >
                            {showRemove && (
                              <td className="px-4 py-1 font-sm">
                                <button className=" px-4  py-1 rounded-md  border hover:bg-danger border-red-500">
                                  <FaTrashAlt className=" text-red-700" />
                                </button>
                              </td>
                            )}
                            <td className="px-2  py-1 font-sm">
                              {rowIndex + 1}
                            </td>

                            {tableHeaders.map((header, cellIndex) => (
                              <td
                                key={`${rowIndex}-${cellIndex}`}
                                className="px-1 font-sm"
                              >
                                {row[header].error ? (
                                  <div className="relative">
                                    <div className="bg-red-200 px-2 py-1 rounded-md">
                                      {row[header].error}
                                    </div>
                                    <div className="absolute inset-0 bg-red-200 opacity-25 rounded-md"></div>
                                    <div className="absolute inset-0">
                                      {row[header].value}
                                    </div>
                                  </div>
                                ) : assetSpecifications.find(
                                    (spec) =>
                                      spec.name === header &&
                                      spec.allowedValues
                                  ) ? (
                                  <Dropdown
                                  // style={style}  
                                    options={(assetSpecifications.find(
                                      (spec) => spec.name === header
                                    )?.allowedValues || []).map((value) => ({
                                      // label: value,
                                      OptionName: value,
                                      value,
                                      
                                    }))}
                                    onChange={(option) => {
                                      // Handle dropdown change
                                      // Update filteredData with new value
                                      const updatedData = [...filteredData];
                                      updatedData[rowIndex][header] =
                                        option.value;
                                      setFilteredData(updatedData);
                                    }}
                                  />
                                ) : (
                                  <input
                                  className=" px-2 py-1  border border-blue-white rounded-md outline-my-blue "
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
                                )}
                              </td>
                            ))}
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
