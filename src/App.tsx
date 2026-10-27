import './App.css';
import { DataGrid } from './components/DataGrid';
import { employeeColumns, employees } from './data/sampleData';

function App() {
  return (
    <main className="app">
      <h1>Employee Data Grid</h1>

      <DataGrid
        data={employees}
        columns={employeeColumns}
        ariaLabel="Employee data grid"
      />
    </main>
  );
}

export default App;