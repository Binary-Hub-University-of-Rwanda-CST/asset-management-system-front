import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from '../../../reducers';
import Input from '../../../components/Fragments/Input_backup';
import { AssetInterface } from './DataTable';

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

const AssetUpdateForm: React.FC<AssetUpdateFormProps> = ({ asset, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState<AssetInterface>(asset);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const assetSpecifications = useSelector(
    (state: StoreState) => state.uploadSpecificaiton.specifications
  );

  const validateField = (name: string, value: any): string => {
    const spec = assetSpecifications.find((s: AssetSpecification) => s.name === name);
    if (!spec) return '';
  
    if (spec.required && (!value || value === "")) {
      return "This field is required";
    }
  
    if (spec.allowedValues && !spec.allowedValues.includes(value)) {
      return `Invalid value. Expected one of: ${spec.allowedValues.join(', ')}`;
    }
  
    switch (spec.type) {
      case 'string':
        if (typeof value !== 'string') return "Must be a string";
        break;
      case 'number':
        if (isNaN(Number(value))) return "Must be a number";
        break;
      case 'date':
        if (isNaN(Date.parse(value))) return "Must be a valid date";
        break;
      case 'boolean':
        if (typeof value !== 'boolean') return "Must be a boolean";
        break;
    }
  
    return ''; // Return empty string instead of null
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
    
    const error = validateField(name, value);
    setErrors(prevErrors => ({ 
      ...prevErrors, 
      [name]: error || '' // Use an empty string instead of null
    }));
  }; 

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    if (!hasErrors) {
      onUpdate(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4">
      {assetSpecifications.map((spec: AssetSpecification) => (
        <div key={spec.name} className="mb-4">
            {spec.allowedValues ? (
              <select
                name={spec.name}
                value={formData[spec.name]?.toString() || ''}
                onChange={handleInputChange}
                className={`px-3 py-2 border w-full ${
                    errors[spec.name]
                      ? "border-red-600"
                      : "border-my-blue"
                  } rounded-md outline-my-blue`}
              >
                <option value="">Select an option</option>
                {spec.allowedValues.map(value => (
                  <option key={value} value={value}>{value}</option>
                ))}
              </select> 
            ):
          <Input
            title={spec.name.replace(/_/g, ' ')}
            type={spec.type === 'number' ? 'number' : 'text'}
            value={formData[spec.name]?.toString() || ''}
            onChange={handleInputChange}
            disabled={true} 
            error={errors[spec.name]}
            onCloseError={() => setErrors(prev => ({ ...prev, [spec.name]: '' }))} 
            className="bg-white"
          />}
        </div> 
      ))}
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
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" 
        >
          Update
        </button>
      </div>
    </form>
  );
};

export default AssetUpdateForm; 