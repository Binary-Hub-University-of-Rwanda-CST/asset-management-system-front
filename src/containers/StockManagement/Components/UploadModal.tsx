import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal, { ModalSize } from '../../../components/modal/Modal';
import Dropdown, { Option, dropdownStyle } from '../../../components/Fragments/DropDown';
import { BsCloudUpload } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";
import { fetchStocks } from '../../../actions/stock.action';
import { fetchCategories } from '../../../actions/category.action';
import { fetchBrands } from '../../../actions/brand.action';
import { StoreState } from '../../../reducers';
import { Brand } from '../../../actions/brand.action';
import { Category } from '../../../actions/category.action';
import { Stock } from '../../../actions/stock.action';
import { AppDispatch } from '../../../app/store';

interface ModalProps {
  close: () => void;
}

const UploadModal: React.FC<ModalProps> = (props) => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchStocks());
    dispatch(fetchCategories());
    dispatch(fetchBrands());
  }, [dispatch]);

  const stocks = useSelector((state: StoreState) => state.stock.stocks);
  const categories = useSelector((state: StoreState) => state.category.categories);
  const brands = useSelector((state: StoreState) => state.brand.brands);

  const categoryOptions: Option[] = categories.map((category: Category) => ({
    OptionName: category.name
  }));

  const locationOptions: Option[] = stocks.map((stock: Stock) => ({
    OptionName: stock.name
  }));

  const brandOptions: Option[] = brands.map((brand: Brand) => ({
    OptionName: brand.name
  }));

  const style: dropdownStyle = {
    buttonStyle: 'flex items-center w-[600px] rounded-md bg-my-gray shadow-sm px-4 py-1 text-xl font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500',
    optionStyle: 'flex w-80 mx-2 justify-between items-center'
  };

  const [selectedCategoryOption, setSelectedCategoryOption] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

  useEffect(() => {
    if (categories.length > 0) {
      setSelectedCategory(categories[0]);
      setSelectedCategoryOption(categories[0].name);
    }
  }, [categories]);

  const handleCategoryChange = (optionName: string) => {
    const selected = categories.find(category => category.name === optionName);
    setSelectedCategory(selected || null);
    setSelectedCategoryOption(optionName);
  };

  const handleDownloadCsvTemplate = () => {
    if (!selectedCategory) return;

    const headers = selectedCategory.specifications.map(spec => spec.name);
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
    // Example: Read file content or process the file
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      console.log('Uploaded file content:', content);
      // Additional processing can be done here
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
              <h3 className='text-md'>Choose Stock Location</h3>
              <Dropdown options={locationOptions} tag='Stock' style={style} />
            </div>
            <h3 className='text-md'>Choose Asset Category</h3>
            <Dropdown
              options={categoryOptions}
              tag='Assets'
              style={style}
              onChange={handleCategoryChange}
            //   value={selectedCategoryOption || ''}
            />
          </div>
          <div className='flex flex-col gap-1'>
            <h3 className='text-md'>Choose Asset Brand</h3>
            <Dropdown options={brandOptions} tag='Brand' style={style} />
          </div>

          {selectedCategory ? (
            <div className='flex flex-col items-center bg-blue-white rounded-md w-full py-5 px-5 my-2 gap-1'>
              <h3 className='mb-2 font-bold'>Data Validation Table For {selectedCategory.name}</h3>
              {selectedCategory.specifications.length > 0 ? (
                selectedCategory.specifications.map((spec, index) => (
                  <div className="bg-white rounded-md py-1 w-full flex flex-row" key={index}>
                    <div className='w-2/5 flex justify-end mx-4 font-bold'>{spec.name}</div>
                    <div className='pl-4 border-blue-white border-l-4 flex flex-row gap-2'>
                      {spec.values.map((value : string, idx: string) => ( 
                        <span className='flex items-center rounded-md px-1 bg-blue-white text-my-blue' key={idx}>
                          {value}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-gray-500">No specifications available for this category</div>
              )}
            </div>
          ) : (
            <div className='flex flex-col items-center bg-blue-white rounded-md w-full py-5 px-5 my-2 gap-1'>
              <h3 className='mb-2 font-bold'>Select a category to see specifications</h3>
            </div>
          )}

          <div
            className={`flex flex-col gap-1 cursor-pointer  w-full border-dashed border-2 border-my-gray text-gray-400 rounded-xl py-2 ${isDragging ? 'bg-gray-100' : ''}`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleUploadClick} // Allow clicking to upload
          >
            <input
              type="file"
              accept=".csv"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={handleFileInputChange}
            />
            <BsCloudUpload className='font-bold text-2xl mx-auto' />
            <span className='font-bold text-sm text-center'>
              {isDragging ? 'Drop CSV file here' : 'Drag and drop or click to upload CSV file'}
            </span>
            {draggedFile && (
              <div className="mt-2 text-center">
                <p className="font-bold">{fileName}</p>
                <p className="text-sm">{`${(fileSize / 1024).toFixed(2)} KB`}</p>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default UploadModal;
  