import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../../reducers'; 
import { AssetInterface } from './DataTable'; 
import { ApiError, updateAsset } from '../../../actions/updateAssets.action'; 
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../../app/store'; 
import LoadingCircle from '../../../components/Loading/LoadingCircle';
import Alert, { AlertType } from '../../../components/Alert/Alert';

interface AssetUpdateFormProps {
  asset: AssetInterface;
  onUpdate: (updatedAsset: AssetInterface) => void;
  onCancel: () => void;
}

interface AssetSpecification {
  name: string;
  type: string;
  required: boolean;
  unique?: boolean;
  allowedValues?: string[];
}

export interface UpdateAssetInterface {
  id: string;
  asset_code: string;
  serial_number: string;
  asset_name: string;
  asset_description: string;
  asset_category: string;
  building_code: string;
  room_code: string;
  department: string;
  source_of_fund: string;
  asset_acquisition_date: string;
  acquisition_cost: number;
  useful_life: number;
  date_of_disposal: string;
  condition_status: string;
  valuation_date: string;
  replacement_cost: number;
  actual_depreciation_rate: number;
  remarks: string;
}

const AssetUpdateForm: React.FC<AssetUpdateFormProps> = ({
  asset,
  onUpdate,
  onCancel,
}) => {
  const [formData, setFormData] = useState<AssetInterface>(asset);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const dispatch: ThunkDispatch<RootState, unknown, AnyAction> = useDispatch();

  const assetSpecifications = useSelector(
    (state: StoreState) => state.uploadSpecificaiton.specifications
  );

  const { loading, error } = useSelector(
    (state: RootState) => ({
      loading: state.updateAsset.loading,
      error: state.updateAsset.error
    })
  );

  const parseNumber = (value: string | number): number => {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return 0;

    let cleanedValue = value.replace(/,/g, '').replace(/%$/, '');
    let parsedValue = parseFloat(cleanedValue);

    return isNaN(parsedValue) ? 0 : parsedValue;
  };

  const formatDate = (date: string): string => {
    try {
      return new Date(date).toISOString();
    } catch (error) {
      return new Date().toISOString();
    }
  };



  const validateField = (name: string, value: any): string => {
    const spec = assetSpecifications.find(
      (s: AssetSpecification) => s.name === name
    );
    if (!spec) return '';

    if (spec.required && (!value || value === '')) {
      return 'This field is required';
    }

    if (spec.allowedValues && !spec.allowedValues.includes(value)) {
      return `Invalid value. Expected one of: ${spec.allowedValues.join(', ')}`;
    }

    switch (spec.type) {
      case 'string':
        if (typeof value !== 'string') return 'Must be a string';
        break;
      case 'number':
        const parsedValue = parseNumber(value);
        if (parsedValue === null) return 'Must be a valid number';
        break;
      case 'date':
        if (isNaN(Date.parse(value))) return 'Must be a valid date';
        break;
    }

    return '';
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    let hasErrors = false;

    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });

    setErrors(newErrors);
    return !hasErrors;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    const error = validateField(name, value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error || '',
    }));
  };

const formatDataForApi = (data: any) => {
  // Destructure to omit current_value
  const { current_value, ...apiData } = data;
  
  return {
    id: apiData.id.toString(),
    asset_code: apiData.asset_code.toString(),
    serial_number: apiData.serial_number.toString(),
    asset_name: apiData.asset_name.toString(),
    asset_description: apiData.asset_description.toString(),
    asset_category: apiData.asset_category.toString(),
    building_code: apiData.building_code.toString(),
    room_code: apiData.room_code.toString(),
    department: apiData.department.toString(),
    source_of_fund: apiData.source_of_fund.toString(),
    asset_acquisition_date: formatDate(apiData.asset_acquisition_date),
    acquisition_cost: parseNumber(apiData.acquisition_cost),
    useful_life: parseNumber(apiData.useful_life),
    date_of_disposal: formatDate(apiData.date_of_disposal),
    condition_status: apiData.condition_status.toString(),
    valuation_date: formatDate(apiData.valuation_date),
    replacement_cost: parseNumber(apiData.replacement_cost),
    actual_depreciation_rate: parseNumber(apiData.actual_depreciation_rate),
    remarks: apiData.remarks.toString()
  };
};

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
 
  if (!validateForm()) {
    setAlertMessage('Please fix the form errors before submitting.');
    setShowAlert(true);
    return;
  }
 
  try {
    const apiData = formatDataForApi(formData);
    await dispatch(updateAsset([apiData as AssetInterface]));
    
    setAlertMessage('Asset updated successfully!');
    setShowAlert(true);
    setTimeout(() => {
      onCancel(); // Close modal after alert is shown
    }, 1500); // Delay closing modal to show success message
 
    onUpdate({
      ...asset,
      ...apiData,
      current_value: asset.current_value
    });
 
  } catch (error) {
    const apiError = error as ApiError;
    if (apiError.errors) {
      const newErrors: Record<string, string> = {};
      Object.entries(apiError.errors).forEach(([field, messages]) => {
        newErrors[field] = Array.isArray(messages) ? messages[0] : messages;
      });
      setErrors(newErrors);
    }
    setAlertMessage(apiError.message || 'Failed to update asset');
    setShowAlert(true);
  }
 }; 

  return (
    <div className='relative'> 
      <form onSubmit={handleSubmit} className="p-4">
        <div className="grid grid-cols-2 gap-4">
          {assetSpecifications.map((spec: AssetSpecification) => (
            <div key={spec.name} className="mb-4">
              <label htmlFor={spec.name} className="block mb-2 text-sm font-medium">
                {spec.name.replace(/_/g, ' ').toUpperCase()}
              </label>
              {spec.allowedValues ? (
                <select
                  id={spec.name}
                  name={spec.name}
                  value={formData[spec.name]?.toString() || ''}
                  onChange={handleInputChange}
                  className={`px-3 py-2 border w-full ${
                    errors[spec.name] ? 'border-red-600' : 'border-my-blue'
                  } rounded-md outline-my-blue`}
                >
                  <option value="">Select an option</option>
                  {spec.allowedValues.map((value) => (
                    <option key={value} value={value}>
                      {value}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={spec.type === 'date' ? 'date' : spec.type === 'number' ? 'number' : 'text'}
                  id={spec.name}
                  name={spec.name}
                  value={
                    spec.type === 'date'
                      ? formData[spec.name]?.split('T')[0] || ''
                      : formData[spec.name]?.toString() || ''
                  }
                  onChange={handleInputChange}
                  className={`px-3 py-2 border w-full ${
                    errors[spec.name] ? 'border-red-600' : 'border-my-blue'
                  } rounded-md outline-my-blue`}
                />
              )}
              {errors[spec.name] && (
                <p className="text-red-600 text-sm mt-1">{errors[spec.name]}</p>
              )}
            </div> 
          ))}
        </div>

        {showAlert && (
          <Alert 
            alertType={AlertType.DANGER} 
            title={alertMessage}
            timeOut={4000} 
            close={() => setShowAlert(false)} 
            className='bg-danger'
          />   
        )}

        {/* {error && (
          <Alert 
            alertType={AlertType.DANGER} 
            title={error.message} 
            timeOut={4000} 
            close={() => setErrors({})} 
            className='bg-danger'
          />   
        )} */} 

        <div className="flex justify-end space-x-2 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 ${
              loading ? 'bg-gray-400' : 'bg-my-blue text-white hover:text-black'
            } rounded-md`}
          >
            {loading ? 'Updating...' : 'Update Asset'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AssetUpdateForm; 