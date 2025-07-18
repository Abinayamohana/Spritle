// StepTwo.jsx
import React from 'react';
import { useFormContext } from './FormContext';

const StepTwo = ({ previous }) => {
  const { formData, updateFormData, submitForm } = useFormContext();

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    submitForm();
    alert('Form Submitted!');
  };

  return (
    <fieldset className="max-w-md mx-auto p-6 border rounded shadow bg-white">
      <legend className="text-lg font-semibold mb-4">Step 2: Contact Info</legend>
      <input
        name="number"
        type="number"
        placeholder="Phone Number"
        className="block w-full mb-3 p-2 border rounded"
        value={formData.number || ''}
        onChange={handleChange}
      />
      <input
        name="email"
        type="email"
        placeholder="Email"
        className="block w-full mb-3 p-2 border rounded"
        value={formData.email || ''}
        onChange={handleChange}
      />
      <div className="flex justify-between mt-4">
        <button
          onClick={previous}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          Previous
        </button>
        <button
          onClick={handleSubmit}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Submit
        </button>
      </div>
    </fieldset>
  );
};

export default StepTwo;
