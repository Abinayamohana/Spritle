// StepOne.jsx
import React from 'react';
import { useFormContext } from './FormContext';

const StepOne = ({ next }) => {
  const { formData, updateFormData } = useFormContext();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  return (
    <fieldset className="max-w-md mx-auto p-6 border rounded shadow bg-white">
      <legend className="text-lg font-semibold mb-4">Step 1: Basic Info</legend>
      <input
        name="firstName"
        placeholder="First Name"
        className="block w-full mb-3 p-2 border rounded"
        value={formData.firstName || ''}
        onChange={handleChange}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        className="block w-full mb-3 p-2 border rounded"
        value={formData.lastName || ''}
        onChange={handleChange}
      />
      <button
        onClick={next}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Next
      </button>
    </fieldset>
  );
};

export default StepOne;
