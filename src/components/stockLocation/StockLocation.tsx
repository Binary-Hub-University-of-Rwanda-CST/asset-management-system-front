import React, { useState, ChangeEvent, MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal, { ModalSize } from '../modal/Modal';
import { API_URL } from '../../utils/api';
import LoadingCircle from '../Loading/LoadingCircle';
import Successfully from '../Successfully/Successfully';
import Alert, {AlertType} from '../Alert/Alert';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';

interface StockLocation {
    name: string;
    location: string;
}

interface CreateNewStockLocationProps {
    isOpen: boolean;
    onClose: () => void;
}

const CreateNewStockLocation: React.FC<CreateNewStockLocationProps> = ({ isOpen, onClose }) => {
    const [stockName, setStockName] = useState('');
    const [stockLocation, setStockLocation] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [showSuccessPopup, setShowSuccessPopup] = useState(false);
    const [stockNameError, setStockNameError] = useState<string | null>(null);
    const [stockLocationError, setStockLocationError] = useState<string | null>(null); 


    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();

    const handleStockNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStockName(value);
        setStockNameError(value ? null : 'Stock name is required');
    };

    const handleStockLocationChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStockLocation(value);
        setStockLocationError(value ? null : 'Stock location is required');
    };

    const succesBtn = () => {
        setSuccessMessage(null);
        setShowSuccessPopup(false);
        onClose();
        navigate('/assets-stock'); // Navigate to the dashboard
    };
    const closeAlert = () => {
        setError(null);
        setSuccessMessage(null);
    };

    const createStockLocation = async (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!stockName) {
            setStockNameError('Stock name is required');
            return;
        }

        if (!stockLocation) {
            setStockLocationError('Stock location is required');
            return;
        }

        const newStockLocation: StockLocation = {
            name: stockName,
            location: stockLocation
        };

        setLoading(true);
        setError(null);
        setSuccessMessage(null);
        setShowSuccessPopup(false);

        try {
            const response = await fetch(`${API_URL}/asset/stock/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newStockLocation)
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.statusText}`);
            }

            const data = await response.json();
            console.log('New Stock Location:', data);
            setSuccessMessage(`Successfully created stock location ${stockName}`);
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

    return (
        <div>
            <Modal
                isOpen={isOpen && !loading && !showSuccessPopup}
                onClose={onClose}
                title="Create New Stock Location"
                widthSizeClass={ModalSize.medium}
            >
                <div className='flex flex-col items-start p-3'>
                    <label htmlFor="stockName" className='font-semibold'>Stock Name</label>
                    <input
                        type="text"
                        value={stockName}
                        onChange={handleStockNameChange}
                        className='p-1 font-semibold bg-my-gray rounded-md outline-none px-5 w-full'
                        placeholder='Enter stock name'
                    />
                    {stockNameError && <div className='text-red-500 mt-1'>{stockNameError}</div>}
                    <label htmlFor="stockLocation" className='font-semibold mt-3'>Stock Location</label>
                    <input
                        type="text"
                        value={stockLocation}
                        onChange={handleStockLocationChange}
                        className='p-1 font-semibold bg-my-gray rounded-md outline-none px-5 w-full'
                        placeholder='Enter stock location'
                    />
                    {stockLocationError && <div className='text-red-500 mt-1'>{stockLocationError}</div>}
                    <button
                        onClick={createStockLocation}
                        className='w-full py-1 bg-my-blue rounded-md text-white text-xl mt-5'
                        disabled={loading || !stockName || !stockLocation}
                    >
                        {loading ? 'Creating...' : 'Create Stock Location'}
                    </button>
                    {error && (
                    <Alert
                        close={closeAlert}
                        title={error}
                        alertType={AlertType.WARNING}
                        className='bg-red-200 text-red-900 w-11/12  justify-self-center mx-8 animate__animated  animate__shakeX'
                    />
                )}
                </div>
            </Modal>
            {loading && <LoadingCircle title='Creating stock location...' />}
            {showSuccessPopup && <Successfully onClose={succesBtn} title='Stock location added successfully' />}
        </div>
    );
};

export default CreateNewStockLocation; 
