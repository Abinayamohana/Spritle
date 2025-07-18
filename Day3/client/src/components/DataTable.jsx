// DataTable.jsx
import React from 'react';
import { useFormContext } from './FormContext';

const DataTable = () => {
  const { submittedData } = useFormContext();

  if (submittedData.length === 0)
    return <p className="text-center text-gray-600 mt-6">No submissions yet.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8 overflow-x-auto">
      <h3 className="text-2xl font-semibold text-center mb-4">Submitted Data</h3>
      <table className="min-w-full bg-white border border-gray-300 shadow rounded-lg">
        <thead className="bg-blue-600 text-white">
          <tr>
            <th className="px-4 py-2 text-left">First Name</th>
            <th className="px-4 py-2 text-left">Last Name</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Email</th>
          </tr>
        </thead>
        <tbody>
          {submittedData.map((entry, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
            >
              <td className="px-4 py-2 border-t">{entry.firstName}</td>
              <td className="px-4 py-2 border-t">{entry.lastName}</td>
              <td className="px-4 py-2 border-t">{entry.number}</td>
              <td className="px-4 py-2 border-t">{entry.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
