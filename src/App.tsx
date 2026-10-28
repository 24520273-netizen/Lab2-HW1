import { useState } from 'react';
import './App.css';
import { DataGrid } from './components/DataGrid';
import {
  employeeColumns,
  employees,
  type Employee,
} from './data/sampleData';

function App() {
  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | null>(null);

  const handleRowSelect = (employee: Employee) => {
    setSelectedEmployee(employee);
  };

  return (
    <main className="app">
      <h1>Employee Data Grid</h1>

      <DataGrid
        data={employees}
        columns={employeeColumns}
        onRowSelect={handleRowSelect}
        ariaLabel="Employee data grid"
      />

      <p
        className="selection-feedback"
        role="status"
      >
        {selectedEmployee
          ? `Selected employee: ${selectedEmployee.name}`
          : 'No employee selected.'}
      </p>
    </main>
  );
}

export default App;