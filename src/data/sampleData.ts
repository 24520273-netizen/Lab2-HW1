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
    age: 28,
  },
  {
    id: 2,
    name: 'Brian Smith',
    department: 'Marketing',
    age: 34,
  },
  {
    id: 3,
    name: 'Carla Nguyen',
    department: 'Finance',
    age: 31,
  },
  {
    id: 4,
    name: 'David Brown',
    department: 'Engineering',
    age: 26,
  },
  {
    id: 5,
    name: 'Emma Wilson',
    department: 'Human Resources',
    age: 37,
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