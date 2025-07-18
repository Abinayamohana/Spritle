// App.jsx
import React, { useState } from 'react';
import { FormProvider } from './components/FormContext';
import StepOne from './components/StepOne'
import StepTwo from './components/StepTwo';
import DataTable from './components/DataTable';

function App() {
  const [step, setStep] = useState(1);

  return (
    <FormProvider>
      <main className="min-h-screen bg-gray-100 py-10 px-4">
        <div className="max-w-2xl mx-auto">
          {step === 1 && <StepOne next={() => setStep(2)} />}
          {step === 2 && <StepTwo previous={() => setStep(1)} />}
        </div>
        <DataTable />
      </main>
    </FormProvider>
  );
}

export default App;
