import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal, { ModalSize } from '../../../components/modal/Modal';
import Dropdown, { Option, dropdownStyle } from '../../../components/Fragments/DropDown';
import { BsCloudUpload } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { fetchValidationData, ValidationData, Building, Room, Category } from '../../../actions/validationData.actions'; 
import { StoreState } from '../../../reducers';
import { AppDispatch } from '../../../app/store';
import TableModal from '../../../components/TableModal/TableModal';

interface ModalProps {
  close: () => void;
}

const UploadModal: React.FC<ModalProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false); // State to control TableModal
  const [tableData, setTableData] = useState<Record<string, any>[]>([]); // State to store table data
  const [tableHeaders, setTableHeaders] = useState<string[]>([]); // State to store table headers

  // const dispatch: AppDispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(fetchValidationData());
  // }, [dispatch]);

  const validationData = useSelector((state: StoreState) => state.validation.validationData);
  const buildings = validationData?.building || [];
  const categories = validationData?.category || [];

  const style: dropdownStyle = {
    buttonStyle: 'flex items-center w-[600px] rounded-md bg-my-gray shadow-sm px-4 py-1 text-xl font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500',
    optionStyle: 'flex w-80 mx-2 justify-between items-center'
  };

  const [selectedBuildingId, setSelectedBuildingId] = useState<string | null>(null);
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const handleBuildingChange = (option: Option) => {
    setSelectedBuildingId(option.value as string);
    setSelectedRoomId(null);
  };

  const handleRoomChange = (option: Option) => {
    setSelectedRoomId(option.value as string);
  };

  const handleCategoryChange = (option: Option) => {
    setSelectedCategoryId(option.value as string);
  };

  const handleDownloadCsvTemplate = () => {
    if (!selectedCategoryId) return;

    const selectedCategory = categories.find(cat => cat.id === selectedCategoryId);
    if (!selectedCategory) return;

    const headers = selectedCategory.specification.map(spec => spec.name);
    const csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n';
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${selectedCategory.name}_template.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const [isDragging, setIsDragging] = useState(false);
  const [draggedFile, setDraggedFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [fileSize, setFileSize] = useState<number>(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      handleFileUpload(droppedFile);
    } else {
      alert('Please drop a valid CSV file.');
    }
  };

  const handleFileUpload = (file: File) => {
    setFileName(file.name);
    setFileSize(file.size);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const rows = content.split('\n').filter(Boolean);
      const headers = rows[0].split(',').map(header => header.trim());
      const data = rows.slice(1).map(row => {
        const values = row.split(',').map(value => value.trim());
        return headers.reduce((obj, header, index) => ({ ...obj, [header]: values[index] }), {});
      });
      setTableHeaders(headers);
      setTableData(data);
      setIsTableModalOpen(true); // Open the TableModal with parsed data
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
      handleFileUpload(file);
    } else {
      alert('Please select a valid CSV file.');
    }
  };

  return (
    <div>
      <Modal
        widthSizeClass={ModalSize.medium}
        isOpen={isModalOpen}
        onClose={props.close}
        title="Upload Assets Data"
      >
        <div className='flex flex-col items-start p-5'>
          <div className='flex flex-col gap-1'>
            <div className='flex flex-col gap-1'>
              <h3 className='text-md'>Choose building</h3>
              <Dropdown
                options={buildings.map(building => ({ OptionName: building.name, value: building.id }))}
                tag='Building'
                style={style}
                onChange={handleBuildingChange}
              />
            </div>
            {selectedBuildingId && (
              <div className='flex flex-col gap-1'>
                <h3 className='text-md'>Choose room</h3>
                <Dropdown
                  options={buildings.find(building => building.id === selectedBuildingId)?.rooms.map(room => ({ OptionName: room.name, value: room.id })) || []}
                  tag='Room'
                  style={style}
                  onChange={handleRoomChange}
                />
              </div>
            )}
            <div className='flex flex-col gap-1'>
              <h3 className='text-md'>Choose Asset Category</h3>
              <Dropdown
                options={categories.map(category => ({ OptionName: category.name, value: category.id }))} 
                tag='Category'
                style={style}
                onChange={handleCategoryChange}
              />
            </div>
          </div>
          {selectedCategoryId && ( 
            <div className="flex justify-end mt-4  mr-4  w-full"> 
              <button
                className="bg-my-blue hover:bg-opacity-80 text-white py-1  px-4 rounded-md text-sm font-medium " 
                onClick={handleDownloadCsvTemplate}
              >
                <RiFileExcel2Line className="inline-block mr-2" /> Download CSV Template
              </button>
            </div> 
          )}
          {selectedCategoryId ? (
            <div className='flex flex-col items-center bg-blue-white rounded-md w-full py-5 px-5 my-2 gap-1'>
              <h3 className='mb-2 font-bold'>Data Validation Table For {categories.find(cat => cat.id === selectedCategoryId)?.name}</h3>
              {categories.find(cat => cat.id === selectedCategoryId)!!.specification?.length > 0 ? ( 
                categories.find(cat => cat.id === selectedCategoryId)?.specification.map((spec, index) => (
                  <div className="bg-white rounded-md py-1 w-full flex flex-row" key={index}>
                    <div className='w-2/5 flex justify-end mx-4 font-bold'>{spec.name}</div>
                    <div className='pl-4 border-blue-white border-l-4 flex flex-row gap-2 flex-wrap'> 
                      {spec.values.map((value, idx) => (
                        <span className='flex items-center rounded-md px-1 bg-blue-white text-my-blue' key={idx}>
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <p className='mt-1'>No specifications available.</p>
              )}
            </div>
          ) : null}
          <div
            className={`flex flex-col items-center justify-center bg-blue-white border-2 border-dashed rounded-md w-full py-4  px-10 mt-5 cursor-pointer ${isDragging ? 'border-blue-600' : 'border-blue-400'}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileInputChange}
              className="hidden"
            />
            <BsCloudUpload className="text-6xl text-blue-400 mb-4" />
            <p className="text-blue-400">{fileName ? `File: ${fileName} (${(fileSize / 1024).toFixed(2)} KB)` : 'Drag and drop your CSV file here or click to upload'}</p>
          </div>
        </div>
      </Modal>

      {isTableModalOpen && (
        <TableModal
        title='validation result'
          isOpen={isTableModalOpen}
          onClose={() => setIsTableModalOpen(false)}
          tableHeaders={tableHeaders}
          tableData={tableData}
        />
      )}
    </div>
  );
};

export default UploadModal;
