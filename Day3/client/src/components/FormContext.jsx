// FormContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FormContext = createContext();
export const useFormContext = () => useContext(FormContext);

export const FormProvider = ({ children }) => {
  const [formData, setFormData] = useState({});
  const [submittedData, setSubmittedData] = useState([]);

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const submitForm = () => {
    setSubmittedData((prev) => [...prev, formData]);
    setFormData({});
  };

  return (
    <FormContext.Provider
      value={{ formData, updateFormData, submitForm, submittedData }}
    >
      {children}
    </FormContext.Provider>
  );
};
