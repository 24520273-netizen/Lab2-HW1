import type { ColumnDef } from '../components/DataGrid';

export interface Employee {
  id: number;
  name: string;
  department: string;
  age: number;
}

export const employees: Employee[] = [
  {
    id: 1,
    name: 'Alice Johnson',
    department: 'Engineering',
    age: 29,
  },
  {
    id: 2,
    name: 'Brian Smith',
    department: 'Finance',
    age: 34,
  },
  {
    id: 3,
    name: 'Carol Williams',
    department: 'Marketing',
    age: 31,
  },
];

export const employeeColumns: ColumnDef<Employee>[] = [
  {
    header: 'Name',
    accessorKey: 'name',
    sortable: true,
  },
  {
    header: 'Department',
    accessorKey: 'department',
    sortable: true,
  },
  {
    header: 'Age',
    accessorKey: 'age',
    sortable: true,
  },
];