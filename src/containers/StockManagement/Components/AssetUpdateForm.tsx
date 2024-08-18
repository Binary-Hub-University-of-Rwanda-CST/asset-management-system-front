import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { StoreState } from '../../../reducers'; 
import { AssetInterface } from './DataTable'; 
import { updateAsset } from '../../../actions/updateAssets.action'; 
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from '../../../app/store'; 
import LoadingCircle from '../../../components/Loading/LoadingCircle';
import Alert, {AlertProps, AlertType} from '../../../components/Alert/Alert';

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

const AssetUpdateForm: React.FC<AssetUpdateFormProps> = ({
  asset,
  onUpdate,
  onCancel,
}) => {
  const [formData, setFormData] = useState<AssetInterface>(asset);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAlert, setShowAlert] = useState<boolean>(false);
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

  const parseNumber = (value: string | number): number | null => {
    if (typeof value === 'number') return value;
    if (typeof value !== 'string') return null;

    let cleanedValue = value.replace(/,/g, '').replace(/%$/, '');
    let parsedValue = parseFloat(cleanedValue);

    if (isNaN(parsedValue)) return null;

    if (value.endsWith('%')) {
      parsedValue /= 100;
    }

    return parsedValue;
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
        if (parsedValue === null) return 'Must be a valid number or percentage';
        break;
      case 'date':
        if (isNaN(Date.parse(value))) return 'Must be a valid date';
        break;
      case 'boolean':
        if (typeof value !== 'boolean') return 'Must be a boolean';
        break;
    }

    return '';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newErrors: Record<string, string> = {};
    let hasErrors = false;
  
    // Validate all fields
    Object.entries(formData).forEach(([key, value]) => {
      const error = validateField(key, value);
      if (error) {
        newErrors[key] = error;
        hasErrors = true;
      }
    });
  
    setErrors(newErrors);
  
    if (!hasErrors) {
      try {
        // Format formData
        const formattedData: AssetInterface = {
          ...formData,
          acquisition_cost: parseNumber(formData.acquisition_cost),
          useful_life: parseNumber(formData.useful_life),
          replacement_cost: parseNumber(formData.replacement_cost),
          actual_depreciation_rate: parseNumber(formData.actual_depreciation_rate),
        };
  
        // Send an array with a single AssetInterface object
        await dispatch(updateAsset([formattedData]));
        onUpdate(formattedData);
      } catch (err) {
        console.error('Update failed:', err);
        setShowAlert(true);
      }
    }
  }; 
  
  

  const handleCloseAlert = () => {
    setShowAlert(false);
  }; 

  return (
    <div className=' relative'> 
    <form onSubmit={handleSubmit} className="p-4">
      {assetSpecifications.map((spec: AssetSpecification) => (
        <div key={spec.name} className="mb-4">
          <label htmlFor={spec.name} className="block mb-2">
            {spec.name.replace(/_/g, ' ')}
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
              type={spec.type === 'number' ? 'number' : 'text'}
              id={spec.name}
              name={spec.name}
              value={
                spec.type === 'number'
                  ? parseNumber(formData[spec.name])?.toString() || ''
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
      {error && (
        // <div className="text-red-600 text-sm mt-4">{error}</div>
        <Alert alertType={AlertType.DANGER} title={error}  timeOut={4000} close={()=>{setErrors({})}} className='bg-danger'/>   

      )}
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
          {loading ? 'Updating...' : 'Update'}
        </button>
      </div>
    </form>
    {/* {loading && <LoadingCircle title='Updatting data'/> }   */}
    </div>
    
  );
};

export default AssetUpdateForm;
