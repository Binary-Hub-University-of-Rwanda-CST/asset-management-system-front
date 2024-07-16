
import React, { useState, useRef } from "react";
import Modal, { ModalSize } from "../../../components/modal/Modal";
import { BsCloudUpload } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { StoreState } from "../../../reducers";
import ValidationModal from "../UploadAssets/ValidationModal";
import Papa from 'papaparse';

interface UploadModalProps {
  close: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ close }) => {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFile, setDraggedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isFileValid, setIsFileValid] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadSpecification = useSelector(
    (state: StoreState) => state.uploadSpecificaiton
  );
  const specification = uploadSpecification.specifications;

  const handleDownloadCsvTemplate = () => {
    if (!specification || specification.length === 0) return;

    const headers = specification.map((spec) => `"${spec.name.replace(/_/g, ' ')}"`);
    const rows: string[][] = [];
    const numTemplateRows = 5;

    for (let i = 0; i < numTemplateRows; i++) {
      const rowData: string[] = headers.map(() => '""');
      rows.push(rowData);
    }

    const csvContent = headers.join(',') + '\n' + rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Assets_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "text/csv") {
      setDraggedFile(droppedFile);
      setFileName(droppedFile.name);
      handleFileUpload(droppedFile);
    } else {
      setUploadError("Please drop a valid CSV file.");
    }
  };

  const handleFileUpload = (file: File) => {
    Papa.parse(file, {
      complete: (result) => {
        if (result.data.length <= 1) {
          setUploadError("Uploaded CSV file has no data.");
          return;
        }

        const headers = (result.data[0] as string[]).map((header: string) => 
          header.trim().toLowerCase().replace(/ /g, '_')
        );
        
        const specHeaders = specification.map(spec => spec.name.toLowerCase());
        const isValid = specHeaders.every(header => headers.includes(header));

        if (!isValid) {
          const missingHeaders = specHeaders.filter(header => !headers.includes(header));
          const errorMessage = `Uploaded CSV file is missing columns: ${missingHeaders.join(', ')}.`;
          setUploadError(errorMessage);
        } else {
          setUploadError(null);
          const data = (result.data as string[][]).slice(1).map((row: string[]) => {
            const rowData: Record<string, any> = {};
            headers.forEach((header, index) => {
              const originalHeader = specification.find(spec => spec.name.toLowerCase() === header)?.name || header;
              rowData[originalHeader] = row[index];
            });
            return rowData;
          });

          const originalHeaders = headers.map(header => 
            specification.find(spec => spec.name.toLowerCase() === header)?.name || header
          );

          setTableHeaders(originalHeaders);
          setTableData(data);
          setIsTableModalOpen(true);
        }
      },
      error: (error) => {
        setUploadError(`Error parsing CSV: ${error.message}`);
      },
      header: false,
      skipEmptyLines: true
    });
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "text/csv") {
      setDraggedFile(file);
      setFileName(file.name);
      handleFileUpload(file);
    } else {
      setUploadError("Please select a valid CSV file.");
    }
  };

  const MAX_DISPLAYED_VALUES = 5;

  return (
    <div>
    <Modal
      widthSizeClass={ModalSize.extraLarge}
      isOpen={true}
      onClose={close}
      title="Upload Assets Data"
    >
      <div className="flex flex-col items-start p-3  max-h-[500px]">
        {specification && (
          <div className="flex justify-end  mr-4 w-full">
            <button
              className="bg-blue-500 hover:bg-blue-600 text-my-blue  underline  font-bold  py-1 px-4 rounded-md text-sm "
              onClick={handleDownloadCsvTemplate}
            >
              <RiFileExcel2Line className="inline-block mr-2" /> Download CSV
              Template
            </button>
          </div>
        )}
        {specification && (
          <div className="flex flex-col items-center bg-blue-white rounded-md w-full py-5 px-5 my-2 gap-1 overflow-auto">
            <h3 className="mb-2 font-bold">
              Data Validation Table For Uploaded Assets
            </h3>
            {specification.map((spec, index) => (
              <div
                className="bg-white rounded-md py-1 w-full flex flex-row"
                key={index}
              >
                <div className="w-2/5 flex justify-end mx-4 font-bold">
                  {spec.name.replace(/_/g, " ")}
                </div>
                <div className="pl-4 border-blue-500 border-l-4 flex flex-row gap-2 flex-wrap">
                  {spec.allowedValues && spec.allowedValues.length > 0 ? (
                    <>
                      {spec.allowedValues
                        .slice(0, MAX_DISPLAYED_VALUES)
                        .map((value, idx) => (
                          <span
                            className="flex items-center rounded-md px-1 bg-blue-white text-my-blue"
                            key={idx}
                          >
                            {value}
                          </span>
                        ))}
                      {spec.allowedValues.length > MAX_DISPLAYED_VALUES && (
                        <span className="flex items-center rounded-md px-1 bg-blue-white text-warning">
                          +{spec.allowedValues.length - MAX_DISPLAYED_VALUES}{" "}
                          more
                        </span>
                      )}
                    </>
                  ) : (
                    //  <span className="text-gray-500">No allowed values specified</span>
                    <span></span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <div
          className={`flex flex-col items-center justify-center   border-2 border-dashed rounded-md w-full py-2   px-10 mt-5 cursor-pointer ${
            isDragging ? "border-blue-600" : "border-blue-400"
          } ${uploadError ? "border-red-500" : ""}`}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
        >
          {!isTableModalOpen && (
            <>
              <BsCloudUpload className="inline-block text-3xl text-blue-500" />
              <p className="mt-2 text-sm  font-bold text-blue-500">
                Drag & Drop or{" "}
                <span className="cursor-pointer u">Click to Upload</span> CSV
                File
              </p>
              <input
                type="file"
                accept=".csv"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileInputChange}
              />
            </>
          )}
          {uploadError && (
            <div className="mt-2 text-sm text-red-500">{uploadError}</div>
          )}
        </div>
      </div>
    </Modal>
    {isTableModalOpen && (
      <ValidationModal
        title="Upload validation"
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        tableData={tableData}
        tableHeaders={tableHeaders}
        tag={[`${tableData.length} assets`]} 
      />
    )}
  </div>
  );
};

export default UploadModal;