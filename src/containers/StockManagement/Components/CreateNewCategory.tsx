import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal, { ModalSize, ModalMarginTop } from '../../../components/modal/Modal';
import { API_URL } from '../../../utils/api';
import LoadingCircle from '../../../components/Loading/LoadingCircle';
import Alert, { AlertType } from '../../../components/Alert/Alert';
import Successfully from '../../../components/Successfully/Successfully';

interface Specification {
    name: string;
    values: string[];
}

interface Category {
    name: string;
    specifications: Specification[];
}

interface CreateNewCategoryProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateNewCategory: React.FC<CreateNewCategoryProps> = ({ isOpen, onClose }) => {
    const [categoryName, setCategoryName] = useState('');
    const [specifications, setSpecifications] = useState<Specification[]>([]);
    const [newSpecName, setNewSpecName] = useState('');
    const [newSpecValue, setNewSpecValue] = useState('');
    const [newSpecValues, setNewSpecValues] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showSpecInputs, setShowSpecInputs] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);

    const navigate = useNavigate(); // Initialize useNavigate

    const handleCategoryName = (e: ChangeEvent<HTMLInputElement>) => {
        setCategoryName(e.target.value);
    };

    const handleNewSpecName = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSpecName(e.target.value);
    };

    const handleNewSpecValue = (e: ChangeEvent<HTMLInputElement>) => {
        setNewSpecValue(e.target.value);
    };

    const addSpecValue = () => {
        if (newSpecValue) {
            setNewSpecValues([...newSpecValues, newSpecValue]);
            setNewSpecValue('');
        }
    };

    const addSpecification = () => {
        if (newSpecName && newSpecValues.length > 0) {
            setSpecifications([...specifications, { name: newSpecName, values: newSpecValues }]);
            setNewSpecName('');
            setNewSpecValues([]);
            setShowSpecInputs(false);
        }
    };

    const succesBtn = () => {
        setSuccessMessage(null);
        setShowSuccessPopup(false);
        onClose();
        navigate('/assets-stock');
    };

    const createCategory = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!categoryName) {
            setError('Category name is required');
            return;
        }

        if (specifications.length === 0) {
            setError('Please add at least one specification');
            return;
        }

        const newCategory: Category = {
            name: categoryName,
            specifications: specifications
        };

        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        setShowSuccessPopup(false);

        try {
            const response = await fetch(`${API_URL}/asset/category/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newCategory)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('New Category:', data);
            setSuccessMessage(`Successfully created category ${categoryName}`);
            setShowSuccessPopup(true);
        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
                console.error(err);
            } else {
                setError('An unknown error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    const closeAlert = () => {
        setError(null);
        setSuccessMessage(null);
    };

    return (
        <div>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                title="Create New Asset Category"
                widthSizeClass={ModalSize.medium}
                marginTop={ModalMarginTop.none}
            >
                <div className='flex flex-col items-start p-3 justify-center'>
                    <label htmlFor="category" className='font-semibold'>Category name</label>
                    <input
                        type="text"
                        value={categoryName}
                        onChange={handleCategoryName}
                        className='p-1 font-semibold bg-my-gray rounded-md outline-none px-5 w-full'
                        placeholder='Enter category name'
                    />
                    <h4 className='mb-2 font-semibold mt-1'>Specifications & Values</h4>
                    <div className='flex flex-col items-center bg-my-gray rounded-md w-full py-3 px-5'>
                        {specifications.length === 0 ? (
                            <h3 className='font-bold text-sm'>No specification added</h3>
                        ) : (
                            <ul>
                                {specifications.map((spec, index) => (
                                    <li key={index} className='m-2'>
                                        <strong className='text-my-blue'>{spec.name}:</strong>
                                        {spec.values.map((value, idx) => (
                                            <span key={idx} className='bg-gray-200 rounded-md px-3 py-1 text-sm ml-2'>
                                                {value}
                                            </span>
                                        ))}
                                    </li>
                                ))}
                            </ul>
                        )}
                        {!showSpecInputs && (
                            <div>
                                <h5 className='items-center mb-2 text-sm text-gray-600'>
                                    Please click the following button to create new specification and value
                                </h5>
                                <button
                                    onClick={() => setShowSpecInputs(true)}
                                    className='border-my-blue border-2 items-center w-full rounded-md py-1 bg-white text-my-blue text-xl'
                                >
                                    Create <span className='font-bold'>new</span> specification
                                </button>
                            </div>
                        )}
                        {showSpecInputs && (
                            <div className='w-full mt-4'>
                                <input
                                    type="text"
                                    value={newSpecName}
                                    onChange={handleNewSpecName}
                                    className='p-1 font-bold text-sm bg-white rounded-md outline-none px-5 m-1 w-full'
                                    placeholder='Enter specification name'
                                />
                                <div className='m-2 flex flex-wrap'>
                                    {newSpecValues.map((value, index) => (
                                        <span key={index} className='bg-gray-200 rounded-full px-3 py-1 text-sm m-1'>
                                            {value}
                                        </span>
                                    ))}
                                </div>
                                <div className='flex w-full'>
                                    <input
                                        type="text"
                                        value={newSpecValue}
                                        onChange={handleNewSpecValue}
                                        className='p-1 font-medium bg-white rounded-md outline-none px-5 m-1 w-4/6'
                                        placeholder='Enter value'
                                    />
                                    <button
                                        onClick={addSpecValue}
                                        className='border-my-blue border-2 items-center  rounded-md bg-white text-my-blue p-1 w-2/6'
                                    >
                                        Add Value
                                    </button>
                                </div>
                                <button
                                    onClick={addSpecification}
                                    className='border-my-blue border-2 items-center w-full rounded-md py-1 bg-white text-my-blue text-md mt-2'
                                >
                                    Add Specification
                                </button>
                            </div>
                        )}
                    </div>
                    <button
                        onClick={createCategory}
                        className='w-full py-1 bg-my-blue rounded-md text-white text-xl mt-5'
                        disabled={loading}
                    >
                        {loading ? 'Creating...' : `Create ${categoryName ? categoryName : 'new'} Category`}
                    </button>
                </div>

                {error && (
                    <div className='w-full flex justify-center items-center'>
                        <Alert
                        close={closeAlert}
                        title={error}
                        alertType={AlertType.WARNING}
                        className='bg-red-200 text-red-900 w-5/6  justify-self-center  animate__animated  animate__shakeX'
                    />
                    </div>
                )}
            </Modal>
            {loading && <LoadingCircle title='Creating category' />}
            {showSuccessPopup && <Successfully onClose={succesBtn} title='Category added successfully' />}
        </div>
    );
};

export default CreateNewCategory;
