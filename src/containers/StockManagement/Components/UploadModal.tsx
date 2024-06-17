import React from 'react';
import { useState } from 'react';
import Modal, {ModalSize, ModalMarginTop} from '../../../components/modal/Modal';
import Dropdown, { Option, dropdownStyle } from '../../../components/Fragments/DropDown';
import FullAssets from '../../../utils/FullAssets';
import { BsCloudUpload } from "react-icons/bs";
import { RiFileExcel2Line } from "react-icons/ri";

interface ModalProps {
    close: () => void;
}

// Function to remove duplicate objects from an array based on a property
const removeDuplicateObjects = <T extends Record<string, any>>(
    array: T[],
    propertyName: keyof T
): T[] => {
    const uniqueObjects: T[] = array.reduce((acc, obj) => {
        if (!acc.find(item => item[propertyName] === obj[propertyName])) {
            acc.push(obj);
        }
        return acc;
    }, [] as T[]);
    return uniqueObjects;
};

function UploadModal(props: ModalProps) {
    const [isModalOpen, setIsModalOpen] = useState(true);

    const category: Option[] = removeDuplicateObjects(
        FullAssets.map(item => ({
            OptionName: item.category.category_name
        })),
        'OptionName'
    );

    const Locations: Option[] = removeDuplicateObjects(
        FullAssets.map(stock => ({
            OptionName: stock.stock.name,
        })),
        'OptionName'
    );

    const brand: Option[] = removeDuplicateObjects(
        FullAssets.map(asset => ({
            OptionName: asset.brand.name,
        })),
        'OptionName'
    );

    const style: dropdownStyle = {
        buttonStyle: 'flex items-center w-[600px] rounded-md bg-my-gray shadow-sm px-4 py-1 text-xl font-medium text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500',
        optionStyle: 'flex w-80 mx-2 justify-between items-center'
    };

    return (
        <div>
            <Modal

            widthSizeClass={ModalSize.medium}
                isOpen={isModalOpen}
                onClose={props.close}
                title="Upload Assets Data">
                <div className='flex flex-col items-start p-5'>

                    <div className='flex flex-col gap-1 '>
                        <div className='flex flex-col gap-1 '>
                            <h3 className='text-md'>Choose Stock Location</h3>
                            <Dropdown options={Locations} tag='Stock' style={style} />
                        </div>
                        <h3 className='text-md'>Choose Asset Category</h3>
                        <Dropdown
                            options={category} tag='Assets'
                            style={style}
                        />
                    </div>
                    <div className='flex flex-col gap-1 '>
                        <h3 className='text-md'>Choose Asset Brand</h3>
                        <Dropdown options={brand} tag='Brand' style={style} />
                    </div>

                    <div className='flex flex-col items-cente bg-blue-white rounded-md w-full py-5 px-5 my-2 gap-1'>
                        <h3 className=' mb-2 font-bold'>Data Validation Table For Desktop</h3>
                        <div className="bg-white rounded-md py-1 w-full flex flex-row ">
                            <div className=' w-2/5 flex justify-end mx-4 font-bold'> specification </div>
                            <div className='pl-4 border-blue-white border-l-4 flex flex-row gap-2' >
                                <span className='flex items-center rounded-md px-1   bg-blue-white text-my-blue '>
                                    values
                                </span >
                                <span className='flex items-center rounded-md px-1   bg-blue-white text-my-blue '>
                                    values
                                </span >
                            </div>
                        </div>
                        <div className="bg-white rounded-md py-1 w-full flex flex-row ">
                            <div className=' w-2/5 flex justify-end mx-4 font-bold'> specification </div>
                            <div className='pl-4 border-blue-white border-l-4 flex flex-row gap-2' >
                                <span className='flex items-center rounded-md px-1   bg-blue-white text-my-blue '>
                                    values
                                </span >
                                <span className='flex items-center rounded-md px-1   bg-blue-white text-my-blue '>
                                    values
                                </span >
                            </div>
                        </div>
                        <div className="bg-white rounded-md py-1 w-full flex flex-row ">
                            <div className=' w-2/5 flex justify-end mx-4 font-bold'> specification </div>
                            <div className='pl-4 border-blue-white border-l-4 flex flex-row gap-2' >
                                <span className='flex items-center rounded-md px-1   bg-blue-white text-my-blue '>
                                    values
                                </span >
                                <span className='flex items-center rounded-md px-1   bg-blue-white text-my-blue '>
                                    values
                                </span >
                            </div>
                        </div>
                    </div>
                    <div className='flex  flex-col gap-1 w-full'>
                        <div className='flex flex-row justify-between'>
                            <span>upload CSV file format</span>
                            <button className=' underline text-black flex flex-row items-center gap-1 font-bold  '>
                                <RiFileExcel2Line className=' text-green-600' />download csv template?</button>

                        </div>
                        <div className='flex flex-col justify-center items-center  border-dashed border-2 border-my-gray  text-gray-400 rounded-xl py-2'>
                            <BsCloudUpload className='font-bold text-2xl' />
                            <span className='font-bold text-sm'>Drag and drop csv here</span>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default UploadModal;
