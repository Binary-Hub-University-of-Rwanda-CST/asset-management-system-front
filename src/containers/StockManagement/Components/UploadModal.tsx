import React, { useState, useEffect, useRef } from 'react';
import Modal, { ModalSize, ModalMarginTop } from '../../../components/modal/Modal';
import { BsCloudUpload } from 'react-icons/bs';
import { RiFileExcel2Line } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { StoreState } from '../../../reducers';
import ValidationModal from '../UploadAssets/ValidationModal';

interface UploadModalProps {
  close: () => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ close }) => {
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [tableData, setTableData] = useState<Record<string, any>[]>([]);
  const [tableHeaders, setTableHeaders] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedFile, setDraggedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isFileValid, setIsFileValid] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadSpecification = useSelector((state: StoreState) => state.uploadSpecificaiton);
  const specification = uploadSpecification.specifications;

  const handleDownloadCsvTemplate = () => {
    if (!specification || specification.length === 0) return;

    // Extract headers (specification names)
    const headers = specification.map((spec) => spec.name);

    // Generate rows with empty data for each specification
    const rows: string[][] = [];

    // Assuming 10 rows for template
    const numTemplateRows = 5;  

    for (let i = 0; i < numTemplateRows; i++) {
      const rowData: string[] = [];
      headers.forEach((header) => {
        rowData.push('hhhh'); // Add empty string for each specification
      });
      rows.push(rowData); 
    }

    // Convert to CSV format
    const csvContent = headers.join(',') + '\n' + rows.map(row => row.join(',')).join('\n');

    // Prepare for download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'upoload_Assets_spec_template.csv');
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
    if (droppedFile && droppedFile.type === 'text/csv') {
      setDraggedFile(droppedFile);
      setFileName(droppedFile.name);
      handleFileUpload(droppedFile);
    } else {
      setUploadError('Please drop a valid CSV file.');
    }
  };

const handleFileUpload = (file: File) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    if (event.target?.result) {
      const csvData = event.target.result as string;
      const lines = csvData.split('\n');
      
      // Check if there are any lines of data (excluding header line)
      if (lines.length <= 1) {
        setUploadError("Uploaded CSV file has no data."); 
        return;
      }

      const headers = lines[0].split(',');
      
      // Check if headers match specifications
      const specHeaders = specification.map(spec => spec.name);
      const isValid = specHeaders.every(header => headers.includes(header));

      if (!isValid) {
        // Find missing headers
        const missingHeaders = specHeaders.filter(header => !headers.includes(header));
        const errorMessage = `Uploaded CSV file is missing columns: ${missingHeaders.join(', ')}.`;
        setUploadError(errorMessage);
      } else {
        setUploadError(null);
        const data = lines.slice(1).map((line) => {
          const values = line.split(',');
          const rowData: Record<string, any> = {};
          headers.forEach((header, index) => {
            rowData[header] = values[index];
          });
          return rowData;
        });

        setTableHeaders(headers);
        setTableData(data);
        setIsTableModalOpen(true);
      }
    }
  };

  reader.readAsText(file);
};


  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setDraggedFile(file);
      setFileName(file.name);
      handleFileUpload(file);
    } else {
      setUploadError('Please select a valid CSV file.');
    }
  };

  return (
    <div>
      <Modal
        widthSizeClass={ModalSize.extraLarge}  
        isOpen={true} // Always open for this example
        onClose={close}
        title="Upload Assets Data"
        marginTop={ModalMarginTop.small} 
      >
        <div className="flex flex-col items-start p-5">
          {specification && (
            <div className="flex justify-end mt-4 mr-4 w-full">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-4 rounded-md text-sm font-medium"
                onClick={handleDownloadCsvTemplate}
              >
                <RiFileExcel2Line className="inline-block mr-2" /> Download CSV Template
              </button>
            </div>
          )}
          {specification && (
            <div className="flex flex-col items-center bg-blue-white rounded-md w-full py-5 px-5 my-2 gap-1">
              <h3 className="mb-2 font-bold">Data Validation Table For Uploaded Assets</h3>
              {specification.map((spec, index) => (
                <div className="bg-white rounded-md py-1 w-full flex flex-row" key={index}>
                  <div className="w-2/5 flex justify-end mx-4 font-bold">{spec.name}</div>
                  <div className="pl-4 border-blue-500 border-l-4 flex flex-row gap-2 flex-wrap">
                    {spec.allowedValues?.map((value, idx) => (
                      <span className="flex items-center rounded-md px-1 bg-blue-200 text-blue-800" key={idx}>
                        {value}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div
            className={`flex flex-col items-center justify-center bg-blue-white border-2 border-dashed rounded-md w-full py-4 px-10 mt-5 cursor-pointer ${
              isDragging ? 'border-blue-600' : 'border-blue-400'
            } ${uploadError ? 'border-red-500' : ''}`} // Conditional red border for error
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!isTableModalOpen && (
              <>
                <BsCloudUpload className="inline-block text-5xl text-blue-500" />
                <p className="mt-2 text-sm text-blue-500">
                  Drag & Drop or{' '}
                  <span className="cursor-pointer underline" onClick={handleUploadClick}>
                    Click to Upload
                  </span>{' '}
                  CSV File
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
              <div className="mt-2 text-sm text-red-500">
                {uploadError}
              </div>
            )}
          </div>
        </div>
      </Modal>
      {isTableModalOpen && (
        <ValidationModal
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
          title="Data Validation Results"
          tableHeaders={tableHeaders}
          tableData={tableData}
        />
      )}
    </div>
  );
};

export default UploadModal;
