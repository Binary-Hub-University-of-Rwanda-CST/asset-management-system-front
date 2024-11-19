import React from 'react'
import { useState } from 'react';
import Modal from '../../../../components/modal/Modal';
import Dropdown, { Option, dropdownStyle } from '../../../../components/Fragments/DropDown';
import FullAssets from '../../../../utils/FullAssets'; 

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


function RequestAssetForm() {
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
                isOpen={isModalOpen}
                onClose={() =>{'hey '}}
                title="Request for the Asset">
                <div className='flex flex-col items-start p-5 w-[650px]'>

                    <div className='flex flex-col gap-1 '>
                        <div className='flex flex-col gap-1 '>
                            <h3 className='text-md'>Category Name</h3>
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

                </div>
            </Modal>
        </div>
    );
}

export default RequestAssetForm
